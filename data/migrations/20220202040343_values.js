exports.up = function(knex) {
  return knex.schema.createTable('values', values => {
    values.increments('value_id');
    values.string('value', 255).notNullable().unique();
    values.string('value_definition', 255).notNullable().unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('values');
};
