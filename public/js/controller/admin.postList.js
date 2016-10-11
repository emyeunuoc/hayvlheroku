(function() {
	myController.controller('adminPostList',adminPostList);
	function adminPostList ($scope, apiService, $location) {
		$scope.notify = {};
		$scope.notify.confirm =false;
		$scope.skip = 0;
		$scope.take = 5;
		$scope.currentPage = 1;
		$scope.changePage = function(page) {
			$scope.currentPage  = page;
			$scope.skip = $scope.take * $scope.currentPage - $scope.take;
			$scope.load();
		}

		$scope.load = function (){
			apiService('GET','/api/post',{skip:$scope.skip, take:$scope.take ,noCount:true}).then(function(data){
				if(data.status == 401) {
					$scope.dropDownTitle = 'Tat ca';
					$scope.posts = data.data.rows;
					$scope.totalAll = data.data.count;
				}
			});
		}
		function loadCategory(){
			apiService('GET','/api/category',{}).then(function(data){
				if(data.status == 301) {
					$scope.listCategory = data.data.rows;
				}
			});
		}
		$scope.loadPostWithCategory = function(categoryId, dropDownTitle) {
			$scope.skip = 0;
			$scope.take = 5;
			$scope.currentPage = 1;
			apiService('GET','/api/post/category/' + categoryId,{skip:$scope.skip, take:$scope.take}).then(function(data){
				if(data.status == 441) {
					$scope.dropDownTitle = dropDownTitle;
					$scope.posts = data.data.rows;
					$scope.totalAll = data.data.count;
				}
			});
		}
		$scope.load();
		loadCategory();
		$scope.editPost = function(postId) {
			var token = localStorage.getItem('token');
			apiService('POST','/api/authenticate',{token:token, postId:postId}).then(function(data){
				if(data.status == 105) {
					$location.path('/admin/post/update/' + postId).replace();
				} else if (data.status = 106){
					$scope.notify.message = 'Day khong phai bai viet cua ban';
					$('#modalPostListNotify').modal('show');
				}
			})
		};
		$scope.preDeletePost = function(postId){
			if($scope.notify.confirm == false) {
				console.log($scope.notify.confirm)
				$scope.notify.message = 'Ban co muon xoa bai viet';
				$scope.notify.confirm = postId;
				$('#modalPostListNotify').modal('show');
				console.log($scope.notify.confirm)
			} else{				console.log('2')
				$scope.deletePost(postId);
				$scope.notify.confirm = false;
			}
		}
		$scope.deletePost = function(postId){
			var token = localStorage.getItem('token');
			apiService('DELETE','/api/post',{token:token, postId:postId, id:postId}).then(function(data){
				if(data.status == 421) {
					$scope.notify.message = 'Da xoa bai viet';
					$('#modalPostListNotify').modal('show');
					$scope.load();
				} else if (data.status = 106){
					$scope.notify.message = 'Day khong phai bai viet cua ban';
					$('#modalPostListNotify').modal('show');
				}
			})
		}
	}
	adminPostList.$inject = ['$scope', 'apiService', '$location'];
})();