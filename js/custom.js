jQuery(window).load(function($) {
	//BLOG CAROUFREDSEL...
	jQuery('#blog_carousel').carouFredSel({
		responsive: true,
		width: '100%',
		scroll: 1,
		prev: '.blog-arrows .prev',
		next: '.blog-arrows .next',
		auto: false,
		items: {
			width: 300,
			visible: {
				min: 1,
				max: 3
			}
		},
		swipe: {
			onTouch: true,
			onMouse: true
		}
	});
});

jQuery(document).ready(function($){
								
	$("html").niceScroll({ zindex:99999, cursorborder:"1px solid #424242" });

	//ONE PAGE NAV...
	$('#main-menu').onePageNav({
		currentClass : 'current_page_item',
		filter		 : ':not(.external)',
		scrollSpeed  : 750,
		scrollOffset : 89,
		scrollChange : fixMagicline
	});
	
	//MINI MOBILE MENU...
	$('nav#main-menu').meanmenu({
		meanMenuContainer :  $('header #menu-container'),
		meanRevealPosition:  'right',
		meanScreenWidth   :  767,
		meanMenuClose	  :  "<span /><span /><span />"
	});
	
	//TABS...
	if($('ul.tabs-frame').length > 0) {
		$('ul.tabs-frame').tabs('> .tabs-frame-content');
	}

	//ACCORDION...
	$('.toggle').toggle(function(){ $(this).addClass('active'); },function(){ $(this).removeClass('active'); });
	$('.toggle').click(function(){ $(this).next('.toggle-content').slideToggle(); });
	$('.toggle-frame-set').each(function(){
	  var $this = $(this),
		  $toggle = $this.find('.toggle-accordion');
	  
	  $toggle.click(function(){
		if( $(this).next().is(':hidden') ) {
		  $this.find('.toggle-accordion').removeClass('active').next().slideUp();
		  $(this).toggleClass('active').next().slideDown();
		}
		return false;
	  });
	  
	  //Activate First Item always
	  $this.find('.toggle-accordion:first').addClass("active");
	  $this.find('.toggle-accordion:first').next().slideDown();
	});
	
	//TESTIMONIAL QUOTE...
	$('.quotes_wrapper').quovolver({
		children        : 'li',
		transitionSpeed : 600,
		autoPlay        : false,
		equalHeight     : true,
		navPosition     : 'below',
		navNum			: true
    });
	
	//PROGRESS BAR...
	$('#donutchart1').one('inview', function (event, visible) {
		if (visible == true) {
			$("#donutchart1").donutchart({'size': 140, 'donutwidth': 10, 'fgColor': '#E08E79', 'bgColor': '#ffffff', 'textsize': 50 });
			$("#donutchart1").donutchart("animate");
			
			$("#donutchart2").donutchart({'size': 140, 'donutwidth': 10, 'fgColor': '#D8BE9D', 'bgColor': '#ffffff', 'textsize': 50 });
			$("#donutchart2").donutchart("animate");
			
			$("#donutchart3").donutchart({'size': 140, 'donutwidth': 10, 'fgColor': '#B1C9C6', 'bgColor': '#ffffff', 'textsize': 50 });
			$("#donutchart3").donutchart("animate");
			
			$("#donutchart4").donutchart({'size': 140, 'donutwidth': 10, 'fgColor': '#7F7774', 'bgColor': '#ffffff', 'textsize': 50 });
			$("#donutchart4").donutchart("animate");
		}
	});
	
	
	//TWITTER TWEETS...
	$("#tweets_container").tweet({
		modpath: 'js/twitter/',
		username: "envato",
		count: 3,
		loading_text: "loading tweets...",
		join_text: '<i class="icon-twitter"></i>',
		template: "{join}{time}{text}"
	});
	
	//TWEET CAROUFREDSEL...
	$('#tweets_container .tweet_list').carouFredSel({
		width: 'auto',
		height: 'auto',
		scroll: 1,
		direction: 'up',
		prev: '.tweet-nav .prev',
		next: '.tweet-nav .next',
		items: {
			height: 'auto',
			visible: {
				min: 1,
				max: 1
			}
		}
	});
	
	//PARALLAX SECTIONS...
	$('.parallax-section').bind('inview', function (event, visible) {
		if(visible == true) {
			$(this).parallax("50%", .5);
		} else {
			$(this).removeAttr('style');
		}
	});	
	
	//CLIENTS CAROUFREDSEL...
	$('#clients_container').carouFredSel({
		responsive: true,
		width: '100%',
		scroll: 1,
		auto: true,
		prev: '.clients-nav .prev',
		next: '.clients-nav .next',		
		items: {
			width: 250,
			visible: {
				min: 1,
				max: 4
			}
		},
		swipe: {
			onTouch: true,
			onMouse: true
		}
	});
	
	//ISOTOPE CATEGORY...
	var $container = $('.portfolio-container');	
	var $gw = 20;
	
	$('.sorting-container a').click(function(){ 
		$('.sorting-container').find('a').removeClass('active-sort');
		$(this).addClass('active-sort');
		
		var selector = $(this).attr('data-filter');
		$container.isotope({
			filter: selector,
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false
			},
			masonry: {
				columnWidth: $('.portfolio-container .portfolio').width(),
				gutterWidth: $gw
			}
		});
		return false;
	});

	//ISOTOPE...
	if($container.length){
		$container.isotope({ 
			filter: '*',
/*			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false
			},*/
			masonry: {
				columnWidth: $('.portfolio-container .portfolio').width(),
				gutterWidth: $gw
			}
		});
	}
	
	//ISOTOPE...	
	var $pphoto = $('a[data-gal^="prettyPhoto[gallery]"]');
	if($pphoto.length){
		//PRETTYPHOTO...
		$("a[data-gal^='prettyPhoto[gallery]']").prettyPhoto({
			hook:'data-gal',
			overlay_gallery: false, 
			social_tools: false,
			deeplinking: false
		});
	}
	
	//Portfolio Ajax...
	//Portfolio Ajax...
	$(".ajax-portfolio").find("a.link").each(function(){
		$(this).click(function(e){
			$.ajax({
				url : $(this).attr("href"),
				success:function(msg){
					
					$('.ajax-details-wrapper').slideUp( 400,function(){
						$(".ajax-items-wrapper").empty();
						$(msg).appendTo(".ajax-items-wrapper");	
					});
					
					var target_offset = $(".ajax-portfolio").offset().top - 100,
						window_offset = $(window).scrollTop();
	
						if( window_offset > target_offset || target_offset - window_offset > 100  ) {
							$('html,body').animate({ scrollTop: target_offset }, 800);
						}
						
						$('.ajax-details-wrapper').addClass("open-container");
						$("a.ajax_close").css({opacity:1});
						$('.ajax-details-wrapper').slideDown(800);
						
				},
				error: function(){
					console.log("error");
				}
			});
			e.preventDefault();
		});
	});
	
	$("a.ajax_close").click(function(e){
		$(this).animate({opacity:0});
		$('.ajax-details-wrapper').slideUp( 800,function() {
			$('.ajax-details-wrapper').removeClass('open-container');
		});
	e.preventDefault();	
	});

	
	//NEWSLETTER AJAX SUBMIT...
	$('form[name="frmnewsletter"]').submit(function () {
		
		var This = $(this);
		
		if($(This).valid()) {
			var action = $(This).attr('action');

			var data_value = unescape($(This).serialize());
			$.ajax({
				 type: "POST",
				 url:action,
				 data: data_value,
				 error: function (xhr, status, error) {
					 confirm('The page save failed.');
				   },
				  success: function (response) {
					$('#ajax_subscribe_msg').html(response);
					$('#ajax_subscribe_msg').slideDown('slow');
					if (response.match('success') != null) $(This).slideUp('slow');
				 }
			});
		}
		return false;
    });
	$('form[name="frmnewsletter"]').validate({
		rules: { 
			mc_email: { required: true, email: true }
		},
		errorPlacement: function(error, element) { }
	});
	
	//CONTACT BOX VALIDATION & MAIL SENDING....
	$('form[name="frmcontact"]').submit(function () {
		
		var This = $(this);
		
		if($(This).valid()) {
			var action = $(This).attr('action');

			var data_value = unescape($(This).serialize());
			$.ajax({
				 type: "POST",
				 url:action,
				 data: data_value,
				 error: function (xhr, status, error) {
					 confirm('The page save failed.');
				   },
				  success: function (response) {
					$('#ajax_contact_msg').html(response);
					$('#ajax_contact_msg').slideDown('slow');
					if (response.match('success') != null) $(This).slideUp('slow');
				 }
			});
		}
		return false;
    });
	$('form[name="frmcontact"]').validate({
		rules: { 
			txtname: { required: true },
			txtemail: { required: true, email: true }
		},
		errorPlacement: function(error, element) { }
	});
	
	// //GOOGLE MAPS...
	// var $map = $('#map');
	// if( $map.length ) {
	// 	$map.gMap({
	// 		address: 'No: 58 A, East Madison St, Baltimore, MD, USA',
	// 		zoom: 16,
	// 		markers: [
	// 			{ 'address' : 'No: 58 A, East Madison St, Baltimore, MD, USA' }
	// 		]
	// 	});
	// }
	
	//TOOLTIPS...
	$('#social_icons li a').tooltipster({
		animation: 'grow',
		interactive: true,
		theme: '.tooltipster-shadow'
	});

	//GOTO TOP...
	$().UItoTop({ easingType: 'easeOutQuart' });
});

