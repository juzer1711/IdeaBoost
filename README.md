# IdeaBoost

IdeaBoost es una miniaplicación web de ideación creativa desarrollada para la
actividad de UX Writing en aplicaciones de inteligencia artificial.

## Propósito

Ayudar a una persona a convertir un tema, objetivo o necesidad en tres ideas
creativas iniciales. La aplicación debe guiar la solicitud con ejemplos y
presentar propuestas claras, breves y fáciles de explorar.

## Alcance del MVP

IdeaBoost puede:
- Generar tres ideas para campañas, actividades, eventos o nombres de proyectos.
- Mostrar cada propuesta con un nombre, una descripción breve y un primer paso.
- Permitir copiar una propuesta y pedir una nueva variación.

El MVP no incluye:
- Entrenamiento o ajuste fino de un modelo.
- Cuentas de usuario, base de datos o historial persistente.
- Carga de archivos ni respuestas generales fuera de la ideación creativa.

La aplicación usa un modelo existente mediante una API. El comportamiento se
orienta con instrucciones y validaciones desde el backend.

## Flujo principal

1. La persona llega a la pantalla de bienvenida y conoce el propósito de IdeaBoost.
2. Selecciona un ejemplo guiado o describe lo que necesita.
3. IdeaBoost genera tres propuestas.
4. La persona copia una propuesta o solicita una variación.

## Decisiones de UX

- **Claridad y consistencia:** textos directos en campos, botones, errores y resultados.
- **Microcopy útil:** ejemplos que muestran cómo comenzar y mensajes que indican
  qué hacer ante un error.
- **Objetivo enfocado:** la interfaz prioriza una sola tarea: generar ideas.
- **Retroalimentación:** se informa cuándo la IA está procesando y cuándo terminó.
- **Ley de Jakob:** se usan patrones conocidos de entrada y conversación.
- **Ley de Hick:** se ofrecen tres ejemplos iniciales para facilitar la elección.
- **Ley de Tesler:** el sistema interpreta y organiza la solicitud, solicitando
  al usuario solo la información necesaria.

Referentes considerados en la actividad: John Saito, Torrey Podmajersky,
Kinneret Yifrah, Jake Knapp y Don Norman. Estos se usan como referentes para
criterios de claridad, microcopy, enfoque y usabilidad; no como atribuciones
de recomendaciones específicas sobre esta aplicación.

## Arquitectura

- `frontend/`: interfaz React + Vite.
- `backend/`: API Node.js + Express y conexión al proveedor de IA.
- `POST /api/ideas/generate`: recibe la solicitud y devuelve las ideas.
- No se guarda información del usuario en el MVP.

## Configuración local

Consulta los README de `frontend/` y `backend/` para instalar dependencias,
configurar variables de entorno y ejecutar cada aplicación.

## Variables de entorno

- Frontend: `VITE_API_URL`
- Backend: `PORT`, `FRONTEND_ORIGIN`, `GEMINI_API_KEY`

No subas archivos `.env` ni claves al repositorio.

## Despliegue

- Frontend: Vercel, con directorio raíz `frontend/`.
- Backend: Render, con directorio raíz `backend/`.

## Mejoras futuras

Historial de ideas, categorías adicionales, autenticación y otras funciones
se evaluarán después de completar y validar el MVP.