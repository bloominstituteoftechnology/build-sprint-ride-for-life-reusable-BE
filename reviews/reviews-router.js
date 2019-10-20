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

// POST /api/reviews endpoint - Functional!
router.post('/', (req, res) => {
  const review = req.body;

  if (
    review.stars &&
    review.date &&
    review.driver_id &&
    review.rider_id &&
    review.anonymous
  ) {
    Reviews.add(review)
      .then(saved => {
        saved.anonymous =
          saved.anonymous === 1 || saved.anonymous === true ? true : false;
        res.status(201).json({ review: saved });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Error adding new review' });
      });
  } else {
    res.status(400).json({ message: 'Please provide review information' });
  }
});

// PUT /api/review/:id endpoint -

// DEL /api/review/:id endpoint -

module.exports = router;
