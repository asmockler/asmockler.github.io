$(document).ready(function(){
	var menu = $('.menu ul');
	var menuItems = menu.find('li');
	$('.menu .fay-menu-float').on('click', function(){
		if ( $(this).attr('data-fay-open') == "true" ){
			menuItems.each(function (index) {
				$(this).delay(index*150).animate({
					'right': 0
				}, 900, 'easeOutExpo');
			});
		} else if ( $(this).attr('data-fay-open') == "false" ){
			menuItems.each(function (index) {
				$(this).delay(index*25).animate({
					'right': -$(this).outerWidth()
				}, 500, 'easeOutExpo');
			});
		}
	});
});