const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex('riders').insert([
    {
      username: 'robert',
      password: bcrypt.hashSync('rider', 8),
      role_id: 3,
      name: 'Robert Gordon',
      location: '',
      searching: 1,
    },
    {
      username: 'stephanie',
      password: bcrypt.hashSync('rider', 8),
      role_id: 3,
      name: 'Stephanie Butenhof',
      location: '',
      searching: 1,
    },
    {
      username: 'arin',
      password: bcrypt.hashSync('rider', 8),
      role_id: 3,
      name: 'Arin Ramer',
      location: '',
      searching: 1,
    },
    {
      username: 'mark',
      password: bcrypt.hashSync('rider', 8),
      role_id: 3,
      name: 'Mark King',
      location: '',
      searching: 1,
    },
    {
      username: 'jonathan',
      password: bcrypt.hashSync('rider', 8),
      role_id: 3,
      name: 'Jonathan Ho',
      location: '',
      searching: 1,
    },
    {
      username: 'thomas',
      password: bcrypt.hashSync('rider', 8),
      role_id: 3,
      name: 'Thomas Utsey',
      location: '',
      searching: 1,
    },
  ]);
};
