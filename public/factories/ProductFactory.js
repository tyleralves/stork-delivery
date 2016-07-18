/**
 * Created by Tyler on 5/16/2016.
 */
function ProductFactory($http){
  'use strict';
  var ProductFactory = {};
  ProductFactory.productList = [];
  ProductFactory.categories = [];
  var apiResponse = {};
  var perPage = 12; 

  ProductFactory.getProducts = function(currentPage, category){
    return $http
      .get('/products', {
        //Sends query string to get request for mongoose query
        params: {currentPage: currentPage, category: category}
      })
      .then(function(products){
        //Makes local 'non-reference' copy of Walmart api response object
        angular.copy(products.data.products, ProductFactory.productList);
        angular.copy(products.data.categories, ProductFactory.categories);
        ProductFactory.totalPages = products.data.pages;
        console.log(ProductFactory.totalPages);
      });
  };

  return ProductFactory;
}


angular
  .module('app')
  .factory('ProductFactory', ProductFactory);