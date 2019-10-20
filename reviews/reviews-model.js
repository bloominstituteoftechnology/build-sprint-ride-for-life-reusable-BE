const db = require('../data/db-config');

module.exports = {
  add,
  find,
  findById,
};

function add(review) {
  return db('reviews')
    .insert(review, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function find() {
  return db('reviews');
}

function findById(id) {
  return db('reviews')
    .where({ id })
    .first();
}
