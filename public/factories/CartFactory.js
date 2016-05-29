/**
 * Created by Tyler on 5/21/2016.
 */
function CartFactory($http, $location, UserFactory){
  var CartFactory = {};
  CartFactory.cartList = [];
  CartFactory.httpResponse = {};
  
  CartFactory.getCart = function(){
    return $http
      .get('/cart', {
        headers: {authorization: 'Bearer ' + UserFactory.getToken()}
      })
      .then(function successCartGet(cartResponse){
        angular.copy(cartResponse.data, CartFactory.cartList);
      })
  };
  
  CartFactory.addCart = function(product, quantity){
    product.quantity = quantity;
    return $http
      .post('/cart', product, {
        headers: {authorization: 'Bearer ' + UserFactory.getToken()}
      })
      .then(function successCartPost(response){
        CartFactory.message = response.data.message;
      });
  };

  CartFactory.removeCart = function(product, index){
    //$location.search('function', 'remove');
    product.quantity = 0;
    product.index = index;
    return $http
      .post('/cart', product, {
        headers: {authorization: 'Bearer ' + UserFactory.getToken()}
      })
      .then(function successCartRemove(response){
        CartFactory.cartList.splice(index, 1);
        CartFactory.message = response.data.message;
      });
  };

  CartFactory.changeCartQuantity = function(index, quantity){
    return $http
      .put('/cart', {'index': index, 'quantity': quantity}, {
        headers: {authorization: 'Bearer ' + UserFactory.getToken()}
      })
      .then(function successCartQuantity(response){
        CartFactory.cartList[index].quantity = quantity;
      });
  };
  
  return CartFactory;
}

angular
  .module('app')
  .factory('CartFactory', CartFactory);