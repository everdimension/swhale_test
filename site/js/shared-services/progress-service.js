angular.module('swhale.progress', [])

	.service('Progress', function() {
		var Progress = {};

		var activeProcesses = [];

		Progress.startLoading = function(processName) {
			activeProcesses.push(processName);
		};

		Progress.finishLoading = function(processName) {
			var pos = activeProcesses.indexOf(processName);
			if (pos !== -1) {
				activeProcesses.splice(pos, 1);
				return true;
			}
			return false;
		};

		Progress.isLoading = function(processName) {
			if (!processName) {
				return !!activeProcesses.length;
			}
			return activeProcesses.indexOf(processName) !== -1;
		};

		return Progress;
	})

	.run(function($rootScope, Progress) {
		$rootScope.Progress = Progress;
	});
