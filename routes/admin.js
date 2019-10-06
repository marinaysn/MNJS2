const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');

router.get('/addProduct',(req, res, next) => {
    // console.log('In another middleware')
     res.sendFile(path.join(rootDir, 'views', 'addProduct.html'));
 });
 
 router.post('/addProduct', (req, res, next)=>{
     console.log("*******************")
     console.log(req.body)
     res.redirect(301, '/');
 });

 module.exports = router;