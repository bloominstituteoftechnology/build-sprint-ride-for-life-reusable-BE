const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Drivers = require('../drivers/drivers-model');
const Riders = require('../riders/riders-model');
const Users = require('./auth-model');

// const adminOnly = require('./admin-middleware');
const validateUsername = require('./username-middleware.js');
const secrets = require('../config/secrets');

const router = express.Router();

// POST /api/auth/register endpoint - Functional!
router.post('/register', validateUsername, (req, res) => {
  const user = req.body;

  if (user.role === 'rider') {
    if (user.username && user.password && user.name) {
      const hash = bcrypt.hashSync(user.password, 8);

      user.password = hash;
      user.role_id = 3;
      delete user.role;

      Riders.add(user)
        .then(saved => {
          const token = generateToken(user);
          saved.searching =
            saved.searching === 1 || saved.searching === true ? true : false;
          res.status(201).json({ rider: saved, token });
        })
        .catch(err => {
          res.status(500).json({ message: 'Error adding new rider' });
        });
    } else {
      res
        .status(400)
        .json({ message: 'Please provide registration information' });
    }
  } else if (user.role === 'driver') {
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
      user.role_id = 2;
      delete user.role;

      // console.log('driver to register:', user);

      Drivers.add(user)
        .then(saved => {
          const token = generateToken(user);
          saved.available =
            saved.available === 1 || saved.available === true ? true : false;
          Drivers.addProfilePic({ url: null, driver_id: saved.id })
            .then(output => {
              res.status(201).json({ driver: saved, token });
            })
            .catch(err => {
              console.log(err);
              res
                .status(500)
                .json({ message: 'Error adding entry to driver pics table' });
            });
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
  let { username, password } = req.body;

  // console.log(req.body)

  username = username.toLowerCase();

  Users.findBy({ username })
    .first()
    .then(user => {
      // console.log('user findBy', user);
      if (user && bcrypt.compareSync(password, user.password)) {
        // console.log(user);
        const token = generateToken(user);

        if (user.role === 'driver') {
          res.status(200).json({
            driver_id: user.id,
            username: user.username,
            role: user.role,
            token,
          });
        } else if (user.role === 'rider') {
          res.status(200).json({
            rider_id: user.id,
            username: user.username,
            role: user.role,
            token,
          });
        }
      } else {
        res.status(401).json({ message: 'Improper login credentials' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Database error in finding user' });
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
    role: user.role,
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
