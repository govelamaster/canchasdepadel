#!/usr/bin/env bash
# ============================================================
# validate-landing.sh — Senior-grade landing validator
# canchasdepadel.mx
# ------------------------------------------------------------
# Uso:
#   ./scripts/validate-landing.sh <ruta-al-html> [<ruta>...]
#   ./scripts/validate-landing.sh canchasdepadel-lp1/cuanto-cuesta-una-cancha-de-padel/index.html
#
# Valida que CUALQUIER landing en canchasdepadel-lp1/ tenga:
#   1. Tags Google Ads (AW + 3 labels) + GA4 + Ahrefs
#   2. Canonical apuntando a canchasdepadel.mx
#   3. Hero CSS con z-index:-1 en pseudo-elementos (si tiene #hero)
#   4. Todas las imágenes referenciadas existen físicamente
#   5. Title + meta description presentes
#
# Exit code:
#   0 → todo OK
#   1 → falló al menos una validación (bloquea commit)
# ============================================================
set -u

RED='\033[0;31m'; GREEN='\033[0;32m'; YEL='\033[0;33m'; NC='\033[0m'
ERRORS=0
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

if [ $# -eq 0 ]; then
  echo "Uso: $0 <html-file> [<html-file>...]"
  exit 2
fi

check() {
  local file="$1" label="$2" pattern="$3" min="${4:-1}"
  local count
  count=$(grep -cE "$pattern" "$file" 2>/dev/null) || count=0
  if [ "$count" -lt "$min" ]; then
    echo -e "  ${RED}✗ FALTA${NC} $label (esperado ≥$min, encontrado $count)"
    ERRORS=$((ERRORS+1))
    return 1
  else
    echo -e "  ${GREEN}✓${NC} $label ($count)"
    return 0
  fi
}

for FILE in "$@"; do
  if [ ! -f "$FILE" ]; then
    echo -e "${YEL}⚠ no existe: $FILE — skip${NC}"
    continue
  fi

  # Solo validar HTMLs en publish dir canchasdepadel-lp1/
  case "$FILE" in
    *canchasdepadel-lp1/*.html|*canchasdepadel-lp1/*/*.html) ;;
    *) continue ;;
  esac

  echo ""
  echo "🔍 Validando $FILE"

  # Detectar tipo de página:
  #   - utility (gracias/404/etc): solo core + key event si aplica
  #   - landing: full tracking + eventos GA4
  IS_LANDING=0
  case "$FILE" in
    */gracias/*|*/404.html|*/cdn-cgi/*) IS_LANDING=0 ;;
    *)
      if grep -qE 'wa\.me|api\.whatsapp|href="tel:|<form' "$FILE"; then
        IS_LANDING=1
      fi
      ;;
  esac

  # === 1. TRACKING CORE (todas las páginas con tracking) ===
  echo "── Tracking core"
  check "$FILE" "Google Ads AW-859315777"           'AW-859315777'                      2
  check "$FILE" "GA4 G-749N07TYXQ"                  'G-749N07TYXQ'                      1
  check "$FILE" "conversion_linker"                 'conversion_linker'                 1

  if [ "$IS_LANDING" -eq 1 ]; then
    echo "── Tracking landing (detectados CTAs WA/tel/form)"
    check "$FILE" "Label WA+Llamada"                'nnyPCN7UlW8QwbzgmQM'               1
    check "$FILE" "Label Form"                      '3Xf0CM7r67ECEMG84JkD'              1
    check "$FILE" "Ahrefs analytics (key oficial)"  'data-key="R8lhs0IC7uIrHv4ps\+Gi0Q"' 1
    check "$FILE" "dispararConversion helper"       'dispararConversion'                1
    check "$FILE" "Evento GA4 whatsapp_click"       "gtag\\(['\"]event['\"], ['\"]whatsapp_click" 1
    check "$FILE" "Evento GA4 phone_click"          "gtag\\(['\"]event['\"], ['\"]phone_click"    1
    check "$FILE" "Evento GA4 form_submit"          "gtag\\(['\"]event['\"], ['\"]form_submit"    1
  else
    echo "── Página utility (gracias/404/etc) — checks landing OMITIDOS"
    # /gracias/ debe disparar el key event GA4
    case "$FILE" in
      */gracias/*)
        check "$FILE" "Key event generate_lead (gracias)" "gtag\\(['\"]event['\"], ['\"]generate_lead" 1
        ;;
    esac
  fi

  # === 2. SEO ===
  echo "── SEO"
  check "$FILE" "<title>"                        '<title>[^<]+</title>'                 1
  check "$FILE" "meta description"               '<meta name="description"'             1
  check "$FILE" "canonical canchasdepadel.mx"    'rel="canonical" href="https://canchasdepadel\.mx' 1
  check "$FILE" "robots index,follow"            '<meta name="robots"'                  1

  # === 3. HERO CSS (solo si hay #hero) ===
  if grep -q '#hero' "$FILE"; then
    echo "── Hero CSS (detectado #hero)"
    # ::before y ::after deben tener z-index: -1 (o ausente). Si tiene z-index: 0 o positivo, ROMPE imagen.
    BAD_PSEUDO=$(grep -cE '#hero::(before|after)[^}]*z-index:\s*[0-9]+' "$FILE" 2>/dev/null) || BAD_PSEUDO=0
    if [ "$BAD_PSEUDO" -gt 0 ]; then
      echo -e "  ${RED}✗ HERO ROTO${NC} — #hero::before/after con z-index ≥ 0 tapan la imagen del hero. Usar z-index:-1."
      ERRORS=$((ERRORS+1))
    else
      echo -e "  ${GREEN}✓${NC} z-index en hero pseudos correcto (-1 o ausente)"
    fi

    # Verificar que el background-image del #hero existe
    HERO_IMG=$(grep -oE "#hero[^}]*background[^}]*url\(['\"]?\.\.\/assets\/[^'\")?]+" "$FILE" | grep -oE 'assets/[^"'\'')?]+' | head -1)
    if [ -n "$HERO_IMG" ]; then
      # El index.html vive en lp1/<slug>/, así que ../assets/... es lp1/assets/...
      PUBLISH_DIR=$(dirname "$(dirname "$FILE")")
      ASSET_PATH="$PUBLISH_DIR/$HERO_IMG"
      if [ -f "$ASSET_PATH" ]; then
        SIZE=$(wc -c < "$ASSET_PATH" | tr -d ' ')
        echo -e "  ${GREEN}✓${NC} hero image existe ($HERO_IMG, ${SIZE}B)"
      else
        echo -e "  ${RED}✗ HERO IMAGE FALTA${NC} → $ASSET_PATH"
        ERRORS=$((ERRORS+1))
      fi
    fi
  fi

  # === 4. ASSETS REFERENCIADOS (preload + img + background-image) ===
  echo "── Assets referenciados"
  PUBLISH_DIR=$(dirname "$(dirname "$FILE")")
  MISSING=0
  while read -r asset; do
    rel="${asset#../}"
    if [ ! -f "$PUBLISH_DIR/$rel" ]; then
      echo -e "  ${RED}✗ MISSING ASSET${NC} → $asset"
      MISSING=$((MISSING+1))
    fi
  done < <(grep -oE '\.\./assets/[^"?'\'')]+' "$FILE" | sort -u)
  if [ "$MISSING" -eq 0 ]; then
    echo -e "  ${GREEN}✓${NC} todos los assets referenciados existen"
  else
    ERRORS=$((ERRORS+MISSING))
  fi
done

echo ""
if [ "$ERRORS" -gt 0 ]; then
  echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${RED}✗ VALIDACIÓN FALLÓ — $ERRORS errores. Commit BLOQUEADO.${NC}"
  echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo ""
  echo "Para forzar el commit (NO recomendado): git commit --no-verify"
  exit 1
else
  echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${GREEN}✓ Validación PASÓ — commit puede continuar.${NC}"
  echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  exit 0
fi
