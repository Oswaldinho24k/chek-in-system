const express = require('express');
const router = express.Router();
const queries = require('../queries/chekins');



//post a chekin
router.post('/', (req, res, next)=>{    
    queries.create(req.body)
      .then((chekin)=>res.status(201).json(chekin))
      .catch((error)=>res.status(400).json(error))
  })

//get all chekins
router.get('/', (req, res, next)=>{
  const {user} = req.params
  queries.getAll(user)
    .then((chekin)=>res.status(200).json(chekin))
    .catch((error)=>res.status(400).json(error))
})

//get single chekin
router.get('/:id', (req, res, next)=>{
  const {id} = req.params
  queries.getOne(id)
    .then((chekin)=>res.status(200).json(chekin))
    .catch((error)=>res.status(400).json(error))
})

//update chekin
router.patch('/:id', (req, res, next)=>{
  const {id} = req.params
  const chekin = req.body
  queries.update(id, chekin)
    .then((chekin)=>res.status(200).json(chekin))
    .catch((error)=>res.status(400).json(error))
})

//delete chekin
router.delete('/:id', (req, res, next)=>{  
  const {id} = req.params
  queries.delete(id)
    .then((chekin)=>res.status(200).json(chekin))
    .catch((error)=>res.status(400).json(error))
})

module.exports = router;
