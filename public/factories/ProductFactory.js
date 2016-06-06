/**
 * Created by Tyler on 5/16/2016.
 */
function ProductFactory($http){
  var ProductFactory = {};
  ProductFactory.productList = [];
  
    ProductFactory.getProducts = function(){
      return $http
        .get('/products')
        .then(function(products){
          angular.copy(products.data, ProductFactory.productList);
        });
    };
  
    ProductFactory.addProduct = function(newProduct){
      return $http
        .post('/products',newProduct)
        .then(function addProductSuccess(product){
          ProductFactory.productList.push(product.data);
          ProductFactory.message = 'Added product: ' + product.data.name;
        }, function addProductError(error){
          ProductFactory.message = 'Could not add product!';
        });
    };
  return ProductFactory;
}


angular
  .module('app')
  .factory('ProductFactory', ProductFactory);