const express = require('express');
const router = express.Router();
const passport = require('passport')
const queries = require('../queries/users');
const bcrypt = require('bcryptjs');
const {welcomeMail} = require('../helpers/mailer')


//login
router.post('/login', (req, res, next) =>{
  passport.authenticate('local', (err, user, info)=> {
    console.log(user, info, err)    
    if (info) return res.status(400).json(info);         
    if (!user) return res.status(404).json({message:'This user does not exist'});
    req.logIn(user, (err) =>{
      if (err) return res.status(400).json(err);       
      return res.json(user)
    });
  })(req, res, next);
});

//singup //create user
router.post('/signup', (req, res, next)=>{
  const user = Object.assign({}, req.body)
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash
  queries.create(user)
    .then((user)=>{
      welcomeMail(req.body)
      res.status(201).json(user)
    })
    .catch((error)=>{
      console.log(error)
      res.status(400).json(error)
    })
})

//log out
router.get("/logout", (req, res) => {
  req.logout();
  res.json({message:'Logued out successfully'})
});

//get all users
router.get('/', (req, res, next)=>{  
  queries.getAll()
    .then((user)=>res.status(200).json(user))
    .catch((error)=>res.status(400).json(error))
})

//get single user
router.get('/:id', (req, res, next)=>{
  const {id} = req.params
  queries.getOne(id)
    .then((user)=>res.status(200).json(user))
    .catch((error)=>res.status(400).json(error))
})

//update user
router.patch('/:id', (req, res, next)=>{
  const {id} = req.params
  const user = req.body
  queries.update(id, user)
    .then((user)=>res.status(200).json(user))
    .catch((error)=>res.status(400).json(error))
})

//delete user
router.delete('/:id', (req, res, next)=>{  
  const {id} = req.params
  queries.delete(id)
    .then((user)=>res.status(200).json(user))
    .catch((error)=>res.status(400).json(error))
})

module.exports = router;
