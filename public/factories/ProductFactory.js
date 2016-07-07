/**
 * Created by Tyler on 5/16/2016.
 */
function ProductFactory($http){
  var ProductFactory = {};
  ProductFactory.productList = [];
  ProductFactory.prevPage = false;
  ProductFactory.nextPage = '';
  var apiResponse = {};
  var pageArray = ["/v1/paginated/items?brand=nike&apiKey=ky2dqkc2sx2npuh5p3tbc2sx&format=json"];
  var currentPage = 0;

  ProductFactory.getProducts = function(pageChange){
    //Increments or decrements currentPage based on whether user choose 'Next Page' or 'Previous Page'
    currentPage += pageChange;
    console.log(currentPage);
    console.log(pageArray.length);
    return $http
      .get('/products', {
        //Sends query string to get request to be appended to walmart api url
        params: {page: pageArray[currentPage]}
      })
      .then(function(products){
        //Makes local 'non-reference' copy of Walmart api response object
        angular.copy(products.data, apiResponse);
        //If 
        if(!pageChange || pageChange>0){
          pageArray.push(apiResponse.nextPage);
        }else if(pageChange<0){
          pageArray.pop();
          console.log('pop');
        }
        ProductFactory.prevPage = currentPage >0;
        ProductFactory.productList = apiResponse.items;
      });
  };

  return ProductFactory;
}


angular
  .module('app')
  .factory('ProductFactory', ProductFactory);