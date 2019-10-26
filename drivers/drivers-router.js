const express = require('express');
const bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary').v2;

const Drivers = require('./drivers-model');
const checkPassword = require('./driverpw-middleware');

// STRETCH - Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const router = express.Router();

// GET /api/drivers endpoint - Functional!
router.get('/', (req, res) => {
  Drivers.find()
    .then(drivers => {
      const updatedDrivers = drivers.map(driver => {
        return {
          ...driver,
          available:
            driver.available === 1 || driver.available === true ? true : false,
        };
      });
      res.status(200).json(updatedDrivers);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to get drivers' });
    });
});

// GET /api/drivers/:id endpoint - Functional!
router.get('/:id', (req, res) => {
  Drivers.findById(req.params.id)
    .then(driver => {
      if (driver) {
        driver.available =
          driver.available === 1 || driver.available === true ? true : false;
        res.status(200).json(driver);
      } else {
        res
          .status(404)
          .json({ message: 'Could not find driver with provided ID' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to get driver' });
    });
});

// GET /api/drivers/:id/reviews endpoint - Functional!
router.get('/:id/reviews', (req, res) => {
  Drivers.findReviewsById(req.params.id)
    .then(reviews => {
      // console.log('drivers reviews', reviews);
      if (reviews.length) {
        const updatedReviews = reviews.map(review => {
          if (review.anonymous === 1 || review.anonymous === true) {
            delete review.reviewer;
          }
          return {
            ...review,
            anonymous:
              review.anonymous === 1 || review.anonymous === true
                ? true
                : false,
          };
        });
        res.status(200).json(updatedReviews);
      } else {
        res
          .status(404)
          .json({ message: 'Could not find reviews for that driver' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to get reviews' });
    });
});

// PUT /api/drivers/:id endpoint - Functional!
router.put('/:id', checkPassword, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (
    changes.hasOwnProperty('name') ||
    changes.hasOwnProperty('newPassword') ||
    changes.hasOwnProperty('location') ||
    changes.hasOwnProperty('price') ||
    changes.hasOwnProperty('bio') ||
    changes.hasOwnProperty('available')
  ) {
    if (changes.hasOwnProperty('newPassword')) {
      const hash = bcrypt.hashSync(changes.newPassword, 8);
      changes.password = hash;
      delete changes.newPassword;
    } else {
      delete changes.password;
    }

    Drivers.findById(id)
      .then(driver => {
        if (driver) {
          Drivers.update(changes, id).then(updated => {
            updated.available =
              updated.available === 1 || updated.available === true
                ? true
                : false;
            res.status(200).json(updated);
          });
        } else {
          res
            .status(404)
            .json({ message: 'Could not find driver with provided ID' });
        }
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ message: 'Failed to update driver information' });
      });
  } else {
    res
      .status(400)
      .json({ message: 'Please provide driver information to update' });
  }
});

// DEL /api/drivers/:id endpoint - Functional!
router.delete('/:id', (req, res) => {
  Drivers.remove(req.params.id)
    .then(count => {
      if (count) {
        res.status(200).json({ message: 'The driver has been deleted' });
      } else {
        res.status(404).json({ message: 'Invalid driver ID' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error deleting the driver' });
    });
});

// STRETCH - Cloudinary
cloudinary.config({
  cloud_name: 'hnoj9zg1i',
  api_key: '232295788793519',
  api_secret: '5e23u1Zejlw6_vgBA0usMoRa958',
});

// POST /api/drivers/:id/image endpoint - Functional!
router.post('/:id/image', (req, res) => {
  const file = req.files.image;
  // console.log(file);
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    // console.log('CLOUDINARY', result);
    Drivers.addProfilePic({ url: result.url, driver_id: req.params.id })
      .then(output => {
        res.json({ success: true, result });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Error uploading to Cloudinary' });
      });
  });
});

// PUT /api/drivers/:id/image endpoint - Functional!
router.put('/:id/image', (req, res) => {
  const file = req.files.image;
  // console.log('REQ', req);
  // console.log('REQ.FILES', req.files);
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    // console.log('CLOUDINARY', result);
    Drivers.updateProfilePic({ url: result.url }, req.body.image_id)
      .then(output => {
        res.json({ success: true, result });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Error uploading to Cloudinary' });
      });
  });
});

// GET /api/drivers/:id/images endpoint - Functional! (Temporary)
router.get('/:id/images', (req, res) => {
  Drivers.findPics()
    .then(pictures => {
      res.status(200).json(pictures);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to get profile picture urls' });
    });
});

// STRETCH - Twilio

// // POST /api/drivers/:id/message endpoint - FUNCTIONAL - TURNED OFF
// router.post('/:id/message', (req, res) => {
//   const message = req.body;
//   console.log('Message received by backend endpoint:', message);
//   Drivers.findById(req.params.id)
//     .then(driver => {
//       client.messages
//         .create({
//           body: `Hello, ${driver.name}! ${message.rider} has requested a ride in ${message.location}!`,
//           from: '+16504693967',
//           to: driver.phonenumber,
//         })
//         .then(message => {
//           console.log(message.sid);
//           res.json({
//             message: `Ride For Life request to ${driver.name} has been successfully made!`,
//           });
//         });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ message: 'Failed to get driver' });
//     });
// });

module.exports = router;
