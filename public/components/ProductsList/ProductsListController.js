/**
 * Created by Tyler on 5/11/2016.
 */
function ProductsListController(ProductFactory, CartFactory, $window, $location, $scope) {
  var ctrl = this;

  ctrl.productList = ProductFactory.productList;
  ctrl.categories = ProductFactory.categories;
  ctrl.subcategories = ProductFactory.subcategories;
  ctrl.newProduct = {};
  //Gets currentPage from url, if present
  ctrl.currentPage = parseInt($location.search().currentPage) || 1;
  //Gets queryOptions from url, if present
  ctrl.queryOptions = $location.search().hasOwnProperty('queryOptions') ? JSON.parse($location.search().queryOptions) : {};



  //Add product to cart
  ctrl.cartList = [];
  ctrl.addCart = function(product, quantity) {
    CartFactory.addCart(product, quantity)
      .then(function(){
        ctrl.message = CartFactory.message;
        ctrl.error = CartFactory.error;
        if(!ctrl.error){
          ctrl.getProducts(null, true);
        }
      });
  };

  $scope.$on("queryOptions:updated", function(event,data){
    console.log(data);
    ctrl.getProducts(data);
  });

  //Get products array for view display
  ctrl.getProducts = function(queryOptions, persistMessage){
    //Clear error dialog
    ctrl.error = '';
    //If message doesn't need to persist, clear message
    //Note: persistMessage is true after items are added to cart
    if(!persistMessage){
      ctrl.message = '';
    }
    $window.scrollTo(0,0);
    //Temporary loading dialog, removed when productlist is populated
    ctrl.loading = 'Loading...';
    //Adds queryOptions specified in view to ctrl properties for persistence between search/ filter actions
    for(var prop in queryOptions){
      if(queryOptions.hasOwnProperty(prop)){
        //Template sends 'all' when user chooses all from the category or subcategory filters
        if(queryOptions[prop]==='all'){
          delete ctrl.queryOptions[prop];
        }else{
          ctrl.queryOptions[prop] = queryOptions[prop];
        }
      }
    }

    ProductFactory.getProducts(ctrl.currentPage, ctrl.queryOptions)
      .then(function(){
        ctrl.productList = ProductFactory.productList;
        ctrl.totalResults = ProductFactory.totalResults;
        ctrl.totalPages = ProductFactory.totalPages;

        //Calculates result statistics for display on results topbar
        ctrl.currentStartResult = (ctrl.currentPage-1)*16+1;
        ctrl.currentEndResult = ctrl.currentPage===ctrl.totalPages ? (ctrl.currentPage-1)*16 + ctrl.totalResults%16 : ctrl.currentPage*16;

        // True if the user filters through a subcategory selection
        if(ProductFactory.categories.length===1){
          ctrl.queryOptions.category = ProductFactory.categories[0];
        }
        ctrl.loading = false;
      });
  };
  ctrl.getProducts();
}

ProductsListController.$inject = ['ProductFactory', 'CartFactory', '$window', '$location', '$scope'];

angular
  .module('app')
  .controller('ProductsListController',ProductsListController);