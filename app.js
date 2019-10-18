// to start run 'node .\app.js' or 'npm start'
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const errorsController = require('./controllers/errors');
const sequelize = require('./util/database');

const login = require('./routes/login');
const about = require('./routes/about');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

// ****** EJS Template Engine ******** //
app.set('view engine', 'ejs');
// set where templates are
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(login);
app.use(about);
app.use(shopRoutes);

app.use(
  errorsController.get404error
);

sequelize
.sync()
.then( result =>{
 // console.log(result)
})
.catch(err => console.log(err))

app.listen(3000);