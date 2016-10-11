(function() {
	myService.service('apiService', apiService);
	function apiService ($q, $http, $location) {
		return function(method, path, body) {
			var deferred = $q.defer();
			if(method == 'GET') {
				$http({
				    url: path, 
				    method: "GET",
				    params: body
				}).then(function(res){
					if(res.data.status == 103 || res.data.status == 102) {
						$location.path('/admin/login').replace();
					}
					deferred.resolve(res.data);
				},function(err) {
					deferred.reject(err);
				});
			} else {
				var req = {
				    method: method,
				    url: path,
				    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				    transformRequest: function(obj) {
				        var str = [];
				        for(var p in obj)
				        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				        return str.join("&");
				    },
				    data: body
				}
				$http(req).then(function(res){
					if(res.data.status == 103 || res.data.status == 102) {
						$location.path('/admin/login').replace();
					}
					deferred.resolve(res.data);
				}, function(err){
					deferred.reject(err);
				});
			}
			return deferred.promise;
		}
	}
	apiService.$inject = ['$q', '$http', '$location'];
})();