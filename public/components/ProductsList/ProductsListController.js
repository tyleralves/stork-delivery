/**
 * Created by Tyler on 5/11/2016.
 */
function ProductsListController(ProductFactory, CartFactory, $window) {
  var ctrl = this;
  ctrl.productList = ProductFactory.productList;
  ctrl.newProduct = {};
  ctrl.currentPage = 1;

  //Add product to cart
  ctrl.cartList = [];
  ctrl.addCart = function(product, quantity) {
    CartFactory.addCart(product, quantity)
      .then(function(){
        ctrl.message = CartFactory.message;
      });
  };

  //Get products array for view display
  ctrl.getProducts = function(){
    $window.scrollTo(0,0);
    ctrl.loading = 'Loading...';
    ProductFactory.getProducts(ctrl.currentPage)
      .then(function(){
        ctrl.productList = ProductFactory.productList;
        ctrl.totalPages = ProductFactory.totalPages;
        ctrl.loading = false;
      });
  };
  ctrl.getProducts();
}

angular
  .module('app')
  .controller('ProductsListController',ProductsListController);