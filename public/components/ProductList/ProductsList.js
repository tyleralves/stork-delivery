/**
 * Created by Tyler on 5/13/2016.
 */
angular
  .module('app')
  .component('productsList', {
    bindings: {
      productList: '<'
    },
    controller: 'ProductsListController',
    templateUrl: '/components/ProductList/ProductsListView.html'
  });