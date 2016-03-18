'use strict';

app.controller("FinderCtrl", [
	'$scope',
	'$http',
	'$routeParams',
	'get-movies',
	'post-requests',
	'authenticate',
	'get-users-movies',

	function ($scope, $http, $routeParams, getMovies, postRequests, authenticate, getUsersMovies) {
		$scope.rawMovieArray = [];
		$scope.userMovieArray = [];
		$scope.watchedMovieArray = [];
		$scope.unwatchedMovieArray = [];
		$scope.movieWasSearched = false;


		$scope.movieToAdd = {
			poster: "",
			title: "",
			year: "",
			actors: [],
			user: "-KCwF1J8j17zjGJxCGq_",
			rating: 0,
			watched: false,
		}

		// $scope.$watch('movieToSearch', function() {
  //     if ($scope.movieToSearch !== undefined){
  //       fetch();
  //       console.log("thing");
  //     }
  //   });

		 // function fetch(){
   //    $http.get("http://www.omdbapi.com/?s=" + $scope.movieToSearch )
   //    .then(function(response){ 
   //      $scope.userMovieArray = response.data.Search; 
   //      console.log($scope.userMovieArray);
   //      return $scope.userMovieArray;
   //    });
   //    //search firebase based on title. look in workspace/angular
   //  }

    getUsersMovies().then(
      // Handle resolve() from the promise
      movieData => Object.keys(movieData).forEach(key => {
        movieData[key].id = key;
         $scope.userMovieArray.push(movieData[key]);
        if (!movieData[key].watched){
        	$scope.unwatchedMovieArray.push(movieData[key]);
        } else if (movieData[key].watched){
        	$scope.watchedMovieArray.push(movieData[key]);
        }
        console.log("userMovieArray", $scope.userMovieArray);
        $scope.selectedMovie = $scope.userMovieArray.filter(movie => movie.id === $routeParams.movieId)[0];
      }),
      // Handle reject() from the promise
      err => console.log(err)
    );


		$scope.movieToSearch = "";

		$scope.search = () => {

			let searchTerm = $scope.movieToSearch;
			getMovies(searchTerm)
			.then(
				(movieData) => {
					console.log(movieData);
					$scope.omdbMovies = movieData.Search;
					console.log($scope.omdbMovies);
					Object.keys($scope.omdbMovies).forEach(key => {
						$scope.omdbMovies[key].id = key;
						$scope.rawMovieArray.push($scope.omdbMovies[key])
					})
					console.log("rawMovieArray", $scope.rawMovieArray);
					// $scope.movieWasSearched = true;
					// $('#card').append(`<img src=${movieData.Poster} />`);
					// $scope.movieToAdd.poster = movieData.Poster;
					// $scope.movieToAdd.title = movieData.Title;
					// $scope.movieToAdd.year = movieData.Year;
					// $scope.movieToAdd.actors = movieData.Actors.split(',');
				}
			)
			$scope.movieToSearch = "";
		}

		$scope.addMovie = () => {
			postRequests.postMovie($scope.movieToAdd)
			.then(
				(movieData) => console.log('movie saved!'),
				(error) => console.log(error)
			)
		}

	  $scope.deleteMovie = (eventId) => $http
      .delete(`https://new-dream-team.firebaseio.com/movies/${eventId}.json`)
      .then(() => $location.url("/fake"));
      

	}
]);