'use strict';

angular.module('webApp.addPost', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/addPost', {
		templateUrl: 'addPost/addPost.html',
		controller: 'AppPostCtrl'
	});
}])

.controller('AppPostCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray){
	
	var ref = firebase.database().ref().child('Articles');
	$scope.articles = $firebaseArray(ref);

	$scope.createPost = function(){
		var title = $scope.article.titleTxt;
		var post = $scope.article.postTxt;
		var category = $scope.article.category;
		$scope.articles.$add({
			title: title,
			post: post,
			category: category
		}).then(function(ref){
			console.log(ref);
			console.log(ref.path.o[1]);
			$scope.article.titleTxt = '';
			$scope.article.postTxt = '';
			$scope.article.category = '';
		}, function(error){
			console.log(error);
		});
	}

}]);