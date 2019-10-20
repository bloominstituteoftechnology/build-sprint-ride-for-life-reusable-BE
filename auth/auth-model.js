const db = require('../data/db-config');

module.exports = {
  findBy,
  findAll,
};

function findAll() {
  return db
    .select('username', 'role_id', 'name', 'location')
    .from('drivers')
    .union(function() {
      this.select('username', 'role_id', 'name', 'location').from('riders');
    })
    .orderBy('role_id');
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
