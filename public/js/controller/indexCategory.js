(function() {
	myController.controller('indexCategory',indexCategory);
	function indexCategory ($scope, apiService, $location,$state ,$stateParams,cfpLoadingBar) {
		$scope.notify = {};
		$scope.notify.confirm =false;
		$scope.take = 9;
		$scope.currentPage = parseInt($stateParams.page);
		$scope.skip = $scope.take * $scope.currentPage - $scope.take;
		var categoryId = parseInt($stateParams.cate);
		if(categoryId.toString() == 'NaN' | $scope.currentPage.toString() == 'NaN') {
			$state.go('error');
		}
		$scope.changePage = function(page) {
			$scope.currentPage  = page;
			$scope.skip = $scope.take * $scope.currentPage - $scope.take;
			$scope.load();
		}

		$scope.load = function (){
			cfpLoadingBar.start();
			apiService('GET','/api/post/category/' + categoryId,{skip:$scope.skip, take:$scope.take}).then(function(data){
				cfpLoadingBar.complete();
				if(data.status == 441) {
					$scope.dropDownTitle = 'Tat ca';
					$scope.posts = data.data.rows;
					$scope.totalAll = data.data.count;
					$state.go('category', {page:$scope.currentPage}, {notify:false, reload:false});
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
	indexCategory.$inject = ['$scope', 'apiService', '$location', '$state', '$stateParams', 'cfpLoadingBar'];
})();