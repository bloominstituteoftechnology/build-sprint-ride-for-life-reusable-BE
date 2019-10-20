exports.up = function(knex) {
  return knex.schema
    .createTable('roles', tbl => {
      tbl.increments();
      tbl
        .string('role', 128)
        .notNullable()
        .unique();
    })
    .createTable('admin', tbl => {
      tbl.increments();
      tbl
        .string('username', 128)
        .notNullable()
        .unique();
      tbl.string('password', 128).notNullable();
      tbl
        .integer('role_id')
        .unsigned()
        .notNullable()
        .defaultTo(1)
        .references('id')
        .inTable('roles')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('drivers', tbl => {
      tbl.increments();
      tbl
        .string('username', 128)
        .notNullable()
        .unique();
      tbl.string('password', 128).notNullable();
      tbl
        .integer('role_id')
        .unsigned()
        .notNullable()
        .defaultTo(2)
        .references('id')
        .inTable('roles')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .string('name', 128)
        .notNullable()
        .unique();
      tbl.string('location', 128).notNullable();
      tbl.float('price').notNullable();
      tbl.string('bio', 255).notNullable();
      tbl
        .boolean('available')
        .notNullable()
        .defaultTo(1);
    })
    .createTable('riders', tbl => {
      tbl.increments();
      tbl
        .string('username', 128)
        .notNullable()
        .unique();
      tbl.string('password', 128).notNullable();
      tbl
        .integer('role_id')
        .unsigned()
        .notNullable()
        .defaultTo(3)
        .references('id')
        .inTable('roles')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.string('name', 128).notNullable();
      tbl.string('location', 128);
      tbl
        .boolean('searching')
        .notNullable()
        .defaultTo(1);
    })
    .createTable('reviews', tbl => {
      tbl.increments();
      tbl.integer('stars').notNullable();
      tbl.string('comment', 255);
      tbl.date('date').notNullable();
      tbl
        .integer('driver_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('drivers')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('rider_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('riders')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .boolean('anonymous')
        .notNullable()
        .defaultTo(1);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('reviews')
    .dropTableIfExists('riders')
    .dropTableIfExists('drivers')
    .dropTableIfExists('admin');
};
