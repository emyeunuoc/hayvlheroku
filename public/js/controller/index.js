(function() {
	myController.controller('index',index);
	function index ($scope, apiService, $location,$state ,$stateParams ,cfpLoadingBar) {
		$scope.notify = {};
		$scope.notify.confirm =false;
		$scope.take = 9;
		$scope.currentPage = parseInt($stateParams.page);
		if($scope.currentPage.toString() == 'NaN') {
			$state.go('error');
		}
		$scope.skip = $scope.take * $scope.currentPage - $scope.take;
		$scope.changePage = function(page) {
			$scope.currentPage  = page;
			$scope.skip = $scope.take * $scope.currentPage - $scope.take;
			$scope.load();
		}

		$scope.load = function (){
			cfpLoadingBar.start();
			apiService('GET','/api/post',{skip:$scope.skip, take:$scope.take}).then(function(data){
				cfpLoadingBar.complete();
				if(data.status == 401) {
					$scope.dropDownTitle = 'Tat ca';
					$scope.posts = data.data.rows;
					$scope.totalAll = data.data.count;
					$state.go('index', {page:$scope.currentPage}, {notify:false, reload:false});
					
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
		$scope.load();
		loadCategory();
	}
	index.$inject = ['$scope', 'apiService', '$location', '$state', '$stateParams','cfpLoadingBar'];
})();