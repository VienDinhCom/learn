import express from 'express';
import exphbs from 'express-handlebars';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import flash from 'connect-flash';
import session from 'express-session';

import Idea from './models/idea';

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/vidjot')
  .then(() => console.log('MongoDB connected...')) // eslint-disable-line
  .catch(err => console.log(err)); // eslint-disable-line

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method Override middleware
app.use(methodOverride('_method'));

// Session midleware
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Index Route
app.get('/', (req, res) => {
  const title = 'Welcome!';
  res.render('index', { title });
});

// About Route
app.get('/about', (req, res) => {
  res.render('about');
});

// Idea Index Route
app.get('/ideas', (req, res) => {
  Idea
    .find({})
    .sort({ date: 'desc' })
    .then(ideas => res.render('ideas/index', { ideas }));
});

// Add Idea Route
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
});

// Edit Idea Route
app.get('/ideas/edit/:id', (req, res) => {
  Idea
    .findOne({ _id: req.params.id })
    .then(idea => res.render('ideas/edit', { idea }));
});

// Add Form
app.post('/ideas', (req, res) => {
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
      });
  }
});

// Edit Form
app.put('/ideas/:id', (req, res) => {
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
app.delete('/ideas/:id', (req, res) => {
  Idea
    .remove({ _id: req.params.id })
    .then(() => {
      req.flash('success_msg', 'Video idea removed');
      res.redirect('/ideas');
    });
});

app.listen(3000, () => {
  console.log(`Server started on port ${port}`); // eslint-disable-line
});
