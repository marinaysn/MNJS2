// to start run 'node .\app.js' or 'npm start'
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({extended: false}));

// app.use('/', (req, res, next)=>{
//     //console.log('This always runs');
//     next();
    
// })

app.use('/addProduct',(req, res, next) => {
   // console.log('In another middleware')
    res.send('<form action="/product" method="POST"><input type="text" name ="title"><button type="submit">Add Product</button></form>');
});

app.post('/product', (req, res, next)=>{
    console.log("*******************")
    console.log(req.body)
    res.redirect('/');
});

app.use('/',(req, res, next) => {
  //  console.log('In another middleware')
    res.send('<h1>Hello from Express</h1>');
});

app.listen(3000);