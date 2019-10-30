// to start run 'node .\app.js' or 'npm start'
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const errorsController = require('./controllers/errors');
const sequelize = require('./util/database');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem');
const Order = require('./models/order');
const OrderItem = require('./models/orderItem');

const login = require('./routes/login');
const about = require('./routes/about');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

// ****** EJS Template Engine ******** //
app.set('view engine', 'ejs');
// set where templates are
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) =>{
  User.findByPk(1).then(user =>{
    req.session.user = user;
    next();
  }).catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(login);
app.use(about);
app.use(shopRoutes);

app.use(
  errorsController.get404error
);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});



sequelize
// .sync({force: true})
.sync()
.then( result =>{
return User.findByPk(1)
})
.then(user =>{
  if(!user) {
   return User.create({ firstName: 'Marina', lastName: 'Ysn', email: 'test@test.com'} )
  }
  return user;
})
.then(user =>{

      return user.createShoppingCart()  
  
})
.then(cart =>{
  app.listen(3000);
})
.catch(err => console.log(err))

