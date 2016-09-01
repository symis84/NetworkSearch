'use strict';

describe('Controller: searchCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var loanCtrl, scope, timerCallback;
  var rootScope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    timerCallback = jasmine.createSpy('timerCallback');
    
    jasmine.Clock.useMock();
    scope = $rootScope.$new();
    rootScope = $rootScope;
    searchCtrl = $controller('searchCtrl', {
      $scope: scope
    });

  }));


  it('Title should be equal to Network Location Searches', function () {
    expect(scope.msg).toEqual('Network Location Searches');
  });




});
