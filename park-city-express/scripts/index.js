var changeSubText = function () {
	var $this = $('#sub-title span');
	var currentWord = $this.html();
	var word;

	switch (currentWord) {
		case '':
			word = 'Park City resorts.'
			break;
		case 'Park City resorts.':
			word = 'Sundance Film Festival.'
			break;
		case 'Sundance Film Festival.':
			word = 'the best restaurants.'
			break;
		case 'the best restaurants.':
			word = 'Park City resorts.'
			break;
	}

	$this.fadeOut(200, function(){
		$this.html(word).fadeIn(200);
	});
}

changeSubText();

window.setInterval(function(){
  changeSubText();
}, 2500);

$(document).scroll(function(){
	if ( $(this).scrollTop() > 300 ){
		$('.navbar').css('background', 'rgba(0,0,0,.5)')
	} else if ( $(this).scrollTop() < 300 ) {
		$('.navbar').css('background', 'rgba(0,0,0,0')
	}
});
