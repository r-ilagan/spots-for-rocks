const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const indexRoutes = require('./routes/index');
const spotRoutes = require('./routes/spots');
const app = express();
require('dotenv').config();

const testDB = 'mongodb://localhost:27017/spot_for_rocks';
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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

// Routes
app.use(indexRoutes);
app.use('/spots', spotRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server has started!');
});
