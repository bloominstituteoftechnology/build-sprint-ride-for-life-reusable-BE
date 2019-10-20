const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./auth-model');
const Drivers = require('../drivers/drivers-model');
const Riders = require('../riders/riders-model');

// const adminOnly = require('./admin-middleware');
const secrets = require('../config/secrets');

const router = express();

router.post('/register', (req, res) => {});

router.post('/login', (req, res) => {});

router.get('/users', (req, res) => {});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
