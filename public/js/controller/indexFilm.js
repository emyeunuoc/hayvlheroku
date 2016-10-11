(function() {
	myController.controller('film',film);
	function film ($scope, apiService, $location,$state ,$stateParams, $timeout, cfpLoadingBar) {
		$scope.link = $stateParams.film;
		cfpLoadingBar.start();
		apiService('GET','/api/post/link/' + $scope.link,{}).then(function(data){
			cfpLoadingBar.complete();
			if(data.status == 452){
				$state.go('error');
			} else 
			if(data.status == 451){
				$scope.title = data.data.rows[0].title;
				$scope.description = data.data.rows[0].description;
				$scope.category = data.data.rows[0].categoryId;
				$scope.content = data.data.rows[0].content;
				$scope.videoLink = data.data.rows[0].videoLink;
				$scope.coverImg = data.data.rows[0].coverImg;
				$scope.id = data.data.rows[0].id;
				$timeout(function(){
					$('#film-content').children().find('img').addClass('img-responsive')
				}, 300);	
			}
		});

	}
	film.$inject = ['$scope', 'apiService', '$location', '$state', '$stateParams' ,'$timeout','cfpLoadingBar'];
})();