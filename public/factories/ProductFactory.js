/**
 * Created by Tyler on 5/16/2016.
 */
function ProductFactory($http){
  'use strict';
  var ProductFactory = {};
  ProductFactory.productList = [];
  var apiResponse = {};
  var perPage = 12; 

  ProductFactory.getProducts = function(currentPage){
    return $http
      .get('/products', {
        //Sends query string to get request to be appended to walmart api url
        params: {currentPage: currentPage}
      })
      .then(function(products){
        //Makes local 'non-reference' copy of Walmart api response object
        angular.copy(products.data.products, ProductFactory.productList);
        ProductFactory.totalPages = products.data.pages;
        console.log(ProductFactory.totalPages);
      });
  };

  return ProductFactory;
}


angular
  .module('app')
  .factory('ProductFactory', ProductFactory);