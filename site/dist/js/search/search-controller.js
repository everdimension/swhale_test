angular.module("swhale.search.controller",["swhale.search.service"]).controller("SearchCtrl",["$scope","SearchSvc",function(e,c){console.log("SearchCtrl"),e.items=[],c.get_items().success(function(c){e.items=c})["catch"](function(e){console.warn("error getting items",e)})}]);
//# sourceMappingURL=../../../sourcemaps/search/search-controller.js.map