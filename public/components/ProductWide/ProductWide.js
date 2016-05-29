/**
 * Created by Tyler on 5/28/2016.
 */
angular
  .module('app')
  .component('productWide', {
    bindings: {
      product: '<',
      quantity: '<',
      index: '<',
      onProductSelected: '&',
      onProductRemoved: '&',
      onQuantityChange: '&'
    },
    templateUrl: '/components/ProductWide/ProductWideView.html'
  });