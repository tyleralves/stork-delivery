/**
 * Created by Tyler on 7/26/2016.
 */
function ProductSearchController($location, $rootScope){
  var ctrl = this;
  ctrl.keyword = '';

  ctrl.addKeyword = function(){
    var queryOptions = {};
    queryOptions.keyword = ctrl.keyword;
    $rootScope.$broadcast("queryOptions:updated", queryOptions);
    ctrl.keyword = '';
  };


}

ProductSearchController.$inject = ['$location', '$rootScope'];

angular
  .module('app')
  .controller('ProductSearchController', ProductSearchController);