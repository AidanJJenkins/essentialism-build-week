exports.up = function(knex) {
  return knex.schema.createTable('favorites', favorites => {
    favorites.integer('value_id')
                .unsigned()
                .notNullable()
                .references('value_id')
                .inTable('values')
                .onDelete('RESTRICT')
                .onUpdate('RESTRICT')
    favorites.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onDelete('RESTRICT')
                .onUpdate('RESTRICT')
    favorites.unique(['value_id', 'user_id']);
    favorites.boolean('important')
                .notNullable()
                .defaultTo(0)
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('favorites');
};
