/**
 * Created by Tyler on 5/21/2016.
 */
function CartFactory($http, $q, UserFactory, ProductFactory){
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
      });
  };
  
  CartFactory.addCart = function(product, quantity){
    if(!quantity){
      CartFactory.message = "Please select the desired quantity to add to your cart.";
      return $q(function(resolve){
        resolve();
      });
    }else{
      console.log(product._id);
      product.quan = quantity;
      return $http
        .post('/cartAddProduct', product, {
          headers: {authorization: 'Bearer ' + UserFactory.getToken()}
        })
        .then(
          function successCartPost(response){
            console.log('successCartPost');
            CartFactory.message = response.data.message;
            //The response will include the addedProduct property only if the product didn't already exist in the user's cart
            if(response.data.hasOwnProperty('addedProduct')){
              CartFactory.cartList.push(response.data.addedProduct);
              ProductFactory.getProducts();
            }
          }, function errorCartPost(response){
            CartFactory.message = response.data.message;
          });
    }
    
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
        //Update client-side modified cartList item with new quantity so that view updates the cart quantity select
        CartFactory.cartList[index].quantity = quantity;
        //Update client-side product available inventory so that view updates the cart quantity select (range filter maximum)
        product.quantity = response.data.product.quantity;
        //Update message from server routing, if available
        CartFactory.message = response.data.message;
      });
  };

  CartFactory.cartTotal = function(){
    var i, length, total = 0;
    console.log(CartFactory.cartList);
    for(i = 0, length = CartFactory.cartList.length; i<length; i++){
      total += CartFactory.cartList[i].quantity * CartFactory.cartList[i].product.salePrice;
    }
    return total;
  };
  
  return CartFactory;
}

angular
  .module('app')
  .factory('CartFactory', CartFactory);