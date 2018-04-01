import { Router } from 'express';
import bcrypt from 'bcryptjs';

import passport from '../config/passport';
import User from '../models/user';

const router = Router();

// User Login Route
router.get('/login', (req, res) => {
  res.render('users/login');
});

// User Register Route
router.get('/register', (req, res) => {
  res.render('users/register');
});

// Login Form
router.post('/login', passport.authenticate('local', {
  successRedirect: '/ideas',
  failureRedirect: '/users/login',
  failureFlash: true,
}));

// Register Form
router.post('/register', (req, res) => {
  const errors = [];
  const {
    name, email, password, password2,
  } = req.body;

  if (password !== password2) errors.push({ text: 'Passwords do not match' });
  if (password.length < 4) errors.push({ text: 'Passwords must be at least 4 characters' });

  if (errors.length) {
    res.render('users/register', {
      errors, name, email, password, password2,
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    new User({ name, email, password: hash })
      .save()
      .then(() => {
        req.flash('success_msg', 'You have successfully registered');
        res.redirect('/users/login');
      })
      .catch((err) => {
        if (err.code === 11000) {
          errors.push({ text: 'The email has been taken' });
          res.render('users/register', {
            errors, name, email, password, password2,
          });
        } else {
          throw err;
        }
      });
  }
});

export default router;
