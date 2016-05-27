/**
 * Created by Tyler on 5/16/2016.
 */
angular
  .module('app')
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', {
        url: '/',
        resolve: {
          products: function(ProductFactory){
            return ProductFactory
              .getProducts();
          }
        },
        controller: function($scope, products){
          $scope.productList = products;
        },
        template:'<products-list product-list = "productList"></products-list>'
        //templateUrl: 'components/ProductList/ProductListView.html'
      })
      .state('register', {
        url: '/register',
        template: '<register></register>'
      })
      .state('login', {
        url:'/login',
        template: '<login></login>'
      })
      .state('cart', {
        url:'/cart',
        resolve: {
          cartList: function(CartFactory){
            return CartFactory.getCart();
          }
        },
        controller: function($scope, cartList){
          $scope.cartList = cartList;
        },
        template: '<cart cart-list = "cartList"></cart>'
      });
    $urlRouterProvider.otherwise('/');
  });