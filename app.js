// to start run 'node .\app.js' or 'npm start'
const express = require('express');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const bodyParser = require('body-parser');
const path = require('path');
const login = require('./routes/login');
const about = require('./routes/about');
const direction = require('./routes/direction');
const expressHbs = require('express-handlebars');


const app = express();

//set template view engines
//use 'defaultLayout: false', if no layout is set
app.engine('hbs', expressHbs({
  defaultLayout: 'mainHbsLayout.hbs',
  layouts: 'views/layouts',
  extname: 'hbs'
}));
//to use handlebars
app.set('view engine', 'hbs');

//to use Pug/jade (uncomment to use)
//app.set('view engine', 'pug');

// set where templates are
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(login);
app.use(about);
app.use(direction);
app.use(shopRoutes);

app.use((req, res, next) => {

  res.status(404).render('pageNotfound', {docTitle: 'Page Not Found'});
});

app.listen(3000);