'use strict';


var app = angular
  .module('webApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
]);


app.factory('Model', ['$http',function($http) {

  var _searchNetworkResults = function(){
    return $http.get('http://c7webtest.azurewebsites.net/searches');
  }

  var _searchNetworkResultsDetails = function(index){
    var url = 'http://c7webtest.azurewebsites.net/searches/'+index+'/results';
    return $http.get(url);
  }

  return {    
    searchNetworkResults: function() { return _searchNetworkResults() },
    searchNetworkResultsDetails: function(index) { return _searchNetworkResultsDetails(index) }
  };

}]);


app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/search', {
      controller: 'searchCtrl',
      templateUrl: 'views/search.html'
    })
    .when('/searchDetails', {
      controller: 'searchDetailsCtrl',
      templateUrl: 'views/searchDetails.html',
    })
    .otherwise({
      redirectTo: '/'
    });
});
