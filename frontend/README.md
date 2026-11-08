# Frontend de IdeaBoost

Interfaz React + Vite con React Router, ya incluido en el proyecto.

## Ejecutar localmente

Desde la raíz del repositorio:

```sh
cd frontend
npm install
npm run dev
```

Abre la dirección que indique Vite (normalmente http://localhost:5173).
Si las dependencias ya están instaladas, basta con ejecutar npm run dev.

Antes de iniciar Vite, crea `frontend/.env.local` con:

```env
VITE_API_URL=http://localhost:3000
```

Reinicia Vite después de cambiar esta variable. En PowerShell puedes usar
`npm.cmd` si la política de ejecución impide ejecutar `npm.ps1`.
En otra terminal, desde la raíz, ejecuta `cd backend` y `npm.cmd start`.
El backend necesita su configuración privada de Gemini y
`FRONTEND_ORIGIN=http://localhost:5173`. Abre Vite usando ese mismo origen;
si cambia de puerto, ajusta FRONTEND_ORIGIN y reinicia el backend.

## Rutas y alcance actual

- /: bienvenida, explicación, tres ejemplos y enlace «Empezar a crear».
- /chat: conversación con el backend y los mismos tres ejemplos. Seleccionarlos
  rellena el campo y lo enfoca para poder editarlo. El historial se desplaza
  independientemente del campo de escritura situado en la parte inferior.
- Las rutas desconocidas redirigen al inicio.

Cada solicitud admite hasta 500 caracteres y se envía mediante fetch a
`POST ${VITE_API_URL}/api/ideas/generate` con JSON `{ message, history }`.
La interfaz muestra la solicitud y el estado de carga inmediatamente, y después
la respuesta real del backend. No hay contenido simulado.
El contrato es `{ mode, intro, ideas }`: ideas contiene tres tarjetas en modo
`ideas`, una en `follow_up` y ninguna en `greeting`, `clarification` y
`out_of_scope`. intro siempre se muestra. Los saludos y las aclaraciones aparecen
como mensajes de conversación, sin tarjetas vacías.
El envío queda desactivado mientras hay una solicitud pendiente.
El error conserva la solicitud y el borrador; reintentar actualiza el mismo turno
con su contexto original, sin duplicarlo. Los errores técnicos no se muestran.

Los turnos se conservan solo en estado de React mientras la página está abierta.
No se usa localStorage ni almacenamiento persistente. La beta admite hasta seis
respuestas exitosas, incluidos saludos y aclaraciones. Los errores no cuentan.
El contador muestra el uso; después de la sexta se desactiva el envío y se ofrece
«Nueva conversación», que limpia mensajes, borrador y contador. También cancela
cualquier solicitud pendiente y devuelve el foco al campo de escritura.
Se envían solo turnos completados, con hasta diez mensajes previos para la sexta
solicitud: no se reduce el contexto a tres turnos.
El mensaje actual nunca se duplica en history. Los mensajes del asistente incluyen
modo, intro, título, descripción y primer paso; los campos extensos se abrevian solo
para el contexto para respetar el límite de 2000 caracteres del backend.
Las tarjetas conservan el contenido completo. No se envían turnos fallidos.
El frontend no fija un timeout más corto que el backend; al salir del chat se
cancela la solicitud pendiente. La clave de Gemini permanece en el backend.

Incluye foco visible, enlace para saltar al contenido y animaciones que respetan
la preferencia de movimiento reducido. Se conservan los recursos de la plantilla.

## Organización

- `src/app/App.jsx`: rutas y composición del encabezado y pie compartidos.
- `src/pages/`: bienvenida y chat, con sus respectivos CSS Modules.
- `src/hooks/useIdeaChat.js`: estado de conversación, envío y reintentos.
- `src/services/ideaApi.js`: fetch, validación de respuesta y errores seguros.
- `src/services/conversationHistory.js`: contexto y cómputo del límite beta.
- `src/components/layout/`: encabezado, navegación y pie.
- `src/components/home/`: hero, usos, pasos, ejemplos y llamada final al chat.
- `src/components/chat/`: campo de solicitud, ejemplos seleccionables, historial,
  mensajes y bloque de tres ideas; cada componente tiene su CSS Module.
- `src/components/chat/promptExamples.js`: fuente única de los tres ejemplos
  usados en ambas páginas.
- `src/styles/`: tokens de color, reset, tipografía y utilidades compartidas.
- `src/assets/brand/ideaboost-mark.png`: símbolo de marca; el nombre es texto HTML.
- `src/assets/illustrations/`: espacio reservado para futuras ilustraciones.

Cada página y componente visual tiene su archivo `.module.css` al lado del JSX.
La bienvenida usa violeta profundo, coral y naranja sobre una base clara cálida.
La ilustración del hero combina la marca con elementos CSS decorativos;
`src/assets/hero.png` se conserva sin usar porque pertenece a la plantilla técnica.
La integración se limita al chat; los contenidos de bienvenida no se modifican.

## Verificaciones

```sh
npm run lint
npm run build
npm run preview
node --test test/conversation.test.mjs
```

Comprueba ambas rutas, el acceso directo y la recarga de /chat, la navegación,
la selección de los tres ejemplos y la edición con teclado y en móvil.
Comprueba el envío real, la recepción de tres ideas, el error de conexión y el
reintento sin duplicados. Las pruebas de contexto no llaman a Gemini ni consumen cuota.
En el chat, Enter envía; Shift+Enter añade una línea. El teclado en composición
no dispara envíos. El campo crece hasta varias líneas y el historial tiene su
propio panel de desplazamiento. La navegación compacta y la ausencia del pie en
/chat reservan el alto disponible para la conversación; la bienvenida conserva
su encabezado y pie originales.

Casos de revisión con el backend iniciado: «hola» (sin tarjetas); pedir ideas
(tres tarjetas); «escojo esta» después de tres ideas (aclaración sin tarjetas);
«escojo la idea 2» (una tarjeta); una operación matemática (fuera de alcance).
Completa seis respuestas y comprueba el bloqueo, el reinicio y un error de red
con reintento sin duplicar solicitudes. Las pruebas unitarias validan también
los modos, diez mensajes previos, el contador y las combinaciones del teclado.
En producción, el alojamiento debe servir index.html para las rutas del frontend;
vercel.json ya incluye esta regla.
