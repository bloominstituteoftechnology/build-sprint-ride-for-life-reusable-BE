exports.seed = function(knex) {
  return knex('phonenumbers').insert([
    { driver_id: 1, phonenumber: '+17343777063' },
    { driver_id: 2, phonenumber: '+17572025988' },
    { driver_id: 10, phonenumber: '+15036608872' },
  ]);
};
