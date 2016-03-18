'use strict';

app.factory('update-movies', function ($q, $http) {
	let updateMovie = (urlSnippet) => {
		//added .json to firebase ref
		let movieRef = new Firebase(`https://new-dream-team.firebaseio.com/movies/${urlSnippet}.json`);
	 	movieRef.update({watched: true});
	}
	return updateMovie;
})