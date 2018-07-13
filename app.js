// require express app
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');

// require Auth
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local');

// require DB
const mongoose = require('mongoose');
const User = require('./models/user');

// ROUTER
const indexRoutes = require('./routes/index');
const campgroundRoutes = require('./routes/campgrounds');
const commentRoutes = require('./routes/comments');

// ENV VARIABLE
const dbUrl = process.env.DBURL || 'mongodb://wmy:ilovezsr2018@ds235461.mlab.com:35461/wmy_yelpcamp';
const PORT = process.env.PORT || 3000;

mongoose.connect(dbUrl);
mongoose.connection
    .once('open', () => console.log('DB is open^^'))
    .on('error', (err) => console.log(err));

// // Add seed data
// seedDB();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(flash());

// Auth Config
app.use(session({
    secret: 'good',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(PORT);