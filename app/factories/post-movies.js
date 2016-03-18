'use strict';

app.factory('post-requests', function($q, $http) {

	let postRequests = {};

	postRequests.postMovie = (movie) => {
	 	return $q(function(resolve, reject) {
	 		console.log(movie);
			$http.post(`https://new-dream-team.firebaseio.com/movies/.json`, {movie})
	    		.success(
	                (movieData) => resolve(movieData),
	                (error) => reject(error)
	            );
	        });
	};

	return postRequests;
});