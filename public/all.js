(function() {
	myController.controller('adminAcountList',adminAcountList);
	function adminAcountList ($scope, apiService, $location) {
		function getPage() {
			var token = localStorage.getItem('token');
			apiService('GET', '/api/user', {skip:$scope.skip, take:$scope.take, token:token}).then(function(data) {
				$scope.users = data.data.rows;
				$scope.totalAll = data.data.count;
			});
		}
		$scope.skip = 0;
		$scope.take = 5;
		$scope.currentPage = 1;
		$scope.notify = {};
		$scope.changePage = function(page) {
			$scope.currentPage  = page;
			$scope.skip = $scope.take * $scope.currentPage - $scope.take;
			getPage();
		}
		$scope.changeStatus = function(status,id) {
			var token = localStorage.getItem('token');
			apiService('PUT', '/api/user', {token:token,status:status,id:id}).then(function (data) {
				if(data.status == 231){
					getPage();
				}
				if(data.status == 104){
					$scope.notify.message = 'Ban ko co quyen admin de dung chuc nang nay';
					$scope.notify.confirm = null;
					$('#modalUserNotify').modal('show');
				}
			})
		}
		$scope.showDetail = function(id) {
			var token = localStorage.getItem('token');
			apiService('GET', '/api/user/' + id, {token:token, id:id}).then(function (data) {
				if(data.status == 201){
					$scope.userDetail = data.data.rows[0];
					$('#modalUserDetail').modal('show');
				}
			})
		}
		$scope.prepareDeteteUser = function (id) {
			$scope.notify.message = 'Ban co muon xoa ?';
			$scope.notify.confirm = id;
			$('#modalUserNotify').modal('show');
		}
		$scope.deleteUser = function(id) {
			$scope.notify.confirm = null;
			var token = localStorage.getItem('token');
			apiService('DELETE', '/api/user', {token:token,id:id}).then(function(data){
				if(data.status == 221){
					$scope.notify.message = 'Xoa thanh cong';
					getPage();
				} else if(data.status == 222){
					$scope.notify.message = 'Da co loi xay ra phia server,chung toi se fix ngay lap tuc';
				} else if (data.status == 104) {
					$scope.notify.message = 'Ban ko co quyen admin de dung chuc nang nay';
				}
				$('#modalUserNotify').modal('show');
			}); 
		} 
		getPage();
	}
	adminAcountList.$inject = ['$scope','apiService', '$location'];
})();
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
(function() {
	myController.controller('header',header);
	function header ($scope, apiService, $location) {
		$scope.logout = function() {
			localStorage.removeItem('password');
			localStorage.removeItem('username');
			localStorage.removeItem('token');
			$scope.username = localStorage.getItem('username');
			$location.path('/admin/login').replace();
		}
		$scope.isLogin = function() {
			$scope.username = localStorage.getItem('username');
			return localStorage.getItem('token');
		}
	}
	header.$inject = ['$scope', 'apiService', '$location'];
})();
(function() {
	myController.controller('adminIndex',adminIndex);
	function adminIndex ($scope, apiService, $location) {
		loadView();
		apiService('GET', '/api/authenticate', {token:localStorage.getItem('token')}).then(function(data){
			if (!data.success) {
				$location.path('/admin/login').replace();
			}
		});
		function loadView() {
			apiService('GET','/api/view').then(function(data){
				$scope.views = data.views
			})
		}
		$scope.loadView = function(){
			loadView();
		}
	}
	adminIndex.$inject = ['$scope', 'apiService', '$location'];
})();
(function() {
	myController.controller('adminLogin',adminAcountList);
	function adminAcountList ($scope, apiService, $location) {
		apiService('GET', '/api/authenticate', {token:localStorage.getItem('token')}).then(function(data){
			if (data.success) {
				$location.path('/admin').replace();
			}
		});
		$scope.submit = function() {	
			if(!$scope.inputUser || !$scope.inputPassword || $scope.inputPassword.length < 5 || $scope.inputPassword > 12 ||
			 $scope.inputUser.length < 5 || $scope.inputUser > 12 ) {
				return;
			}
			var user = {
				username: $scope.inputUser,
				password: $scope.inputPassword
			}
			apiService('POST','/api/login',user).then(function(data){
				if(data.success) {
					$scope.loginErr = null;
					localStorage.setItem('username', user.username);
					localStorage.setItem('password', user.password);
					localStorage.setItem('token', data.token);
					$location.path('/admin/index').replace();
				} else {
					$scope.loginErr = data.notify;
					$('#loginNotify').modal('show');
				}
			});
		}
	}
	adminAcountList.$inject = ['$scope', 'apiService', '$location'];
})();
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
(function() {
	myController.controller('adminAddUser',adminAddUser);
	function adminAddUser ($scope, apiService, $location) {
		$scope.notify = {};
		$scope.submitForm = function(form){
			if(form) {
				var token = localStorage.getItem('token');
				var data = {
					token:token,
					username: $scope.username,
					password: $scope.password,
					age: $scope.age,
					telephone:$scope.telephone,
					gender:$scope.gender,
					email:$scope.email
				}
				console.log(data);
				apiService('POST','/api/user',data).then(function(data){
					console.log(data)
					if(data.status == 211){
						$scope.notify.message = "Da tao user";
					} else if(data.status == 104){
						$scope.notify.message = "Ban khong co quyen admin de su dung tinh nag nay"
					} else if(data.status == 212) {
						$scope.notify.message = 'Da ton tai user'
					}
					$('#modalUserAddNotify').modal('show');
				});
			}else{
				return;
			}
		};
	}
	adminAddUser.$inject = ['$scope', 'apiService', '$location'];
})();
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
(function() {
	myController.controller('indexHeader',indexHeader);
	function indexHeader ($scope, apiService, $location) {
		$scope.getPage = function() {
			apiService('GET', '/api/category',{}).then(function(data) {
				$scope.category = data.data.rows;
			});
		}
		$scope.getPage();
		$scope.getLink = function(id, title) {
			title = title.toLowerCase()
	        title= title.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
	        title= title.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
	        title= title.replace(/ì|í|ị|ỉ|ĩ/g,"i");
	        title= title.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ  |ợ|ở|ỡ/g,"o");
	        title= title.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
	        title= title.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
	        title= title.replace(/đ/g,"d");
	        title = id + '-' + title.split(/[^a-z0-9]+/).join('-');
			return title;
		}

	}
	indexHeader.$inject = ['$scope','apiService', '$location'];
})();
(function() {
	myDirective.directive('ngCheckInput', ngCheckInput);
	function ngCheckInput() {
		return {
			restrict: 'A',
			scope:{},
			link: function(scope, ele, attr){
				$('.my-tooltiptext').addClass('disable');
				function checkInput (){
					$(ele).prev().children('.my-tooltiptext').css('width',$(ele).css('width'));
					var isError = $(ele).prev().children('.my-tooltiptext').html();
					if(!isError) {
						$(ele).prev().children('.my-tooltiptext').addClass('disable');
						return;
					}
					$(ele).prev().children('.my-tooltiptext').removeClass('disable');
				}
				$(window).resize(function () {
					$(ele).prev().children('.my-tooltiptext').css('width',$(ele).css('width'));
				});
				//bat event keyup input
				$(ele).keyup(function(){
					checkInput();
				});
				$(ele).on('paste delete cut',function(){
					var element = this;
					setTimeout(function () {
						checkInput();
					}, 100);

				});
				$(ele).focus(function(){
					checkInput();
					$(ele).prev().children('.my-tooltiptext').removeClass('disable');
				});
				$(ele).blur(function(){
					checkInput()
					$(ele).prev().children('.my-tooltiptext').addClass('disable');
				});
			}
			
		}
	}


})();
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

(function() {
	myFilter.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);
})();


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