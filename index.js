const express = require('express');
const path = require('path');

const { PORT } = require('./config.env');

const app = express();

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

server.listen(PORT, (err) => {

  if (err) {
    throw new Error(err);
  }

  console.log(`Server listening on the port: ${PORT}`);

});