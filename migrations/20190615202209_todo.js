

exports.up = (knex, Promise) => {
    return knex.schema.createTable('todo', (table) => {
      table.increments();
      //fields
    });
  };
  
  exports.down = (knex, Promise) => {
    return knex.schema.dropTable('todo');
  };