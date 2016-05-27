/**
 * Created by Tyler on 5/13/2016.
 */
angular
  .module('app')
  .component('product', {
    bindings: {
      product: '<',
      quantity: '<',
      index: '<',
      onProductSelected: '&',
      onProductRemoved: '&',
      onQuantityChange: '&'
    },
    
    templateUrl: '/components/Product/ProductView.html'
  });