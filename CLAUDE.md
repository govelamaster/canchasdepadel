# canchasdepadel — Reglas para Claude

## Hosting + deploy
- CF Pages project: `canchasdepadel` (no confundir con `canchasdepadel-preview`)
- Bundle deployado: `canchasdepadel-lp1/`
- Domain: `canchasdepadel.mx`
- Deploy: `wrangler pages deploy canchasdepadel-lp1 --project-name=canchasdepadel --branch=main --commit-dirty=true`
- Preview local: `python3 -m http.server 5174` (puerto del proyecto)
- NO auto-deploy — Olga aprueba cada push a prod

## Workflow Codex + Claude
- Codex edita en paralelo (preview local). Claude es el único que deploya.
- Antes de commit: `git add -A` (para no perder trabajo de Codex)
- Verificar pre + post deploy (curl al título/H1/CSS clave)

## 🔐 Guardrail anti-roturas (pre-commit hook)

**Cualquier commit que modifique HTML en `canchasdepadel-lp1/` se valida automáticamente:**

- `scripts/validate-landing.sh` — runner manual: `bash scripts/validate-landing.sh <ruta-html>`
- `scripts/hooks/pre-commit` — corre auto en cada `git commit`
- Hook activado vía: `git config core.hooksPath scripts/hooks` (ya configurado en este repo)

**Qué bloquea:**
- Falta de AW-859315777, 3 conversion labels, GA4, Ahrefs, conversion_linker
- Falta de title / canonical / description / robots
- `#hero::before` o `::after` con `z-index ≥ 0` (rompe la imagen del hero)
- Hero image que no existe físicamente
- Cualquier asset referenciado (`../assets/...`) que no exista

**Si necesitas saltarlo (excepcional):** `git commit --no-verify` — pero antes piensa si vale la pena romper algo.

**Mantenimiento del script:** si agregas nuevos tags obligatorios (GTM, Pixel, etc.) o nuevos labels Ads, actualiza `scripts/validate-landing.sh` para que los exija.

## Reglas de contenido
- WhatsApp: `+525539887615` (sin `+` en href: `wa.me/525539887615`)
- Empresa: Padel Center México (NO Sportmaster en copy visible del padel)
- Garantías: confirmar con Olga antes de cotizar specs/precios fijos
- Footer: NUNCA teléfono ni email visible (solo CTAs `wa.me/...`)

## Sticky CTA template (obligatorio en TODO artículo nuevo)

**Cada artículo del blog y cada landing nueva debe llevar:**

### 1. CSS (antes de `</style>`)

```css
/* ---- STICKY BOTTOM CTA (dinámico) ---- */
.sticky-cta{position:fixed;bottom:0;left:0;right:0;z-index:90;background:linear-gradient(180deg,#0a1628 0%,#11203b 100%);border-top:1px solid rgba(140,210,30,.35);padding:14px 24px;display:none;align-items:center;gap:20px;box-shadow:0 -14px 44px rgba(0,0,0,.32);transform:translateY(100%);transition:transform .35s cubic-bezier(.22,.61,.36,1);font-family:'Inter',-apple-system,sans-serif}
.sticky-cta.show{display:flex;transform:translateY(0)}
.sticky-cta-pulse{position:relative;flex-shrink:0;width:10px;height:10px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 0 rgba(34,197,94,.6);animation:sticky-cta-pulse 1.8s infinite}
@keyframes sticky-cta-pulse{0%{box-shadow:0 0 0 0 rgba(34,197,94,.6)}70%{box-shadow:0 0 0 14px rgba(34,197,94,0)}100%{box-shadow:0 0 0 0 rgba(34,197,94,0)}}
.sticky-cta-text{font-size:14px;line-height:1.3;flex:1;min-width:0;color:#fff}
.sticky-cta-text strong{color:#fff;display:block;font-size:15.5px;margin-bottom:3px;font-weight:700;letter-spacing:-.01em}
.sticky-cta-text strong em{font-style:normal;color:#cdef5b}
.sticky-cta-text span{color:rgba(255,255,255,.62);font-size:12.5px;display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.sticky-cta-text span b{color:#cdef5b;font-weight:600}
.sticky-cta-text .dot{display:inline-block;width:3px;height:3px;border-radius:50%;background:rgba(255,255,255,.35);flex-shrink:0}
.sticky-cta-btn{display:inline-flex;align-items:center;gap:10px;background:#25D366;color:#fff;padding:14px 24px;border-radius:14px;font-weight:700;font-size:15px;text-decoration:none;flex-shrink:0;white-space:nowrap;box-shadow:0 10px 28px rgba(37,211,102,.42),inset 0 1px 0 rgba(255,255,255,.18);transition:transform .2s ease,box-shadow .2s ease;letter-spacing:-.01em}
.sticky-cta-btn:hover{transform:translateY(-2px);box-shadow:0 16px 38px rgba(37,211,102,.55),inset 0 1px 0 rgba(255,255,255,.22);background:#1FB957}
.sticky-cta-btn svg{width:18px;height:18px;fill:#fff;flex-shrink:0}
.sticky-cta-btn .arrow{font-size:18px;line-height:1;margin-left:2px;transition:transform .2s ease}
.sticky-cta-btn:hover .arrow{transform:translateX(3px)}
@media (max-width:720px){.sticky-cta{padding:12px 16px;gap:12px}.sticky-cta-text strong{font-size:14px}.sticky-cta-text span{font-size:11.5px}.sticky-cta-btn{padding:12px 18px;font-size:14px;border-radius:12px}}
@media (max-width:480px){.sticky-cta-text span .hide-xs{display:none}.sticky-cta-pulse{display:none}}
@media (max-width:380px){.sticky-cta-text strong em{display:none}.sticky-cta-btn span.btn-label-long{display:none}}
/* Fix overlap con WhatsApp float (.wf) */
body:has(.sticky-cta.show) .wf,
body.sticky-active .wf{display:none!important}
```

