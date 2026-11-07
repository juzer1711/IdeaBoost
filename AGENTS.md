# Instrucciones para agentes de código

## Contexto del repositorio
- IdeaBoost es un MVP académico de ideación creativa con IA.
- Lee `README.md` antes de proponer cambios de alcance o arquitectura.
- El repositorio contiene dos aplicaciones: `frontend/` y `backend/`.

## Límites del MVP
- Mantén la IA enfocada en idear campañas, actividades, eventos y nombres.
- No implementes entrenamiento de modelos, persistencia, autenticación ni funciones
  fuera del alcance sin solicitud explícita.
- No agregues dependencias si la necesidad se resuelve con herramientas existentes.

## Separación de responsabilidades
- El frontend contiene interfaz, estado temporal de la conversación y llamadas HTTP.
- El backend valida entradas, construye instrucciones y llama al proveedor de IA.
- El navegador nunca llama directamente al proveedor ni recibe su clave.
- Conserva paquetes y dependencias independientes dentro de cada carpeta.

## UX y contenido
- Los textos visibles para usuarios deben estar en español claro y natural.
- Mantén consistentes las etiquetas, los botones y los mensajes de estado.
- Diseña para móvil, usa HTML semántico y conserva navegación por teclado.
- Aplica los criterios de UX documentados en `README.md`.

## Seguridad y configuración
- Nunca incluyas claves, tokens ni secretos en el código, logs o commits.
- Mantén `.env` ignorado por Git y actualiza `.env.example` cuando cambie la
  configuración requerida.
- Valida y limita la entrada antes de enviarla al modelo.

## Cambios
- Revisa primero la estructura y los archivos relacionados.
- Haz cambios pequeños y enfocados en la carpeta correspondiente.
- Actualiza la documentación cuando cambien rutas, comandos o variables.
- Al finalizar, resume archivos modificados y verificaciones realizadas.