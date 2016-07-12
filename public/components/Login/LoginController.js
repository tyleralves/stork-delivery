/**
 * Created by Tyler on 5/16/2016.
 */
function LoginController(UserFactory, $state){
  'use strict';
  var ctrl = this;
  ctrl.user = {};

  ctrl.logIn = function(){
    UserFactory.logIn(ctrl.user)
      .then(function logInResponse(response){
        console.log(response);
        if(response.status === 400){
          ctrl.message = response.data.message;
        }else if(response.status === 401){
          ctrl.message = 'Username or password is incorrect';
        }else{
          $state.go('home');
        }
      });
  };

}

angular
  .module('app')
  .controller('LoginController', LoginController);