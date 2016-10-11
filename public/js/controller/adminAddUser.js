(function() {
	myController.controller('adminAddUser',adminAddUser);
	function adminAddUser ($scope, apiService, $location) {
		$scope.notify = {};
		$scope.submitForm = function(form){
			if(form) {
				var token = localStorage.getItem('token');
				var data = {
					token:token,
					username: $scope.username,
					password: $scope.password,
					age: $scope.age,
					telephone:$scope.telephone,
					gender:$scope.gender,
					email:$scope.email
				}
				console.log(data);
				apiService('POST','/api/user',data).then(function(data){
					console.log(data)
					if(data.status == 211){
						$scope.notify.message = "Da tao user";
					} else if(data.status == 104){
						$scope.notify.message = "Ban khong co quyen admin de su dung tinh nag nay"
					} else if(data.status == 212) {
						$scope.notify.message = 'Da ton tai user'
					}
					$('#modalUserAddNotify').modal('show');
				});
			}else{
				return;
			}
		};
	}
	adminAddUser.$inject = ['$scope', 'apiService', '$location'];
})();