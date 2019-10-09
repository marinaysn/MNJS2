const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');



module.exports = class Product {
    constructor(t){

        this.title = t;
    }

    save() {
        const p = path.join(rootDir, 'data', 'products.json');

        fs.readFile(p, (err, fileContend) =>{
            let products = [];
            if(!err){
                products= JSON.parse(fileContend);
            }
            products.push(this);

            fs.writeFile(p, JSON.stringify(products), (err)=>{
            });
        })
    }

    static fetchAll(callback){
        const p = path.join(rootDir, 'data', 'products.json');
  
        fs.readFile(p, (err, fileContend) =>{
   
            if(err){

                callback([]);
            }
            callback(JSON.parse(fileContend));
        })
    }

}