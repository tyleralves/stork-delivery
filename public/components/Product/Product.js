/**
 * Created by Tyler on 5/13/2016.
 */
angular
  .module('app')
  .component('product', {
    bindings: {
      product: '<',
      index: '<',
      onProductSelected: '&'
    },
    
    templateUrl: '/components/Product/ProductView.html'
  });