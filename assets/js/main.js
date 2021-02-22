
  
(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});


			// Fix: Remove transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#navPanel')
						.css('transition', 'none');

		// Gallery.
		$('.gallery').each(function() {

			var	$gallery = $(this),
				$content = $gallery.find('.content');

			// Poptrox.
				$content.poptrox({
					usePopupCaption: true
				});






		});

		// Off-Canvas Navigation.

			// Navigation Panel Toggle.
			$('<a href="#navPanel" class="navPanelToggle"></a>')
			.appendTo($body);

	// Navigation Panel.
		$(
			'<div id="navPanel">' +
				$('#nav').html() +
				'<a href="#navPanel" class="close"></a>' +
			'</div>'
		)
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right'
			});

	// Fix: Remove transitions on WP<10 (poor/buggy performance).
		if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
			$('#navPanel')
				.css('transition', 'none');

	});



	document.addEventListener("DOMContentLoaded", function() {
		var lazyloadImages;    
	  
		if ("IntersectionObserver" in window) {
		  lazyloadImages = document.querySelectorAll(".lazy");
		  var imageObserver = new IntersectionObserver(function(entries, observer) {
			entries.forEach(function(entry) {
			  if (entry.isIntersecting) {
				var image = entry.target;
				image.src = image.dataset.src;
				image.classList.remove("lazy");
				imageObserver.unobserve(image);
			  }
			});
		  });
	  
		  lazyloadImages.forEach(function(image) {
			imageObserver.observe(image);
		  });
		} else {  
		  var lazyloadThrottleTimeout;
		  lazyloadImages = document.querySelectorAll(".lazy");
		  
		  function lazyload () {
			if(lazyloadThrottleTimeout) {
			  clearTimeout(lazyloadThrottleTimeout);
			}    
	  
			lazyloadThrottleTimeout = setTimeout(function() {
			  var scrollTop = window.pageYOffset;
			  lazyloadImages.forEach(function(img) {
				  if(img.offsetTop < (window.innerHeight + scrollTop)) {
					img.src = img.dataset.src;
					img.classList.remove('lazy');
				  }
			  });
			  if(lazyloadImages.length == 0) { 
				document.removeEventListener("scroll", lazyload);
				window.removeEventListener("resize", lazyload);
				window.removeEventListener("orientationChange", lazyload);
			  }
			}, 20);
		  }
	  
		  document.addEventListener("scroll", lazyload);
		  window.addEventListener("resize", lazyload);
		  window.addEventListener("orientationChange", lazyload);
		}
	  })
	
})(jQuery);