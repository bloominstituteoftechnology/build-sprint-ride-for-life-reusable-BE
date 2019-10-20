const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex('riders').insert([
    {
      username: 'Robert',
      password: bcrypt.hashSync('rider', 8),
      role_id: 3,
      name: 'Robert Gordon',
      location: '',
      searching: 1,
    },
    {
      username: 'Stephanie',
      password: bcrypt.hashSync('rider', 8),
      role_id: 3,
      name: 'Stephanie Butenhof',
      location: '',
      searching: 1,
    },
    {
      username: 'Arin',
      password: bcrypt.hashSync('rider', 8),
      role_id: 3,
      name: 'Arin Ramer',
      location: '',
      searching: 1,
    },
    {
      username: 'Mark',
      password: bcrypt.hashSync('rider', 8),
      role_id: 3,
      name: 'Mark King',
      location: '',
      searching: 1,
    },
    {
      username: 'Jonathan',
      password: bcrypt.hashSync('rider', 8),
      role_id: 3,
      name: 'Jonathan Ho',
      location: '',
      searching: 1,
    },
    {
      username: 'Thomas',
      password: bcrypt.hashSync('rider', 8),
      role_id: 3,
      name: 'Thomas Utsey',
      location: '',
      searching: 1,
    },
  ]);
};
