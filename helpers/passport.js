const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const queries = require('../queries/users');
const bcrypt = require('bcryptjs');



passport.use(new LocalStrategy(
  (email, password, done) => {    

    queries.getOneBy('email', email)
    .then((user)=>{        
        if (!user) return done(null, false, { message: 'Incorrect email.' });
        if (!bcrypt.compareSync(password, user.password)) return next(null, false, { message: "Incorrect password" });
        return done(null, user);
    })
    .catch((err)=>{
        console.log(err)
        return done(err);
    })  
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
done(null, user);
});