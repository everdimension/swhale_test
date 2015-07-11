angular.module('swhale', [
	'swhale.search',
	'swhale.auth',
	'swhale.navbar',
	'swhale.cart',
	'directives',
	'ui.router'
])


.constant('PAGE_TITLES', {
	LOGIN: 'Login | Service Whale',
	SIGNUP: 'Sign Up | Service Whale',
	SEARCH: 'Home | Service Whale'
})


.config(function($stateProvider, $locationProvider, $urlRouterProvider) {

	$locationProvider.html5Mode(true);

	$urlRouterProvider.otherwise('/');

	$stateProvider.state('app', {
		url: '/',
		abstract: true,
		templateUrl: '/views/app.html?v=000'

	}).state('app.search', {
		url: '',
		controller: 'SearchCtrl',
		templateUrl: '/views/search.html?v=000',
		data: {
			loginRequired: true,
			title_key: 'SEARCH'
		}
	})
	.state('app.login', {
		url: 'login',
		templateUrl: '/views/login.html?v=000',
		controller: 'LoginCtrl',
		data: {
			loginRequired: false,
			title_key: 'LOGIN'
		}
	})
	.state('app.signup', {
		url: 'signup',
		templateUrl: '/views/signup.html?v=000',
		controller: 'SignupCtrl',
		data: {
			loginRequired: false,
			title_key: 'SIGNUP'
		}
	});

})

.run(function ($rootScope, $state, $http, AuthSvc, AUTH_EVENTS) {
	window.$http = $http;
	$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
		if (toState.data && toState.data.loginRequired && !AuthSvc.isAuthenticated()) {
			event.preventDefault();
			$state.go('app.login');
			// AuthSvc.auth()
			// 	.success(function () {
			// 		$state.go(toState, toParams);
			// 	})
			// 	.error(function () {
			// 		$state.go('app.login');
			// 	});
		}
	});

	$rootScope.$on(AUTH_EVENTS.logoutSuccess, function (event) {
		if ($state.current.data && $state.current.data.loginRequired) {
			$state.go('app.login');
		}
	});

	$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
		console.log('$stateChangeSuccess');
	});

});
