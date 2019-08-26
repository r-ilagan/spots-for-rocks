const express = require('express');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const indexRoutes = require('./routes/index');
const spotRoutes = require('./routes/spots');
const commentRoutes = require('./routes/comments');
const userRoutes = require('./routes/users');
const User = require('./models/users');

const app = express();
require('dotenv').config();

const testDB = 'mongodb://localhost:27017/spot_for_rocks';
const realDB = process.env.DB_URL;

// Mongoose
mongoose.set('useFindAndModify', false);
mongoose
  .connect(`${realDB}`, {
    useNewUrlParser: true
  })
  .then(() => console.log('connected to db!'))
  .catch(err => console.log('Error: ', err.message));

// EJS
app.set('view engine', 'ejs');
app.set('view options', { delimiter: '?' });

// Path
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// BodyParser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Method-override
app.use(methodOverride('_method'));

// Express-session
app.set('trust proxy', 1);
app.use(
  session({
    secret: `${process.env.SECRET_KEY}`,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.use('/', indexRoutes);
app.use('/spots', spotRoutes);
app.use('/spots/:id/comments', commentRoutes);
app.use('/users', userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server has started!');
});
