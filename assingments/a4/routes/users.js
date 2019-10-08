const express = require('express');
const routes = express.Router();
const home = require('./home');

const usersArr= home.users;

routes.get('/users', (req, res, next)=>{
    console.log('2========================')
    console.log(usersArr.length)
    console.log(usersArr)
    res.render('users', {appTitle: 'User Page', userArray: usersArr, hasUsers: usersArr.length > 0})
});


module.exports = routes;