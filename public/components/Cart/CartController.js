/**
 * Created by Tyler on 5/21/2016.
 */
function CartController(CartFactory){
  var ctrl = this;
  
  ctrl.cartList = CartFactory.cartList;
  
  ctrl.removeCart = function(product, index){
    CartFactory.removeCart(product, index)
      .then(function(){
        ctrl.message = CartFactory.message;
      });
  };
  
  ctrl.changeCartQuantity = function(product, index, quantity){
    CartFactory.changeCartQuantity(product, index, quantity)
      .then(function(response){
        ctrl.message = CartFactory.message;
      });
  };
  
  CartFactory.getCart()
    .then(function(){
      ctrl.cartList = CartFactory.cartList;
    });
}

angular
  .module('app')
  .controller('CartController', CartController);
