const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { engine } = require('express-handlebars'); // Correct import

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources\\views'));

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
});