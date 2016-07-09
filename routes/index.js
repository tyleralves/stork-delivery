var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var request = require('request');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var Product = mongoose.model('Product');
var User = mongoose.model('User');

var auth = expressJwt({secret: 'SECRET', userProperty: 'payload'});

router.post('/register', function(req,res,next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;
  user.setPassword(req.body.password);

  user.save(function(err, user){
    if(err){
      console.log(err);
      return next(err);}
   
    res.json({token: user.generateJWT()});
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


/*Used to populate product collection from Walmart api
router.route('/populateproducts')
  .get(function(req, res, next){
    //
    //Walmart api url
    var productUrl = "", queryStart = 1;
    var iArray = [1,2,3,4,5,6,7,8,9,10];
    iArray.forEach(function(item, index, array){
      queryStart = 1 + (index)*25;
      productUrl = "http://api.walmartlabs.com/v1/search?apiKey=ky2dqkc2sx2npuh5p3tbc2sx&query=a&categoryId=3944&numItems=25&start=" + queryStart;
      console.log(queryStart);
      (function asyncStuff(productUrl){
        setTimeout(function(){
          request({
            url: productUrl,
            json: true
          }, function (error, response, body) {
            console.log(body);

            body.items.forEach(function (item, index, array) {
              var product = new Product();
              product.name = item.name;
              product.salePrice = item.salePrice;
              product.description = item.shortDescription;
              product.mediumImage = item.mediumImage;
              product.quantity = 9;
              product.save(function (err, product) {

              });
            });
          });},200*index);
      })(productUrl);
    });
    res.json({done: 'done!'});
  });
*/

router.get('/products', function(req,res,next){
  var totalPages, perPage = 12;
  //Pagination
  // May need to implement different pagination strategy if Product collection grows very large
  Product
    .find({})
    .limit(perPage)
    .skip(perPage*(req.query.currentPage-1))
    .sort({
      _id: 1
    })
    .exec(function(err, products){
      //Gets count of matching documents to derive number of pages
      Product.find({}).count().exec(function(err, count){
        totalPages = Math.ceil(count/perPage);
        res.json({pages: totalPages,products:products});
      });
  });
});

router.get('/cart', auth, function(req, res, next){
  User.findOne({username: req.payload.username}, function(err, user){
    user.populate('cart.product', function(err, user){
      if(err){return next(err);}
      console.log(user);
      res.json(user.cart);
    });
  });
});

router.post('/cartRemoveProduct', auth, function(req, res, next) {
  function findCartIndex(user){
    var i, length;
    for(i = 0, length = user.cart.length; i < length; i++) {
      console.log(i);
      if (user.cart[i].product.equals(req.body.product._id)) {
        return i;
      }
    }
  }
  
  User.findOne({username: req.payload.username}, function (err, user) {
    var removeIndex = findCartIndex(user);
    Product.update({_id: req.body.product._id}, {$inc: {quantity: user.cart[removeIndex].quantity}},
      function (err, product) {
        if (err) {next(err);}
        user.cart.splice(removeIndex, 1);
        user.save(function (err, user) {
          res.json({message: 'Item removed from cart', removeIndex: removeIndex});
        });
      }
    );
    
  });
});
  
router.post('/cartAddProduct', auth, function(req, res, next){
  var newCartItem = {
    product: req.body._id,
    quantity: req.body.quan
  };

  function addCartItem(product){
    User.update({username: req.payload.username, 'cart.product': {$ne: newCartItem.product}},
      {$push: {cart: newCartItem}},
      function(err, user){
        if(err){
          console.log(err);
          return next(err);
        }
        if(!user.nModified){
          res.json({message: 'Item is already in your cart.'});
        }else{
          product.quantity -= newCartItem.quantity;
          product.save();
          res.json({message: 'Item added to cart', addedProduct: newCartItem});
        }
      }
    );
  }
  
  Product.findById({_id:req.body._id, quantity: {$gte: newCartItem.quantity}},
    function(err, product){
      if(err) {
        return next(err);
      }else if(product.nModified === 0) {
        res.json({message: 'Product no longer has sufficient quantity in stock.'});
      }else{
        addCartItem(product);
      }
  });
});

router.post('/cartModifyQuantity', auth, function(req, res, next){        
  var previousQuantity;
  Product.findOne({_id: req.body.product._id}, function(err, product){
    User.findOne({username: req.payload.username}, function(err, user){
      previousQuantity = user.cart[req.body.index].quantity;
      if(product.quantity >= req.body.quantity-previousQuantity){
        product.quantity += previousQuantity-req.body.quantity;
        product.save(function(err, product){
          user.cart[req.body.index].quantity = req.body.quantity;
          user.save(function(err, user){
            res.json({message: 'Cart quantity changed', product: product});
          });
        });
      }else{
         res.json({message: 'Insufficient inventory, reduce quantity in cart'});
      }
    });
  });
});

module.exports = router;