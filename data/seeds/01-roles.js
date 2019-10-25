exports.seed = function(knex) {
  return knex('roles').insert([
    { role: 'admin' },
    { role: 'driver' },
    { role: 'rider' },
  ]);
};
