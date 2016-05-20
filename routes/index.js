var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var Product = mongoose.model('Product');
var User = mongoose.model('User');

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


module.exports = router;
