// db configuration
require('dotenv').config()

module.exports = {
    development: {
        client: 'pg',  
        connection: {
            user:process.env.DB_USER,
            password:process.env.DB_PASSWORD,
            host:process.env.DB_HOST,
            port:process.env.DB_PORT,
            database:process.env.DB_NAME
        }
        //or connection: 'dburi'
    },
    production: {
        client: 'postgresql',
        connection: process.env.DATABASE_URL + '?ssl=true'
    }
  };
  