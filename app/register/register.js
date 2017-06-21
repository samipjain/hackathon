'use strict';

angular.module('webApp.register', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/register', {
		templateUrl: 'register/register.html',
		controller: 'RegisterCtrl'
	});
}])

.controller('RegisterCtrl', ['$scope', '$firebaseAuth', '$location', function($scope, $firebaseAuth, $location){
	
	$scope.signup = function(){
		var username = $scope.user.email;
		var password = $scope.user.password;
		
		if (username && password){
			var auth = $firebaseAuth();	
			auth.$createUserWithEmailAndPassword(username, password).then(function(){
				console.log("User Successfully created");
				$scope.errMsg = false;
				$location.path('/home');
			}).catch(function(error){
				$scope.errMsg = true;
				$scope.errorMessage = error.message;
			})
		}
		

		
	};

}]);