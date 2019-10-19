const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Drivers = require('./drivers-model');

const router = express();

module.exports = router;
