$('#sidebar a').on('click', function(e){

	if ($(this).hasClass('active')) {
		return false
	} else {
		switch ($(this).html()) {
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
		}
	}
	
});

Fay.init();