import { Router } from 'express';

import Idea from '../models/idea';
import { ensureAuthentication } from '../helpers/auth';

const router = Router();

// Ensure authentication
router.use('/', ensureAuthentication, (req, res, next) => next());

// Idea Index Route
router.get('/', (req, res) => {
  Idea
    .find({ user: req.user.id })
    .sort({ date: 'desc' })
    .then(ideas => res.render('ideas/index', { ideas }));
});

// Add Idea Route
router.get('/add', (req, res) => {
  res.render('ideas/add');
});

// Edit Idea Route
router.get('/edit/:id', (req, res) => {
  Idea
    .findOne({ _id: req.params.id })
    .then((idea) => {
      if (idea.user !== req.user.id) {
        req.flash('error_msg', 'You don\'t have permission');
        res.redirect('/ideas');
      } else {
        res.render('ideas/edit', { idea });
      }
    });
});

// Add Form
router.post('/', (req, res) => {
  const errors = [];
  const { title, details } = req.body;

  if (!title) errors.push({ text: 'Please add a title' });
  if (!details) errors.push({ text: 'Please add some details' });

  if (errors.length) {
    res.render('ideas/add', { errors, title, details });
  } else {
    new Idea({ title, details, user: req.user.id })
      .save()
      .then(() => {
        req.flash('success_msg', 'Video idea added');
        res.redirect('/ideas');
      })
      .catch((err) => { throw err; });
  }
});

// Edit Form
router.put('/:id', (req, res) => {
  Idea
    .findOne({ _id: req.params.id })
    .then((idea) => {
      idea
        .set({ ...req.body })
        .save()
        .then(() => {
          req.flash('success_msg', 'Video idea updated');
          res.redirect('/ideas');
        });
    });
});

// Delete Form
router.delete('/:id', (req, res) => {
  Idea
    .remove({ _id: req.params.id })
    .then(() => {
      req.flash('success_msg', 'Video idea removed');
      res.redirect('/ideas');
    });
});

export default router;
