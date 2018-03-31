import { Router } from 'express';

const router = Router();

// User Login Route
router.get('/login', (req, res) => {
  res.render('users/login');
});

// User Register Route
router.get('/register', (req, res) => {
  res.render('users/register');
});

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
    res.send('Passed');
  }
});

export default router;
