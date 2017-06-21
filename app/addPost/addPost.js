'use strict';

angular.module('webApp.addPost', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/addPost', {
		templateUrl: 'addPost/addPost.html',
		controller: 'AppPostCtrl'
	});
}])

.controller('AppPostCtrl', ['$scope', '$firebaseArray', '$firebaseObject', function($scope, $firebaseArray, $firebaseObject){
	var getHappyPost;
	$scope.happyPost = {show: false, content: ''};

	$scope.createPost = function(){
		var param = {title: $scope.article.titleTxt, post: $scope.article.postTxt};		
		var category = $scope.article.category;
		var ref = firebase.database().ref().child('Articles').child(category);
		var temp = $firebaseArray(ref);
		//ref.child(2).set(param);
		temp.$add(param).then(function(ref){
			console.log(ref);
			console.log(ref.path.o[1]);
			$scope.article.titleTxt = '';
			$scope.article.postTxt = '';
			$scope.article.category = '';
			if (category === 'Sad') {
				getHappyPost();
			}
		}, function(error){
			console.log(error);
		});
	}

	getHappyPost = function() {
		var category = 'Happy';
		var id = Math.floor((Math.random() * 10) + 1);
		var ref = firebase.database().ref().child('Articles').child('Happy');
		var obj = $firebaseObject(ref);
		obj.$loaded().then(function(data){
			console.log(data);
			console.log(data[3]);
			$scope.happyPost = {show: true, content: data[3]};
		})
		.catch(function(error){
			console.log("Error: ", error);
		})
	}	

}]);