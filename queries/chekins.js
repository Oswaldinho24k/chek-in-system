const knex = require('../db/knex');

module.exports = {
  getAll: () => {
    return knex('chekins')
            .select();
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
