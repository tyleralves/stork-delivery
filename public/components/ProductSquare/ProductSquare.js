/**
 * Created by Tyler on 5/13/2016.
 */
angular
  .module('app')
  .component('productSquare', {
    bindings: {
      product: '<',
      quantity: '<',
      index: '<',
      onProductSelected: '&',
      onProductRemoved: '&',
      onQuantityChange: '&'
    },
    templateUrl: '/components/ProductSquare/ProductSquareView.html'
  });