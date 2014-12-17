var changeSection = function (picked, speed) {
	var speed = speed;

	switch (picked) {
		case 'About Us':
			$('.visible').fadeOut(speed, function(){
				$('.visible').removeClass('visible');
				$('.active').removeClass('active');
				$('#about').addClass('visible').fadeIn(300);
				$('#about-link').addClass('active');
			});
			break;
		case 'Our Mission':
			$('.visible').fadeOut(speed, function(){
				$('.visible').removeClass('visible');
				$('.active').removeClass('active');
				$('#mission').addClass('visible').fadeIn(300);
				$('#mission-link').addClass('active');
			});
			break;
		case 'Our Drivers':
			$('.visible').fadeOut(speed, function(){
				$('.visible').removeClass('visible');
				$('.active').removeClass('active');
				$('#drivers').addClass('visible').fadeIn(300);
				$('#drivers-link').addClass('active');
			});
			break;	
		case 'Terms of Service':
			$('.visible').fadeOut(speed, function(){
				$('.visible').removeClass('visible');
				$('.active').removeClass('active');
				$('#terms').addClass('visible').fadeIn(300);
				$('#terms-link').addClass('active');
			});
			break;
		case 'Privacy':
			$('.visible').fadeOut(speed, function(){
				$('.visible').removeClass('visible');
				$('.active').removeClass('active');
				$('#privacy').addClass('visible').fadeIn(300);
				$('#privacy-link').addClass('active');
			});
			break;
		case 'Security':
			$('.visible').fadeOut(speed, function(){
				$('.visible').removeClass('visible');
				$('.active').removeClass('active');
				$('#security').addClass('visible').fadeIn(300);
				$('#security-link').addClass('active');
			});
			break;
		case 'Cancellation and Refund':
			$('.visible').fadeOut(speed, function(){
				$('.visible').removeClass('visible');
				$('.active').removeClass('active');
				$('#cancel').addClass('visible').fadeIn(300);
				$('#cancel-link').addClass('active');
			});
			break;
	}
}

var events = function () {
	$('#terms-link').on('mouseenter mouseleave', function(){
		$('#sub-terms').fadeToggle();
	});

	$('#sidebar a').on('click', function(e){
		if ($(this).hasClass('active')) {
			return false
		} else {
			changeSection($(this).html(), 300);
		}
	});

	$('#sections').on('change', function(){
		changeSection($(this).val(), 300);
	});
}

var router = function(location){
	var route = function(page) {
		$('.visible').removeClass('visible');
		$('.active').removeClass('active');

		$('#' + page).addClass('visible').show();
		$('#' + page + '-link').addClass('active');
	}

	switch (location) {
		case "":
			route('about');
			break;
		case "#/about-us":
			route('about');
			break;
		case "#/our-mission":
			route('mission');
			break;
		case "#/our-drivers":
			route('drivers');
			break;
		case "#/terms-of-service":
			route('terms');
			break;
		case "#/privacy":
			route('privacy')
			break;
		case "#/security":
			route('security');
			break;
		case "#/cancellation-and-refund":
			route('cancel');
			break;
	}
}


var initialize = function() {
	router(window.location.hash);
	Fay.init();
	events();
}

initialize();
