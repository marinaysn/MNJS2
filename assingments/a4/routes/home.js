const express = require('express');

const router = express.Router();

const usersArr = [];

router.get('/', (req, res, next)=>{

    res.render('home', {appTitle: 'Home Page'})
});

router.post('/users', (req, res, next )=>{
    console.log('1========================')
    console.log(req.body.name)
    usersArr.push({name: req.body.name});
    res.redirect('/users')
})

exports.routes = router;
exports.users = usersArr;