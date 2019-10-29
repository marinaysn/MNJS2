exports.getLogInController = (req, res, next) =>{
    res.render('login', {docTitle: 'Sign In', path: '/login' , activeLogIn: true , productCSS: true})
  
    const isLoggedIn = req.get('Cookie').split('=')[1] === 'true';

    console.log(isLoggedIn);

    res.render('login', {docTitle: 'Sign In', path: '/login' , activeLogIn: true , productCSS: true, isLoggedIn: isLoggedIn })
}


exports.postLogInController = (req, res, next) =>{

   // req.isLoggedIn = true;
   res.setHeader('Set-Cookie', 'loggedIn=true; Max-Age:10')
    res.redirect('/');
}
