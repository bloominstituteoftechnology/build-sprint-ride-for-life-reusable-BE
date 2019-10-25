const bcrypt = require('bcryptjs');
const Drivers = require('./drivers-model');

module.exports = (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body;

  Drivers.findPwById(id)
    .first()
    .then(user => {
      if (password && bcrypt.compareSync(password, user.password)) {
        next();
      } else {
        res.status(401).json({ message: 'Improper login credentials' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error finding driver' });
    });
};
