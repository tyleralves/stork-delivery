var express = require('express');
var router = express.Router();
var Q = require('q');
var mongoose = require('mongoose');
mongoose.Promise = Q.Promise;
var passport = require('passport');
var request = require('request');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var Product = mongoose.model('Product');
var User = mongoose.model('User');
var Category = mongoose.model('Category');

var auth = expressJwt({secret: process.env.JWT_SECRET, userProperty: 'payload'});

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
      if(err.code === 11000){
        return res.status(400).json({message: 'Username already exists'});
      }else{
        return next(err);
      }
    }
   
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

/*Used to populate categories collection from Walmart taxonomy api
router.route('/populatecategories')
  .get(function(req, res, next){
    //Walmart api url
    var wmUrl = "http://api.walmartlabs.com/v1/taxonomy?apiKey=ky2dqkc2sx2npuh5p3tbc2sx";

    request({
      url:wmUrl,
      json: true
    }, function(error, response, body){
      console.log(body);
      body.categories.forEach(function(item){
        var category = new Category();
        for(var prop in item){
          if(item.hasOwnProperty(prop)){
            category[prop]= item[prop];
          }
        }
        category.save(function(err,category){});
      });
      res.json(body);
    });
  });
 */
/*Used to populate product collection from Walmart api
router.route('/populateproducts')
  .get(function(req, res, next){
    //Walmart api url
    var productUrl = "", queryStart = 1;
    var iArray = [1,2,3,4,5,6,7,8,9,10];
    iArray.forEach(function(item, index, array){
      queryStart = 1 + (index)*25;
      productUrl = "http://api.walmartlabs.com/v1/search?apiKey=ky2dqkc2sx2npuh5p3tbc2sx&query=dvd&categoryId=3944&numItems=25&start=" + queryStart;
      console.log(queryStart);
      (function asyncStuff(productUrl){
        setTimeout(function(){
          request({
            url: productUrl,
            json: true
          }, function (error, response, body) {

            body.items.forEach(function (item, index, array) {
              var product = new Product();
              product.name = item.name;
              product.salePrice = item.salePrice;
              product.description = item.shortDescription;
              product.mediumImage = item.mediumImage;
              product.categoryNode = item.categoryNode;
              product.category = item.categoryPath.slice(0,item.categoryPath.indexOf('/'));
              product.midCategory = item.categoryPath.slice(item.categoryPath.indexOf('/')+1,item.categoryPath.lastIndexOf('/'));
              product.subCategory = item.categoryPath.slice(item.categoryPath.lastIndexOf('/')+1);
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
  var totalPages,
    perPage = 16;

  var queryOptions = req.query.hasOwnProperty('queryOptions')?JSON.parse(req.query.queryOptions):{};
  console.log(req.query);
  // Retrieves products and paginates
  // May need to implement different pagination strategy if Product collection grows very large
  var productQuery = Product.find(queryOptions)
    .limit(perPage)
    .skip(perPage*(req.query.currentPage-1))
    .sort({
      _id: 1
    }).exec();
  //Gets count of matching documents to derive number of pages
  var countQuery = Product.find(queryOptions).count().exec();
  //Gets all categories within full search result (for filter options)
  var categoryQuery = Product.find(queryOptions).distinct('category').exec();
  //Gets all subcategories within full search result categories
  var subCatQuery = Product.find(queryOptions).distinct('subCategory').exec();

  //Performs all database operations in parallel and sends json response
  Q.spread([productQuery,countQuery,categoryQuery,subCatQuery],
    function(products, count, categories, subcategories) {
      totalPages = Math.ceil(count / perPage);
      res.json({pages: totalPages, totalResults: count, products: products, categories: categories, subcategories: subcategories});
    })
    .catch(function(err){
      console.log(err);
    });

});

router.get('/cart', auth, function(req, res, next){
  var userQuery = User.findOne({username: req.payload.username}).exec();
  userQuery.then(function(user){
    user.populate('cart.product', function(err, user){
      if(err){return next(err);}
      res.json(user.cart);
    });
  })
  .catch(function(err){
    console.log(err);
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
  var removeIndex;
  var userQuery = User.findOne({username: req.payload.username}).exec();

  var productQuery = userQuery.then(function (user) {
    removeIndex = findCartIndex(user);
    return Product.update({_id: req.body.product._id}, {$inc: {quantity: user.cart[removeIndex].quantity}}).exec();
  });

  Q.spread([userQuery, productQuery], function (user, product) {
      user.cart.splice(removeIndex, 1);
      user.save(function () {
        res.json({message: 'Item removed from cart', removeIndex: removeIndex});
      });
    })
    .catch(function(err){
      console.log(err);
    });
});
  
router.post('/cartAddProduct', auth, function(req, res){
  var newCartItem = {
    product: req.body._id,
    quantity: req.body.quan
  };

  var userQuery = User.update({username: req.payload.username, 'cart.product': {$ne: newCartItem.product}},
    {$push: {cart: newCartItem}}).exec();
  
  var productQuery = Product.findById({_id:req.body._id, quantity: {$gte: newCartItem.quantity}}).exec();

  var productPromise = productQuery
    .then(function(product){
      if(product.nModified === 0) {
        res.json({message: 'Product no longer has sufficient quantity in stock.'});
      }else{
        return product;
      }
    });


  Q.spread([productPromise, userQuery],function(product, user){
    if(!user.nModified){
      res.json({message: 'Item is already in your cart.'});
    }else{
      product.quantity -= newCartItem.quantity;
      product.save();
      res.json({message: 'Item added to cart', addedProduct: newCartItem});
    }
  })
    .catch(function(err){
      console.log(err);
    });
});

router.post('/cartModifyQuantity', auth, function(req, res){
  var previousQuantity;
  var productQuery = Product.findOne({_id: req.body.product._id}).exec();
  var userQuery = User.findOne({username: req.payload.username}).exec();

  Q.spread([productQuery, userQuery], function(product, user){
    previousQuantity = user.cart[req.body.index].quantity;
    if(product.quantity >= req.body.quantity-previousQuantity){
      product.quantity += previousQuantity-req.body.quantity;
      product.save(function(err, product){
        user.cart[req.body.index].quantity = req.body.quantity;
        user.save(function(){
          res.json({message: 'Cart quantity changed', product: product});
        });
      });
    }else{
       res.json({message: 'Insufficient inventory, reduce quantity in cart'});
    }
  })
  .catch(function(err){
    console.log(err);
  });
});

module.exports = router;