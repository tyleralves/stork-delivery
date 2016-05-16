/**
 * Created by Tyler on 5/11/2016.
 */
function ProductsListController($http, ProductFactory) {
  var ctrl = this;
  ctrl.errorMessage = '';

  ctrl.addName = '';
  ctrl.addBrand = '';
  ctrl.addCategory = '';
  ctrl.addPrice = 0;
  ctrl.addDescription = '';
  
  ctrl.addProduct = function(){
    var newProduct = {
      name: ctrl.addName,
      brand: ctrl.addBrand,
      category: ctrl.addCategory,
      price: ctrl.addPrice,
      description: ctrl.addDescription
    };
    $http
      .post('/products',newProduct)
      .then(function addProductSuccess(product){
        ctrl.productList.push(product.data);
      }, function addProductError(error){
        ctrl.errorMessage = 'Could not add product!';
      });
  };
  
  //Cart
  ctrl.cartList = [];
  ctrl.addCart = function(product, quantity){
    if(ctrl.cartList.indexOf(product) === -1){
      console.log(ctrl);
      product.quantity = quantity;
      ctrl.cartList.push(product);
    }else{
      ctrl.errorMessage = "Your cart already contains " + product.name + " by " + product.brand +
          ". Please visit your cart to adjust item quantities.";
    }
  };
  ctrl.removeCart = function(index){
    ctrl.cartList.splice(index,1);
  };
  
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
  

  //Static productList for testing view
  /*ctrl.productList = [
    {
      name: 'Tissue (50 Ct)',
      brand: 'Kleenex',
      price: '5.00'
    }, {
      name: 'Whole Wheat Bread',
      brand: 'Roman Meal',
      price: '3.27'
    }, {
      name: 'Chili Spiced Mango',
      brand: "Trader Joe's",
      price: '4.56'
    }
  ];*/
}

angular
  .module('app')
  .controller('ProductsListController',ProductsListController);