const db = require('../data/db-config');

module.exports = {
  add,
  findById,
};

function add(user) {
  return db('riders')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db('riders')
    .select('id', 'username', 'name', 'location', 'searching')
    .where({ id })
    .first();
}
