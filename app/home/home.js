'use strict';

angular.module('webApp.home', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/home', {
		templateUrl: 'home/home.html',
		controller: 'HomeCtrl'
	});
}])

.controller('HomeCtrl', ['$scope', '$firebaseAuth', '$location', 'CommonProp', function($scope, $firebaseAuth, $location, CommonProp){

	$scope.username = CommonProp.getUser();

	$scope.signin = function(){
		var username = $scope.user.email;
		var password = $scope.user.password;
		var auth = $firebaseAuth();

		auth.$signInWithEmailAndPassword(username, password).then(function(){
			console.log("User Login successful");
			CommonProp.setUser($scope.user.email);
			$scope.errMsg = false;
			$location.path('/welcome');
		}).catch(function(error){
			$scope.errMsg = true;
			$scope.errorMessage = error.message;
		})
	};
}])

.service('CommonProp', ['$location', function($location){
	var user = "";

	return {
		getUser: function(){
			return user;
		},
		setUser: function(value){
			user = value;
		}
	}
}]);