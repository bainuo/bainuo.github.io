var c = console.log;
var TIME = 200;
var Zoobox = {};


$(document).ready(function() {
    $.fn.hasAttr = function( name ) { return this.attr( name ) !== undefined; };
    var globalOptions = {
        // контрольные точки адаптива
        // desktopXlSize: 1599,
        // desktopLgSize: 1379,
        // desktopSize:   1199,
        // tabletLgSize:   959,
        // tabletSize:     767,
        // mobileSize:     479,

        // проверка touch устройств
        isTouch: $.browser.mobile
    };

    if (globalOptions.isTouch) {
        $('body').addClass('touch').removeClass('no-touch');
    } else {
        $('body').addClass('no-touch').removeClass('touch');
    }

    // if (!Modernizr.flexbox && !Modernizr.flexwrap) {
    //     flexibility(document.documentElement);
    // }

    // if ($('textarea').length > 0) {
    //     autosize($('textarea'));
    // }


    /**
     * Подключение js partials
     */
    /**
 * Стилизует селекты с помощью плагина select2
 * https://select2.github.io
 */

$.fn.customSelect = function() {
    var self = this;
    self.each(function() {
        if ($(this).hasClass('select2-hidden-accessible')) {
            return;
        } else {
            var selectSearch = $(this).data('search');
            var minimumResultsForSearch;

            if (selectSearch) {
                minimumResultsForSearch = 1; // показываем поле поиска
            } else {
                minimumResultsForSearch = Infinity; // не показываем поле поиска
            }
            $(this).select2({
                minimumResultsForSearch: minimumResultsForSearch,
                selectOnBlur: true,
                dropdownCssClass: 'error'
            });
            // документация jquery.nicescroll
            // https://github.com/inuyaksa/jquery.nicescroll
            $(this).on('select2:open', function(e) { // при открытии селект мы кастомизируем scrollbar
                $(document).find('.select2-dropdown .select2-results__options').niceScroll({
                    cursoropacitymin: 1, //непрозрачность
                    cursorwidth: 2, //ширина курсора
                    cursorborderradius: 0, //скругление курсора
                    cursorborder: 0, //обводка курсора
                    railpadding: { top: 8, right: 0, left: 0, bottom: 8 } //отступы (некоторые отступы заданы в стилях в файле forms.pcss)
                });
            });
            $(this).on('change', function(e) {
                // нужно для вылидации на лету
                $(this).find('option[value="' + $(this).context.value + '"]').click();
            });
        }
    });
};

/**
 * Стилизует file input
 * http://gregpike.net/demos/bootstrap-file-input/demo.html
 */
$.fn.customFileInput = function() {

    this.each(function(i, elem) {

        var $elem = $(elem);

        // Maybe some fields don't need to be standardized.
        if (typeof $elem.attr('data-bfi-disabled') != 'undefined') {
            return;
        }

        // Set the word to be displayed on the button
        var buttonWord = 'Browse';

        if (typeof $elem.attr('title') != 'undefined') {
            buttonWord = $elem.attr('title');
        }

        var className = '';

        if (!!$elem.attr('class')) {
            className = ' ' + $elem.attr('class');
        }

        // Now we're going to wrap that input field with a button.
        // The input will actually still be there, it will just be float above and transparent (done with the CSS).
        $elem.wrap('<div class="custom-file"><a class="btn ' + className + '"></a></div>').parent().prepend($('<span></span>').html(buttonWord));
    })

    // After we have found all of the file inputs let's apply a listener for tracking the mouse movement.
    // This is important because the in order to give the illusion that this is a button in FF we actually need to move the button from the file input under the cursor. Ugh.
        .promise().done(function() {

        // As the cursor moves over our new button we need to adjust the position of the invisible file input Browse button to be under the cursor.
        // This gives us the pointer cursor that FF denies us
        $('.custom-file').mousemove(function(cursor) {

            var input, wrapper,
                wrapperX, wrapperY,
                inputWidth, inputHeight,
                cursorX, cursorY;

            // This wrapper element (the button surround this file input)
            wrapper = $(this);
            // The invisible file input element
            input = wrapper.find("input");
            // The left-most position of the wrapper
            wrapperX = wrapper.offset().left;
            // The top-most position of the wrapper
            wrapperY = wrapper.offset().top;
            // The with of the browsers input field
            inputWidth = input.width();
            // The height of the browsers input field
            inputHeight = input.height();
            //The position of the cursor in the wrapper
            cursorX = cursor.pageX;
            cursorY = cursor.pageY;

            //The positions we are to move the invisible file input
            // The 20 at the end is an arbitrary number of pixels that we can shift the input such that cursor is not pointing at the end of the Browse button but somewhere nearer the middle
            moveInputX = cursorX - wrapperX - inputWidth + 20;
            // Slides the invisible input Browse button to be positioned middle under the cursor
            moveInputY = cursorY - wrapperY - (inputHeight / 2);

            // Apply the positioning styles to actually move the invisible file input
            input.css({
                left: moveInputX,
                top: moveInputY
            });
        });

        $('body').on('change', '.custom-file input[type=file]', function() {

            var fileName;
            fileName = $(this).val();

            // Remove any previous file names
            $(this).parent().next('.custom-file__name').remove();
            if (!!$(this).prop('files') && $(this).prop('files').length > 1) {
                fileName = $(this)[0].files.length + ' files';
            } else {
                fileName = fileName.substring(fileName.lastIndexOf('\\') + 1, fileName.length);
            }

            // Don't try to show the name if there is none
            if (!fileName) {
                return;
            }

            var selectedFileNamePlacement = $(this).data('filename-placement');
            if (selectedFileNamePlacement === 'inside') {
                // Print the fileName inside
                $(this).siblings('span').html(fileName);
                $(this).attr('title', fileName);
            } else {
                // Print the fileName aside (right after the the button)
                $(this).parent().after('<span class="custom-file__name">' + fileName + '</span>');
            }
        });

    });

};

$('input[type="file"]').customFileInput();
$('select').customSelect();
    if ($('.js-label-animation').length > 0) {
        /**
         * Анимация элемента label при фокусе полей формы
         */
        $('.js-label-animation').each(function(index, el) {
            var field = $(el).find('input, textarea');

            if ($(field).val().trim() != '') {
                $(el).addClass('is-filled');
            }

            $(field).on('focus', function(event) {
                $(el).addClass('is-filled');
            }).on('blur', function(event) {
                if ($(this).val().trim() === '') {
                    $(el).removeClass('is-filled');
                }
            });
        });
    }

    var lang = $('html').attr('lang');
    var locale = lang == 'ru-RU' ? 'ru' : 'en';

    Parsley.setLocale(locale);
    $.extend(Parsley.options, {
        trigger: 'input change', // change нужен для select'а
        validationThreshold: '0',
        errorsWrapper: '<span class="js-tooltip error-tooltip">?</span>',
        errorTemplate: '<span class="error-tooltip__message"></span>',
        classHandler: function(instance) {
            var $element = instance.$element,
                type = $element.attr('type'),
                $handler;
            if (type == 'checkbox' || type == 'radio')
                $handler = $element; //то есть ничего не выделяем (input скрыт), иначе выделяет родительский блок
            return $handler;
        },
        errorsContainer: function(instance) {
            var $element = instance.$element,
                type = $element.attr('type'),
                $container = $element.closest('.field');
            return $container;
        },
    });

    Parsley.addValidator('nameRu', {
        validateString: function(value) {
            return /^[а-яё\- ]*$/i.test(value);
        },
        messages: {
            ru: 'Cимволы А-Я, а-я, " ", "-"',
            en: 'Only simbols А-Я, а-я, " ", "-"'
        }
    });
    Parsley.addValidator('nameEn', {
        validateString: function(value) {
            return /^[a-z\- ]*$/i.test(value);
        },
        messages: {
            ru: 'Cимволы A-Z, a-z, " ", "-"',
            en: 'Only simbols A-Z, a-z, " ", "-"'
        }
    });
    Parsley.addValidator('name', {
        validateString: function(value) {
            return /^[а-яёa-z\- ]*$/i.test(value);
        },
        messages: {
            ru: 'Cимволы A-Z, a-z, А-Я, а-я, " ", "-"',
            en: 'Only simbols A-Z, a-z, А-Я, а-я, " ", "-"'
        }
    });
    Parsley.addValidator('phone', {
        validateString: function(value) {
            return /^[-+0-9() ]*$/i.test(value);
        },
        messages: {
            ru: 'Некорректный телефонный номер',
            en: 'Incorrect phone number'
        }
    });
    Parsley.addValidator('date', {
        validateString: function(value) {
            var regTest = /^(?:(?:31(\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{4})$/,
                regMatch = /(\d{1,2})\.(\d{1,2})\.(\d{4})/,
                min = arguments[2].$element.data('dateMin'),
                max = arguments[2].$element.data('dateMax'),
                minDate, maxDate, valueDate, result;

            if (min && (result = min.match(regMatch)))
                minDate = new Date(+result[3], result[2] - 1, +result[1]);
            if (max && (result = max.match(regMatch)))
                maxDate = new Date(+result[3], result[2] - 1, +result[1]);
            if (result = value.match(regMatch))
                valueDate = new Date(+result[3], result[2] - 1, +result[1]);

            return regTest.test(value) && (minDate ? valueDate >= minDate : true) && (maxDate ? valueDate <= maxDate : true);
        },
        messages: {
            ru: 'Некорректная дата',
            en: 'Incorrect date'
        }
    });

    var Validator = {
        init: $('form[data-validate="true"]').parsley(),
        includeSectionSuccess: function ($elem) {
            var $section = $elem.closest('.js-form-section'),
                $label = $section.find('.js-form-section-label'),
                link = $label.attr('data-harmonic-link').replace('#','');
            !$('.js-harmonic-link[data-scroll-to="'+link+'"]').find('.js-ok').is('span') ? [
                $('.js-harmonic-link[data-scroll-to="'+link+'"]').append('<span class="js-ok section-ok"><svg class="icon icon--ok"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-ok"></use></svg></span>'),
                $('.js-form-section-label[data-harmonic-link="#'+link+'"]').append('<span class="js-ok section-ok"><svg class="icon icon--ok"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-ok"></use></svg></span>'),
            ]:false;
            $('.js-harmonic-link[data-scroll-to="'+link+'"]').find('.js-error').is('span') ? [
                $('.js-harmonic-link[data-scroll-to="'+link+'"]').find('.js-error').remove(),
                $('.js-form-section-label[data-harmonic-link="#'+link+'"]').find('.js-error').remove(),
            ]:false;
        },
        removeSectionSuccess: function ($elem) {
            var $section = $elem.closest('.js-form-section'),
                $label = $section.find('.js-form-section-label'),
                link = $label.attr('data-harmonic-link').replace('#','');
            $('.js-harmonic-link[data-scroll-to="'+link+'"]').find('.js-ok').is('span') ? [
                $('.js-harmonic-link[data-scroll-to="'+link+'"]').find('.js-ok').remove(),
                $('.js-form-section-label[data-harmonic-link="#'+link+'"]').find('.js-ok').remove(),
            ]:false;
            !$('.js-harmonic-link[data-scroll-to="'+link+'"]').find('.js-error').is('span') ? [
                $('.js-harmonic-link[data-scroll-to="'+link+'"]').append('<span class="js-error section-error"><span>!</span></span>'),
                $('.js-form-section-label[data-harmonic-link="#'+link+'"]').append('<span class="js-error section-error"><span>!</span></span>'),
            ]:false;
        },
        sectionError: function ($elem) {
            if($elem.closest('.js-form-section').is('div')) {
                Validator.removeSectionSuccess($elem);
            };
        },
        sectionSuccess: function ($elem) {
            if($elem.closest('.js-form-section').is('div')) {
                var $section = $elem.closest('.js-form-section'),
                    status = true;
                $section.find('input[required], select[required], textarea[required]').each(function () {
                    if(!$(this).hasClass('parsley-success')) {
                        status = false;
                        return false;
                    } else {
                        status = true;
                    };
                });
                if(status) {
                    Validator.includeSectionSuccess($elem);
                };
            };
        },
        error: function ($element) {
            var $errorbox = $element.siblings('.js-tooltip'),
                massage = $errorbox.find('span').text();
            $errorbox.attr('title', massage);
            $errorbox.tooltip({
                tooltipClass: "global-tooltip",
                position: {
                    my: 'left+15 center',
                    at: 'left+15 center',
                    collision: 'flip',
                    using: function(position, feedback) {
                        var thisclass = function(){
                            return "global-tooltip--"+feedback.vertical+" global-tooltip--"+feedback.horizontal;
                        }
                        $(this).css(position).addClass(thisclass);
                    },
                    show: {
                        effect: 'fade',
                        duration: TIME
                    }
                }
            });
        },
        bind: [
            $('form[data-validate="true"] select').on('change', function () {
                $(this).trigger('input');
            }),
            window.Parsley.on('field:error', function() {
                $element = this.$element;
                Validator.error(this.$element);
                Validator.sectionError($element);
            }),
            window.Parsley.on('field:success', function () {
                $element = this.$element;
                Validator.sectionSuccess($element);
            }),
            window.Parsley.on('form:success', function() {
                $element = this.$element;
                $element.find('button[type=submit]').addClass('is-success');
            }),
            window.Parsley.on('form:submit', function() {
                return true;
            }),
        ],
    };

    /**
     * Добавляет маски в поля форм
     * @see  https://github.com/RobinHerbots/Inputmask
     *
     * @example
     * <input class="js-phone-mask" type="tel" name="tel" id="tel">
     */
    $('.js-phone-mask').inputmask('+7(999) 999-99-99', {
        clearMaskOnLostFocus: true,
        showMaskOnHover: false
    });

    /**
     * Делает выпадющие календарики
     * @see  http://api.jqueryui.com/datepicker/
     *
     * @example
     * // в data-date-min и data-date-max можно задать дату в формате dd.mm.yyyy
     * <input type="text" name="dateInput" id="" class="js-datepicker" data-date-min="06.11.2015" data-date-max="10.12.2015">
     */
    var Datepicker = function() {
        var datepicker = $('.js-datepicker'),
            minDate,
            maxDate;

        datepicker.each(function () {

            minDate = $(this).data('date-min');
            maxDate = $(this).data('date-max');

            $(this).datepicker({
                showOtherMonths: true,
                minDate: minDate || null,
                maxDate: maxDate || null,
                onSelect: function() {
                    $(this).trigger('input');
                    $(this).closest('.field').addClass('is-filled');
                }
            });
        });
    };

    var datepicker = new Datepicker();

    /**
     * Реализует переключение табов
     *
     * @example 1
     * <div class="js-tabs tabs">
     *     <div class="tabs__items">
     *         <div class="js-tabs-link tabs__link link is-selected" data-target="@NAME"><span>@TEXT</span></div>
     *         <div class="js-tabs-link tabs__link link" data-target="@NAME"><span>@TEXT<</span></div>
     *     </div>
     *     <div class="js-tabs-content tabs__content is-selected" data-target="@NAME">@CONTENT</div>
     *     <div class="js-tabs-content tabs__content" data-target="@NAME">@CONTENT</div>
     * </div>
     *
     *
     * @example 2
     * @GROUP уникальное имя
     * @NAME уникальное имя в соответствующем гроуп @GROUP
     * <div class="js-tabs tabs" date-tabs-group="@GROUP">
     *     <div class="tabs__items">
     *         <div class="js-tabs-link tabs__link link is-selected" data-target="@NAME"><span>@TEXT</span></div>
     *         <div class="js-tabs-link tabs__link link" data-target="@NAME"><span>@TEXT<</span></div>
     *     </div>
     * </div>
     * Блок можно расположить в любом месте страницы пример
     * @Живой пример template/sections/profitable.html
     * <div class="js-tabs tabs">
     *     <div class="js-tabs-link tabs__content is-selected" date-tabs-group="@GROUP" data-target="@NAME"><span>@TEXT<</span></div>
     *     <div class="js-tabs-link tabs__content" date-tabs-group="@GROUP" data-target="@NAME"><span>@TEXT<</span></div>
     * </div>
     */

    var Tabs = {
        tabD: '',
        switch: function ($elem) {
            var $parent = $elem.closest($('.js-tabs')),
                link = $elem.attr('data-target'),
                group = $parent.attr('data-tabs-group') || '';
                clearTimeout(this.tabD);
            if(!$elem.hasClass('is-selected')){
                $elem.siblings('.js-tabs-link.is-selected').removeClass('is-selected');
                $elem.addClass('is-selected');
                $parent.find('.js-tabs-content[data-target="'+link+'"]').hasClass('js-tabs-content') ? [
                    //Сброс
                    $($parent.find('.js-tabs-content.is-selected')[0]).removeClass('is-selected'),
                    //Свитч
                    $parent.find('.js-tabs-content[data-target="'+link+'"]').addClass('is-selected is-prev'),
                    this.tabD = setTimeout(function () {
                        $parent.find('.js-tabs-content[data-target="'+link+'"]').removeClass('is-prev');
                    },TIME*2),
                ]:[
                    //Сброс
                    $(document).find('.js-tabs-content[data-tabs-group="'+group+'"]').removeClass('is-selected'),
                    //Свитч
                    $(document).find('.js-tabs-content[data-tabs-group="'+group+'"][data-target="'+link+'"]').addClass('is-selected is-prev'),
                    this.tabD = setTimeout(function () {
                        $(document).find('.js-tabs-content[data-tabs-group="'+group+'"][data-target="'+link+'"]').removeClass('is-prev');
                    },TIME*2),
                ];
            };
        },
        bind: [
            $('.js-tabs-link').on('click', function () {
                Tabs.switch($(this));
            }),
        ],
    };

    // Для подключения миникарточек товаров при загрузке кнопкой "Показать еще"
    Zoobox.Tabs = {
        bind: function (element) {
            $(element).find('.js-tabs-link').on('click', function () {
    			Tabs.switch($(this));
    		});
        }
    };
    //include('visibility_control.js')
    /**
     * Меню аккордеон
     *
     * @example
     *
     *
     /*
     <div class="js-accordion accordion">
     <div class="accordion__group close">
     <div class="accordion__header">
     <span>Заголовок</span>
     <svg class="icon icon--chevron-d"><use xlink:href="#icon-chevron-d"></use></svg>
     </div>
     <div class="accordion__content">
     <div class="accordion__item"></div>
     <div class="accordion__item"></div>
     <div class="accordion__item"></div>
     </div>
     </div>
     </div>
     */


    // var Accordion = {
    //     close: function (elem) {
    //         $(elem).closest('.accordion__group').addClass('close');
    //     },
    //     open: function ($elem) {
    //         var $parent = $elem.closest('.js-accordion');
    //         $parent.find('.accordion__header').unbind();
    //         $elem.find('.accordion__header').one('click', function(e){
    //             Accordion.close($elem);
    //             e.stopPropagation();
    //         });
    //         $elem.removeClass('close');
    //     },
    //     bind: [
    //         $('.js-accordion').find('.accordion__group').on('click', function (e) {
    //             $(this).hasClass('close') ? Accordion.open($(this)): Accordion.close($(this));
    //         }),
    //         $('.js-accordion').find('.accordion__content').on('click', function (e) {
    //             e.stopPropagation();
    //         }),
    //     ],
    // };
    var Accordion = {
        open: function ($elem) {
            var dataTarget = $elem.attr('data-target'),
                dataGroup = $elem.attr('data-group');
            $elem.addClass('is-active');
            $('.js-accordion[data-accordion="container"][data-group="'+dataGroup+'"][data-target="'+dataTarget+'"]').addClass('is-active');
        },
        close: function ($elem) {
            var dataTarget = $elem.attr('data-target'),
                dataGroup = $elem.attr('data-group');
            $elem.removeClass('is-active');
            $('.js-accordion[data-accordion="container"][data-group="'+dataGroup+'"][data-target="'+dataTarget+'"]').removeClass('is-active');
            $('.js-accordion[data-accordion="container"][data-group="'+dataGroup+'"][data-target="'+dataTarget+'"]').find('.js-accordion.is-active').removeClass('is-active');
        },
        toggle: function ($elem) {
            if(!$elem.hasClass('is-active')) {
                this.open($elem);
            } else {
                this.close($elem);
            };
            // перерасчет высоты фильтра,когда открываем/закрываем аккордеон

            if ($('.section-catalog')) {
                calcHeightFilter();
            }
        },
        bind: [
            // $('.js-accordion[data-accordion="toggler"]').on('click', function () {
            //    if(!$(this).hasAttr('data-accordion-mode')) {
            //        Accordion.toggle($(this));
            //    }
            // }),
            $(document).on('click', '.js-accordion[data-accordion="toggler"]', function(e) {
                if ($(e.target).not('a').length != 0 && $(e.target).not('.btn').length != 0) {
                    if(!$(this).hasAttr('data-accordion-mode')) {
                        Accordion.toggle($(this));
                    }
                }
            }),

            $('.js-accordion[data-accordion="toggler"][data-accordion-mode="edit"]').find('.icon--pen').on('click', function () {
                Accordion.toggle($(this).closest('.js-accordion'));
            }),

            $('.js-accordion').find('.btn, a').on('click', function (e) {
                e.stopPropagation();
            }),
        ],


    };


    function click(e){
        // Ваш код
        e.stopPropagation();
    }
    /**
     * Делает слайдер
     * @see  http://api.jqueryui.com/slider/
     *
     * @example
     * // в data-min и data-max задаются минимальное и максимальное значение
     * // в data-step шаг,
     * // в data-values дефолтные значения "min, max"
     * <div class="slider js-range">
     *      <div class="slider__range" data-min="0" data-max="100" data-step="1" data-values="10, 55"></div>
     * </div>
     */
    var Range = function() {
        var slider = $('.js-range'),
            min,
            max,
            step,
            values;

        slider.each(function () {

            var self = $(this),
                range = self.find('.range__line');

            self.find('.js-range-value input[data-range="from"]').on('keyup', function (e) {
              if (e.ctrlKey || e.altKey || e.metaKey) return;
              var chr = e.key;
              if (chr == null) return;
              if (chr < '0' || chr > '9') {
                  return false;
              }

              var str = $(this).val();
              str = str.replace(/[^0-9]/gim,'');
              self.find('.js-range-value div[data-range="from"] span > span').eq(0).text(str);
            });

            self.find('.js-range-value input[data-range="to"]').on('keyup', function (e) {
              if (e.ctrlKey || e.altKey || e.metaKey) return;
              var chr = e.key;
              if (chr == null) return;
              if (chr < '0' || chr > '9') {
                  return false;
              }
          
              var str = $(this).val();
              str = str.replace(/[^0-9]/gim,'');
              self.find('.js-range-value div[data-range="to"] span > span').eq(0).text(str);
            });

            self.find('.js-range-value input[data-range="from"]').on('change', function (e) {
                var str = $(this).val();
                str = str.replace(/[^0-9]/gim,'');

                var $th = $(this);
                var inputTimer = 0;
                clearTimeout(inputTimer);
                inputTimer = setTimeout(function(){
                  str > max ? str = max: str < min || str == '' ? str = min:false;
                  var arr = String(str).split("");
                  arr[0] == 0 && arr.length > 1 ? [
                      str = String(str),
                      str = str.replace('0'+arr[1], arr[1]),
                      str = parseInt(str),
                  ]:false;
                  $th.val(str);
                  self.find('.js-range-value div[data-range="from"] span > span').eq(0).text(str);
                  var from = +$(self).find('.js-range-value input[data-range="from"]').val(),
                      to = +$(self).find('.js-range-value input[data-range="to"]').val();
                  from > to ? [
                      range.slider( "option", "values", [ from, from ] ),
                      self.find('.js-range-value input[data-range="to"]').attr('value',from).val(from),
                      self.find('.js-range-value div[data-range="to"] span > span').eq(0).text(from),
                  ]: range.slider( "option", "values", [ from, to ] );
                  range.slider( "instance" );

                }, 500);
            });
            self.find('.js-range-value input[data-range="to"]').on('change', function () {
                var str = $(this).val();
                str = str.replace(/[^0-9]/gim,'');

                var $th = $(this);
                var inputTimer = 0;
                clearTimeout(inputTimer);
                inputTimer = setTimeout(function(){

                  str > max ? str = max: str < min || str == '' ? str = min:false;
                  var arr = String(str).split("");
                  arr[0] == 0 && arr.length > 1 ? [
                      str = String(str),
                      str = str.replace('0'+arr[1], arr[1]),
                      str = parseInt(str),
                  ]:false;
                  $th.val(str);
                  self.find('.js-range-value div[data-range="to"] span > span').eq(0).text(str);
                  var from = +$(self).find('.js-range-value input[data-range="from"]').val(),
                      to = +$(self).find('.js-range-value input[data-range="to"]').val();
                  to < from ? [
                      range.slider( "option", "values", [ to, to ] ),
                      self.find('.js-range-value input[data-range="from"]').attr('value',to).val(to),
                      self.find('.js-range-value div[data-range="from"] span > span').eq(0).text(str),
                  ]: range.slider( "option", "values", [ from, to ] );
                  range.slider( "instance" );

                }, 500);
            });

            min = range.data('min');
            max = range.data('max');
            step = range.data('step');
            values = range.data('values').split(', ');

            var maxLength = max.toString().length;
            self.find('.js-range-value input[data-range="from"]').attr('maxLength', maxLength);
            self.find('.js-range-value input[data-range="to"]').attr('maxLength', maxLength);

            range.slider({
                range: true,
                min: min || 0,
                max: max || 'max',
                step: step || 1,
                values: values,
                slide: function(event, ui) {
                    self.find('.js-range-value input[data-range="from"]').val(ui.values[0]);
                    self.find('.js-range-value input[data-range="to"]').val(ui.values[1] == 'max' ? max: ui.values[1]);
                    self.find('.js-range-value div[data-range="from"] span > span').eq(0).text(ui.values[0]);
                    self.find('.js-range-value div[data-range="to"] span > span').eq(0).text(ui.values[1] == 'max' ? max: ui.values[1]);
                },
                stop: function(event, ui) {
    				self.find('.js-range-value input[data-range="from"]').change();
                }
            });
            self.find('.js-range-value input[data-range="from"]').val(range.slider('values', 0));
            self.find('.js-range-value input[data-range="to"]').val(range.slider('values', 1) == 'max' ? max: range.slider('values', 1));
            self.find('.js-range-value div[data-range="from"] span > span').eq(0).text(range.slider('values', 0));
            self.find('.js-range-value div[data-range="to"] span > span').eq(0).text(range.slider('values', 1) == 'max' ? max: range.slider('values', 1));
        });
    };

    var RANGE = new Range();

    /**
     * Открывает и закрывает попапы и модальные окна
     *
     * @example
     * <* data-popup-id="#NAME" data-popup="open">Text</*>
     * <* data-modals-id="#NAME" data-modal="open">Text</*>
     *
     *  <div class="popup-src">
     <div class="js-popup-item popup-item NAME" id="NAME">
     <span class="popup-close" data-popup="close"></span>
     </div>
     </div>
     *  <div class="modals-src">
     <div class="js-modals-item modals-item NAME" id="NAME">
     <span class="modals-close" data-modals="close"></span>
     </div>
     </div>
     *
     *
     * <div class="js-popup-dir popup-dir"></div>
     * <div class="js-modals-dir modals-dir"></div>
     *
     */
    var Popups = {
        $isOpen: '',
        $pSrc: $('.js-popup-src'),
        $pDir: $('.js-popup-dir'),
        dScroll: '',
        document: function (bool) {
            bool == true ? [
                    this.dScroll = $(document).scrollTop(),
                    $('html').addClass('is-active'),
                    $('.wrap-main').css({
                        top: -this.dScroll+'px',
                    }),
                ]:
                bool == false ? [
                    $('html').removeClass('is-active'),
                    $('.wrap-main').css({
                        top: '',
                    }),
                    $(document).scrollTop(this.dScroll),
                    this.dScroll = '',
                ]:false;
        },
        pShow: function (elem) {
            this.document(true);
            $(this.$pDir).append($(elem)).addClass('is-active');
            setTimeout(function () { $(elem).addClass('is-active');}, 0);
        },
        pOpen: function($elem){
            var src = $($elem).attr('data-popup-id') || $elem;
            this.$isOpen = $(src);
            this.pShow(src);
        },
        $mSrc: $('.js-modals-src'),
        $mDir: $('.js-modals-dir'),
        mOpen: function($elem){},
        pClose: function () {
            Popups.document(false);
            $(this.$isOpen).removeClass('is-active');
            $(this.$isOpen).find('button[type="submit"].is-success').removeClass('is-success');
            setTimeout(function () {
                $(Popups.$pDir).removeClass('is-active');
                $(Popups.$pSrc).append($(Popups.$isOpen));
                Popups.$isOpen = '',
                    $(Popups.$pSrc, Popups.$mSrc).find('form').trigger('reset');
                $(Popups.$pSrc, Popups.$mSrc).find('form .js-label-animation').removeClass('is-filled');
                $(Popups.$pSrc, Popups.$mSrc).find('.parsley-error').removeClass('parsley-error');
            },TIME);
        },
        mClose: function () {
            Popups.document(false);
            $(this.$isOpen).removeClass('is-active');
            setTimeout(function () {
                $(Popups.$mDir).removeClass('is-active');
                $(Popups.$mSrc).append($(Popups.$isOpen));
                Popups.$isOpen = '',
                    $(Popups.$pSrc, Popups.$mSrc).find('form').trigger('reset');
                $(Popups.$pSrc, Popups.$mSrc).find('form .js-label-animation').removeClass('is-filled');
                $(Popups.$pSrc, Popups.$mSrc).find('.parsley-error').removeClass('parsley-error');
            },TIME);
        },
        toggle: function (elem) {
            var prevFunction, target;
            $(this.$isOpen).hasClass('js-popup-item') ? [this.pClose()]:
                $(this.$isOpen).hasClass('js-modals-item') ? [this.mClose()]:false;
            $(elem).hasAttr('data-popup-toggle') ? [
                    target = $(elem).attr('data-popup-toggle'),
                ]:
                $(elem).hasAttr('data-modals-toggle') ? [
                    target = $(elem).attr('data-modals-toggle'),
                ]:false;
            setTimeout(function () {
                $(target).hasClass('js-popup-item') ? [
                        Popups.pOpen(target),
                    ]:
                    $(target).hasClass('js-modals-item') ? [
                        Popups.mOpen(target),
                    ]:false;
            }, TIME);
        },
        bind: [
            $('*[data-popup="open"]').on('click',function (e) {
                Popups.pOpen($(this));
                e.preventDefault();
            }),
            $('.js-popup-item').on('click', function (e) {
                e.stopPropagation();
            }),
            $('.js-popup-dir, *[data-popup="close"]').on('click', function (e) {
                Popups.pClose($(this));
                e.stopPropagation();
            }),
            $('*[data-popup-toggle]').on('click',function (e) {
                Popups.toggle($(this));
                e.preventDefault();
            }),
        ],
    }
    /**
     * Реализует тултипы
     * @see  http://api.jqueryui.com/tooltip/
     */
    $('.js-tooltip[data-tooltip-type="gray"]').tooltip({
        tooltipClass: "global-tooltip global-tooltip--grey",
        position: {
            my: 'left+10 center',
            at: 'right+10 center',
            collision: 'flip',
            using: function(position, feedback) {
                var thisclass = function(){
                    return "global-tooltip--"+feedback.vertical+" global-tooltip--"+feedback.horizontal;
                }
                $(this).css(position).addClass(thisclass);
            },
            show: {
                effect: 'fade',
                duration: globalOptions.time
            }
        }
    });
    var Assessment = {
        $target: $('.js-assessment'),
        massage: function(n,$elem){
            massage = '.js-assessment-massage';
            n == 0 ? [
                    $elem.siblings(massage).text('очень плохо'),
                ]:
                n == 1 ? [
                        $elem.siblings(massage).text('плохо'),
                    ]:
                    n == 2 ? [
                            $elem.siblings(massage).text('удовлетворительно'),
                        ]:
                        n == 3 ? [
                                $elem.siblings(massage).text('хорошо'),
                            ]:
                            n == 4 ? [
                                    $elem.siblings(massage).text('отлично'),
                                ]:
                                [
                                    $elem[0].status != undefined ? [
                                        this.massage($elem[0].status,$elem),
                                    ]:[
                                        $elem.siblings(massage).text('ваша оценка'),
                                    ],
                                ];
        },
        active: function(event,n,$elem){
            c(event,n,$elem);
            var thclass, $content = $elem.closest('.js-assessment-cont');
            this.massage(n,$content);
            event == 'click' ? [
                thclass = 'is-active',
                $content.find('span').removeClass('is-hovered'),
                $elem.find('input[type="number"]').attr('value',n+1).val(n+1),
                $elem.find('input[type="number"]').trigger('input'),
                $elem[0].status = n,
            ]:[
                thclass = 'is-hovered',
            ];
            $content.find('span').removeClass(thclass);
            n == 0 ? [
                    $content.find('span').eq(0).addClass(thclass),
                    c($content.find('span').eq(0)),
                ]:
                n == 1 ? [
                        $content.find('span').eq(0).addClass(thclass),
                        $content.find('span').eq(1).addClass(thclass),
                    ]:
                    n == 2 ? [
                            $content.find('span').eq(0).addClass(thclass),
                            $content.find('span').eq(1).addClass(thclass),
                            $content.find('span').eq(2).addClass(thclass),
                        ]:
                        n == 3 ? [
                                $content.find('span').eq(0).addClass(thclass),
                                $content.find('span').eq(1).addClass(thclass),
                                $content.find('span').eq(2).addClass(thclass),
                                $content.find('span').eq(3).addClass(thclass),
                            ]:
                            n == 4 ? [
                                    $content.find('span').eq(0).addClass(thclass),
                                    $content.find('span').eq(1).addClass(thclass),
                                    $content.find('span').eq(2).addClass(thclass),
                                    $content.find('span').eq(3).addClass(thclass),
                                    $content.find('span').eq(4).addClass(thclass),
                                ]:
                                [
                                    $content.find('span').removeClass(thclass),
                                ];
        },
        init: function(){
            $(this.$target).each(function(){
                $(this).find('.js-assessment-cont span').eq(0).on('click', function(){
                    Assessment.active('click',0,$(this));
                });
                $(this).find('.js-assessment-cont span').eq(1).on('click', function(){
                    Assessment.active('click',1,$(this));
                });
                $(this).find('.js-assessment-cont span').eq(2).on('click', function(){
                    Assessment.active('click',2,$(this));
                });
                $(this).find('.js-assessment-cont span').eq(3).on('click', function(){
                    Assessment.active('click',3,$(this));
                });
                $(this).find('.js-assessment-cont span').eq(4).on('click', function(){
                    Assessment.active('click',4,$(this));
                });
                $(this).find('.js-assessment-cont span').eq(0).on('mouseenter', function(){
                    Assessment.active('mouseenter',0,$(this));
                });
                $(this).find('.js-assessment-cont span').eq(1).on('mouseenter', function(){
                    Assessment.active('mouseenter',1,$(this));
                });
                $(this).find('.js-assessment-cont span').eq(2).on('mouseenter', function(){
                    Assessment.active('mouseenter',2,$(this));
                });
                $(this).find('.js-assessment-cont span').eq(3).on('mouseenter', function(){
                    Assessment.active('mouseenter',3,$(this));
                });
                $(this).find('.js-assessment-cont span').eq(4).on('mouseenter', function(){
                    Assessment.active('mouseenter',4,$(this));
                });
                $(this).find('.js-assessment-cont span').on('mouseleave', function(){
                    Assessment.active('mouseenter',5,$(this));
                });
            });
        },
    };
    Assessment.init();
    var button_animate = {
        submit: function (e,elem) {
            e.preventDefault();
            var form = $(elem).closest('form');
            $(elem).addClass('is-success');
            setTimeout(function () {
                $(form).submit();
            },TIME * 2);
        },
        click: function (e,elem) {
            $(elem).addClass('is-success');
            $(elem).closest('.product-item').hasClass('product-item') ? [
                $(elem).removeClass('is-selected'),
                setTimeout(function () {
                    $(elem).addClass('is-selected').removeClass('is-success');
                },TIME * 4),
            ]:false;
        },
        bind: [
            $('.js-ok-animate').on('click', function (e) {
                button_animate.click(e,$(this));
            }),
        ],
    };
    /**
     * Делает слайдер
     *
     * @example
     *
     * <div class="js-slider slider">
     *    <div class="js-slider-nav" data-slider="prev"></div>
     *    <div class="js-slider-nav" data-slider="next"></div>
     *    <div class="js-slider-cont slider__cont">
     *        <div class="item">ТЕКСТ</div>
     *        <div class="item">ТЕКСТ</div>
     *        <div class="item">ТЕКСТ</div>
     *    </div>
     * </div>
     *
     */
    var sliders = {
        init: function () {
            $('.js-slider .js-slider-cont').on('initialized.owl.carousel', function () {
                $(this).closest('.js-slider').removeClass('is-prev');
            });
            var $promo = $('.js-slider.slider--promo .js-slider-cont');
            $promo.addClass('owl-carousel').owlCarousel({
                items: 1,
                mouseDrag: false,
                loop: true,
                margin: 0,
            });
            var $brands = $('.js-slider.brands .js-slider-cont');
            $brands.addClass('owl-carousel').owlCarousel({
                mouseDrag: false,
                margin: 22,
                responsive: {
                    0: {
                        items: 5,
                    },
                    1300: {
                        items: 6,
                    },
                }
            });
            var $reviews = $('.js-slider.reviews .js-slider-cont');
            $reviews.addClass('owl-carousel').owlCarousel({
                items: 3,
                mouseDrag: false,
                responsive: {
                    0: {
                        margin: 24,
                    },
                    1300: {
                        margin: 44,
                    },
                }
            });
            var $product = $('.js-slider.product .js-slider-cont');
            $product.addClass('owl-carousel').owlCarousel({
                items: 5,
                mouseDrag: false,
                margin: 3,
            });
            var $category = $('.js-slider.slider--category .js-slider-cont');
            $category.addClass('owl-carousel').owlCarousel({
                items: 5,
                mouseDrag: false,
                margin: 3,
            });
            var $post = $('.js-slider.slider--post .js-slider-cont');
            $post.addClass('owl-carousel').owlCarousel({
                items: 1,
                mouseDrag: false,
                margin: 3,
            });
        },
        change: function (e, $elem) {
            var $parent = $elem.closest('.js-slider'),
                items = e.item.count,
                item  = e.item.index,
                size  = e.page.size,
                last  = items - size;
            $parent.find('.js-slider-nav').removeClass('disabled');
            $parent.find('.js-slider-nav').removeClass('lastslide');
            size >= items ? [
                $parent.find('.js-slider-nav[data-slider="prev"]').addClass('disabled'),
                $parent.find('.js-slider-nav[data-slider="next"]').addClass('disabled'),
            ]:[
                item == 0 ? [
                    $parent.find('.js-slider-nav[data-slider="prev"]').addClass('lastslide'),
                ]: item == last ? [
                    $parent.find('.js-slider-nav[data-slider="next"]').addClass('lastslide'),
                ]:false,
            ]


        },
        bind: [
            $('.js-slider-nav[data-slider="prev"]').on('click', function () {
                var $parent = $(this).closest('.js-slider');
                $parent.find('.js-slider-cont').trigger('prev.owl.carousel', [300]);
            }),
            $('.js-slider-nav[data-slider="next"]').on('click', function () {
                var $parent = $(this).closest('.js-slider');
                $parent.find('.js-slider-cont').trigger('next.owl.carousel', [300]);
            }),
            $('.js-slider .js-slider-cont').on('changed.owl.carousel', function (e) {
                sliders.change(e,$(this));
            }),
        ],
    };
    sliders.init();
    var burger = {
        toggle: function(elem){
            !$(elem).hasClass('is-active') ? [
                $(elem).addClass('is-active'),
                $('.js-main-menu').addClass('burger-is-active'),
            ]:[
                this.reset(),
            ];
        },
        reset: function () {
            $('.js-burger').removeClass('is-active');
            $('.js-main-menu').removeClass('burger-is-active');
        },
        bind: [
            $('.js-burger').on('click', function(){
                burger.toggle($(this));
            }),
        ],
    };
    var Shade = {
        reviews_min_shade_reset: function ($elem) {
        },
        reviews_min_shade: function ($elem) {
            Shade.reviews_min_shade_reset($elem);
            $elem.each(function () {
                var maxHeight = $(this).height(),
                    heightIn = $(this).find('.js-shade-content[data-shade="main"]').height(),
                    heightTo = $(this).find('.js-shade-content[data-shade="main"] span').height(),
                    heightSum = 0;
                $(this).find('.js-shade-content').each(function () {
                    heightSum += $(this)[0].offsetHeight;
                });
                heightTo > heightIn ? [
                    $(this).closest('.js-reviews-item').addClass('shade-is-active'),
                ]:[
                    Shade.reviews_min_shade_reset($(this)),
                ];
            });
        },
        reviews_min_shade_toggle: function ($elem) {
            var $parent = $elem.closest('.js-reviews-item'),
                heightTo = $parent.find('.js-shade-content[data-shade="main"] span').height(),
                heightSum = 0,
                massage = $elem.attr('data-shade-toggler-text').split(',');
            !$elem.closest('.js-reviews-item').hasClass('shade-is-open') ? [
                $elem.closest('.js-reviews-item').addClass('shade-is-open'),
                $elem.text(massage[1]),
                $parent.find('.js-shade-content[data-shade="main"]').css({
                    maxHeight: heightTo+'px',
                }),
            ]:[
                $elem.closest('.js-reviews-item').removeClass('shade-is-open'),
                $elem.text(massage[0]),
                $parent.find('.js-shade-content[data-shade="main"]').css({
                    maxHeight: '',
                }),
            ];
        },
        bind: [
            $('.js-shade-toggler').on('click',function () {
                Shade.reviews_min_shade_toggle($(this));
            }),
        ],
    };
    Shade.reviews_min_shade($('.reviews .js-shade-box'));
    var Dropdown_categories = {
        duration: '',
        reset: function ($parent,group) {
            clearTimeout(this.duration);
            // typeof(duration) != undefined ? clearTimeout(duration):false;
            $parent.find('a.is-active').removeClass('is-active');
            $('.js-switch-content[data-switch-group="'+group+'"].is-active').removeClass('is-active');
            $('.js-switch-content-image[data-switch-group="'+group+'"].is-active').removeClass('is-active');
        },
        show: function ($elem,group,link) {
            $elem.addClass('is-active');
            this.duration = setTimeout(function () {
                $('.js-switch-content[data-switch-group="'+group+'"][data-target="'+link+'"]').addClass('is-active');
                $('.js-switch-content-image[data-switch-group="'+group+'"][data-target="'+link+'"]').addClass('is-active');
            },TIME * 2);
        },
        swithc: function ($elem) {
            var link = $elem.attr('data-target'),
                group = $elem.attr('data-switch-group'),
                $parent = $elem.closest('.js-switch-links');
            !$elem.hasClass('is-active') ? [
                this.reset($parent,group),
                this.show($elem,group,link),
            ]:false;
        },
        bind: [
            $('.js-switch-links a[data-target]').on('mouseenter', function () {
                Dropdown_categories.swithc($(this));
            }),
        ],
    }
    
    /**
     * Счетчик для таблиц фасовки
     *
     * @example
     * <div class="js-counter counter">
     *     <button class="btn" data-counter="minus" disabled><svg class="icon icon--minus"><use xlink:href="#icon-minus"></use></svg></button>
     *     <input type="text" name="" value="0">
     *     <button class="btn" data-counter="plus"><svg class="icon icon--plus"><use xlink:href="#icon-plus"></use></svg></button>
     * </div>
     */
    var Counter = {
        inputMin: 0,
        inputMax: 999,
        update: function($elem,val){
            var arr = String(val).split('');
            arr[0] == 0 && arr.length > 1 ? [
                val = String(val),
                val = val.replace('0'+arr[1], arr[1]),
                val = parseInt(val),
            ]:false;
            $elem.attr('value',val).val(val);
            var frame = $elem.closest('.js-counter-frame');
            // $(frame).find('td').each(function (index) {
            //     var $targer = $(this).find('.val'), info = [];
            //     $targer.hasClass('val') == true ? [
            //         info[index] = $targer.text(),
            //     ]:false;
            // })
        },
        func1: function ($elem, val) {
            var $frame = $elem.closest('.js-counter-frame');
            var $parent = $elem.closest('.js-counter');
            var $m = $parent.find('.btn[data-counter="minus"]');
            var $p = $parent.find('.btn[data-counter="plus"]');
            val == this.inputMin ? [
                $m.prop('disabled', true),
                $frame.find('.js-counter-round').removeClass('is-active'),
                $frame.find('.js-counter-round1').removeClass('is-active'),
                $frame.removeClass('is-active')
            ]:false;
            val > this.inputMin ? [
                $m.prop('disabled', false),
                $frame.find('.js-counter-round').addClass('is-active'),
                $frame.find('.js-counter-round1').addClass('is-active'),
                $frame.addClass('is-active')
            ]:false;
            val == this.inputMax ? [
                $p.prop('disabled', true),
            ]:false;
            val < this.inputMax ? [
                $p.prop('disabled', false),
            ]:false;
        },
        minus: function($elem){
            var $mainC = $elem.siblings('input');
            var val = $mainC.attr('value');
            val > this.inputMin ? [
                val--,
                this.update($mainC,val),
            ]:[
                this.update($mainC,this.inputMin),
            ];
            this.func1($elem, val);
        },
        plus: function($elem){
            var $mainC = $elem.siblings('input');
            var val = $mainC.attr('value');
            val < this.inputMax ? [
                val++,
                this.update($mainC,val),
            ]:[
                this.update($mainC,this.inputMax),
            ];
            this.func1($elem, val);
        },
        input: function ($elem) {
            var str = $elem.val();
            str = str.replace(/[^0-9]/gim,'');
            str > this.inputMax ? str = this.inputMax:
                str < this.inputMin || str == '' ? str = this.inputMin:false;
            this.update($elem, parseInt(str));
            this.func1($elem, parseInt(str));
        },
        bind: [
            $('.js-counter').find('.btn[data-counter="minus"]').on('click', function(){
                Counter.minus($(this));
            }),
            $('.js-counter').find('.btn[data-counter="plus"]').on('click', function(){
                Counter.plus($(this));
            }),
            $('.js-counter').find('input').on('input', function () {
                Counter.input($(this));
            }),
            $('.js-counter-round').on('click', function () {
               $(this).html('Добавить<br>еще одну');
            }),
            $('.js-counter-round1').on('click', function () {
                $(this).html('Добавить еще одну');
            }),
        ],

        bindEvents: function ($selector) {
            $selector.find('.js-counter .btn[data-counter="minus"]').on('click', function(){
                Counter.minus($(this));
            });
            $selector.find('.js-counter .btn[data-counter="plus"]').on('click', function(){
                Counter.plus($(this));
            });
            $selector.find('.js-counter input').on('input', function () {
                Counter.input($(this));
            });
            $selector.find('.js-counter-round').on('click', function () {
                $(this).html('Добавить<br>еще одну');
            });
            $selector.find('.js-counter-round1').on('click', function () {
                $(this).html('Добавить еще одну');
            });
        }
    };
    var product_gallery = {
        show: function ($elem) {
            var $parent = $elem.closest('.js-gallery'),
                target = $elem.attr('data-target');
            $parent.find('.js-gallery-link').removeClass('is-active');
            $parent.find('.js-gallery-content img').removeClass('is-active');
            $elem.addClass('is-active');
            $('.js-gallery-dir img[data-target="'+target+'"]').addClass('is-active');
        },
        bind: [
            $('.js-gallery-link').on('mouseover', function () {
                product_gallery.show($(this));
            }),
            $(".js-gallery").on('mouseenter', function () {
                !$(this).find('.js-gallery-zoom.is-active').hasClass('is-active') ? [
                    $('.js-gallery-zoom.is-active').removeClass('is-active'),
                    $(this).find('.js-gallery-zoom').addClass('is-active'),
                ]:false;
            }),
        ],
    };

    if ($(".js-gallery-content").length > 0) {
        //вешаем плагин на контейнер-картинку
        $('.js-gallery-content').each(function () {
            var id = $(this).find('.js-gallery-zoom').attr('id');
            $(this).find('.js-gallery-dir img').elevateZoom({
                zoomWindowPosition: id,
                zoomWindowWidth: 500,
                zoomWindowHeight: 500,
                borderSize: 1,
                easing: true,
                lensOpacity: 0
            });
        });
    }





    //наведение на превью-картинку
    $('.gallery__min-image img').on('mouseover', function() {

       var that = this;

     //копируем атрибуты из превью-картинки в контейнер-картинку
       $(".js-gallery-dir img").fadeOut(250, function() {

         $(this)
            .attr("src", $(that).attr("src")) // путь до small картинки
            .attr("data-zoom-image", $(that).attr("data-zoom-image")) // путь до large картинки
            .fadeIn(300);
       });
    });

    //расчет высоты body
    var calcHeightFilter = function calcHeightFilter() {
        var bodyHeight = $(document).outerHeight(true);
        var asideHeight = $('.section--aside').height();

        if (($(document).width()) < 768) {
            if ($('.section--aside').hasClass('open-aside')) {
                $('.js-anchor-top').css("display", "none");
                if (bodyHeight > asideHeight) {
                    $('body').css("overflow", "hidden");
                    $('body').height(asideHeight + 169);
                }
            }

        
        }

        if (($(document).width()) >= 768 && ($(document).width()) <= 1023 ) {
            tabletFilterHeight = $('.wrap-main').height();
            $(".section--aside").height(tabletFilterHeight);
            $(".section--aside").css("overflow", "scroll");
        }
    }



    // Открытие/закрытие фильтра в каталоге
    $(document).on('click', '.js-filter_show', function(){
        $(".section--aside").toggleClass("open-aside");
        $(".section--catalog").toggleClass("overlay-section");
    
        if (($(document).width()) >= 768 && ($(document).width()) <= 1023 ) {
            $(".footer").css("margin-bottom", "60px");
        }

        calcHeightFilter();
    });

    $(document).on('click', '.section--aside__close', function(){
        $(".section--aside").toggleClass("open-aside");
        $(".section--catalog").toggleClass("overlay-section");
        $(".footer").css("margin-bottom", "0");


        $('body').css("overflow", "scroll");
        $('body').css("height", "100%");
    });

    // перерасчет высоты body на ресайз окна
    // window.onresize = calcHeightFilter();


    $(window).on('resize', function(){
          var win = $(this);
        calcHeightFilter();
    });




    var Filter = {
        creItems: function (str, $elems) {
            str == '' ? [
                $('.js-filter-items').empty(),
                $('.js-filter-panel').removeClass('is-active'),
            ]:[

                arr = str.split(','),
                $('.js-filter-items').empty(),
                !$('.js-filter-panel').hasClass('is-active') ? $('.js-filter-panel').addClass('is-active'):false,
                arr.forEach(function (t) {
                    $('.js-filter-items').append('<div>' +
                        '<span>'+t+'</span>'+
                        '<div data-filter="remove"><svg class="icon icon--close"><use xlink:href="#icon-close"></use></svg></div>'+
                        '</div>'
                    );
                }),
                $('.js-filter-items div[data-filter="remove"]').each(function (index) {
                    $(this).on('click', function () {
                        $($elems[index]).prop('checked', false).trigger('change');
                    });
                }),
            ];

            // вызов функции для перерасчета высоты фильтра при добавлении выбранных на мобильных
            if ($('.section-catalog')) {
                calcHeightFilter();
            }
        },
        countItems: function () {
            var str = '',
                k = 0;
                $elems = [];
            $('form.js-filter input[type="checkbox"]').each(function () {
               $(this).prop('checked') == true ? [
                   $elems[k] = $(this),
                   k == 0 ? [
                       str += $(this).next('label').find('span').text(),
                   ]:[
                       str += ','+$(this).next('label').find('span').text(),
                   ],
                   k++,
               ]:false;

               $('.filter__count').text('(' + k + ')');

           
            });
            this.creItems(str, $elems);

        },
        reset: function () {
            $('form.js-filter').trigger('reset');
            $('form.js-filter input[type="checkbox"]').trigger('change');
        },
        clear: function () {
            $('form.js-filter').trigger('reset');
            $('form.js-filter input[type="checkbox"]').prop('checked', false).trigger('change');
        },
        bind: [
            $('form.js-filter input[type="checkbox"]').on('change', function () {
                Filter.countItems();
            }),
            $('.js-filter-reset').on('click', function(){
                Filter.clear();
            }),
        ],
    };
    Filter.reset();

    function submitFilterForm() {
        var filter = $('form.js-filter').serialize(),
            uri = URI(window.location.href);

        $('form.js-filter input').each(function () {
            uri.removeQuery(this.name);
        });
        uri.setQuery(URI.parseQuery(filter)).normalizeQuery();
        uri.query(function (data) {
            var result = {};
            $.each(data, function (key, value) {
                result[key] = Array.isArray(value) ? result[key] = value.join(';') : value;
            });
            return result;
        });
        window.location.href = uri.toString();
        return false;
    }
    $('form.js-filter .js-filter-apply').on('click', submitFilterForm);
    // $('form.js-filter input[type="checkbox"]').on('change', submitFilterForm);
    //$('form.js-filter :input[data-range]').on('change', submitFilterForm);
    var FormMechanics = {
        hiddenFieldOpen: function ($elem) {
            var dataTarget = $elem.attr('data-target');
            $elem.addClass('is-open');
            $('.js-form-mechanics[data-type="field"][data-target="'+dataTarget+'"]').addClass('is-open');
        },
        orderingLocation: function () {
            var $mapDir = $('js-form-mechanics[data-form-mechanics="location-change"]');

        },
        tabField: function ($elem) {
            var dataGroup = $elem.attr('data-group'),
                dataTarget = $elem.attr('data-target');
            $('.js-form-mechanics[data-form-mechanics="tab-field-group"][data-group="'+dataGroup+'"]').removeClass('is-active');
            $('.js-form-mechanics[data-form-mechanics="tab-field-group"][data-group="'+dataGroup+'"]').find('*[required]').attr('data-required','true').removeAttr('required').val('').trigger('reset').trigger('change').trigger('input');
            $('.js-form-mechanics[data-form-mechanics="tab-field-group"][data-group="'+dataGroup+'"][data-target="'+dataTarget+'"]').addClass('is-active');
            $('.js-form-mechanics[data-form-mechanics="tab-field-group"][data-group="'+dataGroup+'"][data-target="'+dataTarget+'"]').find('*[data-required="true"]').attr('required','');

            if($('.js-form-section#section3').length) {
              var $section3 = $('.js-form-section#section3'),
                  $section3Link = $('.js-harmonic-link[href="#section3"]');
              if(dataTarget == 'target1') {
                $section3.show().find('*[data-required="true"]').attr('required','');
                $section3Link.css({'display': ''}).find('.js-ok').remove();
                $section3.find('.js-ok').remove();
                $('html, body').trigger('scroll');
              } else if(dataTarget == 'target2') {
                $section3.hide();
                $section3.find('*[required]').attr('data-required','true').removeAttr('required').val('').trigger('reset').trigger('change').trigger('input');
                $section3Link.hide();
              }
            }
        },
        parseSection: function () {
            var $target = $('.js-form-mechanics[data-form-mechanics="parse-section"]');
            if($target.hasClass('js-form-mechanics')) {
                $target.each(function () {
                    $container = $('<div class="js-form-mechanics form__info" data-form-mechanics="prev-text"/>');
                    $container.remove();
                    $(this).find('input').each(function () {
                        if($(this).attr('type') != 'radio' && $(this).attr('type') != 'checkbox') {
                            $($container.append('<p>'+$(this).next('label').text()+": "+$(this).val()+'</p>\n'))
                        } else {
                            if($(this).prop("checked")) {
                                $(this).attr('type') == 'radio' ? [
                                    $($container.append('<p>'+$(this).closest('.field').prev('.js-form-mechanics[data-info]').text()+": "+$(this).next('label').find('span').text()+'</p>\n')),
                                ]:false;
                            }
                        };
                    });
                    $($target).append($container);
                });
            };
        },
        editSection: function ($elem) {
            $elem.remove();
            var dataTarget = $elem.attr('data-target');
            $('.js-form-mechanics[data-form-mechanics="section-inputs"][data-target="'+dataTarget+'"]').next('.js-form-mechanics[data-form-mechanics="prev-text"]').remove();
            $('.js-form-mechanics[data-form-mechanics="section-inputs"][data-target="'+dataTarget+'"]').addClass('is-active');
        },
        bind: [
            $('.js-form-mechanics[data-form-mechanics="open-hidde-field"]').on('click', function () {
                FormMechanics.hiddenFieldOpen($(this));
            }),
            $('.js-form-mechanics[data-form-mechanics="tab-field"]').on('click', function () {
                FormMechanics.tabField($(this));
            }),
            $('.js-form-mechanics[data-form-mechanics="edit-section"]').on('click', function () {
                FormMechanics.editSection($(this));
                $('.js-form-mechanics[data-form-mechanics="hidden-submit-btn"]').addClass('is-active');
            }),
        ],
    };
    FormMechanics.orderingLocation();
    FormMechanics.parseSection();

    /*
    * <div class="js-toggle-button tbtn is-true" data-context="В подписке">
    *     <div class="js-toggle-frame tbtn__frame">
    *         <div class="tbtn__status">
    *             <span>Да</span>
    *         </div>
    *         <div class="tbtn__status">
    *             <span>Нет</span>
    *         </div>
    *     </div>
    *     <div class="tbtn__context"></div>
    * </div>
    * */

    var Toggle_button = {
        init: function () {
            $('.js-toggle-button').each(function () {
                $(this).find('.js-toggle-context').text($(this).attr('data-context'));
            });
        },
        toggle: function ($elem) {
            if(!$elem.hasClass('is-true')) {
                $elem.addClass('is-true');
                if($elem.hasAttr('data-context-frame')) {
                    $elem.closest('.js-toggle-frame').removeClass('is-false');
                };
            } else {
                $elem.removeClass('is-true');
                if($elem.hasAttr('data-context-frame')) {
                    $elem.closest('.js-toggle-frame').addClass('is-false');
                };
            }
            $elem.trigger('togglebtn');
        },
        bind: [
            $('.js-toggle-frame').on('click', function () {
                Toggle_button.toggle($(this).closest('.js-toggle-button'));
            }),
        ],
    };
    Toggle_button.init();
    function formatMoney(n) {
    	return n.toFixed(0).toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
    }

    function BasketItem(source) {
    	var id, baseQuantity, price, basePrice;

    	if ($.isPlainObject(source)) {
    		id = source.id;
    		baseQuantity = source.quantity || 0;
    		price = source.price;
    		basePrice = source.basePrice;
    	}
    	else {
    		id = source;
    		baseQuantity = 0;
    		price = 0;
    		basePrice = 0;
    	}

    	this.quantity = baseQuantity;
    	this.getId = function () { return id; };
    	this.getBaseQuantity = function () { return baseQuantity; };

    	this.getCost = function () { return price * this.quantity; };
    	this.getBaseCost = function () { return basePrice ? basePrice * this.quantity : 0; };
    }

    BasketItem.prototype.setQuantity = function (quantity) {
    	this.quantity = quantity >= 0 ? quantity : 0;
    };

    BasketItem.prototype.addQuantity = function (quantity) {
    	this.setQuantity(this.quantity + quantity);
    };

    BasketItem.prototype.isEmpty = function () {
    	return this.quantity === 0 && this.getBaseQuantity() === 0;
    };


    function initBasket() {
    	var serviceUrl = '/api/v1/basket/',
    		isIntermediate = true,
    		items = {}, self;

    	function bindBasketItems() {
    		$('.js-counter-frame[data-product]').each(function () {
    			var $this = $(this),
    				id = $this.data('product'),
    				item = items[id];

    			if (item) {
    				$this.find('.js-basket-cost').text(formatMoney(item.getCost()));
    				$this.find('.js-basket-base-cost').text(formatMoney(item.getBaseCost()));
    			}
    		});
    	}
    	function bindCatalogItems() {
    		$('.product-item .js-tabs-content[data-target]').each(function () {
    			var $this = $(this),
    				id = $this.data('target'),
    				item = items[id];

    			if (item && item.getBaseQuantity() > 0) {
    				$this.find('.js-basket-quantity').text('В корзине ' + item.getBaseQuantity() + ' шт.');
    				$this.find('.js-ok-animate').addClass('is-selected');
    			}
    			else {
    				$this.find('.js-basket-quantity').text('');
    				$this.find('.js-ok-animate').removeClass('is-selected');
    			}
    		});

    		$('.js-counter[data-product]').each(function () {
    			var $this = $(this),
    				id = $this.data('product'),
    				item = items[id];

    			if (item && item.getBaseQuantity() > 0) {
    				$this.find('input').val(item.getBaseQuantity()).trigger('input');
    			}
    			else {
    				$this.parent().parent().remove();
    			}
    		});
    		bindBasketItems();
    	}

    	function updateTotals(total) {
    		$('#basket-short').text(total.info);
    		$('#basket-total-quantity').text(total.info);
    		$('#basket-total-sum').text(total.price);

    		if (total.hasOwnProperty('delivery')) {
    			$('#basket-delivery-cost').text(total.delivery);
    		}
    		if (total.hasOwnProperty('limitFree')) {
    			if (total.limitFree > 0)
    				$('#basket-delivery-free').show().text(total.limitFree);
    			else
    				$('#basket-delivery-free').hide();
    		}
    	}

    	function processServerResponse(response) {
    		if (response.hasOwnProperty('items')) {
    			items = {};
    			$.each(response.items, function (index, value) {
    				items[value.id] = new BasketItem(value);
    			});
                $('.js-counter[data-product]').each(function () {
                    var $this = $(this),
                        id = $this.data('product'),
                        item = items[id];

                    if (!item) {
                        $this.parent().parent().remove();
                    }
                });
    			bindBasketItems();
    		}
    		if (response.hasOwnProperty('total'))
    			updateTotals(response.total);
    	}

    	function changeQuantity(productId, callback) {
    		var item = items[productId];
    		if (item) {
    			callback(item);
    			if (item.isEmpty())
    				delete items[productId];
    		}
    		else {
    			item = new BasketItem(productId);
    			callback(item);
    			if (!item.isEmpty())
    				items[productId] = item;
    		}
    		bindBasketItems();
    	}

    	function send(method, productId, quantity) {
    		var options = {
    			type: method,
    			url: serviceUrl + productId,
    			success: processServerResponse
    		};
    		if (method !== 'DELETE')
    			options.data = {quantity: quantity};

    		$.ajax(options);
    	}

    	self = {
    		load: function () {
    			$.get(serviceUrl, processServerResponse);
    			return self;
    		},

    		accumulate: function () {
    			isIntermediate = false;
    			return self;
    		},

    		add: function (productId, quantity) {
    			if ($.isNumeric(productId) && productId > 0) {
    				quantity = quantity !== 0 ? quantity : 1;
    				if (isIntermediate) {
    					send('POST', productId, quantity);
    				}
    				else {
    					changeQuantity(productId, function (item) {
    						item.addQuantity(quantity);
    					});
    				}
    			}
    			return self;
    		},

    		set: function (productId, quantity) {
    			if ($.isNumeric(productId) && productId > 0) {
    				quantity = quantity >= 0 ? quantity : 0;
    				if (isIntermediate) {
    					send('PUT', productId, quantity);
    				}
    				else {
    					changeQuantity(productId, function (item) {
    						item.setQuantity(quantity);
    					});
    				}
    			}
    			return self;
    		},

    		remove: function (productId) {
    			if ($.isNumeric(productId) && productId > 0) {
    				if (isIntermediate) {
    					send('DELETE', productId);
    				}
    				else {
    					changeQuantity(productId, function (item) {
    						item.setQuantity(0);
    					});
    				}
    			}
    			return self;
    		},

    		apply: function (success) {
    			var changes = {};
    			$.each(items, function (id, item) {
    				if (item.quantity !== item.getBaseQuantity())
    					changes[id] = item.quantity;
    			});

    			if (!$.isEmptyObject(changes)) {
    				$.ajax({
    					type: 'PATCH',
    					url: serviceUrl,
    					data: {items: changes, delivery: true},
    					success: function (response) {
    						processServerResponse(response);
    						if (success)
    							success();
    					}
    				});
    			}
    			isIntermediate = true;
    			return self;
    		},

    		bind: function () {
    			bindCatalogItems();
    			return self;
    		}
    	};

    	return self;
    }

    Zoobox.Basket = initBasket().load();
    // var products = [];

    function bindEvents () {
    var products = [];

    	var $selector;

    	function recount() {
    		var totalPrice = 0,
    			totalWeight = 0;

    		$('.card-item').each(function() {
    			var tmpWieght,
    				quantity,
    				price,
    				product = $(this).data('item');
    			tmpWieght = $(this).find('.item-weight').html();
    			price = parseInt($(this).find('.item-price').html());

    			quantity = parseInt(products[product]);
    			if (!quantity) {
    				quantity = 0;
    			}

    			totalPrice = totalPrice + (price * quantity);

    			if (parseFloat(tmpWieght) !== NaN) {
    				totalWeight = totalWeight + (parseFloat(tmpWieght) * quantity);
    			}
    		});

    		$('.total-weight').html(totalWeight / 1000);
    		$('.total-price').html(totalPrice);

    	};

    	self = {
    		load: function() {
    			return self;
    		},
    		bind: function ($selector) {

    			$selector.find('.js-counter').find('.btn[data-counter="minus"]').on('click', function() {
    				Counter.minus($(this));
    				var itemId = $(this).parent().parent().parent().data('item');
    				products[itemId] -= 1;
    				recount();
    			});

    			$selector.find('.js-counter').find('.btn[data-counter="plus"]').on('click', function() {
    				Counter.plus($(this));
    				var itemId = $(this).parent().parent().parent().data('item');
    				if (products[itemId] !== undefined) {
    					products[itemId] += 1;
    				} else {
    					products[itemId] = 1;
    				}
    				recount();
    			});

    			$selector.find('.js-counter').find('input').on('input', function () {
    				Counter.input($(this));
    				var $this = $(this);
    				var itemId = $(this).parent().parent().parent().data('item');
    				products[itemId] = $this.val();
    				recount();
    			});

    			$selector.find('.counter-round').on('click', function () {
    				var quantity = $(this).parent().parent().find('.item-quantity');
    					itemPack = $(this).parent().parent().data('item-pack');
    					itemId = $(this).parent().parent().data('item');
    					current = parseInt(quantity.val());

    				if (current >= itemPack) {
    					result = current - (current % itemPack) + itemPack;
    				} else {
    					result = itemPack;
    				}

    				quantity.val(result).trigger('input');
    			});

    			$selector.find('.js-ok-animate').on('click', function (e) {
    				button_animate.click(e,$(this));
    			});

    			$selector.find('.js-gallery-link').on('mouseenter', function () {
    				product_gallery.show($(this));
    			});


    			$selector.find(".js-gallery").on('mouseenter', function () {
    				!$(this).find('.js-gallery-zoom.is-active').hasClass('is-active') ? [
    					$('.js-gallery-zoom.is-active').removeClass('is-active'),
    					$(this).find('.js-gallery-zoom').addClass('is-active'),
    				]:false;
    			});

    			$selector.find(".js-gallery-content").each(function () {
    		        var id = $(this).find('.js-gallery-zoom').attr('id');
    		        $(this).find('.js-gallery-dir img').elevateZoom({
    		            zoomWindowPosition: id,
    		            zoomWindowWidth: 500,
    		            zoomWindowHeight: 500,
    		            borderSize: 1,
    		            easing: true,
    		            lensOpacity: 0
    		        });
    		    });
    			$selector.find('*[data-popup="open"]').on('click',function (e) {
    	            Popups.pOpen($(this));
    	            e.preventDefault();
    	        });
    	        $selector.find('.js-popup-item').on('click', function (e) {
    	            e.stopPropagation();
    	        });
    	        $selector.find('.js-popup-dir, *[data-popup="close"]').on('click', function (e) {
    	            Popups.pClose($(this));
    	            e.stopPropagation();
    	        });
    	        $selector.find('*[data-popup-toggle]').on('click',function (e) {
    	            Popups.toggle($(this));
    	            e.preventDefault();
    	        });

    			return self;
    		},
    		show: function(elementCode, is_subscribe) {
    			products = [];
    			var url = '/api/internal/component/catalog:element.fastview';
    				view = $('.product--popup');
    				view.find('.product__product-details').remove();
    			$.ajax({
    					url: url,
    					method: 'GET',
    					data: {
    						params: {
    							'ELEMENT_CODE': elementCode,
    							fastview: true,
    							'IS_SUBSCRIBE': is_subscribe
    						},
    					},
    					success: function(data) {
    						Zoobox.Fastview.bind(view.append(data));
    					}
    			});

    			return self;

    		},
    		checkAndAdd: function() {
    			// console.log(products);
    			$.each(products, function(key, val) {
    				if (val !== undefined && parseInt(val) !== 0) {
    					// console.log(key + ' ' + val + ' added to basket')
    					Zoobox.Basket.add(key, val);
    				}
    			});
    			return self;
    		},
            checkAndAddSubscribe : function () {
                var data = [];
                $.each(products, function(key, val) {
                    if (val !== undefined && parseInt(val) !== 0) {
                        data.push({'id': key, 'count': val});
                    }
                });
                if (data.length > 0) {
                    $.post("/api/internal/subscribe/add_many", {products:data});
                }
            }

    	};

    	return self;
    }

    Zoobox.Fastview = bindEvents().load();

    $('.js-subscribe-order').click(function (e) {//todo Временное решение, пока верстаки не сделают возможность вешать клики нормально через on #26810
        var id = $(this).data('id');
        $('#cresub').find('input[name="order_id"]').val(id);
        Popups.pOpen($('#cresub'));
    });
    $(document).on("click", ".js-subscribe-add", function(){
        $.get("/api/internal/subscribe/add/" + $(this).data("id"));
    });



    /**
     * Цикл ресайза js элементов страницы
     */
    var transforming = {
        current: '',
        current0: '',
        form: function(){
            var target = Math.ceil(parseFloat($('.container')[0].offsetWidth));
            target >= 768 && target < 1024 ? form = 2:
                target < 768 ? form = 3:
                    form = 1;
            return form;
        },
        dropdown_open: function($elem){
            var target = $elem.attr('data-target');
            var section = $elem.attr('data-section');
            this.dropdown_reset(section);
            $('.js-dropdown-link[data-section="'+section+'"][data-target="'+target+'"]').addClass('is-active');
            $('.js-dropdown-content[data-section="'+section+'"][data-target="'+target+'"]').addClass('is-active');
            target == 'pets' ? [
                $('.js-burger').addClass('is-active'),
                $('.js-main-menu').addClass('burger-is-active'),
            ]:false;
        },
        dropdown_reset: function(section){
            $('.js-dropdown-link[data-section="'+section+'"].is-active').removeClass('is-active');
            $('.js-dropdown-content[data-section="'+section+'"].is-active').removeClass('is-active');
        },
        dropdown: function(form){
            $('.js-dropdown-link').unbind();
            form == 2 ? [
            ]:
            form == 3 ? [
            ]:[
                $('.js-dropdown-link').on('mouseenter', function(){
                    transforming.dropdown_open($(this));
                }),
                $('body').on('mousemove', function(e){
                    var $elem = $('.js-dropdown-link.is-active, .js-dropdown-content.is-active'),
                        target = $elem.attr('data-target'),
                        section = $elem.attr('data-section');
                    !$elem.is(e.target) && $elem.has(e.target).length === 0 ? [
                        $elem.removeClass('is-active'),
                        $(window).scrollTop() == 0 && !$('.js-header').hasClass('header--basket') ? [
                            $('.js-burger').removeClass('is-active'),
                            $('.js-main-menu').removeClass('is-active').removeClass('burger-is-active'),
                        ]:false,
                    ]:false;
                }),
            ];
        },
        header_transform_reset: function(){
            $('.js-main-menu').removeClass('is-active');
            $('.js-header').removeClass('is-active');
            burger.reset();
        },
        header_transform: function(){
            var scroll = $(window).scrollTop();
            scroll > 0 ? [
                $('.js-header').addClass('is-active'),
                $('.js-main-menu').addClass('is-active'),
            ]:[
                this.header_transform_reset(),
            ];
        },
        harmonic: {
            $harmonic: $('.js-harmonic'),
            $section: $('.js-harmonic').find('.js-form-section'),
            $label: $('.js-harmonic').find('.js-form-section-label'),
            $dir: $('<div class="js-harmonic-dir harmonic-dir"></div>'),
            func: function(form) {
                if(form == 2) {

                } else if(form == 3) {

                } else {
                    var k = 24.4;
                    this.$harmonic.offset().top + this.$harmonic.height() - $(window).scrollTop() - 90 - this.$dir.height() - 70 <= 0  ? [
                        this.$dir.css({
                            top: this.$harmonic.height() - 70+'px',
                        }).addClass('is-static'),
                    ]:[
                        this.$dir.css({
                            top: '',
                        }).removeClass('is-static'),
                    ];
                    if(!$(document).find('.js-harmonic-dir').is('div')) {
                        this.$harmonic.append(this.$dir);
                        var self = this;
                        this.$label.each(function(index){
                            self.$dir.append('<div><a href="'+$(this).attr('data-harmonic-link')+'" class="js-harmonic-link harmonic-link" data-scroll-to="section'+eval(index+1)+'">'+$(this).text()+'</a></div>')
                            $('.js-harmonic-link[data-scroll-to="section'+eval(index+1)+'"]').on('click', function(e){
                                e.preventDefault();
                                $('html').stop().animate({
                                    scrollTop: $($(this).attr('href')).offset().top - 90 - (k * index),
                                }, 1000, 'swing', function() {
                                });
                            });
                        });
                    };
                    /* выравнивание по оси x */
                    this.$dir.css({
                        left: this.$section.offset().left - $(window).scrollLeft() + 'px',
                    });
                    this.$label.each(function(index){
                        if($(this).offset().top - $(window).scrollTop() <= 90 + (k * index)){
                            $(this).addClass('is-hidden');
                            $('.js-harmonic-link[href="'+$(this).attr('data-harmonic-link')+'"]').addClass('is-active');
                        } else {
                            $(this).removeClass('is-hidden');
                            $('.js-harmonic-link[href="'+$(this).attr('data-harmonic-link')+'"]').removeClass('is-active');
                        };
                    });

                };
            },
        },
    /**
     * Необходимо создать файл
     * responsive_modules/function__name.js
     * со следующим содержимым
     function__name: function(form) {
            form == 2 ? []://tablet
            form == 3 ? []://mobile
            [];//defult (form == 1)
        }, про "}," в конце не забываем
     * вставить в код
     * //@ @include('partials/responsive/function__name.js') //пробел в @@ поставил чтобы не было ошибки в gulp
     */
    items: function(){
        this.current0 = this.form();
        this.current == '' || this.current != this.current0 ? [
            /** Полный адаптив this.current = this.current0,*/
            /** Без адаптива (delete)*/ this.current = 1,
            //вкладываем элементы this.function__name(form);
            this.dropdown(this.current),
        ]:false;
        if($('.js-harmonic').hasClass('js-harmonic')) {
            this.harmonic.func(this.current);
        };
    },
};
    transforming.items();
    $(window).on('resize',function(e){
        transforming.items();//основное событие отрисовки элементов
    });
    var scroll = {
        anchorTop: {
            timeout: '',
            variables: [$anchor = $('.js-anchor-top'), srollC = $(window).scrollTop()],
            move: function(){
                this.timeout = setTimeout(function(){
                    $anchor.removeClass('move');
                },TIME+100);
            },
            func1: function($elem){
                $elem.scrollTop() > 400 ? [
                    $anchor.addClass('active'),
                    $(window).scrollTop() >  srollC ? [
                        $anchor.removeClass('move'),
                    ]:[
                        clearTimeout(this.timeout),
                        $anchor.addClass('move'),
                        this.move(),
                    ],
                    srollC = $(window).scrollTop(),
                ]:[
                    $anchor.removeClass('active'),
                ];
            },
            func2: function(){
                $('html').stop().animate({
                    scrollTop: 0,
                }, 1000, 'swing', function() {
                });
            },
            bind: [
                $anchor.on('click', function(){
                    scroll.anchorTop.func2();
                }),
            ],
        },
        fixed_containers: function() {
            $('.js-header, .js-main-menu').css({
                left: '-'+$(window).scrollLeft()+'px',
            });
        },
        anchors: function($elem) {
            $target = $($elem.attr('href'));
            $('html').stop().animate({
                scrollTop: $($target).offset().top - 100,
            }, 1000, 'swing', function() {
            });
        },
        bind: [
            $('a.js-anchor').on('click', function(e){
                e.preventDefault();
                scroll.anchors($(this));
            }),
        ],
    };
    scroll.anchorTop.func1($(window));
    $(window).on('scroll', function(e){
        scroll.anchorTop.func1($(this));
        !$('html').hasClass('is-active') ? transforming.header_transform():false;
        scroll.fixed_containers();
        if($('.js-harmonic').hasClass('js-harmonic')) {
            transforming.harmonic.func(transforming.current);
        };
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbnRlcm5hbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYyA9IGNvbnNvbGUubG9nO1xyXG52YXIgVElNRSA9IDIwMDtcclxudmFyIFpvb2JveCA9IHt9O1xyXG5cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgJC5mbi5oYXNBdHRyID0gZnVuY3Rpb24oIG5hbWUgKSB7IHJldHVybiB0aGlzLmF0dHIoIG5hbWUgKSAhPT0gdW5kZWZpbmVkOyB9O1xyXG4gICAgdmFyIGdsb2JhbE9wdGlvbnMgPSB7XHJcbiAgICAgICAgLy8g0LrQvtC90YLRgNC+0LvRjNC90YvQtSDRgtC+0YfQutC4INCw0LTQsNC/0YLQuNCy0LBcclxuICAgICAgICAvLyBkZXNrdG9wWGxTaXplOiAxNTk5LFxyXG4gICAgICAgIC8vIGRlc2t0b3BMZ1NpemU6IDEzNzksXHJcbiAgICAgICAgLy8gZGVza3RvcFNpemU6ICAgMTE5OSxcclxuICAgICAgICAvLyB0YWJsZXRMZ1NpemU6ICAgOTU5LFxyXG4gICAgICAgIC8vIHRhYmxldFNpemU6ICAgICA3NjcsXHJcbiAgICAgICAgLy8gbW9iaWxlU2l6ZTogICAgIDQ3OSxcclxuXHJcbiAgICAgICAgLy8g0L/RgNC+0LLQtdGA0LrQsCB0b3VjaCDRg9GB0YLRgNC+0LnRgdGC0LJcclxuICAgICAgICBpc1RvdWNoOiAkLmJyb3dzZXIubW9iaWxlXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChnbG9iYWxPcHRpb25zLmlzVG91Y2gpIHtcclxuICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ3RvdWNoJykucmVtb3ZlQ2xhc3MoJ25vLXRvdWNoJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnbm8tdG91Y2gnKS5yZW1vdmVDbGFzcygndG91Y2gnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiAoIU1vZGVybml6ci5mbGV4Ym94ICYmICFNb2Rlcm5penIuZmxleHdyYXApIHtcclxuICAgIC8vICAgICBmbGV4aWJpbGl0eShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIGlmICgkKCd0ZXh0YXJlYScpLmxlbmd0aCA+IDApIHtcclxuICAgIC8vICAgICBhdXRvc2l6ZSgkKCd0ZXh0YXJlYScpKTtcclxuICAgIC8vIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LTQutC70Y7Rh9C10L3QuNC1IGpzIHBhcnRpYWxzXHJcbiAgICAgKi9cclxuICAgIEBAaW5jbHVkZSgncGFydGlhbHMvcGFydGlhbHMuanMnKVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCm0LjQutC7INGA0LXRgdCw0LnQt9CwIGpzINGN0LvQtdC80LXQvdGC0L7QsiDRgdGC0YDQsNC90LjRhtGLXHJcbiAgICAgKi9cclxuICAgIHZhciB0cmFuc2Zvcm1pbmcgPSB7XHJcbiAgICAgICAgY3VycmVudDogJycsXHJcbiAgICAgICAgY3VycmVudDA6ICcnLFxyXG4gICAgICAgIGZvcm06IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBNYXRoLmNlaWwocGFyc2VGbG9hdCgkKCcuY29udGFpbmVyJylbMF0ub2Zmc2V0V2lkdGgpKTtcclxuICAgICAgICAgICAgdGFyZ2V0ID49IDc2OCAmJiB0YXJnZXQgPCAxMDI0ID8gZm9ybSA9IDI6XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQgPCA3NjggPyBmb3JtID0gMzpcclxuICAgICAgICAgICAgICAgICAgICBmb3JtID0gMTtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBAQGluY2x1ZGUoJ3BhcnRpYWxzL3Jlc3BvbnNpdmUvZHJvcGRvd24uanMnKVxyXG4gICAgICAgIEBAaW5jbHVkZSgncGFydGlhbHMvcmVzcG9uc2l2ZS9oZWFkZXJfdHJhbnNmb3JtLmpzJylcclxuICAgICAgICBAQGluY2x1ZGUoJ3BhcnRpYWxzL3Jlc3BvbnNpdmUvaGFybW9uaWMuanMnKVxyXG4gICAgLyoqXHJcbiAgICAgKiDQndC10L7QsdGF0L7QtNC40LzQviDRgdC+0LfQtNCw0YLRjCDRhNCw0LnQu1xyXG4gICAgICogcmVzcG9uc2l2ZV9tb2R1bGVzL2Z1bmN0aW9uX19uYW1lLmpzXHJcbiAgICAgKiDRgdC+INGB0LvQtdC00YPRjtGJ0LjQvCDRgdC+0LTQtdGA0LbQuNC80YvQvFxyXG4gICAgIGZ1bmN0aW9uX19uYW1lOiBmdW5jdGlvbihmb3JtKSB7XHJcbiAgICAgICAgICAgIGZvcm0gPT0gMiA/IFtdOi8vdGFibGV0XHJcbiAgICAgICAgICAgIGZvcm0gPT0gMyA/IFtdOi8vbW9iaWxlXHJcbiAgICAgICAgICAgIFtdOy8vZGVmdWx0IChmb3JtID09IDEpXHJcbiAgICAgICAgfSwg0L/RgNC+IFwifSxcIiDQsiDQutC+0L3RhtC1INC90LUg0LfQsNCx0YvQstCw0LXQvFxyXG4gICAgICog0LLRgdGC0LDQstC40YLRjCDQsiDQutC+0LRcclxuICAgICAqIC8vQCBAaW5jbHVkZSgncGFydGlhbHMvcmVzcG9uc2l2ZS9mdW5jdGlvbl9fbmFtZS5qcycpIC8v0L/RgNC+0LHQtdC7INCyIEBAINC/0L7RgdGC0LDQstC40Lsg0YfRgtC+0LHRiyDQvdC1INCx0YvQu9C+INC+0YjQuNCx0LrQuCDQsiBndWxwXHJcbiAgICAgKi9cclxuICAgIGl0ZW1zOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuY3VycmVudDAgPSB0aGlzLmZvcm0oKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnQgPT0gJycgfHwgdGhpcy5jdXJyZW50ICE9IHRoaXMuY3VycmVudDAgPyBbXHJcbiAgICAgICAgICAgIC8qKiDQn9C+0LvQvdGL0Lkg0LDQtNCw0L/RgtC40LIgdGhpcy5jdXJyZW50ID0gdGhpcy5jdXJyZW50MCwqL1xyXG4gICAgICAgICAgICAvKiog0JHQtdC3INCw0LTQsNC/0YLQuNCy0LAgKGRlbGV0ZSkqLyB0aGlzLmN1cnJlbnQgPSAxLFxyXG4gICAgICAgICAgICAvL9Cy0LrQu9Cw0LTRi9Cy0LDQtdC8INGN0LvQtdC80LXQvdGC0YsgdGhpcy5mdW5jdGlvbl9fbmFtZShmb3JtKTtcclxuICAgICAgICAgICAgdGhpcy5kcm9wZG93bih0aGlzLmN1cnJlbnQpLFxyXG4gICAgICAgIF06ZmFsc2U7XHJcbiAgICAgICAgaWYoJCgnLmpzLWhhcm1vbmljJykuaGFzQ2xhc3MoJ2pzLWhhcm1vbmljJykpIHtcclxuICAgICAgICAgICAgdGhpcy5oYXJtb25pYy5mdW5jKHRoaXMuY3VycmVudCk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbn07XHJcbiAgICB0cmFuc2Zvcm1pbmcuaXRlbXMoKTtcclxuICAgICQod2luZG93KS5vbigncmVzaXplJyxmdW5jdGlvbihlKXtcclxuICAgICAgICB0cmFuc2Zvcm1pbmcuaXRlbXMoKTsvL9C+0YHQvdC+0LLQvdC+0LUg0YHQvtCx0YvRgtC40LUg0L7RgtGA0LjRgdC+0LLQutC4INGN0LvQtdC80LXQvdGC0L7QslxyXG4gICAgfSk7XHJcbiAgICB2YXIgc2Nyb2xsID0ge1xyXG4gICAgICAgIGFuY2hvclRvcDoge1xyXG4gICAgICAgICAgICB0aW1lb3V0OiAnJyxcclxuICAgICAgICAgICAgdmFyaWFibGVzOiBbJGFuY2hvciA9ICQoJy5qcy1hbmNob3ItdG9wJyksIHNyb2xsQyA9ICQod2luZG93KS5zY3JvbGxUb3AoKV0sXHJcbiAgICAgICAgICAgIG1vdmU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgJGFuY2hvci5yZW1vdmVDbGFzcygnbW92ZScpO1xyXG4gICAgICAgICAgICAgICAgfSxUSU1FKzEwMCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZ1bmMxOiBmdW5jdGlvbigkZWxlbSl7XHJcbiAgICAgICAgICAgICAgICAkZWxlbS5zY3JvbGxUb3AoKSA+IDQwMCA/IFtcclxuICAgICAgICAgICAgICAgICAgICAkYW5jaG9yLmFkZENsYXNzKCdhY3RpdmUnKSxcclxuICAgICAgICAgICAgICAgICAgICAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAgc3JvbGxDID8gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYW5jaG9yLnJlbW92ZUNsYXNzKCdtb3ZlJyksXHJcbiAgICAgICAgICAgICAgICAgICAgXTpbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYW5jaG9yLmFkZENsYXNzKCdtb3ZlJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3JvbGxDID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpLFxyXG4gICAgICAgICAgICAgICAgXTpbXHJcbiAgICAgICAgICAgICAgICAgICAgJGFuY2hvci5yZW1vdmVDbGFzcygnYWN0aXZlJyksXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdW5jMjogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICQoJ2h0bWwnKS5zdG9wKCkuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwLFxyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCwgJ3N3aW5nJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYmluZDogW1xyXG4gICAgICAgICAgICAgICAgJGFuY2hvci5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbC5hbmNob3JUb3AuZnVuYzIoKTtcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZml4ZWRfY29udGFpbmVyczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1oZWFkZXIsIC5qcy1tYWluLW1lbnUnKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgbGVmdDogJy0nKyQod2luZG93KS5zY3JvbGxMZWZ0KCkrJ3B4JyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhbmNob3JzOiBmdW5jdGlvbigkZWxlbSkge1xyXG4gICAgICAgICAgICAkdGFyZ2V0ID0gJCgkZWxlbS5hdHRyKCdocmVmJykpO1xyXG4gICAgICAgICAgICAkKCdodG1sJykuc3RvcCgpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKCR0YXJnZXQpLm9mZnNldCgpLnRvcCAtIDEwMCxcclxuICAgICAgICAgICAgfSwgMTAwMCwgJ3N3aW5nJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZDogW1xyXG4gICAgICAgICAgICAkKCdhLmpzLWFuY2hvcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsLmFuY2hvcnMoJCh0aGlzKSk7XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgIF0sXHJcbiAgICB9O1xyXG4gICAgc2Nyb2xsLmFuY2hvclRvcC5mdW5jMSgkKHdpbmRvdykpO1xyXG4gICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICBzY3JvbGwuYW5jaG9yVG9wLmZ1bmMxKCQodGhpcykpO1xyXG4gICAgICAgICEkKCdodG1sJykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpID8gdHJhbnNmb3JtaW5nLmhlYWRlcl90cmFuc2Zvcm0oKTpmYWxzZTtcclxuICAgICAgICBzY3JvbGwuZml4ZWRfY29udGFpbmVycygpO1xyXG4gICAgICAgIGlmKCQoJy5qcy1oYXJtb25pYycpLmhhc0NsYXNzKCdqcy1oYXJtb25pYycpKSB7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybWluZy5oYXJtb25pYy5mdW5jKHRyYW5zZm9ybWluZy5jdXJyZW50KTtcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwiZmlsZSI6ImludGVybmFsLmpzIn0=
