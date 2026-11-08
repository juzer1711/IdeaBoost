import 'dotenv/config'
import app from './app.js'

const port = Number(process.env.PORT || 3000)
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('PORT debe ser un número entero entre 1 y 65535.')
  process.exit(1)
}
const server = app.listen(port, '0.0.0.0', () => console.log(`IdeaBoost escuchando en el puerto ${port}`))
server.on('error', () => {
  console.error('No se pudo iniciar el backend. Revisa el puerto configurado.')
  process.exitCode = 1
})
