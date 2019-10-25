const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex('drivers').insert([
    {
      username: 'heisenberg',
      password: bcrypt.hashSync('driver', 8),
      role_id: 2,
      name: 'Walter White',
      location: 'New Hampshire',
      price: 150,
      bio:
        'Chemistry teacher Walter White learns he has cancer and becomes a meth manufacturer.',
      available: 1,
    },
    {
      username: 'skyler',
      password: bcrypt.hashSync('driver', 8),
      role_id: 2,
      name: 'Skyler White',
      location: 'New Mexico',
      price: 150,
      bio: `Skyler White is Walt's wife, a mother of two and co-owner of A1A Car Wash.`,
      available: 1,
    },
    {
      username: 'jesse',
      password: bcrypt.hashSync('driver', 8),
      role_id: 2,
      name: 'Jesse Pinkman',
      location: 'Alaska',
      price: 150,
      bio: `Jesse Pinkman is a former student of Walt's and his meth-making partner.`,
      available: 1,
    },
    {
      username: 'waltjr',
      password: bcrypt.hashSync('driver', 8),
      role_id: 2,
      name: 'Walter White Jr',
      location: 'New Mexico',
      price: 150,
      bio: `Born with cerebral palsy, Walter White, Jr. is Walter and Skyler's teenage son.`,
      available: 1,
    },
    {
      username: 'hank',
      password: bcrypt.hashSync('driver', 8),
      role_id: 2,
      name: 'Hank Schrader',
      location: 'New Mexico',
      price: 150,
      bio: `Hank is Walter's macho brother-in-law. He is also a DEA agent.`,
      available: 1,
    },
    {
      username: 'marie',
      password: bcrypt.hashSync('driver', 8),
      role_id: 2,
      name: 'Marie Schrader',
      location: 'New Mexico',
      price: 150,
      bio: `Marie is Skyler's sister and the wife of DEA agent Hank Schrader.`,
      available: 1,
    },
    {
      username: 'saul',
      password: bcrypt.hashSync('driver', 8),
      role_id: 2,
      name: 'Saul Goodman',
      location: 'New Mexico',
      price: 150,
      bio: `Saul Goodman is Walt and Jesse's attorney. He's the quintessential shady lawyer.`,
      available: 1,
    },
    {
      username: 'lydia',
      password: bcrypt.hashSync('driver', 8),
      role_id: 2,
      name: 'Lydia Rodarte-Quayle',
      location: 'Texas',
      price: 150,
      bio: `The Head of Logistics at Madrigal Electromotive, Lydia was Gus Fring's methylamine supplier.`,
      available: 1,
    },
    {
      username: 'todd',
      password: bcrypt.hashSync('driver', 8),
      role_id: 2,
      name: 'Todd Alquist',
      location: 'New Mexico',
      price: 150,
      bio: `Todd is Walt's former lab assistant whose uncle's prison connections prove invaluable.`,
      available: 1,
    },
    {
      username: 'doge',
      password: bcrypt.hashSync('driver', 8),
      role_id: 2,
      name: 'Doge',
      location: 'Internet',
      price: 200,
      bio: `dogecoin.com`,
      available: 1,
    },
  ]);
};
