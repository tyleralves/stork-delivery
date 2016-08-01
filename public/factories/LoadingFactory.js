/**
 * Created by Tyler on 7/22/2016.
 */
angular
  .module('app')
  .factory('LoadingFactory', LoadingFactory);

function LoadingFactory(){
  var LoadingFactory = {};
  LoadingFactory.loaded = false;

  //Called in about.directive.js -> selfSvgDirective
  LoadingFactory.viewLoadedToggle = function(){
    LoadingFactory.loaded = true;
  };

  return LoadingFactory;
}