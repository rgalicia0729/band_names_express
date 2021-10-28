const { io } = require('../index');

const { Bands } = require('../models/bands');
const { Band } = require('../models/band');

const bands = new Bands();
bands.addBand(new Band('Queen'));

io.on('connection', client => {
  client.emit('activeBands', bands.getBands());

  client.on('voteBand', (payload) => {
    bands.voteBand(payload.id);

    io.emit('activeBands', bands.getBands());
  });

  client.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});