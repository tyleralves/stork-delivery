/**
 * Created by Tyler on 5/21/2016.
 */
function CartController(CartFactory, LoadingFactory){
  'use strict';
  var ctrl = this;
  ctrl.LoadingFactory = LoadingFactory;

  CartFactory.getCart()
    .then(function(){
      LoadingFactory.viewLoadedToggle();
      ctrl.cartList = CartFactory.cartList;
      ctrl.cartTotal = CartFactory.cartTotal();
    });
 
  
  ctrl.removeCart = function(product, index){
    CartFactory.removeCart(product, index)
      .then(function(){
        ctrl.message = CartFactory.message;
        ctrl.cartTotal = CartFactory.cartTotal();
      });
  };
  
  ctrl.changeCartQuantity = function(product, index, quantity){
    CartFactory.changeCartQuantity(product, index, quantity)
      .then(function(response){
        ctrl.message = CartFactory.message;
        ctrl.cartTotal = CartFactory.cartTotal();
      });
  };
}

angular
  .module('app')
  .controller('CartController', CartController);
