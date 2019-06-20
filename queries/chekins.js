const knex = require('../db/knex');

module.exports = {
  getAll: (user) => {
    if(user)return knex('chekins').select().leftJoin('users', 'chekins.user', 'users.id').where('user',user);
    return knex('chekins').select().leftJoin('users', 'chekins.user', 'users.id');
  },
  getOne: (id) => {
    return knex('chekins')
            .select()            
            .where('id', id)            
            .first();
  },
  create: (chekin) => {
    return knex('chekins')
            .insert(chekin, 'id')
            .returning('*');
  },
  update: (id, chekin) => {
    return knex('chekins')
            .where('id', id)
            .update(chekin, 'id')
            .returning('*');
  },
  delete: (id) => {
    return knex('chekins')
            .where('id', id)
            .del();
  }
};
