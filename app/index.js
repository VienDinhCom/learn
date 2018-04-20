import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

import database from './config/database';
import passport from './config/passport';
import * as hsbHelpers from './helpers/hsb';

import index from './routes/index';
import auth from './routes/auth';
import stories from './routes/stories';

const app = express();
const port = process.env.PORT || 3000;
const MongoStore = require('connect-mongo')(session);

// Connect to MongoDB
mongoose.connect(database)
  .then(() => console.log('MongoDB connected...')) // eslint-disable-line
  .catch(err => console.log(err)); // eslint-disable-line

// View Config
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
  partialsDir: path.join(__dirname, 'views/partials/'),
  layoutsDir: path.join(__dirname, 'views/layouts/'),
  defaultLayout: 'main',
  helpers: hsbHelpers,
}));
app.set('view engine', 'handlebars');

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 180 * 60 * 1000 },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Global variables
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Routes
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);

app.listen(port, () => {
  console.log(`Server started on port ${port}`); // eslint-disable-line
});
