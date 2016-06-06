/**
 * Created by Tyler on 5/21/2016.
 */
function CartFactory($http, $q, $location, UserFactory){
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
    //Client side validation to determine if product is already in user's cart
    //Note: Only performed if CartFactory.cartList has already been populated
    if(CartFactory.cartList.length && product._id === CartFactory.cartList[0].product._id){
      CartFactory.message = "Item is already in your cart.";
      return $q(function(resolve,reject){
        resolve();
      });
    //Validates that user selects a positive quantity
    }else if(quantity < 1){
      CartFactory.message = "Please select the desired quantity to add to your cart.";
      return $q(function(resolve,reject){
        resolve();
      });
    }
    
    product.quantity = quantity;
    return $http
      .post('/cartAddProduct', product, {
        headers: {authorization: 'Bearer ' + UserFactory.getToken()}
      })
      .then(
        function successCartPost(response){
          CartFactory.message = response.data.message;
          //The response will include the addedProduct property only if the product didn't already exist in the user's cart
          if(response.data.hasOwnProperty('addedProduct')){
            CartFactory.cartList.push(response.data.addedProduct);
          }
      }, function errorCartPost(response){
          console.log(CartFactory.cartList);
          CartFactory.message = response.data.message;
      });
  };

  CartFactory.removeCart = function(product){
    return $http
      .post('/cartRemoveProduct', product, {
        headers: {authorization: 'Bearer ' + UserFactory.getToken()}
      })
      .then(function successCartRemove(response){
        CartFactory.cartList.splice(response.data.removeIndex, 1);
        CartFactory.message = response.data.message;
      });
  };

  CartFactory.changeCartQuantity = function(product, index, quantity){
    return $http
      .post('/cartModifyQuantity', {'product': product, 'index': index, 'quantity': quantity}, {
        headers: {authorization: 'Bearer ' + UserFactory.getToken()}
      })
      .then(function successCartQuantity(response){
        CartFactory.cartList[index].quantity = quantity;
        CartFactory.message = response.data.message;
      });
  };
  
  return CartFactory;
}

angular
  .module('app')
  .factory('CartFactory', CartFactory);