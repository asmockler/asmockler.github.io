$(document).scroll(function(){
	if ( $(document).width() > 768 ) {
		if ( $(this).scrollTop() > 100 ){
			$('.navbar').css('background', 'rgba(255,255,255,.87)')
		} else if ( $(this).scrollTop() < 100 ) {
			$('.navbar').css('background', 'rgba(255,255,255,0')
		}
	}
});