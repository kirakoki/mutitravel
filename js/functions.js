// If JavaScript is enabled remove 'no-js' class and give 'js' class
jQuery('html').removeClass('no-js').addClass('js');

// Add .osx class to html if on Os/x
if ( navigator.appVersion.indexOf("Mac")!=-1 ) 
	jQuery('html').addClass('osx');

// When DOM is fully loaded
jQuery(document).ready(function($) {

/* --------------------------------------------------------	
	 External Links
   --------------------------------------------------------	*/	

	(function() {
	    $(window).load(function() {
			$('a[rel=external]').attr('target','_blank');	
		});                                            
	})();  

/* --------------------------------------------------------	
	 Tooltips
   --------------------------------------------------------	*/	

	(function() {
    $('body').tooltip({
        delay: { show: 300, hide: 0 },
        selector: '[data-toggle=tooltip]:not([disabled])'
    });
  })(); 
   
/* --------------------------------------------------------	
	 Responsive Navigation
   --------------------------------------------------------	*/	
	
	(function() {

		var $mainNav    = $('.navbar .nav'),
			responsiveNav = '';

		// Responsive nav
		$mainNav.find('li').each(function() {
			var $this   = $(this),
				$link = $this.children('a'),
				depth   = $this.parents('ul').length - 1,
				indent  = '';

			if( depth ) {
				while( depth > 0 ) {
					indent += ' - ';
					depth--;
				}
			}

			if ($link.text())
				responsiveNav += '<option ' + ($this.hasClass('active') ? 'selected="selected"':'') + ' value="' + $link.attr('href') + '">' + indent + ' ' + $link.text() + '</option>';

		}).end().after('<select class="nav-responsive">' + responsiveNav + '</select>');

		$('.nav-responsive').on('change', function() {
			window.location = $(this).val();
		});
			
	})();      

/* --------------------------------------------------------	
	 Gallery 
   --------------------------------------------------------	*/	

   (function() {
		$(window).load(function(){
			// container
			var $container = $('#portfolio-items');
			function filter_projects(tag)
			{
			  // filter projects
			  $container.isotope({ filter: tag });
			  // clear active class
			  $('li.active').removeClass('active');
			  // add active class to filter selector
			  $('#portfolio-filter').find("[data-filter='" + tag + "']").parent().addClass('active');
			  // update location hash
			  if (tag!='*')
				window.location.hash=tag.replace('.','');
			  if (tag=='*')
			  	window.location.hash='';
			}
			if ($container.length) {
				// conver data-tags to classes
				$('.project').each(function(){
					$this = $(this);
					var tags = $this.data('tags');
					if (tags) {
						var classes = tags.split(',');
						for (var i = classes.length - 1; i >= 0; i--) {
							$this.addClass(classes[i]);
						};
					}
				})
				// initialize isotope
				$container.isotope({
				  // options...
				  itemSelector : '.project',
				  layoutMode   : 'fitRows'
				});
				// filter items
				$('#portfolio-filter li a').click(function(){
					var selector = $(this).attr('data-filter');
					filter_projects(selector);
					return false;
				});
				// filter tags if location.has is available. e.g. http://example.com/work.html#design will filter projects within this category
				if (window.location.hash!='')
				{
					filter_projects( '.' + window.location.hash.replace('#','') );
				}
			}
		})

	})();

/* --------------------------------------------------------	
	 Footer Contact Form
   --------------------------------------------------------	*/	

	$('#send').click(function(){ // when the button is clicked the code executes
		$('.error').fadeOut('slow'); // reset the error messages (hides them)

		var error = false; // we will set this true if the form isn't valid

		var name = $('input#name').val(); // get the value of the input field
		if(name == "" || name == " " || name == "Name") {
			$('#err-name').fadeIn('slow'); // show the error message
			error = true; // change the error state to true
		}

		var email_compare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/; // Syntax to compare against input
		var email = $('input#email').val(); // get the value of the input field
		if (email == "" || email == " " || email == "E-mail") { // check if the field is empty
			$('#err-email').fadeIn('slow'); // error - empty
			error = true;
		}else if (!email_compare.test(email)) { // if it's not empty check the format against our email_compare variable
			$('#err-emailvld').fadeIn('slow'); // error - not right format
			error = true;
		}
    
		var message = $('textarea#message').val(); // get the value of the input field
		if(message == "" || message == " " || message == "Message") {
			$('#err-message').fadeIn('slow'); // show the error message
			error = true; // change the error state to true
		} 

		if(error == true) {
			$('#err-form').slideDown('slow');
			return false;
		}

		var data_string = $('#ajax-form').serialize(); // Collect data from form
		//alert(data_string);

		$.ajax({
			type: "POST",
			url: $('#ajax-form').attr('action'),
			data: data_string,
			timeout: 6000,
			error: function(request,error) {
				if (error == "timeout") {
					$('#err-timedout').slideDown('slow');
				}
				else {
					$('#err-state').slideDown('slow');
					$("#err-state").html('An error occurred: ' + error + '');
				}
			},
			success: function() {
				//$('#ajax-form').slideUp('slow');
				$('#ajaxsuccess').slideDown('slow');
        $('#ajaxsuccess').delay(4000);
        $('#ajaxsuccess').fadeOut(1000);

        $("#name").val('');
        $("#email").val('');
        $("#message").val('');
			}
		});

		return false; // stops user browser being directed to the php file
	}); // end click function

/* --------------------------------------------------------	
	 Flex Initialize
   --------------------------------------------------------	*/	

$(window).load(function() {
  $('.slider1').flexslider({ 
    animation: "slide",
    start: function(slider){
      $('body').removeClass('loading');
    }, 
  });

  $('.slider2').flexslider({
    animation: "slide",
    slideshow: false,
    animationLoop: false    
  });
});
  
});

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-10146041-21', 'auto');
  ga('send', 'pageview');


