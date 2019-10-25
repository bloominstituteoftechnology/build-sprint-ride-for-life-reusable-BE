exports.up = function(knex) {
  return knex.schema.createTable('driverpics', tbl => {
    tbl.increments();
    tbl
      .integer('driver_id')
      .unsigned()
      .notNullable()
      .unique()
      .references('id')
      .inTable('drivers')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.string('url', 255);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('driverpics');
};
