'use strict';

angular.module('webApp')
  .controller('searchDetailsCtrl', ['$scope', '$rootScope', 'Model', '$route', '$location',
    function($scope,$rootScope, Model, $route, $location) {
      $scope.msg = 'Network Location Searches 2';

      var result = $location.search();
      console.log(result.index);

      Model.searchNetworkResultsDetails(result.index).success(function(data, status, headers) {            
        
        $scope.fullData = data;
        $scope.networkSearchesDetails = $scope.fullData;
        $scope.totalItems = $scope.networkSearchesDetails.length;

        $scope.$watch('currentPage', function() {
            updateItems();
        });

        updateItems();

        
      }).error(function(data, status, headers, config) {
        
      });


      $scope.currentPage = 1;
      $scope.itemsPerPage = 30;
      $scope.numPages = 0;
      $scope.pagedItems = [];

      var updateItems = function() {
        $scope.pagedItems = $scope.networkSearchesDetails.slice($scope.itemsPerPage * ($scope.currentPage - 1), $scope.itemsPerPage * $scope.currentPage);
      };


      $scope.selectItemsPerPage = function(itemNo) {
        $scope.itemsPerPage = itemNo;
        updateItems();
      };

      $scope.setPage = function(pageNo) {
        $scope.currentPage = (pageNo === -1) ? $scope.numPages : pageNo;
        updateItems();
      };

      $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
      };

      $scope.$watch('dateMax',function(){
        if ($scope.dateMax == null) {
          $scope.dateMax = '';
        };
      });

      $scope.$watch('dateMin',function(){
        if ($scope.dateMin == null) {
          $scope.dateMin = '';
        };
      });

      $scope.open1 = function() {
        $scope.popup1.opened = true;
      };

      $scope.open2 = function() {
        $scope.popup2.opened = true;
      };

      $scope.popup1 = {
        opened: false
      };

      $scope.popup2 = {
        opened: false
      };

      $scope.pathFile = '';
      $scope.fileSizeMax = '';
      $scope.fileSizeMin = '';
      $scope.dateMax = '';
      $scope.dateMin = '';

      $scope.filterNetworkResults = function(){

        $scope.networkSearchesDetails = $scope.fullData.filter(function(val,index){

          var pathFileCheck = true;
          var fileSizeCheck = true;
          var dateCheck = true;

          if ($scope.pathFile != '') {
            var indexPath = val.Path.indexOf($scope.pathFile);
            if (indexPath > -1) {
              pathFileCheck = true;
            }else{
              pathFileCheck = false;
            }
          };

          if ($scope.fileSizeMax != '' && $scope.fileSizeMin != '') {
            if ($scope.fileSizeMax >= val.Size && $scope.fileSizeMin <= val.Size) {
              fileSizeCheck = true;
            }else{
              fileSizeCheck = false;
            }
          }else if ($scope.fileSizeMax != '' && $scope.fileSizeMin == '') {
            if ($scope.fileSizeMax >= val.Size) {
              fileSizeCheck = true;
            }else{
              fileSizeCheck = false;
            }
          }else if ($scope.fileSizeMax == '' && $scope.fileSizeMin != '') {
            if ($scope.fileSizeMin <= val.Size) {
              fileSizeCheck = true;
            }else{
              fileSizeCheck = false;
            }
          }else if ($scope.fileSizeMax == '' && $scope.fileSizeMin == '') {
            fileSizeCheck = true;
          };

          var dateRecord = new Date(val.Created);

          if ($scope.dateMax != '' && $scope.dateMin != '') {
            if (new Date($scope.dateMax) >= dateRecord && new Date($scope.dateMin) <= dateRecord) {
              dateCheck = true;
            }else{
              dateCheck = false;
            }
          }else if ($scope.dateMax != '' && $scope.dateMin == '') {
            if (new Date($scope.dateMax) >= dateRecord) {
              dateCheck = true;
            }else{
              dateCheck = false;
            }
          }else if ($scope.dateMax == '' && $scope.dateMin != '') {
            if (new Date($scope.dateMin) <= dateRecord) {
              dateCheck = true;
            }else{
              dateCheck = false;
            }
          }else if ($scope.dateMax == '' && $scope.dateMin == '') {
            dateCheck = true;
          };

          if ( dateCheck && fileSizeCheck && pathFileCheck) {
            return true;
          }else{
            return false;
          }

          
        });

        $scope.currentPage = 1;
        $scope.itemsPerPage = 30;
        $scope.numPages = 0;
        $scope.pagedItems = [];
        updateItems();

      }


}]);



