/*Fields */
//entry
//departure

exports.up = (knex, Promise) => {
    return knex.schema.createTable('chekins', (table) => {
        
      table.bigIncrements();
      table.integer('user').unsigned().notNullable();
      table.datetime('entry')
      table.datetime('departure')
      table.string('comment')
      table.foreign('user').references('id').inTable('users')
    });
  };
  
  exports.down = (knex, Promise) => {
    return knex.schema.dropTable('chekins');
  };