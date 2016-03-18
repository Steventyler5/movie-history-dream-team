'use strict';

app.factory("delete-movie", function($q, $http) {
	let firebaseRef = new Firebase('https://new-dream-team.firebaseio.com/');

	let deleteMovie = (key) => {
	 	return $q(function(resolve, reject) {
			$http.delete(`https://new-dream-team.firebaseio.com/movies/${key}/.json`)
	    		.success(
	                (movieData) => resolve(movieData),
	                (error) => reject(error)
	            );
	        });
	};

	return deleteMovie;
})