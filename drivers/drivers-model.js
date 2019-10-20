const db = require('../data/db-config');

module.exports = {
  add,
  find,
  findById,
  findReviewsById,
};

function add(user) {
  return db('drivers')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function find() {
  return db('drivers')
    .select(
      'drivers.id as driver_id',
      'username',
      'role',
      'name',
      'location',
      'price',
      'bio',
      'available',
    )
    .join('roles', 'roles.id', 'drivers.role_id')
    .orderBy('drivers.id');
}

function findById(id) {
  return db('drivers')
    .select(
      'id as driver_id',
      'username',
      'name',
      'location',
      'price',
      'bio',
      'available',
    )
    .where({ id })
    .first();
}

function findReviewsById(id) {
  return db('reviews')
    .select(
      'stars',
      'comment',
      'date',
      'anonymous',
      'rider_id',
      'name as reviewer',
    )
    .join('riders', 'riders.id', 'reviews.rider_id')
    .where({ driver_id: id })
    .orderBy('reviews.id');
}
