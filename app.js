// to start run 'node .\app.js' or 'npm start'
const express = require('express');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const bodyParser = require('body-parser');
const path = require('path');
const login = require('./routes/login');
const about = require('./routes/about');
const direction = require('./routes/direction');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(login);
app.use(about);
app.use(direction);
app.use(shopRoutes);

app.use((req, res, next)=>{
  res.status(404).sendFile(path.join(__dirname, 'views', 'pageNotFound.html'))
});

app.listen(3000);