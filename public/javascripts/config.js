/**
 * Created by Tyler on 5/16/2016.
 */
angular
  .module('app')
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', {
        url: '',
        resolve: {
          products: function(ProductFactory){
            return ProductFactory
              .getProducts();
          }
        },
        controller: function($scope, products){
          $scope.productList = products;
          console.log($scope.productList);
        },
        template:'<products-list product-list = "productList"></products-list>'
        //templateUrl: 'components/ProductList/ProductListView.html'
      });
    $urlRouterProvider.otherwise('/');
  });