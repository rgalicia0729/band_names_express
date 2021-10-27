const { io } = require('../index');

io.on('connection', client => {
  console.log('Cliente conectado');

  client.on('disconnect', () => {
    console.log('Cliente desconectado');
  });

  // Eventos personalizados
  client.on('enviarMensaje', (payload) => {
    client.broadcast.emit('nuevoMensaje', payload);
  });
});