const express = require('express');

const Reviews = require('./reviews-model');

const router = express();

// GET /api/reviews endpoint - Functional!
router.get('/', (req, res) => {
  Reviews.find()
    .then(reviews => {
      const updatedReviews = reviews.map(review => {
        return {
          ...review,
          anonymous:
            review.anonymous === 1 || review.anonymous === true ? true : false,
        };
      });
      res.status(200).json(updatedReviews);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to get reviews' });
    });
});

// POST /api/reviews endpoint

// PUT /api/review/:id endpoint

// DEL /api/review/:id endpoint

module.exports = router;
