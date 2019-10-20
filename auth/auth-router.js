const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./auth-model');
const Drivers = require('../drivers/drivers-model');
const Riders = require('../riders/riders-model');

const adminOnly = require('./admin-middleware');

const router = express();

module.exports = router;
