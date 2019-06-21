const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const queries = require('../queries/users');
const bcrypt = require('bcryptjs');




passport.use(new LocalStrategy({
  usernameField:'email'
},
  (username, password, done) => {        
    queries.getOneBy('email', username)
    .then((user)=>{           
        if (!user) return done(null, false, { message: 'Incorrect email.' });
        if (!bcrypt.compareSync(password, user.password)) return done(null, false, { message: "Incorrect password" });
        return done(null, user);
    })
    .catch((err)=>{
        console.log(err)
        return done(err);
    })  
  }
));


passport.serializeUser((user, done) =>{
  done(null, user.id);
});

passport.deserializeUser((id, done) =>{
  queries.getOne(id)
    .then((user)=>{   
      done(null, user);
    })
    .catch((err)=>{        
        return done(err);
    })  
  
});

