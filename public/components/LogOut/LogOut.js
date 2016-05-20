/**
 * Created by Tyler on 5/20/2016.
 */
angular
  .module('app')
  .component('logOut', {
    controller: 'LogOutController',
    bindings: {},
    template:"<a href='' ng-click='$ctrl.logOut();'>LogOut</a>"
  });