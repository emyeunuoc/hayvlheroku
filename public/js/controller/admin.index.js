(function() {
	myController.controller('adminIndex',adminIndex);
	function adminIndex ($scope, apiService, $location) {
		loadView();
		apiService('GET', '/api/authenticate', {token:localStorage.getItem('token')}).then(function(data){
			if (!data.success) {
				$location.path('/admin/login').replace();
			}
		});
		function loadView() {
			apiService('GET','/api/view').then(function(data){
				$scope.views = data.views
			})
		}
		$scope.loadView = function(){
			loadView();
		}
	}
	adminIndex.$inject = ['$scope', 'apiService', '$location'];
})();