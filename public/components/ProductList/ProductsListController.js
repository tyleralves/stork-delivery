/**
 * Created by Tyler on 5/11/2016.
 */
function ProductsListController() {
  var ctrl = this;
  
  //Cart
  ctrl.cartList = [];
  ctrl.addCart = function(product, quantity){
    if(ctrl.cartList.indexOf(product) === -1){
      ctrl.errorMessage = '';
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

  //Products
  ctrl.productList = [
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
  ];
}

angular
  .module('app')
  .controller('ProductsListController',ProductsListController);