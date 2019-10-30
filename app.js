// to start run 'node .\app.js' or 'npm start'
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorsController = require('./controllers/errors');
const connectionString = require('./util/database')


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

// ****** EJS Template Engine ******** //
app.set('view engine', 'ejs');
// set where templates are
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'mySecretValue', resave: false, saveUninitialized: false, store: store}));

app.use((req, res, next) => {

  if (!req.session.user) {
   return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user =  user;
      next();
    }).catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(loginRoutes);
// app.use(about);
app.use(shopRoutes);

app.use(
  errorsController.get404error
);

mongoose
  .connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('Connected');
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Marina',
          email: 'marina@test.com',
          cart: []
        })
        user.save();
      }
    })

    app.listen(3000);
  })
  .catch(err => console.log(err));