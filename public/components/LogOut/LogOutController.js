/**
 * Created by Tyler on 5/20/2016.
 */
function LogOutController(UserFactory){
  var ctrl = this;
  ctrl.logOut = function(){
    UserFactory.logOut();
  };
}

angular
  .module('app')
  .controller('LogOutController', LogOutController);