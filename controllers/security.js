const User = require('../models/user');

exports.getLogInController = (req, res, next) =>{

    res.render('auths/login', {docTitle: 'Sign In', path: 'auths/login' , isLoggedIn: req.session.isLoggedIn ? true : false})
}


exports.postLogInController = (req, res, next) =>{
 
    User.findById('5db484b1468d6149349922a6')
    .then(user => {
        req.session.isLoggedIn = true;
        req.session.user = user;
    }).then( result =>{
        res.redirect('/');
    })
    .catch(err => console.log(err));
}

exports.postLogOut = (req, res, next) =>{
 
   req.session.destroy((err) =>{
       console.log(err)
        res.redirect('/')
    })
 
 }

 //signup user routine
 exports.postSignUp = (req, res, next) =>{

 }

 exports.getSignUp = (req, res, next) =>{
     res.render('auths/signup', {
         path: '/signup',
         isLoggedIn: false, 
         docTitle: 'SignUp'
     })
}
