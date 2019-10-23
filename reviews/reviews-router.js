const express = require('express');

const Reviews = require('./reviews-model');

const router = express.Router();

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
    review.stars = review.stars > 5 ? 5 : review.stars;
    review.stars = review.stars < 0 ? 0 : review.stars;

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

// PUT /api/review/:id endpoint - Functional!
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (
    changes.hasOwnProperty('stars') ||
    changes.hasOwnProperty('comment') ||
    changes.hasOwnProperty('date') ||
    changes.hasOwnProperty('anonymous')
  ) {
    Reviews.findById(id)
      .then(review => {
        if (review) {
          Reviews.update(changes, id).then(updated => {
            updated.anonymous =
              updated.anonymous === 1 || updated.anonymous === true
                ? true
                : false;
            res.status(200).json(updated);
          });
        } else {
          res
            .status(404)
            .json({ message: 'Could not find review with provided ID' });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Failed to update review' });
      });
  } else {
    res
      .status(400)
      .json({ message: 'Please provide review information to update' });
  }
});

// DEL /api/review/:id endpoint - Functional!
router.delete('/:id', (req, res) => {
  Reviews.remove(req.params.id)
    .then(count => {
      if (count) {
        res.status(200).json({ message: 'The review has been deleted' });
      } else {
        res.status(404).json({ message: 'Invalid review ID' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error deleting the review' });
    });
});

module.exports = router;
