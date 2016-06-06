/**
 * Created by Tyler on 5/11/2016.
 */
function ProductsListController(ProductFactory, CartFactory) {
  var ctrl = this;
  ctrl.productList = ProductFactory.productList;
  ctrl.newProduct = {};
  
  ctrl.addProduct = function () {
    ProductFactory.addProduct(ctrl.newProduct)
      .then(function(){
        ctrl.message = ProductFactory.message;
      });
  };



  //Cart
  ctrl.cartList = [];
  ctrl.addCart = function(product, quantity) {
    CartFactory.addCart(product, quantity)
      .then(function(){
        ctrl.message = CartFactory.message;
      });
  };
    
  ProductFactory.getProducts()
    .then(function(){
      ctrl.productList = ProductFactory.productList;
    });
  
  
  
  //Favorites
  ctrl.favoritesList = [];
  ctrl.addFavorite = function(product){
    if(ctrl.favoritesList.indexOf(product) === -1){
      ctrl.errorMessage = '';
      ctrl.favoritesList.push(product);
    }else{
      ctrl.errorMessage = "Your favorites list already contains " + product.name + " by " + product.brand;
    }
  };
  ctrl.removeFavorite = function(index){
    ctrl.favoritesList.splice(index,1);
  };

}

angular
  .module('app')
  .controller('ProductsListController',ProductsListController);