/**
 * Created by Tyler on 5/13/2016.
 */
angular
  .module('app')
  .component('productsList', {
    bindings: {
      product: '<'
    },
    controller: 'ProductsListController',
    templateUrl: '/javascripts/components/ProductList/ProductsListView.html'
  });