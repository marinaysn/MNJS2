const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailerApiKey = require('../util/nodemailerApiKeys');
const crypto = require('crypto');

//other approach
// const nodemailer = require('nodemailer');
// const sendGridTransport = require('nodemailer-sendgrid-transport');

// const transporter = nodemailer.createTransport(sendGridTransport({
//     auth: {
//         api_key: nodemailerApiKey
//     }
// }));


exports.getLogInController = (req, res, next) => {

    let msg = req.flash('error')
    if (msg.length < 1) {
        msg = null
    }

    res.render('auths/login', { docTitle: 'Sign In', path: 'auths/login', isLoggedIn: req.session.isLoggedIn ? true : false, errorMessage: msg })
}

exports.postLogInController = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
        .then(user => {

            if (!user) {
                req.flash('error', 'Invalid email')
                return res.redirect('/login');
            }

            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            res.redirect('/');
                        });
                    }

                    req.flash('error', 'Invalid password')
                    res.redirect('/login');

                }).catch(err => {
                    console.log(err)
                    res.redirect('/login');
                })
        })
        .catch(err => console.log(err));
}

exports.postLogOut = (req, res, next) => {

    req.session.destroy((err) => {
        console.log(err)
        res.redirect('/')
    })
}

//signup user routine
exports.postSignUp = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    // console.log('------------------')
    // console.log(email)

    User.findOne({ email: email })
        .then(userDoc => {

            if (userDoc) {
                req.flash('error', 'Email already exists. Please log in')
                return; //res.redirect('/login');
            }

            return bcrypt.hash(password, 12).then(hashedPwd => {
                const user = new User({
                    name: name,
                    email: email,
                    password: hashedPwd,
                    cart: { items: [] }
                })
                return user.save();
            })
        })
        .then(result => {

            console.log('------------------')
            console.log(email)
            //other approach
            //    return transporter.sendMail({
            //         from: 'marinaysn@gmail.com',
            //         to: email,
            //         subject: 'Email verification',
            //         text: 'Hello world?', 
            //         html: '<h1>You successfuly signed up!</h1>'
            //     })    

            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(nodemailerApiKey);
            const msg = {
                to: email,
                from: 'marinaysn@gmail.com',
                subject: 'Email verification',
                text: 'Thank you for signing up with us', 
                html: '<h1>You successfuly signed up!</h1>'
            };
            sgMail.send(msg);
            return res.redirect('/login')

        })
        //other approach
        // .then(result =>{
        //     res.redirect('/login')
        // })
        .catch(err => console.log(err));
}

exports.getSignUp = (req, res, next) => {
    res.render('auths/signup', {
        path: '/signup',
        isLoggedIn: false,
        docTitle: 'SignUp'
    })
}

exports.getResetPassword = (req, res, next) =>{
    let msg = req.flash('error')
    if (msg.length < 1) {
        msg = null
    }
    res.render('auths/reset', {
        path: '/reset',
        isLoggedIn: false,
        docTitle: 'Reset Your Password',
        errorMessage: msg
    })
}


exports.postResetPassword = (req, res, next) =>{
    crypto.randomBytes(32, (err, buffer) =>{
        if (err) {
            console.log(err);
            return res.redirect('/reset');
        }

        const token = buffer.toString('hex');
        User.findOne({email: req.body.email})
        .then(user =>{
            if(!user){
                console.log('111111111111')
                req.flash('error', 'No user with this email found');
                return res.redirect('/reset')
            }

            console.log('22222222222222')
            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 360000;
            return user.save();
        })
        .then( result =>{

            console.log('33333333333333333')
           // res.redirect('/login')
            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(nodemailerApiKey);
            const msg = {
                to: req.body.email,
                from: 'marinaysn@gmail.com',
                subject: 'Password Reset',
                text: 'Thank you for signing up with us', 
                html: `
                    <p> You requested a password reset</p>
                    <p>Click this <a href="http://localhost:3000/reset/${token}"> link </a> to set new password</p>
                `
            };
            sgMail.send(msg);
            return res.redirect('/login')

        })
        .catch(err =>{
            console.log(err)
        });
    })

}
