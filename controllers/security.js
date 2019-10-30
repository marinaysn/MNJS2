exports.getLogInController = (req, res, next) =>{

  //  const isLoggedIn = req.get('Cookie').split('=')[1] === 'true';
   // const isLoggedIn = true;
   console.log('****************')
    console.log(req.session.isLoggedIn);

    res.render('login', {docTitle: 'Sign In', path: '/login' , isLoggedIn: false})
}


exports.postLogInController = (req, res, next) =>{

   // req.isLoggedIn = true;
  // res.setHeader('Set-Cookie', 'isLoggedIn=true')
  req.session.isLoggedIn = true;
    res.redirect('/');
}
