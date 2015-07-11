angular.module('swhale.auth_events', [])

	.constant('AUTH_EVENTS', {
		loginSuccess: 'auth-login-success',
		loginFailed: 'auth-login-failed',
		logoutSuccess: 'auth-logout-success',
		logoutFailed: 'auth-logout-failed',
		sessionTimeout: 'auth-session-timeout',
		notAuthenticated: 'auth-not-authenticated',
		notAuthorized: 'auth-not-authorized'
	});

angular.module('swhale.auth.service', [
	'ngStorage',
	'swhale.auth_events',
	'swhale.progress',
	'swhale.session'
])

.config(function ($httpProvider) {
	$httpProvider.interceptors.push(function ($rootScope, $q, $window, $location, $localStorage) {
		return {
			request: function(config) {
				if ($localStorage.token) {
					config.headers.Authorization = 'Bearer ' + $localStorage.token;
				}
				return config;
			},
			responseError: function(response) {
				if (response.status === 401 || response.status === 403) {
					$location.path('/login');
				}
				return $q.reject(response);
			}
		};
	});
})

.service('AuthSvc', function ($rootScope, $http, $localStorage, Session, Progress, AUTH_EVENTS) {

	var AuthSvc = {};

	AuthSvc.login = function (params) {

		Progress.startLoading('login');

		var promise = $http({
			method: 'POST',
			url: '/api/auth/login',
			data: params

		}).then(function (res) {
			if (!res.data.error) {
				$localStorage.authToken = res.data.token;
				Session.create(res.data.user);
				$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
				return res.data;

			} else {
				throw res.data;
			}

		}, function (err) {
			$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
			if (err.data) {
				throw err.data;
			} else {
				throw err;
			}
		});

		promise.finally(function () {
			Progress.finishLoading('login');
		});

		return promise;

	};

	AuthSvc.logout = function () {
		$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
		delete $localStorage.authToken;
		Session.destroy();
		// Progress.startLoading('logout');
		// var promise = $http({
		// 	method: "POST",
		// 	url: '/api/auth/logout'
		// }).then(function (res) {
		// 	if (!res.data.error) {
		// 		$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
		// 		Session.destroy();
		// 	} else {
		// 		throw res.data;
		// 	}
		// }, function (err) {
		// 	$rootScope.$broadcast(AUTH_EVENTS.logoutFailed);
		// 	if (err.data) {
		// 		throw err.data;
		// 	} else {
		// 		throw err;
		// 	}
		// });
		//
		// promise.finally(function () {
		// 	Progress.finishLoading('logout');
		// });
		//
		// return promise;
	};

	AuthSvc.signup = function (params) {
		Progress.startLoading('signup');

		var promise = $http({
			method: 'POST',
			url: '/api/auth/signup',
			data: params

		}).then(function (res) {
			if (!res.data.error) {
				return res.data;
			} else {
				throw res.data;
			}

		}, function (err) {
			if (err.data) {
				throw err.data;
			} else {
				throw err;
			}
		});

		promise.finally(function () {
			Progress.finishLoading('signup');
		});

		return promise;
	};

	// AuthSvc.auth = function () {
	// 	Progress.startLoading('auth');
	//
	// 	var promise = $http.get('/api/10/user', { nocache: new Date().getTime() })
	// 	.then(function (res) {
	// 		if (!res.data.error) {
	// 			Session.create(res.data.user);
	// 			$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
	// 			return res.data;
	//
	// 		} else {
	// 			throw res.data;
	// 		}
	//
	// 	}, function (err) {
	// 		console.info('auth user fail', err.data);
	// 		$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
	// 		if (err.data) {
	// 			throw err.data;
	// 		} else {
	// 			throw { error: 'unknown server error' };
	// 		}
	// 	});
	//
	// 	promise.finally(function () {
	// 		Progress.finishLoading('auth');
	// 	});
	//
	// 	return promise;
	// };

	AuthSvc.isAuthenticated = function () {
		return !!$localStorage.authToken;
		// return !!Session.user;
	};

	return AuthSvc;

});
