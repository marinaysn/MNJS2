const express = require('express');
const router = express.Router();


router.get('/addProduct',(req, res, next) => {
    // console.log('In another middleware')
     res.send('<form action="/product" method="POST"><input type="text" name ="title"><button type="submit">Add Product</button></form>');
 });
 
 router.post('/product', (req, res, next)=>{
     console.log("*******************")
     console.log(req.body)
     res.redirect('/');
 });

 module.exports = router;