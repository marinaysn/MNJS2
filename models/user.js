const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class User {
    constructor(firstName, lastName, email){
       this.fname = firstName;
       this.lname = lastName;
       this.email = email;
    }
    save(){
       // const db = getDb();
        return getDb().collection('user').insertOne(this)
        .then( result =>{})
        .catch(err => console.log(err));

    }

    static findUserById(userId){

        return getDb().collection('user').findOne({_id: new mongodb.ObjectID(userId)})
        .then(result =>{})
        .catch(err=>console.log(err))
    }
}


module.exports = User;