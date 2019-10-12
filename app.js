// to start run 'node .\app.js' or 'npm start'
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const login = require('./routes/login');
const about = require('./routes/about');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


const errorsController = require('./controllers/errors');
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

app.listen(3000);