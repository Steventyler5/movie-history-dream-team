'use strict';

app.controller("LogoutCtrl", [
	'$location',

	function LogoutController($location) {
    Session.clear();
    $location.path('/login');
	}]
);