//CUSTOM FIX...
function fixMagicline() {
		
    var $magicLine = $("#magic-line-two");
    
    var leftPos, newWidth;
	
	leftPos = $(".current_page_item a").position().left;
    newWidth = $(".current_page_item").width();
	
	$magicLine.stop().animate({
		left: leftPos,
		width: newWidth
	});
}

// animate css + jquery inview configuration
(function($){
	$(".animate").each(function(){
		$(this).bind('inview', function (event, visible) {
			var $this = $(this),
				$animation = ( $this.data("animation") !== undefined ) ? $this.data("animation") : "slideUp";
				$delay = ( $this.data("delay") !== undefined ) ? $this.data("delay") : 300;
				
				if (visible == true) {
					setTimeout(function() { $this.addClass($animation);	},$delay);
				}else{
					setTimeout(function() { $this.removeClass($animation); },$delay);
				}
		});
	});
	
})(jQuery);	

function funtoScroll(x, e) {
	
	var str = new String(e.target);
	var pos = str.indexOf('#');
	var t = str.substr(pos);
	
	var eleclass = $(e.target).prop("class");
	
	if(eleclass == "external") {
		window.location.href = e.target;	
	} else {
		$.scrollTo(t, 750, { offset: { top: -53 }});
	}
	
	$(x).parent('.mean-bar').next('.mean-push').remove();		
	$(x).parent('.mean-bar').remove();

	$('nav#main-menu').meanmenu({
		meanMenuContainer :  $('header #menu-container'),
		meanRevealPosition:  'right',
		meanScreenWidth   :  767,
		meanMenuClose	  :  "<span /><span /><span />"		
	});
	
	e.preventDefault();
}