//
//		ADAPTIVE MENU
// 
$('body').swipe( {
//Single swipe handler for left swipes
swipeRight: function () {
    $.sidr('close', 'sidr-right');
},
//Default is 75px, set to 0 for demo so any distance triggers swipe
threshold: 45
});

$(document).ready(function() {
    $('.basic').sidr({
        name: 'sidr-right',
        side: 'right'
    });
});
//
//		END ADAPTIVE MENU 
// 
$('.grad_light_blue.arrow_clicked, .grad_lighter_blue.arrow_clicked').click(function () {
	$(this).find('span').toggleClass('actived');
	$(".accordion_toggle").prop("checked");
});

$('.grad_blue.arrow_clicked').click(function () {
	var arrow = $(this).find('span');
	if (arrow.hasClass('actived')) {
		arrow.removeClass('actived')
	} else {
		$('.grad_blue.arrow_clicked span.actived').removeClass('actived');
		arrow.addClass('actived');
	}
	$(".accordion_toggle").prop("checked");
});


$('.arrow_clicked').click(function () {
	$(this).find('.arrow_footer').toggleClass('actived');
});


var uncheckRadio = (function() {
var current;
return function(element) {
if(current == element) {
  element.checked = false;
  current = null;
} else
  current = element;
}
})();


$(document).ready(function(){
    $(".tabs_menu li a").click(function (e) {
        e.preventDefault();
        $("ul li").removeClass("active");
        var related = $(this).attr("href"); //store href value
        $(this).parent().addClass("active");
        if ($(this).parent().hasClass("active")) {
                    var tab = $(this).attr('href');
         $('.tab').not(tab).css({'display':'none'});
         $(tab).fadeIn(400);
        }
    });
});

function arr(elem){
  var num=elem;        
  document.getElementById("feat"+num).style.display=(document.getElementById("feat"+num).style.display== 'none') ? '' : 'none';
  if(document.getElementById("pic"+num).className.indexOf("down")>-1){document.getElementById("pic"+num).className=document.getElementById("pic"+num).className.replace(new RegExp(" down\\b"), "");}else{ document.getElementById("pic"+num).className+=" down";}
}

// Carousel
 $(document).ready(function() {
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    responsiveClass: true,
    nav: true,
    navText: " ",
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 1,
        nav: false
      },
      1000: {
        items: 2,
        nav: true,
        loop: false,
        margin: 20
      }
    }
  })

  $(".next").click(function() {
    $('.owl-carousel').trigger("next.owl.carousel");
  })
  $(".prev").click(function() {
    $('.owl-carousel').trigger("prev.owl.carousel");
  })
})