(function() {
	myController.controller('adminLogin',adminAcountList);
	function adminAcountList ($scope, apiService, $location) {
		apiService('GET', '/api/authenticate', {token:localStorage.getItem('token')}).then(function(data){
			if (data.success) {
				$location.path('/admin').replace();
			}
		});
		$scope.submit = function() {	
			if(!$scope.inputUser || !$scope.inputPassword || $scope.inputPassword.length < 5 || $scope.inputPassword > 12 ||
			 $scope.inputUser.length < 5 || $scope.inputUser > 12 ) {
				return;
			}
			var user = {
				username: $scope.inputUser,
				password: $scope.inputPassword
			}
			apiService('POST','/api/login',user).then(function(data){
				if(data.success) {
					$scope.loginErr = null;
					localStorage.setItem('username', user.username);
					localStorage.setItem('password', user.password);
					localStorage.setItem('token', data.token);
					$location.path('/admin/index').replace();
				} else {
					$scope.loginErr = data.notify;
					$('#loginNotify').modal('show');
				}
			});
		}
	}
	adminAcountList.$inject = ['$scope', 'apiService', '$location'];
})();