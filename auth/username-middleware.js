const Users = require('./auth-model');

module.exports = (req, res, next) => {
  let { username } = req.body;

  username = username.toLowerCase();

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user) {
        res.json({ message: 'Please choose another username' });
      } else {
        next();
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'No username provided' });
    });
};
