$(document).ready(function(){
	var menuItems = $('.menu ul');
	menuItems.hide();
	$('.menu .fay-menu-float').on('click', function(){
		if ( !$(this).attr('data-fay-open') ){
			menuItems.fadeIn();
		}
	});
});