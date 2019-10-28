exports.getLogInController = (req, res, next) =>{
    res.render('login', {docTitle: 'Sign In', path: '/login' , activeLogIn: true , productCSS: true})
}
