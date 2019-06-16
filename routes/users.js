const express = require('express');
const router = express.Router();
const passport = require('passport')
const queries = require('../queries/users');
var bcrypt = require('bcryptjs');


//login
router.post('/login', (req, res, next) =>{
  passport.authenticate('local', (err, user, info)=> {
    if (err) { 
      console.log(err)
      return res.json(err); 
    }
    if (!user) { return res.json({message:'This user does not exist'}); }
    req.logIn(user, (err) =>{
      if (err) { 
        console.log(err)
        return json(err); 
      }
      return res.json(user)
    });
  })(req, res, next);
});

//singup //create user
router.post('/signup', (req, res, next)=>{
  const user = req.body
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash
  queries.create(user)
    .then((user)=>res.status(201).json(user))
    .catch((error)=>res.status(400).json(error))
})

//get all users
router.get('/', (req, res, next)=>{  
  queries.getAll()
    .then((user)=>res.status(201).json(user))
    .catch((error)=>res.status(400).json(error))
})

//get single user

//update user

//delete user

module.exports = router;
