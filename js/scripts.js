
/* ==============================================
Android stock browser
=============================================== */
$(function () {
  var nua = navigator.userAgent
  var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1)
  if (isAndroid) {
    $('select.form-control').removeClass('form-control').css('width', '100%')
  }
})
/* ==============================================
Bootstrap fix for WinPhone 8 and IE10 
=============================================== */
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
  var msViewportStyle = document.createElement('style')
  msViewportStyle.appendChild(
    document.createTextNode(
      '@-ms-viewport{width:auto!important}'
    )
  )
  document.querySelector('head').appendChild(msViewportStyle)
}
  /* ==============================================
  Main Elements
  =============================================== */
jQuery(document).ready(function ($) {
    'use strict';

    $(function () {
        $('a[href*=#]:not([href=#])').on('click', function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });

    // Scroll Up
   $(function () {
    $.scrollUp({
        scrollText: false
    });
});
    /* ==============================================
    Hero Section
    =============================================== */
    function parallax() {
        var scrollPosition = $(window).scrollTop();
        $('#hero').css('opacity', ((100 - scrollPosition / 2) * 0.01));
    }
        $(window).on('scroll', function () {
            parallax();
        });
	   
    /* ==============================================
    Active Menu
    =============================================== */
        jQuery(function() {
            var sections = jQuery('section');
            var navigation_links = jQuery('nav a');
            sections.waypoint({
                handler: function(direction) {
                    var active_section;
                    active_section = jQuery(this);
                    if (direction === "up") active_section = active_section.prev();
                    var active_link = jQuery('nav a[href="#' + active_section.attr("id") + '"]');
                    navigation_links.parent().removeClass("active");
                    active_link.parent().addClass("active");
                    active_section.addClass("active-section");
                },
                offset: '35%'
            });
        });
    /* ==============================================
    OnScroll Animation
    =============================================== */
    	$('.animated').appear(function() {

	        var elem = $(this);
	        var animation = elem.data('animation');

	        if ( !elem.hasClass('visible') ) {
	        	var animationDelay = elem.data('animation-delay');
	            if ( animationDelay ) {
	                setTimeout(function(){
	                    elem.addClass( animation + " visible" );
	                }, animationDelay);

	            } else {
	                elem.addClass( animation + " visible" );
	            }
	        }
	    });
    /* ==============================================
    CountTo
    =============================================== */
		jQuery(function($) {
								
			$(".numbers-value").appear(function() {
				$(this).countTo();
		});
	
      });
    /* ==============================================
    Portfolio Lightbox
    =============================================== */    
	$("a[class^='prettyPhoto']").prettyPhoto();
    /* ==============================================
    Filterable Portfolio
    =============================================== */ 
    function layoutPortfolio() {

    var $container = $('ul.portfolio'),
        $items = $container.find('.portfolio-item');

    function refreshWaypoints() {
        setTimeout(function () {
            $.waypoints('refresh');
        }, 1000);
    }

    $('nav.filter ul a').on('click', function () {
        var selector = $(this).attr('data-filter');
        $container.isotope({ filter: selector }, refreshWaypoints());
        $('nav.filter ul a').removeClass('active');
        $(this).addClass('active');
        return false;
    });

}
    layoutPortfolio();
    /* ==============================================
    Home Slide
    =============================================== */ 
    function initHomeSlider(forceInit) {

        if( !forceInit ) {

            if( ! $( '.hiddenslide' ).length ) {
                return false;
            }

        }

        var hslides = [];

        jQuery( '.hiddenslide').each( function() {

            var $this = jQuery( this );
            hslides.push( $this.attr('data-src') );

        });

        $.backstretch( hslides, {duration: 2600, fade: 1000, centeredY: false});

    }

    initHomeSlider(false);
    
    $('.home-slider').flexslider({
        animation: "slide",
        directionNav: false,
        controlNav: false,
        direction: "vertical",
        slideshowSpeed: 3600,
        animationSpeed: 1000,
        smoothHeight: true
    });
    /* ==============================================
    Video Background
    =============================================== */ 
    if( $( '.video-bg' ).length ) {

        if(jQuery.browser.mobile) {
            initHomeSlider(true);
        } else {
            $( '.video-bg' ).mb_YTPlayer();
        }      

    }
    /* ==============================================
    FlexSlider
    =============================================== */ 
    function initFlexSlider(){

        $('.flexslider').flexslider({
            animation: "slide",
            directionNav: false,
            slideshowSpeed: 3500,
            animationSpeed: 1000
        });

    }
    
    initFlexSlider();
    /* ==============================================
    Testimonials
    =============================================== */ 
      $('.testimonials-slider').flexslider({
        animation: "slide",
        animationSpeed: 1000,
        slideshow: true
    });
    /* ==============================================
    Contact form
    =============================================== */
$(function () {
    // Get the form.
    var form = $('#contact-form'),
        // Get the messages div.
        formMessages = $('#form-messages');

    // Set up an event listener for the contact form.
    $(form).submit(function (e) {
        // Stop the browser from submitting the form.
        e.preventDefault();


        $("#btn-submit").addClass("btn-loading");


        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
            .done(function (response) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass('error').addClass('success').fadeIn().delay(5000).fadeOut();
                // Set the message text.
                $(formMessages).text(response);

                // Clear the form.
                $(form).trigger("reset");
                $("#btn-submit").removeClass("btn-loading");
            })
            .fail(function (data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('success').addClass('error').fadeIn().delay(5000).fadeOut();
                // Set the message text.
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('Oops! An error occured and your message could not be sent.');
                }


                $("#btn-submit").removeClass("btn-loading");
            });

    });

}); 
    /* ==============================================
    Google Map
     =============================================== */
    function mapinitialize() {
							var latlng = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
							var myOptions = {
								zoom: 14,
								center: latlng,
								scrollwheel: false,
								scaleControl: false,
								disableDefaultUI: false,
								mapTypeId: google.maps.MapTypeId.ROADMAP
							};
							var map = new google.maps.Map(document.getElementById("map"),myOptions);
                            var image = "images/map-marker.png";
							var marker = new google.maps.Marker({
								map: map, 
								icon: image,
								position: map.getCenter()
							});

							google.maps.event.addListener(marker, 'click', function() {
							  infowindow.open(map,marker);
							});
	
						}
						mapinitialize();
    /* ==============================================
    Newsletter
    =============================================== */
		$('#newsletter_form').submit(function() {
			if (!valid_email_address($("#s_email").val()))
				{
					$(".message").html("<span style='color:#a5a5a5;'>Email address is invalid. Please enter valid email address.</span>");
				}
			else
				{
					$(".message").html("<strong>Success! Check your email to confirm sign up...</strong>");
						$.ajax({
						url: 'subscribe.php',
						data: $('#newsletter_form').serialize(),
						type: 'POST',
						success: function(msg) {
							if(msg=="success")
								{
									$("#s_email").val("");
									$(".message").html('<strong>You have successfully subscribed to our mailing list.</strong>');
								}
							else
								{
									$(".message").html("<span style='color:#a5a5a5;'>The email address you entered was invalid. Please make sure you enter a valid email address to subscribe.</span>");
								}
						}
					});
				}
		 
				return false;			
		});
	
	function valid_email_address(email) {
		var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
		return pattern.test(email);		
	}

})(jQuery);
