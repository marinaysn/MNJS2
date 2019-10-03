// to start run 'node .\app.js' or 'npm start'

const express = require('express');

const app = express();

app.use('/', (req, res, next)=>{
    console.log('This always runs');
    next();
    
})

app.use('/addProduct',(req, res, next) => {
    console.log('In another middleware')
    res.send('<h1>Add Products</h1>');
});

app.use('/',(req, res, next) => {
    console.log('In another middleware')
    res.send('<h1>Hello from Express</h1>');
});

app.listen(3000);