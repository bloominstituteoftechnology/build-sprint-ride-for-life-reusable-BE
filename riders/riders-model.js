const db = require('../data/db-config');

module.exports = {
  add,
  find,
  findById,
  findPwById,
  findReviewsById,
  remove,
  update,
};

function add(user) {
  return db('riders')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function find() {
  return db('riders')
    .select(
      'riders.id as rider_id',
      'username',
      'role',
      'name',
      'location',
      'searching',
    )
    .join('roles', 'roles.id', 'riders.role_id')
    .orderBy('riders.id');
}

function findById(id) {
  return db('riders')
    .select('id as rider_id', 'username', 'name', 'location', 'searching')
    .where({ id })
    .first();
}

function findPwById(id) {
  return db('riders')
    .select('password')
    .where({ id })
    .first();
}

function findReviewsById(rider_id) {
  return db('reviews')
    .select(
      'reviews.id as review_id',
      'rider_id',
      'stars',
      'comment',
      'date',
      'name as driver',
      'anonymous',
    )
    .join('drivers', 'drivers.id', 'reviews.driver_id')
    .where({ rider_id })
    .orderBy('reviews.id');
}

function remove(id) {
  return db('riders')
    .where({ id })
    .del();
}

function update(changes, id) {
  return db('riders')
    .where({ id })
    .update(changes)
    .then(count => findById(id));
}
