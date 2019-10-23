exports.seed = function(knex) {
  return knex('driverpics').insert([
    { driver_id: 1, url: null },
    { driver_id: 2, url: null },
    { driver_id: 3, url: null },
    { driver_id: 4, url: null },
    { driver_id: 5, url: null },
    { driver_id: 6, url: null },
    { driver_id: 7, url: null },
    { driver_id: 8, url: null },
    { driver_id: 9, url: null },
  ]);
};
