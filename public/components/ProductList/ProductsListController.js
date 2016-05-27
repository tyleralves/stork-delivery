/**
 * Created by Tyler on 5/11/2016.
 */
function ProductsListController($http, ProductFactory, CartFactory) {
  var ctrl = this;
  ctrl.errorMessage = '';
  ctrl.newProduct = {};
  
  ctrl.addProduct = function () {
    ProductFactory.addProduct(ctrl.newProduct);
  };
  
  //Cart
  ctrl.cartList = [];
  ctrl.addCart = CartFactory.addCart;
    
    
  
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