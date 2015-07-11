angular.module('swhale.auth.login', [
	'swhale.auth.service'
])

.controller('LoginCtrl', function ($scope, $state, AuthSvc) {

	$scope.credentials = {};
	$scope.showError = false;
	$scope.errorMsg = null;
	$scope.formSuccess = false;

	$scope.login = function (form) {
		if (form.$invalid) {
			form.displayErrors = true;
			return;
		}
		$scope.showError = false;
		$state.formSuccess = false;

		AuthSvc.login($scope.credentials).then(function (res) {
			console.log('login res', res);
			$state.formSuccess = true;
			$state.go('app.search');

		}).catch(function (err) {
			console.warn('login err', err);
			$scope.showError = true;
			$scope.errorMsg = err.message;
		});

	};

});
