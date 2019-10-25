const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    cb(null, 'IMG-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single('file');

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only!');
  }
}

router.get('/', (req, res) => {
  res.json({ message: 'Hello world from /api/images' });
});

router.post('/upload', (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.json({ message: err });
    } else {
      if (req.file === undefined) {
        res.json({ message: 'Error: No File Selected' });
      } else {
        res.json({
          message: 'File uploaded!',
          file: `public/uploads/${req.file.filename}`,
        });
      }
    }
  });
});

module.exports = router;
