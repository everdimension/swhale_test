angular.module('swhale.search.service', [
	'swhale.progress'
])

.service('SearchSvc', function ($http, Progress) {

	var SearchSvc = {};

	SearchSvc.get_items = function () {
		var promise = $http.get('/api/items');

		Progress.startLoading('items');

		promise.finally(function () {
			Progress.finishLoading('items');
		});

		return promise;
	};

	return SearchSvc;

});
