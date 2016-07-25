/**
 * Created by Tyler on 5/16/2016.
 */
angular
  .module('app')
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', {
        url: '/',
        template:'<products-list></products-list>'
      })
      .state('register', {
        url: '/register',
        template: '<register></register>'
      })
      .state('login', {
        url:'/login',
        template: '<login></login>'
      })
      .state('productList', {
        url:'/products',
        template:'<products-list></products-list>'
      })
      .state('cart', {
        url:'/cart',
        template: '<cart></cart>'
      })
      .state('deals', {
        url: '/deals',
        template: '<products-list></products-list>',
        controller: function($location){
          $location.search('queryOptions', JSON.stringify({deal:true}));
        }
      });
    $urlRouterProvider.otherwise('/');
  });