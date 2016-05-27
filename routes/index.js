var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var Product = mongoose.model('Product');
var User = mongoose.model('User');

var auth = expressJwt({secret: 'SECRET', userProperty: 'payload'});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function(req,res,next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User;
  user.username = req.body.username;
  user.setPassword(req.body.password);

  user.save(function(err, user){
    if(err){return next(err);}
    return res.json({token: user.generateJWT()});
  });
});

router.post('/login', function(req,res,next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){return next(err);}
    if(user){
      return res.json({token: user.generateJWT()});
    }else{
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.route('/products')
  .get(function(req, res, next){
    Product.find(function(err, products){
      if(err){return next(err);}
      res.json(products);
    });
  })
  .post(function(req, res, next){
    var product = new Product(req.body);

    product.save(function(err, product){
      if(err) {return next(err);}
      res.json(product);
    });
  });

router.route('/cart')
  .get(auth, function(req, res, next){
    console.log(req.payload);
    User.findOne({username: req.payload.username}, function(err, user){
      user.populate('cart.product', function(err, user){
        if(err){console.log(err);}
        res.json(user.cart);
      })
    });
  })
  .post(auth, function(req, res, next){
    if(req.body.quantity === 0){
      User.findOne({username: req.payload.username}, function(err, user){
        user.cart.splice(req.body.index, 1);
        user.save(function(err, user){
          console.log(user.cart);
          //res.json({message: 'Item removed from cart'});
        });
      })
    }
    var newCartItem = {
      product: req.body._id,
      quantity: req.body.quantity
    };
    User.update({username: req.payload.username, 'cart.product': {$ne: newCartItem.product}},
      {$push: {cart: newCartItem}},
      function(err, user){
        if(err){console.log(err);}
        console.log(err, user);
        if(!user.nModified){
          res.json({message: 'Item is already in your cart.'});
        }else{
          res.json({message: 'Item added to cart'});
        }
      });
  })
  .put(auth, function(req, res, next){
    User.findOne({username: req.payload.username}, function(err, user){
      console.log(req.body.quantity);
      user.cart[req.body.index].quantity = req.body.quantity;
      user.save(function(err, user){
        res.json({message: 'Cart quantity changed'});
      })
    });
  });


module.exports = router;
