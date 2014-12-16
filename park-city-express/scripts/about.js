var changeSection = function (picked) {
	switch (picked) {
		case 'About Us':
			$('.visible').fadeOut(300, function(){
				$('.visible').removeClass('visible');
				$('.active').removeClass('active');
				$('#about-us').addClass('visible').fadeIn(300);
				$('#about-link').addClass('active');
			});
			break;
		case 'Our Mission':
			$('.visible').fadeOut(300, function(){
				$('.visible').removeClass('visible');
				$('.active').removeClass('active');
				$('#mission').addClass('visible').fadeIn(300);
				$('#mission-link').addClass('active');
			});
			break;
		case 'Our Drivers':
			$('.visible').fadeOut(300, function(){
				$('.visible').removeClass('visible');
				$('.active').removeClass('active');
				$('#drivers').addClass('visible').fadeIn(300);
				$('#drivers-link').addClass('active');
			});
			break;	
		case 'Terms of Service':
			$('.visible').fadeOut(300, function(){
				$('.visible').removeClass('visible');
				$('.active').removeClass('active');
				$('#terms').addClass('visible').fadeIn(300);
				$('#terms-link').addClass('active');
			});
			break;
		case 'Privacy':
			$('.visible').fadeOut(300, function(){
				$('.visible').removeClass('visible');
				$('.active').removeClass('active');
				$('#privacy').addClass('visible').fadeIn(300);
				$('#privacy-link').addClass('active');
			});
			break;
		case 'Security':
			$('.visible').fadeOut(300, function(){
				$('.visible').removeClass('visible');
				$('.active').removeClass('active');
				$('#security').addClass('visible').fadeIn(300);
				$('#security-link').addClass('active');
			});
			break;
		case 'Cancellation &amp; Refund':
			$('.visible').fadeOut(300, function(){
				$('.visible').removeClass('visible');
				$('.active').removeClass('active');
				$('#cancel').addClass('visible').fadeIn(300);
				$('#cancel-link').addClass('active');
			});
			break;
	}
}

$('#terms-link').on('mouseenter mouseleave', function(){
	$('#sub-terms').fadeToggle();
});

$('#sidebar a').on('click', function(e){
	if ($(this).hasClass('active')) {
		return false
	} else {
		changeSection($(this).html());
	}
});

$('#sections').on('change', function(){
	changeSection($(this).val());
});

Fay.init();