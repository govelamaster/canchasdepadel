# 🚀 Walkthrough — Setup del Cowork Project para Monitor Padel

## Lo que vas a tener al final
Un Project en Cowork (claude.ai) llamado "Monitor Padel Google Ads — Senior Consultant" donde:
- Escribes "check padel" → recibes reporte ejecutivo en 30 seg
- Funciona desde móvil, escritorio, tablet
- Persistente entre sesiones (siempre recuerda contexto)
- Es como tener un consultor senior 24/7 disponible

---

## PASO 1 — Abrir Cowork
1. Abre tu navegador
2. Ve a: **https://claude.ai**
3. Asegúrate de estar logueada con: **govelamaster@gmail.com**

---

## PASO 2 — Crear el Project
1. En el sidebar izquierdo, busca **"Projects"** (puede aparecer como "Proyectos" en español)
2. Click en **"+ New project"** o **"+ Nuevo proyecto"**
3. Nombra el proyecto: **`Monitor Padel Google Ads — Senior Consultant`**
4. Descripción (opcional): `Cowork para monitorear y optimizar campaña padel diario hasta llegar a 20 leads/día`

---

## PASO 3 — Pegar el System Prompt
1. Una vez creado el proyecto, busca un campo llamado:
   - **"Custom instructions"** o
   - **"Instructions"** o
   - **"System prompt"** o
   - **"Set instructions for this project"**
2. Abre el archivo `1-SYSTEM-PROMPT.md` (en este mismo folder)
3. Copia TODO el bloque entre las líneas `═══` (el contenido del system prompt)
4. Pega ese texto completo en el campo de Cowork
5. Guarda

---

## PASO 4 — Conectar Supermetrics a Cowork
1. En el sidebar izquierdo de Cowork → **"Settings"** → **"Connectors"**
2. Busca **"Supermetrics"** en la lista
3. Si no está conectado → click **"Connect"** → autoriza con tu cuenta Supermetrics
4. Verifica que aparezca **"Google Ads"** como data source disponible

Si ya estaba conectado: ✅ listo, salta al paso 5.

---

## PASO 5 — Subir archivos de contexto (opcional pero recomendado)
En el Project, busca **"Add files"** o **"Knowledge"** y sube:
- El archivo `1-SYSTEM-PROMPT.md` (este mismo)
- El handoff: `/tmp/canchasdepadel-handoff-2026-05-24.md` (si lo encuentras)
- Cualquier reporte CSV que descargues de Google Ads (devices, schedule, etc.)

Esto le da MÁS contexto a Claude cuando preguntes cosas específicas.

---

## PASO 6 — Test de funcionamiento

Ya creado el Project, ábrelo y prueba con estos mensajes:

**Test 1 — Check rápido:**
```
check padel
```
Deberías recibir reporte con métricas del día.

**Test 2 — Acción del día:**
```
qué optimizo hoy
```
Deberías recibir 1 acción específica con justificación.

**Test 3 — Reporte semanal:**
```
compara esta semana vs la anterior
```
Deberías recibir análisis comparativo.

Si los 3 funcionan → ✅ Cowork operativo.

---

## 📅 RUTINA RECOMENDADA SENIOR (día a día)

### MAÑANA (cada día, 5 min)
1. Abre el Project en Cowork desde tu móvil/laptop
2. Escribe: **`check padel`**
3. Lee el reporte (30 seg)
4. Si hay 🔴 rojo → escribe **`qué hago`** → ejecutas la acción recomendada

### SEMANAL (cada lunes, 30 min)
1. Escribe: **`reporte semanal completo`**
2. Recibes análisis de keywords + search terms + ajustes
3. Apruebas las recomendaciones (1 por 1) → Claude ejecuta via Supermetrics

### QUINCENAL (cada 14 días, 1 hora)
1. Escribe: **`revisión quincenal`**
2. Decisiones grandes: cambiar bidding, subir presupuesto, crear ad groups
3. Plan de los próximos 14 días

### MENSUAL (cada 30 días, 3 horas)
1. Escribe: **`auditoría completa de mes`**
2. Full audit: geo, hora, device, competencia, ad strength
3. Plan estratégico del mes siguiente

---

## 🚨 EMERGENCIAS — qué hacer si algo está MAL

### Si conversiones caen 50%+ de un día a otro:
```
emergencia: las conversiones cayeron drásticamente, diagnóstico ahora
```

### Si CPA se dispara:
```
CPA disparado, acciones inmediatas
```

### Si campaña está "limitada por presupuesto":
```
campaña limitada, qué hago
```

### Si Smart Bidding está en learning phase y quieres confirmación:
```
status de bidding strategy y aprendizaje
```

---

## 🎯 OBJETIVO MEDIBLE

**20 leads/día estables a CPA ≤ $300 MXN en máximo 30 días.**

El Cowork lleva el seguimiento de esa meta cada día.

---

## ❓ FAQ

**¿Necesito Claude Pro/Team?**
Sí. Projects en Cowork requiere plan pagado.

**¿Puedo usarlo desde el celular?**
Sí. Descarga app de Claude o ve a claude.ai en el navegador del celular.

**¿Puedo compartirlo con mi equipo (Beto)?**
Sí. En el Project hay opción "Share" — agregas el email de Beto.

**¿Y si Cowork falla o se cae?**
Tienes el handoff en tu Drive `/canchasdepadel/_COWORK_SETUP/` con todos los IDs.
Puedes reabrir conversación normal en Claude Code (local) y darme ese contexto.

**¿Las decisiones que tome se aplican automáticamente?**
NO. El Cowork te recomienda, tú apruebas, luego se ejecuta vía Supermetrics.
NUNCA cambios sin tu OK explícito.

**¿Y si quiero cambiar algo del system prompt?**
Edita este archivo `1-SYSTEM-PROMPT.md`, copia el nuevo contenido y reemplázalo en el Project de Cowork.
