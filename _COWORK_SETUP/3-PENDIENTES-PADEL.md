# PENDIENTES — Monitor Padel Google Ads

**Última actualización:** 2026-05-24 (post-recovery completado)
**Owner:** Olga Govela
**Sistema:** Esta lista es la única fuente de verdad. Cowork la lee en cada conversación.

═══════════════════════════════════════════════════════════════

## 🔥 PENDIENTES ACTIVOS — POR PRIORIDAD

### 🔴 INMEDIATOS (esta semana)

#### P1. Cerrar task #12 — Agregar /gracias/ a Páginas web del tag Formulario
- **Tag target:** "Formulario - canchasdepadel.com (buena)" (6,075 conv all-time)
- **Label esperado:** `AW-859315777/3Xf0CM7r67ECEMG84JkD`
- **Acción:** Pestaña "Páginas web" → Agregar → `La URL contiene: canchasdepadel.mx/gracias/`
- **Estado:** En verificación de label
- **Bloqueante:** Confirmar label vía "Ver fragmento de evento"

#### P2. Crear Ad A "Cierra-leads" en Grupo de anuncios 1
- **Landing:** /cuanto-cuesta-una-cancha-de-padel/
- **Path:** cotiza/padel
- **15 headlines + 4 descriptions** (ver SYSTEM-PROMPT sección copies)
- **Reglas:** Sin pins, sin mayúsculas excesivas, con tildes
- **Crítico:** NO via Supermetrics (preservar histórico del ad #1 con 848 conv $290 CPA)

#### P3. Crear Ad B "Atrae-curiosos" en Grupo Genéricas
- **Landing:** /canchas-de-padel/
- **15 headlines + 4 descriptions** (broader-intent)
- **Reglas:** mismas que P2

---

### 🟡 SEMANA PRÓXIMA (después día 7)

#### P4. [31-may día 7] Primer punto de chequeo padel post-recovery
- **Esperamos:** 5+ conversiones acumuladas, CPA <$500
- **Comando Cowork:** `check padel` + `compara esta semana vs la anterior`
- **Decisión:** Si SÍ → seguir max clicks. Si NO → diagnosticar landing/tags/ads.

#### P5. Bid adjustments por día semana padel
- **Data 4 meses (ene-may):** Miércoles CPA $360 (mejor), Sábado $480 (peor)
- **Cambios sugeridos:**
  - Sábado: bid -15%
  - Domingo: bid -10%
  - Miércoles: bid +15%
  - Jueves: bid +10%
- **Ahorro estimado:** $3-4K/mes
- **Manual UI** (Supermetrics no expone bid adjustments)

#### P6. Pausar 4 campañas con 0 conversiones
- **Lista:** Bancas, Pickleball, Sportmaster, PG Putting
- **Impacto:** Recupera ~$15K/mes
- **Decisión pendiente de Olga:** ¿pausar todas en bloque o auditar 1 por 1?

#### P7. Investigar Construcción Sintético CDMX
- **CPA CDMX:** $2,064 (4.2x vs resto del país $485)
- **Posible ahorro:** $8-12K/mes
- **Acción:** Pausar CDMX en esa campaña hasta diagnosticar

---

### 🟢 DÍA 14 (7-jun) Y DESPUÉS

#### P8. Activar Enhanced Conversions for Leads
- **Path:** Objetivos → Configuración → "Conversiones avanzadas para medir clientes potenciales"
- **Requisito:** mínimo 30 conv acumuladas
- **Impacto esperado:** +15-30% mejora Smart Bidding
- **Estado:** Hoy "Aún no se configuró" (vimos en UI 24-may)

#### P9. Cambiar bidding MAXIMIZE_CLICKS → MAXIMIZE_CONVERSIONS
- **Requisito:** 15+ conversions últimos 14 días
- **Si SÍ:** Cambiar a Max Conv (sin tCPA, learning 14 días)
- **Si NO:** Mantener Max Clicks

---

### ⚫ DÍA 21 (14-jun) Y DESPUÉS

#### P10. Activar tCPA $400
- **Requisito:** CPA estable post-Max Conv
- **Decisión basada en data:** Sólo activar si data limpia

#### P11. Subir budget +20% ($6,500 → $8,000)
- **Requisito:** CPA <$350 estable
- **Reinversión de:** ahorro de campañas pausadas (P6)

═══════════════════════════════════════════════════════════════

## 🧹 CLEANUP ESTRUCTURAL — POST-ESTABILIZACIÓN

### P12. Auditoría conversion tracking — 66 actions a limpiar
**Diagnóstico al 24-may-2026:**
- Cuenta tiene **66 conversion actions** activas/archivadas
- Goal "Solicitar cotización" tiene 16 actions (15 dead variants + 1 real)
- Tags muertos confirmados (todos 0 conv, "Requiere atención"):
  - Click en HAZ CLICK AQUI!! PARA OBTENER TU COTIZACIÓN
  - Click en Solicitar Cotización
  - Click en el Formulario de Cotización
  - Click en Cotizar (1)
  - Click en QUIERO MI COTIZACIÓN
  - Click en Solicitar Cotización (1)
  - Click en Cotiza Aquí! (1)
  - Click en Quiero Mi Cotización (1)
  - Click en Cotiza Aquí/Cotiza Ahora

**Tags con histórico pero quitados (revisar si archivar definitivo):**
- Thank You Page / Gracias (4,208 conv, valor $4,208)
- [Math] Thank you page (3,086 conv)
- Gracias / Thank You Page (131 conv)
- Click en ENVIAR (99 conv)
- Formulario Sportmaster (96 conv)
- Lleno Formulario Padel (0 conv, quitado)
- Formulario: canchasdefutfol7.com.mx/futbol-7-cdmx (32 conv)

**Tags con valor distorsionando ROAS:**
- "Click en Cotiza -": 1,235 conv con $1,235 de valor histórico (¿sigue disparando? cleanup)

**Comando Cowork:** `audita los 66 tags y dime cuáles archivar sin riesgo`

---

### P13. Documentar mapping tag-label-proyecto
**Problema:** Tags compartidos cross-proyecto sin control.

**Mapping conocido al 24-may:**
| Label | Action Name | Proyecto |
|---|---|---|
| AW-859315777/2VsqCPCh2vkYEMG84JkD | (ROAS) Cliente Potencial | Sportmaster |
| AW-859315777/3Xf0CM7r67ECEMG84JkD (esperado) | Formulario - canchasdepadel.com (buena) | canchasdepadel.mx |
| AW-859315777/2B6zCP-pk44YEMG84JkD | (por confirmar) | canchasdepadel.mx WA |
| AW-859315777/nnyPCN7UlW8QwbzgmQM | (por confirmar) | canchasdepadel.mx Tel |

**Riesgo:** Sin mapping completo, Smart Bidding mezcla data cross-proyecto. Explica por qué la campaña de padel "perdió" rendimiento (la "data histórica" que sostenía bidding era de sportmaster).

---

### P14. Reducir 12 goal categories activos a 3
**Estado hoy:**
- Reservar cita (45 campañas, 1 action) — Requiere atención
- Solicitar cotización (46 campañas, 16 actions) — Requiere atención
- Obtener indicaciones (0 campañas, 1) — Activa
- Descarga (36 campañas, 1) — Activa
- Participación (0 campañas, 1) — Activa
- Vista de página (46 campañas, 2) — Activa
- Otra (45 campañas, 1) — Activa
- Clientes potenciales obtenidos por mensajes (36, 1) — Activa
- Enviar formulario de clientes potenciales (46, 11) — Requiere atención
- Registro (45, 2) — Requiere atención
- Cliente potencial de llamada telefónica (46, 3) — Activa
- Contacto (46, 26) — Requiere atención

**Objetivo:** Quedar con SOLO 3 goals (Solicitar cotización + Cliente potencial de llamada + 1 más). Resto archivado.

---

### P15. Resolver "Conversiones avanzadas: Se detectaron problemas de configuración"
- **Tag afectado:** Formulario - canchasdepadel.com (buena)
- **Causa probable:** Form viejo en .com no envía datos
- **Plan:** Esperar 7 días post-recovery. Si conversiones .mx no auto-arreglan → debug manual.

═══════════════════════════════════════════════════════════════

## 🔧 PROTOCOLO DE ACTUALIZACIÓN

### Cómo se mantiene este archivo:

1. **TÚ (Olga)** cuando detectes pendiente nuevo en tu día:
   - Abres tu Cowork web → escribes el pendiente
   - Pides: `agrega este pendiente al archivo PENDIENTES-PADEL.md`
   - Cowork actualiza el archivo en Drive

2. **YO (Claude)** cuando aparezca pendiente nuevo en sesión:
   - Edito directamente `/canchasdepadel/_COWORK_SETUP/3-PENDIENTES-PADEL.md`
   - Aviso a Olga del cambio
   - Olga sube el archivo actualizado a Cowork Knowledge

3. **REVISIÓN SEMANAL** (cada lunes):
   - Olga escribe en Cowork: `revisa PENDIENTES y dime qué cerramos esta semana`
   - Cowork compara contra realidad y marca cumplidos
   - Pendientes cumplidos se mueven a sección "HISTÓRICO"

═══════════════════════════════════════════════════════════════

## ✅ COMPLETADOS — HISTÓRICO

### Recovery 24-may-2026:
- ✅ Diagnóstico tags conversion (3 reales, 6 huérfanos)
- ✅ Install AW-859315777 + 3 labels en canchasdepadel.mx
- ✅ Patch HTML con WhatsApp + form + tel tracking
- ✅ Crear /gracias/ con reviews + redirects (?ref=wa, ?ref=form)
- ✅ Pausar tags huérfanos
- ✅ Geo targeting MX+US con PRESENCE
- ✅ Search Partners OFF
- ✅ Eliminar EXACT "canchas de padel" (PHRASE captura mismo tráfico)
- ✅ Crear ad group "Genericas - Canchas de Padel" + landing /canchas-de-padel/
- ✅ Sitelinks corregidos (cada uno a su URL)
- ✅ Bidding MAXIMIZE_CLICKS confirmado (sin tocar hasta 15+ conv)
- ✅ Conversion goals simplificados 9→3 (a nivel objetivos)
- ✅ Search terms revisados, negativas seguras agregadas
- ✅ Setup Cowork Project para monitoreo
- ✅ Call asset nuevo creado (formato 2026)
- ✅ Walkthrough setup + system prompt entregados
- ✅ Bid modifiers tablets revisados (no requiere ajuste, gasto trivial)

═══════════════════════════════════════════════════════════════

## 📌 REGLAS CRÍTICAS QUE NUNCA SE OLVIDAN

1. NUNCA agregar keywords negativas que hayan generado ≥1 conversión histórica
2. NUNCA tocar bidding strategy si <15 conversions últimos 14 días
3. NUNCA exponer specs/precios no aprobados (FIP Quality, wattajes, etc.). $415K SÍ aprobado.
4. NUNCA auto-deployar a Cloudflare sin permiso explícito de Olga
5. NUNCA hacer git commit con "Co-Authored-By: Claude"
6. SIEMPRE pasar el OBJETO targeting COMPLETO en campaign_update (API es REPLACE-ALL)
7. SIEMPRE verificar con get post-update + diff vs estado pre-cambio
8. SIEMPRE validar contexto de negocio con Olga antes de bloquear palabras "raras"
9. Sticky CTA es OBLIGATORIO en canchasdepadel.mx
10. NUNCA exponer teléfono visible en footers — solo WhatsApp via wa.me href

═══════════════════════════════════════════════════════════════
FIN — Este archivo es la única fuente de verdad para pendientes padel.
═══════════════════════════════════════════════════════════════
