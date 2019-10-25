const bcrypt = require('bcryptjs');
const Riders = require('./riders-model');

module.exports = (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body;

  Riders.findPwById(id)
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
      res.status(500).json({ message: 'Error finding rider' });
    });
};