//Scrolldown from banner
$("a.nav-services").click(function() {
    $('html, body').animate({scrollTop: $("#services").offset().top}, 1000);
  });

$("a.nav-contact").click(function() {
    $('html, body').animate({scrollTop: $("#contact").offset().top -80}, 1000);
  });

//js fiddle maps
// Initialize and add the map
function initMap() {
	// The location of Uluru
	
	const center_mid = { lat: 35.126690, lng:33.526981};
	const uluru = { lat: 35.339048, lng:33.196151 };
	// The map, centered at Uluru
	const map = new google.maps.Map(document.getElementById("map"), {
	  zoom: 7.82,
	  center: center_mid,
	  mapTypeId: "terrain",
	});
	// The marker, positioned at Uluru
	const marker = new google.maps.Marker({
	  position: uluru,
	  map: map,
	  
	});
  }



  ////language///////////


  var languageSelect = document.getElementById('LanguageSelect');
  var selectedLanguage = readCookie('language');
   
   if ((selectedLanguage == 'english') || (selectedLanguage == 'spanish') || (selectedLanguage == 'portuguese')) {
   $(".language select").val(selectedLanguage);
   var sel = $(".language select").val(selectedLanguage);
   if (selectedLanguage == 'english') {
		  $(".english").css("display", "inline");
		  $(".spanish").css("display", "none"); 
		  $(".portuguese").css("display", "none"); 
	   }else if (selectedLanguage =='spanish') {
		  $(".english").css("display", "none");
		  $(".spanish").css("display", "inline");
		  $(".portuguese").css("display", "none");
	   }else if (selectedLanguage =='portuguese') {
		  $(".english").css("display", "none");
		  $(".spanish").css("display", "none");
		  $(".portuguese").css("display", "inline");
	   }
   }

   $(".language select").bind('change', function() {
	   //on change set cookie and...
	   setCookie('language', this.value, 365);
	   
	   //change css depending on what is selected
	   var sel = $(".language select").val();
	   if (sel=='english') {
		  $(".english").css("display", "inline");
		  $(".spanish").css("display", "none");
		  $(".portuguese").css("display", "none");
	   }else if (sel=='spanish') {
		  $(".english").css("display", "none");
		  $(".spanish").css("display", "inline");
		  $(".portuguese").css("display", "none"); 
	   }else if (sel=='portuguese') {
		  $(".english").css("display", "none");
		  $(".spanish").css("display", "none");
		  $(".portuguese").css("display", "inline"); 
	   
	   }
	   

});

function saveLanguage(cookieValue)
{
   var sel = document.getElementById('LanguageSelect');
   setCookie('language', cookieValue, 365);
}

function setCookie(cookieName, cookieValue, nDays) {
   var today = new Date();
   var expire = new Date();

   if (nDays==null || nDays==0)
	   nDays=1;

   expire.setTime(today.getTime() + 3600000*24*nDays);
   document.cookie = cookieName+"="+escape(cookieValue) + ";expires="+expire.toGMTString();
}

function readCookie(name) {
 var nameEQ = name + "=";
 var ca = document.cookie.split(';');
 for(var i = 0; i < ca.length; i++) {
   var c = ca[i];
   while (c.charAt(0) == ' ') c = c.substring(1, c.length);
   if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
 }
 return null;
}

  