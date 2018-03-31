import express from 'express';
import exphbs from 'express-handlebars';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import flash from 'connect-flash';
import session from 'express-session';
import path from 'path';

import ideasRouter from './routes/ideas';
import usersRouter from './routes/users';

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

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

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

// User Routes
app.use('/ideas', ideasRouter);
app.use('/users', usersRouter);

app.listen(3000, () => {
  console.log(`Server started on port ${port}`); // eslint-disable-line
});
