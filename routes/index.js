const express = require('express');
const router = express.Router();
const knex = require('../db/knex')



/* GET home page. */
router.get('/', (req, res, next)=> {
  res.render('index', { title: 'Express' });
});


module.exports = router;
