const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const home = require('./routes/home');
const users = require('./routes/users');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(home.routes);
app.use(users);

app.use((req, res, next) => {
    res.status(404).render('page404', {appTitle: 'Page Not Found'});
})

app.listen(3000)