angular.module('swhale.auth.signup', [
	'swhale.auth.service'
])

.controller('SignupCtrl', function ($scope, $state, AuthSvc) {

	$scope.credentials = {};
	$scope.showError = false;
	$scope.errorMsg = null;
	$scope.formSuccess = false;

	$scope.signup = function (form) {
		if (form.$invalid) {
			form.displayErrors = true;
			return;
		}
		$scope.showError = false;
		$state.formSuccess = false;

		AuthSvc.signup($scope.credentials).then(function (res) {
			console.log('login res', res);
			$state.formSuccess = true;
			$state.go('app.login');

		}).catch(function (err) {
			console.warn('login err', err);
			$scope.showError = true;
			$scope.errorMsg = err.message;
		});

	};

});
