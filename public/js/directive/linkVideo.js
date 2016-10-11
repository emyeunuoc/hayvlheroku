(function() {
	function linkVideo($sce) {
		return {
			templateUrl: 'template/linkVideo.template.html',
			link: function ($scope, element, attr) {
				$scope.$watch('link', function(newValue, oldValue) {
	                if (newValue){
						$scope.config = {
							preload: "none",
							sources: [
									{src: $sce.trustAsResourceUrl($scope.link), type: "video/mp4"}
							],
							tracks: [
									{
											src: "pale-blue-dot.vtt",
											kind: "subtitles",
											srclang: "en",
											label: "English",
											default: ""
									}
							],
							theme: {
								url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
							}
						};
	                }
	            }, true);
				
			},
			scope: {
				link:'='
			}
		}
	}
	linkVideo.$inject = ['$sce'];
	myDirective.directive('linkVideo', linkVideo);
})();
