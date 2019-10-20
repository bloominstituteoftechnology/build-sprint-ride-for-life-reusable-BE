const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex('admin').insert([
    { username: 'admin', password: bcrypt.hashSync('admin', 14) },
  ]);
};
