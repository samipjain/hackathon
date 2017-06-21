'use strict';

angular.module('webApp.welcome', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/welcome', {
		templateUrl: 'welcome/welcome.html',
		controller: 'WelcomeCtrl'
	});
}])

.controller('WelcomeCtrl', ['$scope', '$firebaseAuth', 'CommonProp', function($scope, $firebaseAuth, CommonProp){
	
	$scope.username = CommonProp.getUser();

}]);