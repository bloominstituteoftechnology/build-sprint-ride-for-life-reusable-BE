exports.up = function(knex) {
  return knex.schema.createTable('phonenumbers', tbl => {
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
    tbl.string('phonenumber', 15);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('phonenumbers');
};
