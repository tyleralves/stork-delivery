/**
 * Created by Tyler on 5/13/2016.
 */
angular
  .module('app')
  .component('productsList', {
    bindings: {
      deals: '<'
    },
    controller: 'ProductsListController',
    templateUrl: '/components/ProductsList/ProductsListView.html'
  });