const knex = require('../db/knex');

module.exports = {
  getAll: (user) => {    
    if(user)return knex('chekins').select('chekins.*', 'users.username', 'users.email').leftJoin('users', 'chekins.user', 'users.id').where('user',user);
    return knex('chekins').select('chekins.*', 'users.username', 'users.email').leftJoin('users', 'chekins.user', 'users.id')
  },
  getOne: (id) => {
    return knex('chekins')
            .select('chekins.*', 'users.username', 'users.email')
            .leftJoin('users', 'chekins.user', 'users.id')
            .where('chekins.id' , id)
  },
  create: (chekin) => {  
    return knex('chekins')
          .insert(chekin, 'id')
          .returning('*')
            .then(c=>{              
              return knex('chekins')
              .select('chekins.*', 'users.username', 'users.email')
              .leftJoin('users', 'chekins.user', 'users.id')
              .where('chekins.id' , c[0].id)           
            })
  },
  update: (id, chekin) => {
    return knex('chekins')
            .where('id', id)
            .update(chekin, 'id')            
            .returning('*')
            .then(c=>{              
              return knex('chekins')
              .select('chekins.*', 'users.username', 'users.email')
              .leftJoin('users', 'chekins.user', 'users.id')
              .where('chekins.id' , c[0].id)           
            })
  },
  delete: (id) => {
    return knex('chekins')
            .where('id', id)
            .del();
  }
};
