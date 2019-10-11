exports.getAboutPageController = (req, res, next) =>{

    res.render('info/about', {docTitle: 'About Us', path: '/about', activeAbout: true})
}

exports.getDirectionController = (req, res, next) =>{
    res.render('info/direction', { docTitle: 'How To Find Us', path: '/direction', activeDirection: true })
}