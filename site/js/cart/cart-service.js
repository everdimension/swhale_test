angular.module('swhale.cart.service', [])

.service('CartSvc', function ($sessionStorage) {
	var CartSvc = {};


	var orderedItems = CartSvc.orderedItems = $sessionStorage.orderedItems;

	if (!orderedItems) {
		$sessionStorage.orderedItems = orderedItems = [];
	}

	CartSvc.addItem = function (item) {
		var foundIndex = -1;
		for (var i = 0; i < orderedItems.length; i++) {
			if (orderedItems[i]._id === item._id) {
				foundIndex = i;
				break;
			}
		}

		if (foundIndex !== -1) {
			orderedItems[foundIndex].orderedAmount += 1;

		} else {
			item.orderedAmount = 1;
			orderedItems.push(item);
		}
	};

	CartSvc.getItems = function () {
		return orderedItems;
	};

	CartSvc.clearItems = function () {
		orderedItems.length = 0;
	};

	return CartSvc;

}).run(function ($rootScope, CartSvc) {
	$rootScope.CartSvc = CartSvc;
});
