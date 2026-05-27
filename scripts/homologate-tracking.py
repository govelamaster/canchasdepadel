#!/usr/bin/env python3
"""
homologate-tracking.py — aplica el bloque tracking oficial a un HTML.
Idempotente: si el bloque ya está, no hace nada.
Si encuentra un bloque viejo de gtag/dispararConversion, lo reemplaza.
Si no hay nada, lo inserta antes de </head>.

Uso:
  python3 scripts/homologate-tracking.py <html-file> [<html-file>...]
"""
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
BLOCK_FILE = REPO_ROOT / "scripts" / "tracking-block.html"
OFFICIAL_BLOCK = BLOCK_FILE.read_text().strip()

# Marker para detectar si el bloque oficial YA está aplicado
OFFICIAL_MARKER = "Google Tag — GA4 + Google Ads (bloque oficial)"

# Patrón para detectar el bloque tracking viejo (cualquier variante):
#   - Comment header opcional con AW-859315777
#   - Script loader gtag.js
#   - Script config + helpers + handlers
# El patrón captura desde el primer comment o script de gtag hasta el </script> que
# cierra el último bloque relacionado con gtag/dispararConversion.
OLD_BLOCK_PATTERN = re.compile(
    r"""
    (?:<!--[^>]*(?:Google\ Ads|Conversion\ Tracking|AW-859315777|Google\ Tag)[^>]*-->\s*)*  # optional comments
    <script\s+async\s+src="https://www\.googletagmanager\.com/gtag/js\?id=[^"]+"></script>\s*
    <script>.*?</script>\s*
    (?:<!--\s*/Google\s*(?:Ads\s*Conversion\s*Tracking|Tag)\s*-->\s*)?
    """,
    re.VERBOSE | re.DOTALL | re.IGNORECASE,
)

# Caso "vacío": solo loader G-749 sin helpers
# Igual lo captura OLD_BLOCK_PATTERN porque también matchea script>...</script>

INSERT_BEFORE_HEAD_CLOSE = re.compile(r"</head>", re.IGNORECASE)


def homologate(path: Path) -> str:
    """Devuelve status: 'ok-already' | 'ok-replaced' | 'ok-inserted' | 'error-no-head'."""
    html = path.read_text()

    if OFFICIAL_MARKER in html:
        return "ok-already"

    # Buscar bloque viejo y reemplazar
    match = OLD_BLOCK_PATTERN.search(html)
    if match:
        new_html = html[: match.start()] + OFFICIAL_BLOCK + "\n" + html[match.end():]
        path.write_text(new_html)
        return "ok-replaced"

    # Si no hay bloque viejo, insertar antes de </head>
    if INSERT_BEFORE_HEAD_CLOSE.search(html):
        new_html = INSERT_BEFORE_HEAD_CLOSE.sub(OFFICIAL_BLOCK + "\n</head>", html, count=1)
        path.write_text(new_html)
        return "ok-inserted"

    return "error-no-head"


def main():
    if len(sys.argv) < 2:
        print("Uso: python3 scripts/homologate-tracking.py <html-file> [<html-file>...]", file=sys.stderr)
        sys.exit(2)

    results = []
    for arg in sys.argv[1:]:
        p = Path(arg)
        if not p.is_file():
            results.append((arg, "error-not-found"))
            continue
        status = homologate(p)
        results.append((arg, status))

    for arg, status in results:
        emoji = {
            "ok-already": "✓",
            "ok-replaced": "♻️",
            "ok-inserted": "➕",
            "error-no-head": "✗",
            "error-not-found": "✗",
        }.get(status, "?")
        print(f"  {emoji} {status:20s} {arg}")

    errors = [r for r in results if r[1].startswith("error")]
    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    main()
