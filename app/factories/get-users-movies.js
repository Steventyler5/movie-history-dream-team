'use strict';

app.factory('get-users-movies', function($q, $http) {
	let firebaseRef = new Firebase('https://new-dream-team.firebaseio.com/');

	let getUsersMovies = () => {
	 	return $q(function(resolve, reject) {
			$http.get(`https://new-dream-team.firebaseio.com/movies/.json`)
	    		.success(
	                (movieData) => resolve(movieData),
	                (error) => reject(error)
	            );
	        });
	};

	return getUsersMovies;
});