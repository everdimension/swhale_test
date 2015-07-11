angular.module('swhale.cart')

.directive('swCart', function () {
	return {
		restrict: 'EA',
		templateUrl: '/js/cart/sw-cart.html',
		controller: function ($scope, CartSvc) {
			var self = this;

			this.items = CartSvc.getItems();

			$scope.$watch(function () {
				return CartSvc.getItems().length;

			}, function (newVal) {
				this.itemsAmount = newVal;
				// highlight();
			});


			this.clearItems = function () {
				CartSvc.clearItems();
			};
		},
		controllerAs: 'cart',
		scope: {},
		link: function (scope, element, attrs) {
			var cardPopup = document.getElementById('card-popup');
			scope.cartOpen = false;

			scope.toggleCart = function () {
				if (!scope.cartOpen) {
					scope.cartOpen = true;
				}

				setTimeout(function () {
					if (scope.cartOpen) {
						addToggleListener();
					} else {
						removeEventListener();
					}
				});
			};

			scope.$on('$destroy', function () {
				removeEventListener();
			});

			function cardCloser(evt) {
				var isAddButton = evt.target.id.indexOf('cart_item-') !== -1;
				var isChildElement = cardPopup.contains(evt.target);

				if (evt.target === cardPopup || isChildElement || isAddButton) {
					return;
				}

				scope.$apply(function () {
					scope.cartOpen = false;
					removeToggleListener();
				});
			}

			function addToggleListener() {
				document.addEventListener('click', cardCloser);
			}
			function removeToggleListener() {
				document.removeEventListener('click', cardCloser);
			}


		}
	};
});
