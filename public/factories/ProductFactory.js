/**
 * Created by Tyler on 5/16/2016.
 */
function ProductFactory($http){
  var o = this;
  o.productList = [];
  return {
    getProducts: function(){
      return $http.get('/products').then(function(products){
        angular.copy(products.data, o.productList);
        return products.data;
      });
    }
  };
}


angular
  .module('app')
  .factory('ProductFactory', ProductFactory);