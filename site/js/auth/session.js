angular.module('swhale.session', [
	'ngStorage'
])

.service('Session', function ($localStorage) {
	this.create = function (user) {
		this.user = user;
		$localStorage.user = user;
	};
	this.destroy = function () {
		this.user = null;
		delete $localStorage.user;
	};
	return this;
})

.run(function($rootScope, $localStorage, Session) {
	$rootScope.Session = Session;
	if ($localStorage.user) {
		Session.user = $localStorage.user;
	}
});
