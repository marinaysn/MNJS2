exports.getLogInController = (req, res, next) =>{

    const isLoggedIn = req.get('Cookie').split('=')[1] === 'true';
   // const isLoggedIn = true;
   console.log('****************')
    console.log(isLoggedIn);

    res.render('login', {docTitle: 'Sign In', path: '/login' , isLoggedIn: isLoggedIn})
}


exports.postLogInController = (req, res, next) =>{

   // req.isLoggedIn = true;
   res.setHeader('Set-Cookie', 'isLoggedIn=true')
    res.redirect('/');
}
