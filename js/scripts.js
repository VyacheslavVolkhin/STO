$(document).ready(function(){

	//phone masked
	$('input[type="tel"]').mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
	$('input[type="tel"]').on('click', function() {
		$(this).setCursorPosition(4);
	})
	$.fn.setCursorPosition = function(pos) {
	  this.each(function(index, elem) {
	    if (elem.setSelectionRange) {
	      elem.setSelectionRange(pos, pos);
	    } else if (elem.createTextRange) {
	      var range = elem.createTextRange();
	      range.collapse(true);
	      range.moveEnd('character', pos);
	      range.moveStart('character', pos);
	      range.select();
	    }
	  });
	  return this;
	};

	//popup block
	$('.js-popup-wrap .js-btn-toggle').on('click', function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('body').removeClass('menu-show');
		} else {
			$('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
			$(this).addClass('active');
			if ($(this).parent().hasClass('main-menu-wrap')) {
				$('body').addClass('menu-show');
			}
		}
		return false;
	})
	$('.js-popup-wrap .js-btn-close').on('click', function() {
		$(this).parents('.js-popup-wrap').children('.js-btn-toggle').removeClass('active');
		$('body').removeClass('menu-show');
		return false;
	})
	$(document).click(function(event) {
	    if ($(event.target).closest(".js-popup-block").length) return;
	    $('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
	    $('body').removeClass('menu-show');
	    event.stopPropagation();
	});
	$('.js-popup-wrap').each(function() {
		if ($(this).hasClass('js-popup-select')) {
			// alert(1)
			if ($(this).find('.js-popup-block').find('.active').length>0) {} else {
				$(this).find('.js-popup-block').find('li').eq(0).children('a').addClass('active');
			}
			var currentSelect = $(this).find('.js-popup-block').find('.active').html();
			$(this).find('.js-btn-toggle').html(currentSelect);
		}
	})
	$('.js-popup-wrap.js-popup-select .js-popup-block a').on('click', function() {
		if ($(this).hasClass('active')) {} else {
			$(this).parents('.js-popup-wrap').find('.js-popup-block').find('.active').removeClass('active');
			$(this).addClass('active');
		}
		$('.js-popup-wrap').each(function() {
			if ($(this).hasClass('js-popup-select')) {
				if ($(this).find('.js-popup-block').find('.active').length>0) {} else {
					$(this).find('.js-popup-block').find('li').eq(0).children('a').addClass('active');
				}
				var currentSelect = $(this).find('.js-popup-block').find('.active').html();
				$(this).find('.js-btn-toggle').html(currentSelect);
			}
		})
		$(this).parents('.js-popup-wrap').find('.js-btn-toggle').removeClass('active');
		return false;
	})


    //nav
    if (!!$('.nav').offset()) {
        var stickyTop = $('.nav').offset().top;
        $(window).scroll(function () {
            var windowTop = $(window).scrollTop();
            if (stickyTop < windowTop) {
                $('.wrap').addClass('header-fixed');
            } else {
                $('.wrap').removeClass('header-fixed');
            }
        });
    }
    //mobile menu
    /*$('.main-menu-wrap li ul').each(function () {
        $(this).parent().addClass('submenu');
    })*/
    $('.main-menu-wrap .btn-menu').on('click', function () {
        if ($(this).next('.submenu-outer-wrap').length > 0) {
            if ($(window).innerWidth() < 768) {
                if ($(this).parent().hasClass('open')) {
                    $(this).parent().removeClass('open').children('.submenu-outer-wrap').slideUp(200);
                } else {
                    $('.main-menu-wrap li.open').removeClass('open').children('.submenu-outer-wrap').slideUp(200);
                    $(this).parent().addClass('open').children('.submenu-outer-wrap').slideDown(200);
                }
                return false;
            }
        }
    })
    $('.main-menu-wrap .submenu-wrap>li>a').on('click', function () {
        if ($(this).next('.submenu-inner').length > 0) {
            if ($(window).innerWidth() < 768) {
                if ($(this).parent().hasClass('open-inner')) {
                    $(this).parent().removeClass('open-inner').children('.submenu-inner').slideUp(200);
                } else {
                    $('.main-menu-wrap li.open-inner').removeClass('open-inner').children('.submenu-inner').slideUp(200);
                    $(this).parent().addClass('open-inner').children('.submenu-inner').slideDown(200);
                }
                return false;
            }
        }
    })


    //file input 
    $('.js-field-file .js-file-button').on('click', function () {
        $(this).parent().find('input').click();
        return false;
    })
    $('.js-field-file input[type=file]').on('change', function () {
        var fileName = ('' + $(this).val()).replace(/^.*[\ \/]/, '');
        if (fileName == "") {
            fileName = "Выбрать файл"
        }
        $(this).parent().addClass('active').find('.js-file-caption').html(fileName);
    });

	//tabs
	$('.js-tabs-nav').each(function() {
		$('.js-tab-block[data-tab*="'+$(this).find('.active').attr('data-tab')+'"]').addClass('active');
	})
	$('.js-tab-title').each(function() {
		if ($(this).hasClass('active')) {
			$(this).next('.js-tab-content').show(0);
            $(this).parent('.js-tab-block').addClass('tab-active');
		}
	})
	$('.js-tabs-nav li a').on('click', function() {
		if ($(this).hasClass('active')) {} else {
			$('.js-tab-block').removeClass('active');
			$(this).parents('.js-tabs-nav').find('.active').removeClass('active');
			$(this).addClass('active');
			$('.js-tabs-nav').each(function() {
				$('.js-tab-block[data-tab*="'+$(this).find('.active').attr('data-tab')+'"]').addClass('active');
			})
		}
		return false;
	})
	$('.js-tab-title').on('click' , function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active').next('.js-tab-content').slideUp(200);
            $(this).parent('.js-tab-block').removeClass('tab-active');
		} else {
			$(this).addClass('active').next('.js-tab-content').slideDown(200);
            $(this).parent('.js-tab-block').addClass('tab-active');
		}
	})
    $('.js-tab-block .menu-toggle-wrap a').on('click', function() {
        $(this).parents('.js-tab-block').toggleClass('tab-open');
        return false;
    })


    //main-slider-box
    if (!!$('.main-slider-box').offset()) {
        $('.main-slider-box .slider').slick({
            dots: false,
            slidesToShow: 1,
            variableWidth: false,
            infinite: true,
            adaptiveHeight: false,
            prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
            nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
        });
    }


    //faq-box
    if (!!$('.faq-box').offset()) {
        $('.faq-box .slider').slick({
            dots: true,
            slidesToShow: 1,
            variableWidth: false,
            infinite: true,
            adaptiveHeight: false,
            prevArrow: false,
            nextArrow: false,
        });
    }


    //news-slider-box
    if (!!$('.news-slider-box').offset()) {
        $('.news-slider-box .slider').slick({
            dots: true,
            slidesToShow: 2,
            variableWidth: false,
            infinite: true,
            adaptiveHeight: false,
            prevArrow: false,
            nextArrow: false,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }
                },
            ]
        });
    }


    //clients-slider-box
    if (!!$('.clients-slider-box').offset()) {
        $('.clients-slider-box .slider').slick({
            dots: true,
            slidesToShow: 1,
            variableWidth: true,
            infinite: true,
            adaptiveHeight: false,
            prevArrow: false,
            nextArrow: false,
        });
    }

    //reviews-slider-box
    if (!!$('.reviews-slider-box').offset()) {
        $('.reviews-slider-box .slider').slick({
            dots: false,
            slidesToShow: 3,
            variableWidth: false,
            infinite: true,
            adaptiveHeight: false,
            prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
            nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
            responsive: [
                {
                    breakpoint: 993,
                    settings: {
                        slidesToShow: 2,
                        dots: true,
                        prevArrow: false,
                        nextArrow: false,
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 1,
                        dots: true,
                        prevArrow: false,
                        nextArrow: false,
                    }
                },
            ]
        });
    }
    
	
});


