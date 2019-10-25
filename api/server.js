const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('../middleware/logger');
const fileupload = require('express-fileupload');

const AuthRouter = require('../auth/auth-router');
const RiderRouter = require('../riders/riders-router');
const DriverRouter = require('../drivers/drivers-router');
const ReviewRouter = require('../reviews/reviews-router');

const restricted = require('../auth/restricted-middleware');

const server = express();

server.use(logger);
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(fileupload({ useTempFiles: true }));

server.use('/api/auth', AuthRouter);
server.use('/api/riders', restricted, RiderRouter);
server.use('/api/drivers', restricted, DriverRouter);
server.use('/api/reviews', restricted, ReviewRouter);

server.get('/', (req, res) => {
  res.json({ message: 'Hello World from RideForLife Backend API!' });
});

module.exports = server;
