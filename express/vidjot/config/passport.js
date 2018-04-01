import bcrypt from 'bcryptjs';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import User from '../models/user';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User
    .findById(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});

passport.use('local', new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    User
      .findOne({ email })
      .then((user) => {
        if (!user) return done(null, false, { message: 'No user found' });
        if (bcrypt.compareSync(password, user.password)) return done(null, user);
        return done(null, false, { message: 'Password incorrect' });
      })
      .catch(err => done(err));
  },
));

export default passport;
