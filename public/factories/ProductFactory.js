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
    //Increments or decrements currentPage based on whether user choose 'Next Page' or 'Previous Page'
    var startItem = perPage * currentPage + 1 - perPage;
    var apiString = "/v1/search?apiKey=ky2dqkc2sx2npuh5p3tbc2sx&query=ipod&start=" + startItem + "&numItems=" + perPage;
    console.log(currentPage);
    console.log(apiString);
    return $http
      .get('/products', {
        //Sends query string to get request to be appended to walmart api url
        params: {page: apiString}
      })
      .then(function(products){
        console.log(products);
        //Makes local 'non-reference' copy of Walmart api response object
        angular.copy(products.data.items, ProductFactory.productList);
        var totalResults = products.data.totalResults < 1000 ? products.data.totalResults : 999;
        ProductFactory.totalPages = Math.floor(totalResults/perPage);
        console.log(ProductFactory.totalPages);
      });
  };

  return ProductFactory;
}


angular
  .module('app')
  .factory('ProductFactory', ProductFactory);