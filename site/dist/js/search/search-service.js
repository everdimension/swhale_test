angular.module("swhale.search.service",["swhale.progress"]).service("SearchSvc",["$http","Progress",function(e,r){var i={};return i.get_items=function(){var i=e.get("/api/items");return r.startLoading("items"),i["finally"](function(){r.finishLoading("items")}),i},i}]);
//# sourceMappingURL=../../../sourcemaps/search/search-service.js.map