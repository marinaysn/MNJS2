exports.get404error = (req, res, next) => {

    res.status(404).render('pageNotFound', {docTitle: 'Page Not Found', path: '/pageNotFount' , isLoggedIn: req.session.user ? true : false });
};

exports.get500error = (req, res, next) => {
console.log('oooooooooooo0oo0')
//res.setHeader("Content-Type", "text/html")
    res.status(502).render('/500Errors', {docTitle: '500 Error', path: '/500Errors' , isLoggedIn: req.session.user ? true : false });
   // res.redirect('/500Errors')
};




