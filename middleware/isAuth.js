module.exports = (req, res, next) => {

    if (!req.session.isLoggedIn){
        req.flash('error', 'Please Login first')
        return res.redirect('/login');
     }
     next();
}