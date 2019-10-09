exports.get404error = (req, res, next) => {

    res.status(404).render('pageNotFound', {docTitle: 'Page Not Found', path: '/pageNotFount'});
};
