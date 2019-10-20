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

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          id: user.id,
          username: user.username,
          role: user.role,
          token,
        });
      } else {
        res.status(401).json({ message: 'Improper login credentials' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error finding user' });
    });
});

router.get('/users', (req, res) => {
  Users.findAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error retrieving all users' });
    });
});

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
