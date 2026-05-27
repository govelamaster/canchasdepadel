#!/usr/bin/env python3
"""
inject-faqpage.py — agrega JSON-LD FAQPage a las páginas que no lo tienen.
Idempotente: si ya existe FAQPage en el archivo, no hace nada.

Uso:
  python3 scripts/inject-faqpage.py
"""
import json
import re
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
LP1 = REPO / "canchasdepadel-lp1"

# 6 páginas faltantes — FAQs redactadas siguiendo:
# - rangos de precio canónicos: clásica $415K, panorámica $450K (CDMX origen)
# - base de concreto NO incluida (contratista local)
# - garantía sin specs no autorizadas
# - +525539887615 WhatsApp
FAQS = {
    "cancha-clasica/index.html": [
        ("¿Cuánto cuesta una cancha de pádel clásica en México?",
         "Desde $415,000 MXN saliendo desde CDMX. Incluye estructura metálica con pintura anticorrosión, cristales templados de fondo, pasto sintético profesional, red oficial e iluminación LED. La base de concreto la ejecuta tu contratista local con plano técnico que entregamos sin costo."),
        ("¿Qué medidas tiene una cancha de pádel clásica?",
         "20 metros de largo x 10 metros de ancho (200 m² de superficie de juego), con 3 metros de altura útil mínima. Es la medida oficial estándar reconocida por la Federación Mexicana de Pádel y la International Padel Federation."),
        ("¿Cuál es la diferencia entre cancha clásica y panorámica?",
         "La clásica lleva cristales solo en los fondos (paredes cortas, 2 lados) y malla metálica en los laterales. La panorámica lleva cristales templados en los 4 lados (vista 360°). La clásica es la opción más económica del catálogo, ambas son aptas para torneo oficial."),
        ("¿Para qué tipo de proyecto conviene una cancha clásica?",
         "Es la opción más solicitada para clubes que arrancan, hoteles, academias y proyectos residenciales premium. ROI promedio entre 6 y 12 meses sobre la inversión inicial en clubes de pádel rentables operando con hora de cancha entre $250 y $400 MXN."),
        ("¿Cuánto tarda la instalación de una cancha clásica?",
         "Una vez lista la base de concreto del contratista local, instalamos la cancha llave en mano en 5 a 7 días hábiles. Cotización en 2-4 horas tras tu solicitud por WhatsApp +52 55 3988 7615."),
        ("¿Cuánto dura una cancha de pádel clásica?",
         "Estructura metálica: 15+ años con mantenimiento básico. Pasto sintético: 8 a 10 años de vida útil deportiva. Cristales templados: vida útil indefinida si no hay impacto severo. Entregamos guía de mantenimiento preventivo y correctivo con cada proyecto."),
    ],
    "cancha-panoramica/index.html": [
        ("¿Cuánto cuesta una cancha de pádel panorámica?",
         "Desde $450,000 MXN saliendo desde CDMX. Incluye cristales templados en los 4 lados (vista 360°), estructura metálica con pintura anticorrosión, pasto sintético profesional, red oficial e iluminación LED. La base de concreto la ejecuta tu contratista local con plano técnico gratuito."),
        ("¿Por qué la cancha panorámica cuesta más que la clásica?",
         "Lleva cristales templados de seguridad en los 4 lados en vez de solo los fondos. Esto duplica la superficie de cristal premium y requiere refuerzo estructural adicional. La vista 360° la hace ideal para clubes premium con áreas de espectadores."),
        ("¿La cancha panorámica es apta para torneos profesionales?",
         "Sí. Cumple las medidas oficiales (20x10 metros) y es la preferida por federaciones porque permite ubicar cámaras de TV y dar vista total a espectadores. Es el formato utilizado en torneos profesionales de pádel a nivel internacional."),
        ("¿Es la mejor opción para mi club de pádel?",
         "Si tu club apunta a torneos, clientes premium o experiencia visual diferenciada, sí. Si arrancas y buscas ROI más rápido, evalúa la semipanorámica (la más vendida) o la clásica, que son ~$35,000 MXN más económicas."),
        ("¿Cuánto tarda la instalación de una cancha panorámica?",
         "5 a 7 días hábiles una vez lista la base de concreto. El proceso es similar al de la clásica; los cristales adicionales no extienden significativamente el tiempo de obra."),
        ("¿Requiere más mantenimiento por los cristales adicionales?",
         "Solo limpieza periódica de cristales (cada 2 semanas aprox., depende del uso y ambiente). El templado es muy resistente al impacto deportivo normal; solo se reemplaza si hay impacto severo accidental. La guía de mantenimiento se entrega con el proyecto."),
    ],
    "cancha-semipanoramica/index.html": [
        ("¿Por qué la cancha semipanorámica es la más vendida en México?",
         "Combina lo mejor de las otras dos: cristales templados en los fondos completos más una porción del lateral cercana a la red. Da vista premium para espectadores con un costo intermedio entre la clásica y la panorámica. Es la opción de equilibrio precio/calidad para clubes que abren con clientela mixta."),
        ("¿Cuánto cuesta una cancha de pádel semipanorámica?",
         "Su precio está entre el de la clásica ($415,000 MXN) y la panorámica ($450,000 MXN), saliendo desde CDMX. Cotización exacta se entrega tras revisar el proyecto específico por WhatsApp +52 55 3988 7615 en 2-4 horas."),
        ("¿Qué diferencia tiene con la cancha clásica?",
         "La clásica solo lleva cristales en los 2 fondos. La semipanorámica añade cristales templados en la porción del lateral cercana a la red, mejorando la visibilidad para espectadores y dando un look más premium sin llegar al costo de la panorámica completa."),
        ("¿Es apta para torneos oficiales?",
         "Sí. Cumple las medidas oficiales (20x10 metros) y es aceptada por federaciones nacionales para torneos regulares. La diferencia con la panorámica completa es estética y comercial, no normativa."),
        ("¿Cuánto tarda la instalación?",
         "5 a 7 días hábiles una vez lista la base de concreto del contratista local. Cotizamos en 2-4 horas tras tu solicitud por WhatsApp."),
        ("¿Por qué tantos clubes la eligen?",
         "ROI más rápido que la panorámica (menor inversión inicial) con mejor experiencia visual que la clásica. Ideal para clubes nuevos que quieren atraer clientela premium sin sobreinvertir en cristales perimetrales completos."),
    ],
    "cancha-singles/index.html": [
        ("¿Qué es una cancha singles de pádel?",
         "Es una cancha más angosta (6 metros en vez de 10 metros de ancho), diseñada exclusivamente para juego 1 contra 1. Se utiliza en proyectos residenciales premium y hoteles boutique que buscan ofrecer pádel ocupando menos espacio."),
        ("¿Qué medidas tiene una cancha singles?",
         "20 metros de largo x 6 metros de ancho. Mantiene la longitud oficial pero reduce el ancho para optimizar espacio. Es apta solo para juego individual; no se puede jugar pádel doubles tradicional (4 jugadores) en una cancha singles."),
        ("¿Cuánto cuesta una cancha singles?",
         "Se cotiza por proyecto saliendo desde CDMX. Al ocupar ~120 m² (vs los 200 m² de una doubles), la inversión es proporcionalmente menor que una cancha estándar. Solicita cotización exacta por WhatsApp +52 55 3988 7615."),
        ("¿Para qué tipo de proyecto sirve una cancha singles?",
         "Residencias premium con limitación de espacio, hoteles boutique, academias para clases individuales y clubes que quieren ofrecer formato singles para torneos amateur. No es recomendable como única cancha de un club comercial."),
        ("¿Tiene los mismos materiales que una cancha doubles?",
         "Sí. Misma estructura metálica con pintura anticorrosión, cristales templados de seguridad, pasto sintético profesional, red oficial e iluminación LED. La única diferencia constructiva es el ancho útil de la cancha."),
        ("¿Se puede convertir una cancha singles en doubles después?",
         "No es práctico: requeriría rehacer la base de concreto y reconstruir la estructura completa. Si proyectas crecer a formato doubles a mediano plazo, conviene cotizar directamente una cancha doubles estándar desde el inicio."),
    ],
    "calculadora/index.html": [
        ("¿Cómo funciona la calculadora de canchas de pádel?",
         "Te entrega una estimación rápida del costo de tu cancha en función del tipo (clásica, semipanorámica o panorámica), la cantidad de canchas y opcionales (cubierta, alumbrado, malla). Es referencia inicial para que tengas idea del orden de magnitud antes de pedir cotización formal."),
        ("¿El precio que muestra la calculadora es final?",
         "No. Es estimación preliminar para tener orden de magnitud. La cotización formal con precio confirmado se entrega por WhatsApp +52 55 3988 7615 en 2-4 horas tras revisar tu proyecto específico (ubicación, accesos, base existente o no, etc.)."),
        ("¿Qué datos necesito para usar la calculadora?",
         "Solo el tipo de cancha y la cantidad. Datos opcionales que ajustan el estimado: cubierta o domo, alumbrado LED deportivo, malla perimetral exterior, iluminación complementaria."),
        ("¿La calculadora cubre el costo de la base de concreto?",
         "No. La calculadora estima únicamente el costo de la cancha llave en mano (lo que entrega Padel Center México). La base de concreto la ejecuta tu contratista local siguiendo el plano técnico gratuito que entregamos con cada proyecto."),
        ("¿Cuánto tarda la cotización formal después de usar la calculadora?",
         "Te enviamos cotización detallada por WhatsApp en 2 a 4 horas hábiles. Si necesitas también plano técnico de base, asesoría sobre ubicación o cálculo de ROI para tu club, lo coordinamos sin costo adicional."),
    ],
    "blog/index.html": [
        ("¿Qué temas cubre el blog de CanchasdePadel.mx?",
         "Guías técnicas (medidas, materiales, costos de cancha), análisis de mercado mexicano (rentabilidad de clubes, ROI, cifras 2026), comparativos entre tipos de cancha (clásica vs panorámica vs semipanorámica), mantenimiento preventivo y casos de éxito de proyectos reales instalados en México."),
        ("¿Para quién es útil este blog?",
         "Inversionistas evaluando montar un club de pádel, dueños de hoteles y residenciales que estudian añadir canchas, contratistas que necesitan especificaciones técnicas precisas, y jugadores que quieren entender por qué algunas canchas se sienten distintas."),
        ("¿Quién escribe los artículos del blog?",
         "Equipo técnico de Padel Center México con experiencia construyendo más de 600 canchas en 32 estados de la república. Cada artículo está revisado por un constructor con experiencia real en campo, no por copywriters genéricos."),
        ("¿Con qué frecuencia se actualiza el blog?",
         "Se publica contenido nuevo o se actualiza mensualmente. Los artículos con cifras de mercado (precios, ROI, inversión) se revisan trimestralmente para mantener los datos vigentes con la realidad del mercado mexicano."),
        ("¿Puedo cotizar mi cancha después de leer un artículo?",
         "Sí. Cada artículo del blog incluye un CTA directo a WhatsApp +52 55 3988 7615. Respondemos en menos de 1 hora y entregamos cotización detallada en 2 a 4 horas hábiles."),
    ],
}


