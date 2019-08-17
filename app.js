/* eslint-disable object-shorthand */
/* eslint-disable prefer-destructuring */
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Spots = require('./models/spots');
require('dotenv').config();

// const testDB = 'mongodb://localhost:27017/spot_for_rocks';
const realDB = process.env.DB_URL;
mongoose
  .connect(`${realDB}`, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('connected to db!');
  })
  .catch(err => {
    console.log('Error: ', err.message);
  });

app.set('view engine', 'ejs');
app.set('view options', { delimiter: '?' });
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.json());

const urlencodedParser = express.urlencoded({ extended: false });
const port = process.env.PORT || 5000;

// root route
app.get('/', (req, res) => {
  res.render('landing');
});

// Index route
app.get('/spots', (req, res) => {
  Spots.find({}, (err, foundSpots) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index/spots', { spots: foundSpots });
    }
  });
});

// New route
app.get('/spots/new', (req, res) => {
  res.render('index/new');
});

// Create route
app.post('/spots', urlencodedParser, (req, res) => {
  const author = req.body.author;
  const image = req.body.image;
  const place = req.body.place;
  const description = req.body.description;
  const newSpot = {
    name: place,
    description: description,
    author: author,
    image: image
  };
  Spots.create(newSpot, err => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/spots');
    }
  });
});

app.listen(port, () => {
  console.log('Server has started!');
});
