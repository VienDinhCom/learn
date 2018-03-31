import { Router } from 'express';
import Idea from '../models/idea';

const router = Router();

// Idea Index Route
router.get('/', (req, res) => {
  Idea
    .find({})
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
    .then(idea => res.render('ideas/edit', { idea }));
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
    new Idea({ title, details })
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
