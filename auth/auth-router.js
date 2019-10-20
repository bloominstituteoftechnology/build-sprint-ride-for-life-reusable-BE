const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Drivers = require('../drivers/drivers-model');
const Riders = require('../riders/riders-model');
const Users = require('./auth-model');

// const adminOnly = require('./admin-middleware');
const validateUsername = require('./username-middleware.js');
const secrets = require('../config/secrets');

const router = express();

// POST /api/auth/register endpoint -
router.post('/register', validateUsername, (req, res) => {
  const user = req.body;
  console.log('register object:', user);

  if (user.role_id === 3) {
    if (user.username && user.password && user.name) {
      const hash = bcrypt.hashSync(user.password, 8);

      user.password = hash;

      Riders.add(user)
        .then(saved => {
          const token = generateToken(user);
          res.status(201).json({ rider: saved, token });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ message: 'Error adding new rider' });
        });
    } else {
      res
        .status(400)
        .json({ message: 'Please provide registration information' });
    }
  } else if (user.role_id === 2) {
    if (
      user.username &&
      user.password &&
      user.name &&
      user.location &&
      user.price &&
      user.bio
    ) {
      const hash = bcrypt.hashSync(user.password, 8);

      user.password = hash;

      Drivers.add(user)
        .then(saved => {
          const token = generateToken(user);
          res.status(201).json({ driver: saved, token });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ message: 'Error adding new driver' });
        });
    } else {
      res
        .status(400)
        .json({ message: 'Please provide registration information' });
    }
  } else {
    res.status(400).json({ message: 'Please provide valid user role' });
  }
});

// POST /api/auth/login endpoint - Functional!
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

// GET /api/auth/users endpoint - Requires adminOnly middleware
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
