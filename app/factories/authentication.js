'use strict';

app.factory("authenticate", function($q, $http) {

	let firebaseRef = new Firebase('https://new-dream-team.firebaseio.com/');

	let Authenticate = {};

	Authenticate.isAuthenticated = () => {
		let authData = firebaseRef.getAuth();
		console.log(authData);
		if (!authData) {
			return false;
		} else {
			return true;
		}
	}

	Authenticate.createUser = (user, pass) => {
		return $q((resolve, reject) => {
			return firebaseRef.createUser({
			  email    : user,
			  password : pass
			}, function(error, userData) {
			  if (error) {
			    console.log("Error creating user:", error);
			  } else {
			  	console.log(user);
			    console.log("Successfully created user account with uid:", userData.uid);
			    $http.post('https://new-dream-team.firebaseio.com/users.json', {user});
			    return resolve(userData);
			  }
			});
		});
	}

	Authenticate.loginUser = (user, pass) => {
		return $q(function(resolve, reject) {
			firebaseRef.authWithPassword({
			  email    : user,
			  password : pass
			}, function(error, authData) {
			  if (error) {
			    console.log("Login Failed!", error);
			  } else {
			    console.log("Authenticated successfully with payload:", authData);
			    return resolve(authData);
			  }
			},
		  	{
		 	 remember: "sessionOnly"
			});
		});
	}

	Authenticate.logoutUser = () => firebaseRef.unauth()

	return Authenticate;
});