$(window).on('load', function(){
	$('#slider1').nivoSlider({ pauseTime:4000, pauseOnHover:false, controlNav: false,
		effect: 'fade',
		pauseOnHover: false,
		directionNav: false,
		controlNavThumbs: false, });
	
	setTimeout(function(){
		$('#slider3').nivoSlider({
			pauseTime:4000,
			pauseOnHover:false,
			controlNavThumbs:true
		});
	}, 2000);
	setTimeout(function(){
		$('#slider4').nivoSlider({
			controlNav: false,
			effect: 'fade',
			pauseOnHover: false,
			directionNav: false,
			controlNavThumbs: false,
		});
	}, 3000);
});