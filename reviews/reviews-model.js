const db = require('../data/db-config');

module.exports = {
  add,
  find,
  findById,
  remove,
  update,
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

function remove(id) {
  return db('reviews')
    .where({ id })
    .del();
}

function update(changes, id) {
  return db('reviews')
    .where({ id })
    .update(changes)
    .then(count => findById(id));
}
