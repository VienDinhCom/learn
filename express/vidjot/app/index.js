import express from 'express';
import exphbs from 'express-handlebars';

const app = express();
const port = 3000;

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Index Route
app.get('/', (req, res) => {
  const title = 'Welcome!';
  res.render('index', { title });
});

// About Route
app.get('/about', (req, res) => {
  res.render('about');
});

app.listen(3000, () => {
  console.log(`Server started on port ${port}`); // eslint-disable-line
});
