document.body.style.display = "none";
$(document).ready(function () {
	$('body').fadeIn(750);
	Fay.init();


	var menuOpen = false;
	$('.menu-btn').on('click', function (e) {
		e.preventDefault();
		
		if (menuOpen) {
			$('.sidenav').css('left', -400);
		} else {
			$('.sidenav').css('left', 0);
		}

		menuOpen = !menuOpen;
	});

	$('.sidenav a').on('click', function (e) {
		e.preventDefault();
		var href = $(this).attr('href');

		if (href === "#")
			return;

		var newPage = './' + $(this).attr('href');
		$('body').fadeOut(300, function () {
			window.location.href = newPage;
		});

	})
});


// TODO

// 1)  Home page (named index.html), should include: 
//     c.    Either a personal statement, goal statement, or mission/vision statement. This is often included on a resume, but it will remain on the home page of this site.

//  3) Personal interests (named interests.html or about.html), should include: 
// 			b.    Information about hobbies, non-professional achievements (e.g. hiked Mt. Everest, ran
// 						marathon, etc.), and anything that might impress or interest potential employers. 
 