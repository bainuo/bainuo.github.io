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
    $('.tabs_menu a').click(function(e) {
        e.preventDefault();
        
        var tab = $(this).attr('href');
        $('.tab').not(tab).css({'display':'none'});
        $(tab).fadeIn(400);
    });
});