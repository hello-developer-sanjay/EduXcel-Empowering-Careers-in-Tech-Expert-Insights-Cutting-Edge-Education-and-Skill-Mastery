const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User'); // Replace with the actual path to your User model

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    // Find a user with the provided email in your database
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect email or password' });
      }
      // Check if the provided password is correct
      user.comparePassword(password, (passwordErr, isMatch) => {
        if (passwordErr) {
          return done(passwordErr);
        }
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect email or password' });
        }
        return done(null, user);
      });
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
