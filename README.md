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
- Backend: `PORT`, `FRONTEND_ORIGIN`, `GEMINI_API_KEY`, `GEMINI_MODEL`

No subas archivos `.env` ni claves al repositorio.

## Despliegue

La configuración está preparada para publicar las aplicaciones por separado.
Usa Node.js 22.x (22.12 o posterior) en ambos servicios: el SDK de Gemini requiere
Node 22 y Vite requiere al menos 22.12 en esa rama.

### Vercel: frontend

- Root Directory: `frontend`.
- Framework Preset: Vite.
- Install Command: `npm ci` (usa el package-lock existente).
- Build Command: `npm run build`.
- Output Directory: `dist`.
- Variable de entorno de Production: `VITE_API_URL=https://TU-BACKEND.onrender.com`.
  Usa la URL pública real del backend, sin agregar `/api`.

`frontend/vercel.json` redirige las rutas del frontend a `index.html` para que
React Router resuelva `/chat` también al abrirlo directamente o recargarlo.
VITE_API_URL se incorpora durante la compilación: después de cambiarla hay que
crear un nuevo despliegue. No configures GEMINI_API_KEY en Vercel ni en variables
con prefijo VITE_.

### Render: backend

- Tipo: Web Service; Runtime: Node.
- Root Directory: `backend`.
- Build Command: `npm ci --omit=dev`.
- Start Command: `npm start`.
- Health Check Path: `/api/health`.
- Configura `NODE_VERSION=22.12.0` o una versión posterior de Node 22.x.
- Configura `GEMINI_API_KEY` como secreto, con tu clave real.
- Configura `GEMINI_MODEL` con el modelo compatible con Interactions que usarás.
- Configura `FRONTEND_ORIGIN=https://TU-FRONTEND.vercel.app` con el origen exacto
  de producción de Vercel, sin ruta ni barra final. Si usas dominio propio,
  configura ese origen en su lugar.

Render proporciona PORT; no es necesario fijarlo manualmente. El servidor lee
process.env.PORT y escucha en 0.0.0.0. CORS compara FRONTEND_ORIGIN por igualdad:
no admite comodines ni habilita automáticamente dominios de preview de Vercel.
Las llamadas sin cabecera Origin (por ejemplo, el health check) siguen permitidas.

Los valores anteriores son ejemplos para configurar manualmente, no recursos ya
creados. Después de publicar, comprueba `/api/health` en Render, abre y recarga
`/chat` en Vercel y verifica una solicitud desde ese origen.

## Mejoras futuras

Historial de ideas, categorías adicionales, autenticación y otras funciones
se evaluarán después de completar y validar el MVP.
