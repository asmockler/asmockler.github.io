$(document).ready(function () {

	///////////////////////////////////////////////////////
	//
	// "DEV MODE"
	// Uncomment the code below to disable animations
	//
	// $('section').css({
	// 	'transition' : 'transform 0s',
	// 	'-o-transition' : 'transform 0s',
	// 	'-moz-transition' : 'transform 0s',
	// 	'-webkit-transition' : 'transform 0s',
	// 	'transform' : 'translate3d(0, 0, 0)',
	// 	'padding-top' : '200px',
	// 	'padding-bottom' : '50px',
	// 	'min-height' : '750px',
	// 	'height' : 'auto'
	// });
	// $('.content-body').show();
	// $('.education').addClass('show-image');
	// return;
	//
	///////////////////////////////////////////////////////

	// Intro Animations
	window.setTimeout(function () {

		// Animate each section to its proper place
		var sections = $('section');
		var numSections = sections.length;
		for (var i = 0; i < numSections; i++) {
			sections.eq(i).css({
				'transform' : 'translate3d(0, ' + (200 + (750 * i)) + 'px, 0)'
			});
		}

		// Convert the positioning above to normal padding + height (instead of translate3d)
		// 		Wrapped in another timeout so it executes only after the first movement has finished.
		window.setTimeout(function () {
			$('section').css({
				'transition' : 'transform 0s',
				'-o-transition' : 'transform 0s',
				'-moz-transition' : 'transform 0s',
				'-webkit-transition' : 'transform 0s',
				'transform' : 'translate3d(0, 0, 0)',
				'padding-top' : '200px',
				'padding-bottom' : '50px',
				'min-height' : '750px',
				'height' : 'auto'
			});
			// Fade in the Education section background
			$('.education').addClass('show-image');
			// Fade in the content beneath each header
			$('.content-body').delay(250).fadeIn(750);
		}, 1200)
	}, 750);

});