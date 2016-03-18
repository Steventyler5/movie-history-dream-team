'use strict';

const app = angular.module("MovieHistory", ['ngRoute', 'firebase']);

app.config(['$routeProvider',
	($routeProvider) => {
	    $routeProvider.
	    	when('/welcome', {
	    		templateUrl: 'partials/landing-page.html',
        	controller: 'FinderCtrl'
	    	}).
	    	when('/all-results', {
      		templateUrl: 'partials/all-view.html',
        	controller: 'FinderCtrl'
      	}).
	    	when('/login', {
        	templateUrl: 'partials/login.html',
        	controller: 'LoginCtrl'
      	}).
      	when('/find-new-movies', {
        	templateUrl: 'partials/find-new-movies.html',
        	controller: 'FinderCtrl'
      	}).
      	when('/watched', {
      		templateUrl: 'partials/watched-view.html',
        	controller: 'FinderCtrl'
      	}).
      	when('/unwatched', {
      		templateUrl: 'partials/unwatched-view.html',
        	controller: 'FinderCtrl'
      	}).
      	when('/untracked', {
      		templateUrl: 'partials/untracked-view.html',
        	controller: 'FinderCtrl'
      	}).
      	otherwise({
      		redirectTo: '/login'
    		});
	}
])