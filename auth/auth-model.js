const db = require('../data/db-config');

module.exports = {
  findBy,
  findAll,
};

function findAll() {
  const promises = [
    db('drivers')
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
      .orderBy('drivers.id'),
    db('riders')
      .select(
        'riders.id as rider_id',
        'username',
        'role',
        'name',
        'location',
        'searching',
      )
      .join('roles', 'roles.id', 'riders.role_id')
      .orderBy('riders.id'),
  ];

  return Promise.all(promises).then(results => {
    const [drivers, riders] = results;

    // return { drivers, riders };
    return [...drivers, ...riders];
  });
}

function findBy(filter) {
  return db
    .select('drivers.id', 'username', 'role', 'password')
    .from('drivers')
    .join('roles', 'roles.id', 'drivers.role_id')
    .where(filter)
    .union(function() {
      this.select('riders.id', 'username', 'role', 'password')
        .from('riders')
        .join('roles', 'roles.id', 'riders.role_id')
        .where(filter);
    });
}
