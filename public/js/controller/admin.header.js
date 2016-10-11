(function() {
	myController.controller('header',header);
	function header ($scope, apiService, $location) {
		$scope.logout = function() {
			localStorage.removeItem('password');
			localStorage.removeItem('username');
			localStorage.removeItem('token');
			$scope.username = localStorage.getItem('username');
			$location.path('/admin/login').replace();
		}
		$scope.isLogin = function() {
			$scope.username = localStorage.getItem('username');
			return localStorage.getItem('token');
		}
	}
	header.$inject = ['$scope', 'apiService', '$location'];
})();