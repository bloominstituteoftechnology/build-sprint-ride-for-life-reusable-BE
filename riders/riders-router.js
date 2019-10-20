const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Riders = require('./riders-model');

const router = express();

// GET /api/riders endpoint - Functional!
router.get('/', (req, res) => {
  Riders.find()
    .then(riders => {
      const updatedRiders = riders.map(rider => {
        return { ...rider, searching: rider.searching === 1 ? true : false };
      });
      res.status(200).json(updatedRiders);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to get riders' });
    });
});

// PUT /api/riders/:id

// DEL /api/riders/:id

module.exports = router;
