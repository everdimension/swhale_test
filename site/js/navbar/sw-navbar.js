angular.module('swhale.navbar', [
	'swhale.session',
	'swhale.progress'
])

.directive('swNavbar', function (AuthSvc, Session, Progress) {
	return {
		restrict: 'EA',
		scope: {},
		templateUrl: '/js/navbar/sw-navbar.html',
		link: function (scope, element, attrs) {
			scope.AuthSvc = AuthSvc;
			scope.Session = Session;
			scope.Progress = Progress;
		}
	};
});
