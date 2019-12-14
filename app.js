// to start run 'node .\app.js' or 'npm start'
// require dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const errorsController = require('./controllers/errors');
const connectionString = require('./util/database')

const flash = require('connect-flash');
const multer = require('multer');

//create routes:
const loginRoutes = require('./routes/login');
// const about = require('./routes/about');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//models:
const User = require('./models/user');

const app = express();

const store = new MongoDBStore({
  uri: connectionString,
  collection: 'sessions'
});

const csrfProtection = csrf();

// ****** EJS Template Engine ******** //
app.set('view engine', 'ejs');
// set where templates are
app.set('views', 'views');

//configure storage for Files to use in a multer object
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    // cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)

    // cb(null, Date.now() + '-' + file.originalname)

    cb(null, file.originalname)
  }
})

//set Filter for Files to use in a multer object
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg') {
    cb(null, true);
  }
  else {
    cb(null, false);
  }
}

app.use(bodyParser.urlencoded({ extended: false }));

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')); // image is coming from view add/edit products

//set paths
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(session({ secret: 'mySecretValue', resave: false, saveUninitialized: false, store: store }));

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
})

app.use((req, res, next) => {

  if (!req.session.user) {
    return next();
  }

  User.findById(req.session.user._id)
    .then(user => {

      if (!User) {
        return next();
      }
      req.user = user;
      next();
    }).catch(err => {
      next(new Error(err))

    });
});



app.use('/admin', adminRoutes);
app.use(loginRoutes);
// app.use(about);
app.use(shopRoutes);

app.get('/500Errors', errorsController.get500error);

app.use(
  errorsController.get404error
);



app.use((error, req, res, next) => {
  res.status(500)
    .render('500Errors', {
      path: '/500Errors',
      editing: false,
      isLoggedIn: req.session.user ? true : false,
      docTitle: 'Error 500',
      errorMessage: error
    }
    );

})

mongoose
  .connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('Connected');
    app.listen(process.env.PORT || 3000);
  })
  .catch(err => console.log(err));