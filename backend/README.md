# Backend de IdeaBoost

API Express con módulos ES y el SDK existente `@google/genai`. No usa base de
datos, no guarda conversaciones y no incluye respuestas simuladas.

## Configuración y ejecución

Desde esta carpeta, con Node.js compatible con el SDK (22 o posterior;
se recomienda la misma versión 22.12+ usada por el frontend):

```powershell
npm.cmd install
Copy-Item .env.example .env
# Completa GEMINI_API_KEY y revisa GEMINI_MODEL en tu editor.
npm.cmd run dev
```

Si ya existe .env, edítalo sin sobrescribirlo. Para ejecución sin nodemon:
`npm.cmd start`. En otras terminales puedes usar `npm` en lugar de `npm.cmd`.

Variables:
- PORT: 3000 por defecto.
- FRONTEND_ORIGIN: origen exacto autorizado para CORS, por defecto http://localhost:5173.
- GEMINI_API_KEY: clave privada de Gemini; obligatoria para generar.
- GEMINI_MODEL: identificador de un modelo de texto compatible con Interactions
  y salida JSON estructurada. El ejemplo usa gemini-3.8-flash; revisa su
  disponibilidad para tu cuenta.

El backend carga .env desde su directorio de ejecución. No registres ni compartas
su contenido. Sin clave o modelo, health sigue disponible y generate responde 503.
En Render no necesitas un archivo .env: configura las variables en el servicio.
El servidor escucha en 0.0.0.0 y usa el PORT que proporciona la plataforma.
Consulta la [configuración de despliegue](../README.md#despliegue) para Vercel y Render.

## API y Postman

Importa [la colección](./postman/IdeaBoost.postman_collection.json).
La variable de colección baseUrl es http://localhost:3000; ajústala si cambias PORT.
La clave de Gemini se queda en el servidor, no en Postman.

1. GET {{baseUrl}}/api/health: HTTP 200, `{"status":"ok"}`.
2. POST {{baseUrl}}/api/ideas/generate, Content-Type: application/json:

```json
{
  "message": "Dame ideas para una campaña de reciclaje en mi universidad",
  "history": []
}
```

Con configuración y cuota válidas devuelve HTTP 200 con este contrato:

```json
{
  "mode": "follow_up",
  "intro": "Respuesta breve",
  "ideas": [{ "title": "Nombre", "description": "Descripción", "firstStep": "Acción" }]
}
```

La cantidad del array depende del modo (el ejemplo muestra un seguimiento):
- `ideas`: exactamente 3 propuestas distintas.
- `follow_up`: exactamente 1 propuesta que desarrolla la elección del historial.
- `greeting`, `clarification` y `out_of_scope`: 0 propuestas; se muestra intro.

Se validan modo, cantidad, campos y longitudes antes de responder. El saludo no
genera ideas automáticamente. Una selección por número o título continúa esa
idea; una referencia ambigua pide aclaración. Las consultas ajenas explican el
alcance sin resolver tareas de propósito general.
3. POST a la misma URL con `{"message":"   "}`: HTTP 400 con error en español.

La colección prueba los estados y la estructura de la respuesta. Ejecútala con
Collection Runner después de iniciar el backend.

message se recorta y admite entre 1 y 500 caracteres. history es opcional y admite
hasta 12 entradas `{"role":"user","content":"..."}` o
`{"role":"assistant","content":"..."}`, con contenido de 1 a 2000 caracteres.
Se rechaza un historial excesivo, sin truncarlo silenciosamente. No se aceptan
roles de sistema. El cuerpo JSON completo está limitado a 64 KB para conservar
el contexto de seis intercambios; se mantiene el límite individual de 2000 caracteres.

Beta: se permiten hasta seis respuestas exitosas por conversación. La sexta
solicitud puede incluir los diez mensajes previos (cinco respuestas y cinco
solicitudes). Con seis mensajes previos de assistant se rechaza el siguiente
envío con HTTP 409, antes de llamar al proveedor. Este control depende del
historial recibido y no constituye un mecanismo antiabuso ni usa persistencia.

Errores: 400 entrada/JSON inválidos; 403 origen rechazado; 409 límite beta; 413 cuerpo excesivo;
415 codificación no admitida; 429 cuota/límite del proveedor; 502 fallo del proveedor
o salida inválida; 503 configuración o servicio no disponibles; 504 tiempo agotado.
Todos usan `{"error":"Mensaje en español"}`, sin trazas ni datos privados.

## Arquitectura y privacidad

Rutas → validación → controlador → servicio → proveedor Gemini.
El prompt y el esquema JSON viven en src/prompts/idea.prompt.js.
El servicio valida cantidad, campos, tipos y longitudes antes de responder.
Las instrucciones limitan al modelo a campañas, actividades, eventos y nombres;
las solicitudes ajenas explican el alcance y ayudan a reformular, sin propuestas.
Las instrucciones de sistema se incluyen en cada llamada, también en seguimientos.

Se usa Interactions con instrucciones de sistema, response_format JSON y
`store:false`, sin previous_interaction_id, herramientas ni almacenamiento local.
Se reenvía solamente el historial validado de cada solicitud.
store:false desactiva el almacenamiento de interacciones para recuperación;
no equivale a una garantía general sobre todas las políticas de datos de Google.
La llamada tiene un límite de 45 segundos y no reintenta automáticamente.

Documentación oficial consultada:
- [Interactions](https://ai.google.dev/gemini-api/docs/interactions-overview)
- [Formato actual de Interactions](https://ai.google.dev/gemini-api/docs/interactions-breaking-changes-may-2026)

## Verificaciones

```powershell
npm.cmd test
```

Usa node:test, HTTP local y validadores sin dependencias adicionales.
Comprueba health, entradas inválidas, límites, CORS y salida mal formada.
Incluye seis casos reales de Gemini: saludo, ideas, elección ambigua, elección por
número, elección por título y consulta fuera de alcance. Se omiten explícitamente
si faltan las variables de acceso. Con .env completo consumen cuota real.
No imprime la clave, el prompt ni la respuesta del proveedor.
