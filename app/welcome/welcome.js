'use strict';

angular.module('webApp.welcome', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/welcome', {
		templateUrl: 'welcome/welcome.html',
		controller: 'WelcomeCtrl'
	});
}])

.controller('WelcomeCtrl', ['$scope', '$firebaseAuth', 'CommonProp', '$firebaseObject', function($scope, $firebaseAuth, CommonProp, $firebaseObject){
	
	var getHappyPost;
	$scope.username = CommonProp.getUser();

	getHappyPost = function() {
		var category = 'Happy';
		var id = Math.floor((Math.random() * 10) + 1);
		var ref = firebase.database().ref().child('Articles').child('Happy');
		var obj = $firebaseObject(ref);
		obj.$loaded().then(function(data){
			console.log(data);
			console.log(data[3]);
			$scope.post = data;			
		})
		.catch(function(error){
			console.log("Error: ", error);
		})
	}

	getHappyPost();

}]);