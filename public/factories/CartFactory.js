/**
 * Created by Tyler on 5/21/2016.
 */
function CartFactory($http, UserFactory){
  var CartFactory = {};
  CartFactory.cartList = [];
  
  CartFactory.getCart = function(){
    return $http
      .get('/cart', {
        headers: {authorization: 'Bearer ' + UserFactory.getToken()}
      })
      .then(function successCartGet(cartResponse){
        console.log(cartResponse.data);
        angular.copy(cartResponse.data, CartFactory.cartList);
        return CartFactory.cartList;
      })
  };
  
  CartFactory.addCart = function(product, quantity){
    if(CartFactory.cartList.indexOf(product.name) === -1){                          //Unsuccessful check for "product already exists"
      product.quantity = quantity;
      return $http
        .post('/cart', product, {
          headers: {authorization: 'Bearer ' + UserFactory.getToken()}
        })
        .then(function successCartPost(response){
          CartFactory.errorMessage = response.data.message;
          console.log(response.data.message);
          //CartFactory.cartList.push(product);
        });
    }else{
      CartFactory.errorMessage = "Your cart already contains " + product.name + " by " + product.brand +
        ". Please visit your cart to adjust item quantities.";
    }
  };

  CartFactory.removeCart = function(product, index){
    product.quantity = 0;
    product.index = index;
    return $http
      .post('/cart', product, {
        headers: {authorization: 'Bearer ' + UserFactory.getToken()}
      })
      .then(function successCartRemove(response){
        CartFactory.cartList.splice(index, 1);
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