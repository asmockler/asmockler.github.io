$(document).scroll(function(){
	if ( $(this).scrollTop() > 300 ){
		$('.navbar').css('background', 'rgba(255,255,255,.87)')
	} else if ( $(this).scrollTop() < 300 ) {
		$('.navbar').css('background', 'rgba(255,255,255,0')
	}
});