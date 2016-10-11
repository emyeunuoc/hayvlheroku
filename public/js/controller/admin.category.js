(function() {
	myController.controller('adminCategory',adminCategory);
	function adminCategory ($scope, apiService, $location) {
		$scope.getPage = function() {
			apiService('GET', '/api/category', {skip:$scope.skip, take:$scope.take}).then(function(data) {
				$scope.category = data.data.rows;
				$scope.totalAll = data.data.count;
			});
		}
		$scope.getPage();
		$scope.clear = function() {
			$scope.title = $scopeId = $scope.description = $scope.mode = '';
		}
		$scope.preAdd = function() {
			$scope.mode = 'Add';
			$('#addUpdateModal').modal('show');
		}
		$scope.preUpdate = function(title, description, id) {
			$scope.mode = 'Update';
			$scope.id = id;
			$scope.title = title;
			$scope.description = description;
			$('#addUpdateModal').modal('show');
		}
		$scope.preDelete = function(id) {
			$scope.id = id;
			$scope.notify = "Ban co muon xoa?";
			$scope.mode = 'Delete';
			$('#notify').modal('show');
		}
		$scope.submit = function(mode, form) {
			if(mode == 'Add' && form) {
				var token = localStorage.getItem('token');
				var cate = {token:token, title:$scope.title, description:$scope.description}
				apiService('POST','/api/category',cate).then(function(data) {
					if (data.status == 104) {
						$scope.notify = 'Ban khong co quyen de su dung tinh nang nay';
						$('#notify').modal('show');
					} else if(data.status == 312) {
						$scope.notify = 'Categogy nay da ton tai roi';
						$('#notify').modal('show');
					} else if(data.status == 311) {
						$scope.notify = 'Add thanh cong';
						$('#notify').modal('show');
					}
					$scope.clear();
					$('#addUpdateModal').modal('hide');
				});
			} else if(mode == 'Update' && form) {
				var token = localStorage.getItem('token');
				var cate = {token:token, title:$scope.title, description:$scope.description, id:$scope.id}
				apiService('PUT','/api/category',cate).then(function(data) {
					if (data.status == 104) {
						$scope.notify = 'Ban khong co quyen de su dung tinh nang nay';
						$('#notify').modal('show');
					} else if(data.status == 332) {
						$scope.notify = 'Categogy nay da ton tai roi,update khong thanh cong';
						$('#notify').modal('show');
					} else if(data.status == 331) {
						$scope.notify = 'Update thanh cong';
						$('#notify').modal('show');
						$scope.getPage();
					}
					$scope.clear();
					$('#addUpdateModal').modal('hide');
				});
			} else if(mode == 'Delete') {
				var token = localStorage.getItem('token');
				var cate = {token:token, id:$scope.id}
				apiService('DELETE','/api/category',cate).then(function(data) {
					if (data.status == 104) {
						$scope.notify = 'Ban khong co quyen de su dung tinh nang nay';
						$('#notify').modal('show');
					} else if(data.status == 322) {
						$scope.notify = 'Categogy nay da ton tai bai viet, hay xoa bai viet do truoc';
						$('#notify').modal('show');
					} else if(data.status == 321) {
						$scope.notify = 'Delete thanh cong';
						$('#notify').modal('show');
						$scope.getPage();
					}
					$scope.clear();
					$('#addUpdateModal').modal('hide');
				});
			}

		}

		//fix douple modal
		$('#notify').on('hidden.bs.modal', function (e) {
			$('body').css('padding-right','0px');
		});
	}
	adminCategory.$inject = ['$scope','apiService', '$location'];
})();