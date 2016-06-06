/**
 * Created by Tyler on 5/30/2016.
 */
function DealsController(ProductFactory, CartFactory) {
  var ctrl = this;
  ctrl.newProduct = {};


  ctrl.addCart = function(product, quantity){
    CartFactory.addCart(product, quantity)
      .then(function(response){
        ctrl.message = CartFactory.message;
        console.log(ctrl.message);
      });
  };

  ProductFactory.getProducts()
    .then(function(){
      ctrl.productList = ProductFactory.productList
        .filter(function(item, index, array){
          return item['brand'] === 'deal';
        });
    });
}

angular
  .module('app')
  .controller('DealsController', DealsController);