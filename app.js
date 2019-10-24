// to start run 'node .\app.js' or 'npm start'
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const errorsController = require('./controllers/errors');
const connectionString = require('./util/database')


//create routes:
// const login = require('./routes/login');
// const about = require('./routes/about');
 const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');

//models:
//const User = require('./models/user');

const app = express();

// ****** EJS Template Engine ******** //
app.set('view engine', 'ejs');
// set where templates are
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) =>{
//   User.findUserById('5dacd92a78656a304c5af104')
//   .then(user => {
//     req.user = new User(user.fname, user.lname, user.email, user.cart, user._id);
//     next();
//   }).catch(err => console.log(err));
// });

 app.use('/admin', adminRoutes);
// app.use(login);
// app.use(about);
 app.use(shopRoutes);

app.use(
  errorsController.get404error
);

mongoose
  .connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => { 
    console.log('Connected');
     app.listen(3000); })
  .catch(err => console.log(err));