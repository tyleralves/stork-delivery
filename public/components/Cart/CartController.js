/**
 * Created by Tyler on 5/21/2016.
 */
function CartController(CartFactory){
  var ctrl = this;
  
  ctrl.error = '';
  
  //ctrl.cartList = CartFactory.cartList;
  ctrl.removeCart = CartFactory.removeCart;
  
  ctrl.changeCartQuantity = CartFactory.changeCartQuantity;
  
  ctrl.getError = function(){
    ctrl.error = CartFactory.errorMessage;
    return ctrl.error;
  };
}

angular
  .module('app')
  .controller('CartController', CartController);
