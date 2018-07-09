$(document).ready(function() {
    /**
     * Глобальные переменные, которые используются многократно
     */
    // var globalOptions = {
        // время для анимаций
        // time:  200,

        // контрольные точки адаптива
        // desktopXlSize: 1599,
        // desktopLgSize: 1379,
        // desktopSize:   1199,
        // tabletLgSize:   959,
        // tabletSize:     767,
        // mobileSize:     479,

        // проверка touch устройств
        // isTouch: $.browser.mobile
    // };

    // $(window).load(function() {
    //     if (globalOptions.isTouch) {
    //         $('body').addClass('touch').removeClass('no-touch');
    //     } else {
    //         $('body').addClass('no-touch').removeClass('touch');
    //     }

    //     if (Modernizr.flexbox) {
    //         // Modern Flexbox with `flex-wrap` is supported
    //     } else {
    //         flexibility(document.documentElement);
    //     }

    //     if ($('textarea').length > 0) {
    //         autosize($('textarea'));
    //     }
    // });


    /**
     * Подключение js partials
     */
//     $('.js-product-carousel').slick({
//   dots: true,
//   adaptiveHeight: true,
//   appendDots: $(".slick-dots"),
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   autoplay: true,
//   autoplaySpeed: 3500
// });


// $('.js-product-interested-carousel').slick({
//   dots: false,
//   infinite: true,
//   speed: 300,
//   slidesToShow: 4,
//   slidesToScroll: 1,
//   variableWidth: true,
//   responsive: [
//     {
//       breakpoint: 1000,
//       settings: {
//         arrows: false,
//         slidesToShow: 3,
//         slidesToScroll: 3,
//         infinite: true,
//       }
//     },
//     {
//       breakpoint: 600,
//       settings: {
//         arrows: false,
//         slidesToShow: 1,
//         slidesToScroll: 1
//       }
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         arrows: false,
//         slidesToShow: 1,
//         slidesToScroll: 1
//       }
//     }
//   ]
// });



// $('.main-menu__dropdown').click(function() {
//   $('.main-menu-sub__wrap').toggleClass('visible');
// });





$('.detail-product-slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  mobileFirst: true,
  asNavFor: '.detail-product-slider-nav'
});
$('.detail-product-slider-nav').slick({
  slidesToShow: 5,
  slidesToScroll: 1,
  asNavFor: '.detail-product-slider',
  centerMode: true,
  centerPadding: '0px',
  focusOnSelect: true,
  arrows: true,
  vertical: true
});

$('.detail-product-slider').slickLightbox({
  itemSelector        : '.detail-product-slider__item a',
  navigateByKeyboard  : true
});



// $(window).scroll(function() {
//   if ($(this).scrollTop() > 100){
//     $('.js-main-menu').addClass("sticky");
//   }
//   else{
//     $('.js-main-menu').removeClass("sticky");
//   }
// });
    // var acc = document.getElementsByClassName("accordion");
    // var i;

    // for (i = 0; i < acc.length; i++) {
    //   acc[i].addEventListener("click", function() {
    //     this.classList.toggle("accordion__active");
    //     var panel = this.nextElementSibling;
    //     if (panel.style.maxHeight){
    //       panel.style.maxHeight = null;
    //     } else {
    //       panel.style.maxHeight = panel.scrollHeight + "px";
    //     } 
    //   });
    // }


 

});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbnRlcm5hbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgIC8qKlxyXG4gICAgICog0JPQu9C+0LHQsNC70YzQvdGL0LUg0L/QtdGA0LXQvNC10L3QvdGL0LUsINC60L7RgtC+0YDRi9C1INC40YHQv9C+0LvRjNC30YPRjtGC0YHRjyDQvNC90L7Qs9C+0LrRgNCw0YLQvdC+XHJcbiAgICAgKi9cclxuICAgIHZhciBnbG9iYWxPcHRpb25zID0ge1xyXG4gICAgICAgIC8vINCy0YDQtdC80Y8g0LTQu9GPINCw0L3QuNC80LDRhtC40LlcclxuICAgICAgICB0aW1lOiAgMjAwLFxyXG5cclxuICAgICAgICAvLyDQutC+0L3RgtGA0L7Qu9GM0L3Ri9C1INGC0L7Rh9C60Lgg0LDQtNCw0L/RgtC40LLQsFxyXG4gICAgICAgIGRlc2t0b3BYbFNpemU6IDE1OTksXHJcbiAgICAgICAgZGVza3RvcExnU2l6ZTogMTM3OSxcclxuICAgICAgICBkZXNrdG9wU2l6ZTogICAxMTk5LFxyXG4gICAgICAgIHRhYmxldExnU2l6ZTogICA5NTksXHJcbiAgICAgICAgdGFibGV0U2l6ZTogICAgIDc2NyxcclxuICAgICAgICBtb2JpbGVTaXplOiAgICAgNDc5LFxyXG5cclxuICAgICAgICAvLyDQv9GA0L7QstC10YDQutCwIHRvdWNoINGD0YHRgtGA0L7QudGB0YLQslxyXG4gICAgICAgIGlzVG91Y2g6ICQuYnJvd3Nlci5tb2JpbGVcclxuICAgIH07XHJcblxyXG4gICAgJCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKGdsb2JhbE9wdGlvbnMuaXNUb3VjaCkge1xyXG4gICAgICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ3RvdWNoJykucmVtb3ZlQ2xhc3MoJ25vLXRvdWNoJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCduby10b3VjaCcpLnJlbW92ZUNsYXNzKCd0b3VjaCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKE1vZGVybml6ci5mbGV4Ym94KSB7XHJcbiAgICAgICAgICAgIC8vIE1vZGVybiBGbGV4Ym94IHdpdGggYGZsZXgtd3JhcGAgaXMgc3VwcG9ydGVkXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZmxleGliaWxpdHkoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgkKCd0ZXh0YXJlYScpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgYXV0b3NpemUoJCgndGV4dGFyZWEnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC00LrQu9GO0YfQtdC90LjQtSBqcyBwYXJ0aWFsc1xyXG4gICAgICovXHJcbiAgICBAQGluY2x1ZGUoJ3BhcnRpYWxzL3BhcnRpYWxzLmpzJylcclxuXHJcblxyXG4gICAgdmFyIHJlc2l6ZVRpbWVyO1xyXG4gICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHJlc2l6ZVRpbWVyKTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDQntGC0YDQsNCx0LDRgtGL0LLQsNC10YIg0L/QvtGB0LvQtSDQt9Cw0LLQtdGA0YjQtdC90LjRjyDRgdC+0LHRi9GC0LjRjyDRgNC10YHQsNC50LfQsFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJlc2l6ZVRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfSwgMjUwKTtcclxuICAgIH0pO1xyXG5cclxufSk7XHJcbiJdLCJmaWxlIjoiaW50ZXJuYWwuanMifQ==
