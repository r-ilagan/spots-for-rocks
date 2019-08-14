const express = require('express');
const app = express();
const path = require('path');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Spots = require('./models/spots');

// mongoose.connect('mongodb://localhost:27017/spot_for_rocks', {
//   useNewUrlParser: true
// });

app.set('view engine', 'ejs');
app.set('view options', { delimiter: '?' });
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

const port = process.env.PORT || 3000;

// root route
app.get('/', (req, res) => {
  res.render('landing');
});

// Show route
app.get('/spots', (req, res) => {
  res.render('index/spots');
});

// New route
app.get('/spots/new', (req, res) => {
  res.render('index/new');
});

// Create route
app.post('/spots', (req, res) => {
  res.render('index/spots');
});

app.listen(port, () => {
  console.log('Server has started and listening on port 3000!');
});
