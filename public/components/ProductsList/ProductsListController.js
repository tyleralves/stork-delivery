/**
 * Created by Tyler on 5/11/2016.
 */
function ProductsListController(ProductFactory, CartFactory, $window) {
  var ctrl = this;
  ctrl.productList = ProductFactory.productList;
  ctrl.categories = ProductFactory.categories;
  ctrl.subcategories = ProductFactory.subcategories;
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
  ctrl.getProducts = function(queryOptions){
    $window.scrollTo(0,0);
    ctrl.loading = 'Loading...';
    for(var prop in queryOptions){
      if(queryOptions.hasOwnProperty(prop)){
        //Template sends 'all' when user chooses all from the category or subcategory filters
        if(queryOptions[prop]==='all'){
          delete ctrl[prop];
        }else{
          ctrl[prop] = queryOptions[prop];
        }
      }
    }
    ProductFactory.getProducts(ctrl.currentPage, {category:ctrl.category, subCategory:ctrl.subCategory})
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