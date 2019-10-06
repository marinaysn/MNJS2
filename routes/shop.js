const express = require('express');
const path = require('path');
const rootDir = require('../util/path');
const adminData = require("./admin")
const routes = express.Router()


routes.get('/',(req, res, next) => {
    console.log("3*******************");
  console.log(adminData.products)

      res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  });


  module.exports = routes;