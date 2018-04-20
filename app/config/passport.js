import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { clientID, clientSecret } from './auth';
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

passport.use('google', new GoogleStrategy({
  clientID,
  clientSecret,
  proxy: true,
  callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  const googleID = profile.id;
  const email = profile.emails[0].value;
  const firstName = profile.name.givenName;
  const lastName = profile.name.familyName;
  let image = profile.photos[0].value;

  image = image.substring(0, image.indexOf('?'));

  User
    .findOne({ googleID })
    .then((user) => {
      if (user) return done(null, user);
      return new User({
        googleID, email, firstName, lastName, image,
      }).save()
        .then(user => done(null, user))
        .catch(err => done(err));
    })
    .catch(err => done(err));
}));


export default passport;
