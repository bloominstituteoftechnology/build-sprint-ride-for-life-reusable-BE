const db = require('../data/db-config');

module.exports = {
  add,
  find,
  findById,
  findPwById,
  findReviewsById,
  remove,
  update,
  findPics,
  addProfilePic,
  updateProfilePic,
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
    .leftJoin('driverpics', 'driverpics.driver_id', 'drivers.id')
    .leftJoin('phonenumbers', 'phonenumbers.driver_id', 'drivers.id')
    .select(
      'drivers.id as driver_id',
      'username',
      'role',
      'name',
      'location',
      'price',
      'bio',
      'available',
      'url',
      'driverpics.id as image_id',
      'phonenumber',
    )
    .join('roles', 'roles.id', 'drivers.role_id')
    .orderBy('drivers.id');
}

function findById(id) {
  return db('drivers')
    .leftJoin('driverpics', 'driverpics.driver_id', 'drivers.id')
    .leftJoin('phonenumbers', 'phonenumbers.driver_id', 'drivers.id')
    .select(
      'drivers.id',
      'username',
      'name',
      'location',
      'price',
      'bio',
      'available',
      'url',
      'driverpics.id as image_id',
      'phonenumber',
    )
    .where('drivers.id', id)
    .first();
}

function findPwById(id) {
  return db('drivers')
    .select('password')
    .where({ id })
    .first();
}

function findReviewsById(id) {
  return db('reviews')
    .select(
      'reviews.id as review_id',
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

function remove(id) {
  return db('drivers')
    .where({ id })
    .del();
}

function update(changes, id) {
  return db('drivers')
    .where({ id })
    .update(changes)
    .then(count => findById(id));
}

function findPics() {
  return db('driverpics');
}

function addProfilePic(pic) {
  return db('driverpics').insert(pic, 'id');
}

function updateProfilePic(changes, id) {
  return db('driverpics')
    .where({ id })
    .update(changes)
    .then(count => findById(id));
}
