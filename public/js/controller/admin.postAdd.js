(function() {
	myController.controller('adminPostAdd',adminPostAdd);
	function adminPostAdd ($scope, apiService, $location, $sce) {
		$scope.notify = {};
		$scope.videoLink = '';
		$scope.coverImg = '';
		apiService('GET','/api/category',{}).then(function(data){
			if(data.status == 301) {
				$scope.preCategory = data.data.rows;
			}
		});
		$scope.submit = function(form) {
			if (form) {
				var token = localStorage.getItem('token');
				var post = {
					title:$scope.title,
					categoryId:$scope.category,
					description: $scope.description,
					content: $scope.content,
					videoLink: $scope.videoLink,
					coverImg: $scope.coverImg,
					token:token
				}
				apiService('POST', '/api/post', post).then(function(data) {
					if(data.status == 411) {
						$scope.notifyFn('saveSuccess');
						$scope.back = function() {
							$scope.notifyFn('cancel');
						}
					}else if(data.status == 108) {
						$scope.notifyFn('band');
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
			}else if(value == 'band'){
				$scope.notify.message = 'Tai khoan cua ban da bi cam';
				$scope.notify.confirm = null;
				$('#modaPostAddNotify').modal('show');
			}
		}
		$scope.watchDemo = function() {
			$('.watchDemo').find('img').addClass('img-responsive');
			$('#watchDemo').modal('show');
		}
	}
	adminPostAdd.$inject = ['$scope', 'apiService', '$location', '$sce'];
})();