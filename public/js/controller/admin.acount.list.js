(function() {
	myController.controller('adminAcountList',adminAcountList);
	function adminAcountList ($scope, apiService, $location) {
		function getPage() {
			var token = localStorage.getItem('token');
			apiService('GET', '/api/user', {skip:$scope.skip, take:$scope.take, token:token}).then(function(data) {
				$scope.users = data.data.rows;
				$scope.totalAll = data.data.count;
			});
		}
		$scope.skip = 0;
		$scope.take = 5;
		$scope.currentPage = 1;
		$scope.notify = {};
		$scope.changePage = function(page) {
			$scope.currentPage  = page;
			$scope.skip = $scope.take * $scope.currentPage - $scope.take;
			getPage();
		}
		$scope.changeStatus = function(status,id) {
			var token = localStorage.getItem('token');
			apiService('PUT', '/api/user', {token:token,status:status,id:id}).then(function (data) {
				if(data.status == 231){
					getPage();
				}
				if(data.status == 104){
					$scope.notify.message = 'Ban ko co quyen admin de dung chuc nang nay';
					$scope.notify.confirm = null;
					$('#modalUserNotify').modal('show');
				}
			})
		}
		$scope.showDetail = function(id) {
			var token = localStorage.getItem('token');
			apiService('GET', '/api/user/' + id, {token:token, id:id}).then(function (data) {
				if(data.status == 201){
					$scope.userDetail = data.data.rows[0];
					$('#modalUserDetail').modal('show');
				}
			})
		}
		$scope.prepareDeteteUser = function (id) {
			$scope.notify.message = 'Ban co muon xoa ?';
			$scope.notify.confirm = id;
			$('#modalUserNotify').modal('show');
		}
		$scope.deleteUser = function(id) {
			$scope.notify.confirm = null;
			var token = localStorage.getItem('token');
			apiService('DELETE', '/api/user', {token:token,id:id}).then(function(data){
				if(data.status == 221){
					$scope.notify.message = 'Xoa thanh cong';
					getPage();
				} else if(data.status == 222){
					$scope.notify.message = 'Da co loi xay ra phia server,chung toi se fix ngay lap tuc';
				} else if (data.status == 104) {
					$scope.notify.message = 'Ban ko co quyen admin de dung chuc nang nay';
				}
				$('#modalUserNotify').modal('show');
			}); 
		} 
		getPage();
	}
	adminAcountList.$inject = ['$scope','apiService', '$location'];
})();