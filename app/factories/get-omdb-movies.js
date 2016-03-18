'use strict';

app.factory('get-movies', function($q, $http) {
	let firebaseRef = new Firebase('https://new-dream-team.firebaseio.com/');

	let getMovies = (movie) => {
		movie = movie.replace(/ /g, '+');
	 	return $q(function(resolve, reject) {
			$http.get(`http://www.omdbapi.com/?s=${movie}`)
	    		.success(
	                (movieData) => resolve(movieData),
	                (error) => reject(error)
	            );
	        });
	};

	return getMovies;
});