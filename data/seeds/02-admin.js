const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex('admin').insert([
    { username: 'admin', password: bcrypt.hashSync('admin', 8), role_id: 1 },
  ]);
};
