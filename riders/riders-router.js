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

// GET /api/riders/:id endpoint -
router.get('/:id', (req, res) => {
  Riders.findById(req.params.id)
    .then(rider => {
      if (rider) {
        rider.searching = rider.searching === 1 ? true : false;
        res.status(200).json(rider);
      } else {
        res
          .status(404)
          .json({ message: 'Could not find rider with provided ID' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to get rider' });
    });
});

// GET /api/riders/:id/reviews endpoint - Functional!
router.get('/:id/reviews', (req, res) => {
  Riders.findReviewsById(req.params.id)
    .then(reviews => {
      if (reviews.length) {
        const updatedReviews = reviews.map(review => {
          return {
            ...review,
            anonymous: review.anonymous === 1 ? true : false,
          };
        });
        res.status(200).json(updatedReviews);
      } else {
        res
          .status(404)
          .json({ message: 'Could not find reviews by that rider' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to get reviews' });
    });
});

// PUT /api/riders/:id

// DEL /api/riders/:id

module.exports = router;
