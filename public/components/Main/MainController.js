/**
 * Created by Tyler on 5/21/2016.
 */
function MainController(UserFactory, LoadingFactory){
  var ctrl = this;

  ctrl.loadingFactory = LoadingFactory;

  //User
  ctrl.currentUser = UserFactory.currentUser;
  ctrl.isLoggedIn = UserFactory.isLoggedIn;
  ctrl.logOut = UserFactory.logOut;
}

angular
  .module('app')
  .controller('MainController', MainController);