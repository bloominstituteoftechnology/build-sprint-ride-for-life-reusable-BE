exports.seed = function(knex) {
  return knex('driverpics').insert([
    {
      driver_id: 1,
      url:
        'http://res.cloudinary.com/hnoj9zg1i/image/upload/v1571846836/fn5xrqn5dnsby5yn2atl.jpg',
    },
    {
      driver_id: 2,
      url:
        'http://res.cloudinary.com/hnoj9zg1i/image/upload/v1571801225/sqlk6barpfhgixtlhkks.jpg',
    },
    {
      driver_id: 3,
      url:
        'http://res.cloudinary.com/hnoj9zg1i/image/upload/v1571801260/rvtnh9bp2odcisgrdv73.jpg',
    },
    {
      driver_id: 4,
      url:
        'http://res.cloudinary.com/hnoj9zg1i/image/upload/v1571847158/gnoc85o6u4rfpktrqp5l.jpg',
    },
    {
      driver_id: 5,
      url:
        'http://res.cloudinary.com/hnoj9zg1i/image/upload/v1571851639/jpdu3nxecs0m2hkrcnio.jpg',
    },
    {
      driver_id: 6,
      url:
        'http://res.cloudinary.com/hnoj9zg1i/image/upload/v1571801398/hq1ubwyl9oe4dudjxww3.jpg',
    },
    {
      driver_id: 7,
      url:
        'http://res.cloudinary.com/hnoj9zg1i/image/upload/v1571801416/di7vlhajeqlevbkxmygg.jpg',
    },
    {
      driver_id: 8,
      url:
        'http://res.cloudinary.com/hnoj9zg1i/image/upload/v1571801437/kqfpb4wcyqeyrcggopvo.jpg',
    },
    {
      driver_id: 9,
      url:
        'http://res.cloudinary.com/hnoj9zg1i/image/upload/v1571801456/ewdhluotf1rgzaplncjl.jpg',
    },
    {
      driver_id: 10,
      url:
        'http://res.cloudinary.com/hnoj9zg1i/image/upload/v1571853407/rbe3hrhrvbq09mdmzmqn.jpg',
    },
  ]);
};
