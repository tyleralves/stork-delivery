/**
 * Created by Tyler on 5/21/2016.
 */
angular
  .module('app')
  .component('cart', {
    controller: 'CartController',
    bindings: {
      cartList: '<'
    },
    templateUrl: '/components/Cart/CartView.html'
  });