exports.getAboutPageController = (req, res, next) =>{

    res.render('info/about', {docTitle: 'About Us', path: '/about', activeAbout: true, isLoggedIn: req.session.user ? true : false })
}

exports.getDirectionController = (req, res, next) =>{
    res.render('info/direction', { docTitle: 'How To Find Us', path: '/direction', activeDirection: true, isLoggedIn: req.session.user ? true : false })
}