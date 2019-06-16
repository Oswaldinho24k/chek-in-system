/*Fields */
//username
//email
//password
//phone
//imageURL

exports.up = (knex, Promise) => {
    return knex.schema.createTable('users', (table) => {
        table.bigIncrements();
        table.string('username').unique().notNullable()
        table.string('email').unique().notNullable()
        table.string('password').notNullable()
        table.string('phone')
        table.string('imageURL').defaultTo('http://pluspng.com/img-png/user-png-icon-male-user-icon-512.png')        
    });
  };
  
  exports.down = (knex, Promise) => {
      return knex.schema.dropTable('users');
  };