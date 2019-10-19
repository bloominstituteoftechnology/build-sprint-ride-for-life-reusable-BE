const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('../middleware/logger');

const server = express();

server.use(logger);
server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send('Hello World from RideForLife Backend!');
});

module.exports = server;