def build_faqpage(qas):
    """Genera el JSON-LD FAQPage con formato consistente al patrón canónico."""
    main_entity = [
        {
            "@type": "Question",
            "name": q,
            "acceptedAnswer": {"@type": "Answer", "text": a},
        }
        for q, a in qas
    ]
    data = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": main_entity,
    }
    # 2-space indent matching cuanto-cuesta format
    json_str = json.dumps(data, ensure_ascii=False, indent=2)
    return f'<script type="application/ld+json">{json_str}</script>\n'


def inject(path: Path, faqs):
    html = path.read_text()
    if '"FAQPage"' in html:
        return "already-has"
    if "</head>" not in html.lower():
        return "no-head"
    block = build_faqpage(faqs)
    # Insert before </head>
    new_html = re.sub(r"</head>", block + "</head>", html, count=1, flags=re.IGNORECASE)
    path.write_text(new_html)
    return "injected"


def main():
    for rel, qas in FAQS.items():
        p = LP1 / rel
        if not p.is_file():
            print(f"  ✗ not-found: {rel}")
            continue
        status = inject(p, qas)
        emoji = {"already-has": "✓", "injected": "➕", "no-head": "✗"}.get(status, "?")
        print(f"  {emoji} {status:13s} {rel} ({len(qas)} FAQs)")


if __name__ == "__main__":
    main()
