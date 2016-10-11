var myApp = angular.module('myApp', ['ui.router','trumbowyg-ng','ngSanitize','com.2fdevs.videogular',
            'com.2fdevs.videogular.plugins.controls',
            'com.2fdevs.videogular.plugins.overlayplay' ,'myController','myDirective','myService', 'myFilter',
            'angular-loading-bar', 'ngAnimate']);

var myController = angular.module('myController', []);

var myDirective = angular.module('myDirective', []);

var myService = angular.module('myService', []);

var myFilter = angular.module('myFilter', []);
myApp.config(config);
function config($stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider) {
	cfpLoadingBarProvider.includeSpinner = true;
	cfpLoadingBarProvider.includeBar = true;
	cfpLoadingBarProvider.parentSelector = '#loadbar';
	$urlRouterProvider.otherwise('/');
	$stateProvider
// phan index
	.state('indexLayout',{
		abstract: true,
		views:{
			'':{
				templateUrl:'template/index/layout.html',
				controller:'indexHeader',
			}
		}
	})
	.state('index', {
		parent:'indexLayout',
		url:'/:page',
		templateUrl:'template/index/index.html',
		controller:'index',
		params:{
			page:"1"
		}
	})
	.state('category',{
		parent:'indexLayout',
		url:'/category/:cate?page',
		templateUrl:'template/index/index.html',
		controller:'indexCategory',
		params:{
			page:"1"
		}
	})
	.state('film',{
		parent:'indexLayout',
		url:'/film/:film',
		templateUrl:'template/index/film.html',
		controller:'film'
	})


//phan admin
	.state('adminHeader',{
		abstract: true,
		views:{
			'': {
				templateUrl:'template/admin/header.html',
				controller:'header'
			}
		}
	})
	.state('login',{
		parent:'adminHeader',
		url:'/admin/login',
		templateUrl:'template/admin/login.html'
	})
	.state('admin',{
		parent:'adminHeader',
		url:'/admin/index',
		templateUrl:'template/admin/admin.html'
	})
	.state('adminAcount',{
		parent:'adminHeader',
		url:'/admin/acount',
		templateUrl:'template/admin/admin-acount.html'
	})
	.state('adminAcount.add',{
		url:'/add',
		templateUrl:'template/admin/admin-acount-add.html'
	})
	.state('adminAcount.list',{
		url:'/list',
		templateUrl:'template/admin/admin-acount-list.html'
	})
	.state('adminCategory',{
		parent:'adminHeader',
		url:'/admin/category',
		templateUrl:'template/admin/admin-category.html'
	})
	.state('adminPost',{
		parent:'adminHeader',
		url:'/admin/post',
		templateUrl:'template/admin/admin-post.html'
	})
	.state('adminPost.add',{
		url:'/add',
		views: {
			'': {templateUrl:'template/admin/admin-post-add.html'},
			'addUpdatePostTemplate@adminPost.add':{
				templateUrl:'template/admin/admin-Add-Update-Post.template.html',
				controller:'adminPostAdd'
			}
		}
	})
	.state('adminPost.update',{
		url:'/update/:updateId',
		views: {
			'': {templateUrl:'template/admin/admin-post-update.html'},
			'addUpdatePostTemplate@adminPost.update':{
				templateUrl:'template/admin/admin-Add-Update-Post.template.html',
				controller:'adminPostUpdate'
			}
		}
	})
	.state('adminPost.list',{
		url:'/list',
		templateUrl:'template/admin/admin-post-list.html'
	})
	//trang bao loi
	.state('error', {
		parent:'indexLayout',
		url:'/error/notify',
		templateUrl:'template/index/error.html'
	})
	$locationProvider.hashPrefix('!');
	$locationProvider.html5Mode({
	    enabled: true,
	    requireBase: false
	});
}
config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', 'cfpLoadingBarProvider'];