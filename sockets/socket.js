const { io } = require('../index');

const { Bands } = require('../models/bands');
const { Band } = require('../models/band');

const bands = new Bands();

io.on('connection', client => {
  client.emit('activeBands', bands.getBands());

  client.on('voteBand', (payload) => {
    bands.voteBand(payload.id);

    io.emit('activeBands', bands.getBands());
  });

  client.on('addBand', (payload) => {
    bands.addBand(new Band(payload.name));

    io.emit('activeBands', bands.getBands());
  });

  client.on('removeBand', (payload) => {
    bands.removeBand(payload.id);

    io.emit('activeBands', bands.getBands());
  });

  client.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});