# 🟢 canchasdepadel.mx — Sitio oficial

> **⚠️ ESTE REPO ES PARA EL DOMINIO `canchasdepadel.mx` (con `.mx`, NO `.com`)**

**URL del sitio en producción:**
👉 [https://canchasdepadel.mx](https://canchasdepadel.mx)

**Hosting:** Cloudflare Pages
**Proyecto Cloudflare:** `canchasdepadel` (no confundir con `canchasdepadel-preview`)
**Bundle deployado:** carpeta `canchasdepadel-lp1/`

---

## 📍 Subpáginas vivas en producción

| Página | URL en vivo | Archivo en este repo |
|---|---|---|
| 🏠 **Home** | [canchasdepadel.mx/](https://canchasdepadel.mx/) | `canchasdepadel-lp1/index.html` |
| 💰 **Cuánto cuesta una cancha de pádel** ⭐ | [canchasdepadel.mx/cuanto-cuesta-una-cancha-de-padel/](https://canchasdepadel.mx/cuanto-cuesta-una-cancha-de-padel/) | `canchasdepadel-lp1/cuanto-cuesta-una-cancha-de-padel/index.html` |
| 🏛 Cancha Clásica | [canchasdepadel.mx/cancha-clasica/](https://canchasdepadel.mx/cancha-clasica/) | `canchasdepadel-lp1/cancha-clasica/index.html` |
| 🪟 Cancha Panorámica Full View | [canchasdepadel.mx/cancha-panoramica/](https://canchasdepadel.mx/cancha-panoramica/) | `canchasdepadel-lp1/cancha-panoramica/index.html` |
| 🔲 Cancha Semipanorámica | [canchasdepadel.mx/cancha-semipanoramica/](https://canchasdepadel.mx/cancha-semipanoramica/) | `canchasdepadel-lp1/cancha-semipanoramica/index.html` |
| 1️⃣ Cancha Singles | [canchasdepadel.mx/cancha-singles/](https://canchasdepadel.mx/cancha-singles/) | `canchasdepadel-lp1/cancha-singles/index.html` |
| 🔨 Cómo construir una cancha de pádel | [canchasdepadel.mx/construir-cancha-de-padel-medidas-materiales-costos/](https://canchasdepadel.mx/construir-cancha-de-padel-medidas-materiales-costos/) | `canchasdepadel-lp1/construir-cancha-de-padel-medidas-materiales-costos/index.html` |
| 📏 Medidas oficiales de cancha de pádel | [canchasdepadel.mx/medidas-cancha-de-padel-guia-completa/](https://canchasdepadel.mx/medidas-cancha-de-padel-guia-completa/) | `canchasdepadel-lp1/medidas-cancha-de-padel-guia-completa/index.html` |
| 🏗 Canchas de pádel techadas / domos | [canchasdepadel.mx/canchas-padel-techadas-domos-cubiertas-guia/](https://canchasdepadel.mx/canchas-padel-techadas-domos-cubiertas-guia/) | `canchasdepadel-lp1/canchas-padel-techadas-domos-cubiertas-guia/index.html` |
| 💼 Cómo montar club rentable | [canchasdepadel.mx/como-montar-club-de-padel-rentable/](https://canchasdepadel.mx/como-montar-club-de-padel-rentable/) | `canchasdepadel-lp1/como-montar-club-de-padel-rentable/index.html` |
| 📊 Pádel México 2026 — cifras y rentabilidad | [canchasdepadel.mx/padel-mexico-2026-cifras-mercado-rentabilidad-costo-cancha/](https://canchasdepadel.mx/padel-mexico-2026-cifras-mercado-rentabilidad-costo-cancha/) | `canchasdepadel-lp1/padel-mexico-2026-cifras-mercado-rentabilidad-costo-cancha/index.html` |
| 🧹 Mantenimiento de canchas | [canchasdepadel.mx/mantenimiento-canchas-padel-guia-preventivo-correctivo-2026/](https://canchasdepadel.mx/mantenimiento-canchas-padel-guia-preventivo-correctivo-2026/) | `canchasdepadel-lp1/mantenimiento-canchas-padel-guia-preventivo-correctivo-2026/index.html` |
| 🏭 Construcción liderazgo industrial | [canchasdepadel.mx/construccion-de-canchas-de-padel-en-mexico-liderazgo-industrial/](https://canchasdepadel.mx/construccion-de-canchas-de-padel-en-mexico-liderazgo-industrial/) | `canchasdepadel-lp1/construccion-de-canchas-de-padel-en-mexico-liderazgo-industrial/index.html` |
| 🧮 Calculadora ROI | [canchasdepadel.mx/calculadora/](https://canchasdepadel.mx/calculadora/) | `canchasdepadel-lp1/calculadora/index.html` |
| 📝 Blog | [canchasdepadel.mx/blog](https://canchasdepadel.mx/blog) | `canchasdepadel-lp1/blog.html` |

---

## ⚠️ NO confundir con otros repos de Olga

| ❌ NO es este repo | Dominio | Repo correcto |
|---|---|---|
| `canchasdepadel.com` (dominio viejo) | `canchasdepadel.com` | Migración pendiente, NO trabajar aquí |
| Padel Center MX (marca madre) | `padelcenter.mx` | Repo separado: `govelamaster/padelcenter` |
| Pickleball | `canchasdepickleball.mx` | Repo separado: `govelamaster/canchasdepickleball` |
| Fútbol 7 | `canchasdefutbol7.mx` | Repo separado: `govelamaster/canchasdefutbol7-mx` |
| PlayZone Grass | `playzonegrass.com` | Repo separado: `govelamaster/playzonegrass` |
| Putting Green México | `puttinggreenmexico.com` | Repo separado: `govelamaster/puttinggreenmexico` |
| Pintura para canchas | `pinturaparacanchasdeportivas.mx` | Repo separado: `govelamaster/pinturaparacanchasdeportivas` |

**Para canchas de pádel premium con dominio `.mx`, este repo (`canchasdepadel`) es el correcto.**

---

## 🛠 Cómo trabajar en este repo

### Preview local
```bash
cd "/Users/olgagovela/Library/CloudStorage/GoogleDrive-govelamaster@gmail.com/My Drive/Proyectos/canchasdepadel"
python3 -m http.server 5174
```
Después abrir: `http://localhost:5174/canchasdepadel-lp1/[slug-de-pagina]/`

### Deploy a producción
```bash
cd "/Users/olgagovela/Library/CloudStorage/GoogleDrive-govelamaster@gmail.com/My Drive/Proyectos/canchasdepadel"
wrangler pages deploy canchasdepadel-lp1 --project-name=canchasdepadel --branch=main --commit-dirty=true
git add -A
git commit -m "Descripción del cambio"
git push origin main
```

### Deploy a preview (staging)
Mismo comando pero con `--project-name=canchasdepadel-preview` → queda en [canchasdepadel-preview.pages.dev](https://canchasdepadel-preview.pages.dev)

---

## 📂 Estructura del repo

```
canchasdepadel/                          ← raíz del repo (NO se deploya tal cual)
├── README.md                            ← este archivo (no público)
├── canchasdepadel-lp1/                  ← BUNDLE QUE SE DEPLOYA a canchasdepadel.mx
│   ├── index.html                       ← home
│   ├── cuanto-cuesta-una-cancha-de-padel/
│   │   └── index.html
│   ├── cancha-clasica/, cancha-panoramica/, ...
│   ├── calculadora/
│   ├── assets/img/
│   │   ├── clubs/                       ← 89 fotos de clubes reales
│   │   ├── brand-logos/                 ← 27 logos de marcas
│   │   ├── modelos/                     ← 3 renders de cancha
│   │   └── articulos/                   ← imágenes de guías
│   ├── sitemap.xml, llms.txt, robots.txt
│   ├── _headers, _redirects             ← config Cloudflare
│   └── ...
├── assets/                              ← copia espejo (legacy, no se deploya solo)
├── .codex/                              ← coordinación Codex ↔ Claude (no público)
├── .github/workflows/                   ← auto-deploy desactivado (.disabled)
└── .gitignore
```

---

*Último deploy verificado:* 22 de mayo 2026
*Hosting:* Cloudflare Pages, Account ID `465b493908302d5f8b6ed3b92e69d9f8`
*Repo:* `github.com/govelamaster/canchasdepadel`
