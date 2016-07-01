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
  })
  .filter('range', function(){
    return function(input, min, max){
      min = parseInt(min);
      max = parseInt(max);
      return Array.apply(null, new Array(max-min+1)).map(function(item, index){
        return index+1;
      });
    }
  });
