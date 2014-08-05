$(document).ready(function(){

// I GOT RID OF THE NAVBAR SO THIS DOESN'T REALLY NEED TO BE HERE
	// positionNavbar = function () {
	// 	var navWidth = $('nav').width();
	// 	var windowWidth = $(window).width();
	// 	var navPosition = windowWidth - navWidth;

	// 	if (windowWidth < 768) {
	// 		$('.navbar-fixed-top').css({
	// 			'left': '0',
	// 			'width': '100%'
	// 		});
	// 	} else {
	// 		$('.navbar-fixed-top').css({
	// 			'left': navPosition,
	// 			'width': '355px'
	// 		});
	// 	}
	// }

	// positionNavbar();
	// $(window).resize(positionNavbar);

// SETTING UP THE ONEPAGE SCROLL, INCLUDING THE COLOR CHANGE FUNCTION
	$(".main").onepage_scroll({
		sectionContainer: "section",
		easing: "ease-in-out",
		animationTime:1000,
		pagination: true,
		updateURL: true,
		keyboard:true,
		responsiveFallback: 767,
		beforeMove: function(index){
			var color;
			if (index == 1){
				color = '#2ECC71'
			} else if (index == 2) {
				color = '#1abc9c'
			} else if (index == 3) {
				color = '#2980b9'
			} else if (index == 4) {
				color = '#336E7B'
			}

			$('body').animate({
				backgroundColor: color
			}, 1000);
		},
		afterMove: function(){
			console.log('bar');
		}
	});

// MOBILE COLOR CHANGING ON SCROLL

	console.log(window.pageYOffset);

    $(window).bind('mousewheel DOMMouseScroll MozMousePixelScroll scroll keyup keydown', function() {console.log('foo')});
    $(window).unbind('scroll', function(){
    	$(window).bind('scroll', function(){
    		console.log('bar');
    	})
    });

	// $(document).bind('scroll', function(){
	// 	$('body').fadeOut();
	// });
});