(function() {
	myController.controller('adminPostUpdate',adminPostUpdate);
	function adminPostUpdate ($scope, apiService, $location, $sce,$stateParams) {
		$scope.notify = {};
		$scope.back = function(){};
		var updateId = $stateParams.updateId;
		if(!updateId) {
			$location.path('/admin').replace();
		}
		apiService('GET','/api/post/' + updateId,{}).then(function(data){
			if(data.status == 402){
				$location.path('/admin').replace();
			} else 
			if(data.status == 401){
				$scope.title = data.data.rows[0].title;
				$scope.description = data.data.rows[0].description;
				$scope.category = data.data.rows[0].categoryId;
				$scope.content = data.data.rows[0].content;
				$scope.videoLink = data.data.rows[0].videoLink;
				$scope.coverImg = data.data.rows[0].coverImg;
				$scope.id = data.data.rows[0].id;
			}
			apiService('GET','/api/category',{}).then(function(dataCategory){
				if(dataCategory.status == 301) {
					$scope.preCategory = dataCategory.data.rows;
				}
			});
			
		});

		$scope.submit = function(form) {
			if (form) {
				var token = localStorage.getItem('token');
				if($scope.videoLink == undefined) {
					$scope.videoLink = '';
				}
				var post = {
					title:$scope.title,
					categoryId:$scope.category,
					description: $scope.description,
					content: $scope.content,
					id:$scope.id,
					postId: $scope.id,
					videoLink:$scope.videoLink,
					coverImg: $scope.coverImg,
					token:token
				}
				apiService('PUT', '/api/post', post).then(function(data) {
					if(data.status == 431) {
						$scope.notifyFn('saveSuccess');
						$scope.back = function() {
							$scope.notifyFn('cancel');
						}
					} 
				});
			} 
		}
		$scope.notifyFn = function(value) {
			if(value == 'preCancel') {
				$scope.notify.message = 'Ban co muon huy bo';
				$scope.notify.confirm = 'cancel';
				$('#modaPostAddNotify').modal('show');
			} else if (value == 'cancel'){
				$('.modal-backdrop').remove();
				$('body').css('padding-right','0px');
				$location.path('/admin/post/list');
			}else if (value == 'saveSuccess') {
				$scope.notify.message = 'Da luu';
				$scope.notify.confirm = null;
				$('#modaPostAddNotify').modal('show'); 
			}
		}
		$scope.watchDemo = function() {
			$('.watchDemo').find('img').addClass('img-responsive');
			$('#watchDemo').modal('show');
		}


	}
	adminPostUpdate.$inject = ['$scope', 'apiService', '$location', '$sce', '$stateParams'];
})();