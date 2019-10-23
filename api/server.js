const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('../middleware/logger');
// const ejs = require('ejs');

const AuthRouter = require('../auth/auth-router');
const RiderRouter = require('../riders/riders-router');
const DriverRouter = require('../drivers/drivers-router');
const ReviewRouter = require('../reviews/reviews-router');

// Stretch
const ImagesRouter = require('../images/images-router');

const restricted = require('../auth/restricted-middleware');

const server = express();

// EJS
// server.set('view engine', 'ejs');

server.use(logger);
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', AuthRouter);
server.use('/api/riders', restricted, RiderRouter);
server.use('/api/drivers', restricted, DriverRouter);
server.use('/api/reviews', restricted, ReviewRouter);

server.use(express.static('./public'));

// Stretch
server.use('/api/images', ImagesRouter);

server.get('/', (req, res) => {
  res.json({ message: 'Hello World from RideForLife Backend API!' });
});

module.exports = server;
