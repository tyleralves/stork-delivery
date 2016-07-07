/**
 * Created by Tyler on 5/11/2016.
 */
function ProductsListController(ProductFactory, CartFactory, $window) {
  var ctrl = this;
  ctrl.productList = ProductFactory.productList;
  ctrl.newProduct = {};

  //Add product to cart
  ctrl.cartList = [];
  ctrl.addCart = function(product, quantity) {
    CartFactory.addCart(product, quantity)
      .then(function(){
        ctrl.message = CartFactory.message;
      });
  };

  //Get products array for view display
  ctrl.getProducts = function(pageChange){
    $window.scrollTo(0,0);
    ctrl.loading = 'Loading...';
    ProductFactory.getProducts(pageChange || 0)
      .then(function(){
        ctrl.productList = ProductFactory.productList;
        ctrl.prevPage = ProductFactory.prevPage;
        ctrl.loading = false;
      });
  };
  ctrl.getProducts();
  
}

angular
  .module('app')
  .controller('ProductsListController',ProductsListController);