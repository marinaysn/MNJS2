exports.getAboutPageController = (req, res, next) =>{

    res.render('about', {docTitle: 'About Us', path: '/about', activeAbout: true})
}

exports.getDirectionController = (req, res, next) =>{
    res.render('direction', { docTitle: 'How To Find Us', path: '/direction', activeDirection: true })
}