### 2. HTML + JS (antes de `</body>`)

```html
<!-- STICKY BOTTOM CTA (dinámico) -->
<div class="sticky-cta" id="stickyCta" role="complementary" aria-label="Cotización rápida">
  <span class="sticky-cta-pulse" aria-hidden="true"></span>
  <div class="sticky-cta-text">
    <strong>Cancha de pádel llave en mano · <em>Desde $415K MXN</em></strong>
    <span>
      <b>+600 instaladas</b>
      <span class="dot"></span>
      <span class="hide-xs">Cobertura nacional</span>
      <span class="dot hide-xs"></span>
      Cotización formal en menos de 20 min
    </span>
  </div>
  <a href="https://wa.me/525539887615" class="sticky-cta-btn" id="stickyWa" rel="noopener" target="_blank" aria-label="Cotizar mi cancha por WhatsApp">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 01-5.03-1.378l-.36-.214-3.74.982.998-3.648-.235-.374a9.86 9.86 0 01-1.511-5.26c.002-5.45 4.437-9.884 9.888-9.884 2.64 0 5.12 1.03 6.987 2.898a9.825 9.825 0 012.892 6.994c-.002 5.45-4.436 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05.013C5.495.013.16 5.346.157 11.9c0 2.096.548 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    Cotizar mi cancha <span class="arrow">→</span>
  </a>
</div>
<script>
(function(){
  // WhatsApp message dinámico — incluye URL del artículo
  var btn = document.getElementById('stickyWa');
  if(btn){
    var url = window.location.origin + window.location.pathname;
    var msg = 'Hola Padel Center 👋\n\n'
            + 'Vengo de su artículo:\n' + url + '\n\n'
            + 'Quiero informes de ';
    btn.href = 'https://wa.me/525539887615?text=' + encodeURIComponent(msg);
  }
  // Mostrar al pasar el primer viewport (~600px de scroll)
  var sticky = document.getElementById('stickyCta');
  if(!sticky) return;
  var trigger = (document.querySelector('.hero')||document.querySelector('.blog-hero')||document.querySelector('header'));
  window.addEventListener('scroll', function(){
    var threshold = trigger ? Math.max(trigger.offsetHeight - 120, 300) : 600;
    var past = window.scrollY > threshold;
    sticky.classList.toggle('show', past);
    document.body.classList.toggle('sticky-active', past);
  }, { passive: true });
})();
</script>
```

### Reglas del mensaje WhatsApp
- **Termina en "Quiero informes de "** — NO autocompletar tema. El cliente escribe lo que quiere.
- **Una sola plantilla universal** — sirve para blog index, artículos actuales, artículos futuros, landings. La URL cambia automática.
- **No agregar `data-topic`** — la URL es suficiente para que el vendedor sepa de dónde vino el lead.

### Variantes según tipo de página
- **Artículos del blog:** copy "Cancha de pádel llave en mano · Desde $415K MXN" (default)
- **Landing de producto** (cancha-clasica, cancha-singles, etc.): puede cambiar el strong copy a algo más específico (ej. "Cancha singles 6×20m · Desde $290K") pero mantiene el mismo JS dinámico

### Scripts batch reusables
- Inyectar sticky en bulk: `/tmp/inject_sticky.py`
- Fix overlap `.wf`: `/tmp/fix_wf_overlap.py`

## Heros de artículos: less is more
- Kicker pill + h1 con `em` accent + subtítulo de 1-2 oraciones que impacte
- Stat-cards SÓLO si el artículo va de cifras (precio, ROI, mercado). No en "cómo/qué/cuándo".
- Referencia: `https://canchasdepickleball.mx/mapa-pickleball-mexico-2026/`

## Marquee fix conocido
- NO meter `<br />` dentro de `.mq-t` — rompe la animación horizontal y crea 2 filas apiladas
- Para duplicar contenido (loop seamless): poner los `<span>` 2 veces seguidos en la misma línea
