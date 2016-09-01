'use strict';

angular.module('webApp')
  .controller('searchCtrl', ['$scope', '$rootScope', 'Model','$location',
    function($scope,$rootScope, Model, $location) {
      $scope.msg = 'Network Location Searches';

      Model.searchNetworkResults().success(function(data, status, headers) {            
        
        $scope.networkSearches = data;
        console.log("data: ",data);
        
      }).error(function(data, status, headers, config) {
        
      });


      $scope.openResults = function(index){

        $location.path( "/searchDetails" ).search({index: index});

      }

}]);



