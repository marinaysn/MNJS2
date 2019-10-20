// to start run 'node .\app.js' or 'npm start'
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const errorsController = require('./controllers/errors');

const mongoConnect = require('./util/database').mongoConnect;

//models:
const User = require('./models/user');

//create routes:
// const login = require('./routes/login');
// const about = require('./routes/about');
 const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');

const app = express();

// ****** EJS Template Engine ******** //
app.set('view engine', 'ejs');
// set where templates are
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) =>{
  User.findUserById('5dac85ca71e8451bc4f01e0f').then(user =>{
    req.user = user;
    next();
  }).catch(err => console.log(err));
  next();
});


 app.use('/admin', adminRoutes);
// app.use(login);
// app.use(about);
 app.use(shopRoutes);

app.use(
  errorsController.get404error
);

mongoConnect(() => {

    app.listen(3000);
});

