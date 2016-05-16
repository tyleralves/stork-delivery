var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
