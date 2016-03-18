'use strict';

app.controller("LoginCtrl", [
	'$scope',
	'authenticate',
	'$location',

	function ($scope, authenticate, $location) {

		$scope.user = {
			email: "",
			password: ""
		};

		$scope.register = function (user) {
			const email = user.email;
			const password = user.password;
			authenticate.createUser(email, password)
			.then(
				() => authenticate.loginUser(user.email, user.password),
				(error) => console.log('could not register user')
			).then(
				() => console.log('success'),
				(error) => console.log('could not authenticate user')
			)
		}

		$scope.login = function (user) {
			authenticate.loginUser(user.email, user.password)
			.then(
				() => {
					$location.path('/welcome');
					// $scope.$apply();
				},
				(error) => console.log('could not authenticate user')
			);
		}
	}]
);