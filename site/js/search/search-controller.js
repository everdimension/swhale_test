angular.module('swhale.search.controller', [
	'swhale.search.service'
])

.controller('SearchCtrl', function ($scope, SearchSvc) {
	console.log('SearchCtrl');
	$scope.items = [];

	SearchSvc.get_items()
		.success(function (res) {
			$scope.items = res;
		})
		.catch(function (err) {
			console.warn('error getting items', err);
		});

});
