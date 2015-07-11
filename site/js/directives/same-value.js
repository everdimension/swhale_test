angular.module('directives')

.directive('sameValue', function () {
	return {
		restrict: 'A',
		require: 'ngModel',
		scope: {
			referenceValue: '=sameValue'
		},
		link: function (scope, element, attrs, ngModelCtrl) {

			ngModelCtrl.$validators.sameValue = function () {
				console.log('referenceValue', scope.referenceValue);
				isValid = ngModelCtrl.$viewValue === scope.referenceValue;
				console.log('isValid', isValid, ngModelCtrl);
				return isValid;
			};

		}
	};
});
