const knex = require('../db/knex');

module.exports = {
  getAll: () => {
    return knex('users')
            .select();
  },
  getOne: (id) => {
    return knex('users')
            .select()
            .where('id', id)
            .first();
  },
  getOneBy: (filter,value) => {
    return knex('users')
            .select()
            .where(filter, value)
            .first();
  },
  create: (user) => {
    return knex('users')
            .insert(user, 'id')
            .returning('*');
  },
  update: (id, user) => {
    return knex('users')
            .where('id', id)
            .update(user, 'id')
            .returning('*');
  },
  delete: (id) => {
    return knex('users')
            .where('id', id)
            .del();
  }
};
