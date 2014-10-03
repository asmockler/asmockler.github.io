$(document).ready(function(){

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
			if (index == 1) {
				color = "#ddd"
			} else if (index == 2){
				color = '#2ECC71'
			} else if (index == 3) {
				color = '#1abc9c'
			} else if (index == 4) {
				color = '#2980b9'
			} else if (index == 5) {
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

	$('#about').on('click', function(){
		$(".main").moveTo(2);
	})
});
