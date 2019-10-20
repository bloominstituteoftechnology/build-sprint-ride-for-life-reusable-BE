const db = require('../data/db-config');

module.exports = {
  add,
  findById,
};

function add(user) {
  return db('drivers')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db('drivers')
    .select('id', 'username', 'name', 'location', 'price', 'bio', 'available')
    .where({ id })
    .first();
}
