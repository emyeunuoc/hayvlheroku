(function() {
	function pagging() {
		return {
			template: '<nav>\
	<ul class="pagination">  \
		<li class="{{currentPage == 1 ? \'disabled\' : \'\'}}"><a href="" ng-click="prev()">Previous</a></li>  \
		<li class="{{isActive(key + 1)}}" ng-if="isHead()" ng-repeat="(key, value) in getNumber()  track by $index" ng-show="countPage()>10">  \
			<a href="" ng-click="changePage(key + 1 )">{{key + 1 }}</a>  \
		</li>  \
		<li class="{{isActive(countPage() + key - 9 )}}" ng-if="isTail()" ng-repeat="(key, value) in getNumber()  track by $index" ng-show="countPage()>10"> \
			<a href="" ng-click="changePage(countPage() + key - 9)">{{countPage() + key - 9}}</a> \
		</li>  \
		<li class="{{isActive(currentPage - 5 + key)}}" ng-if="isCenter()" ng-repeat="(key, value) in getNumber()  track by $index"  ng-show="countPage()>10"> \
			<a href="" ng-click="changePage(currentPage - 5 + key)">{{currentPage - 5 + key}}</a> \
		</li> \
		<li class="{{isActive(key + 1)}}" ng-repeat="(key, value) in getNumber() track by $index" ng-if="countPage()<=10">\
			<a href="" ng-click="changePage(key + 1 )">{{key + 1 }}</a>  \
		</li> \
		<li class="{{countPage() == currentPage ? \'disabled\' : \'\'}} " ng-click="next()"><a href="">Next</a></li> \
	</ul> \
</nav>',
			link: function ($scope, element, attr) {
				$scope.$watch('totalItems', function(newValue, oldValue) {
	                if (newValue){
	                	if($scope.countPage() < $scope.currentPage)	{
	                		$scope.changePage($scope.countPage());
	                	}
	                }
	            }, true);

				$scope.countPage = function() {
					return Math.ceil($scope.totalItems / $scope.itemsPerPage);
				}

				$scope.isHead = function() {
					if ($scope.currentPage < 7) return true;
					return false;
				}

				$scope.isTail = function() {
					if ($scope.currentPage > $scope.countPage() - 5) return true;
					return false;
				}

				$scope.isCenter = function() {
					if(!$scope.isHead() && !$scope.isTail()) return true;
					return false;
				}

				$scope.getNumber = function() {
					if ($scope.countPage() < 10) {
						return new Array($scope.countPage())
					}
				    return new Array(10);   
				}

				$scope.isActive = function(page) {
					return $scope.currentPage == page ? 'active' : ''
				}
				$scope.changePage = function(page) {
					if(page > $scope.countPage()) {
						page = $scope.countPage();
					}
					$scope.change()(page);
				}
				$scope.prev = function() {
					if($scope.currentPage == 1) return;
					$scope.changePage($scope.currentPage - 1);
				}
				$scope.next = function() {
					if($scope.currentPage == $scope.countPage()) return;
					$scope.changePage($scope.currentPage + 1);
				}
			},
			scope: {
				totalItems:'=',
				currentPage:'=',
				itemsPerPage:'=',
				change:'&'
			}
		}
	}
	myDirective.directive('pagging', pagging);
})();
