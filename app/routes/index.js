import { Router } from 'express';
import { ensureGuest, ensureAuthenticated } from '../helpers/auth';
import Story from '../models/story';

const router = Router();

router.get('/', ensureGuest, (req, res) => {
  res.render('index/welcome');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  Story.find({ user: req.user.id })
    .then((stories) => {
      res.render('index/dashboard', {
        stories,
      });
    });
});

router.get('/about', (req, res) => {
  res.render('index/about');
});

export default router;
