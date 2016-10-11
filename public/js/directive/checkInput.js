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