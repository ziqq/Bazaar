/**
 * App.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */

//Global Vars
const $window = $(window);
const $document = $(document);
const $body = $('body');
const $html = $('html');
const $wrapper = $('.wrapper');
const $overlay = $('.js-overlay');
const $header = $('.header');
const $main = $('.main');

$(function() {
    App.init();

    /*
     * Components.js
     */
    //=include components/Accordeon.js
    //=include components/Dropdown.js
});

const App = {
    init() {
        this.scrollBar();
        this.btnFavorite();
        this.goTop();
        this.goTo();
        this.offsetMainBlock();
        this.stickyBlock();

        this.Menu.init();
        this.Utils.init();
        this.Conponents.init();

        //Pages
        this.catalog.init();
        this.Card.init();

        $window.on('load', () => {
            $body.removeClass('loading');
        });

        $window.on('resize', () => {
            this.offsetMainBlock();
        });

        if ($window.width() > 768) {
            this.headerScroll();
            this.stickyBlock();
        } else {
            this.search();
        }
    },
    offsetMainBlock() {
        $main.css('padding-top', $header.outerHeight(true));
    },
    scrollBar() {
        //GetNiceScroll https://github.com/inuyaksa/jquery.nicescroll

        if ($(window).width() > 480) {
            let $scrollBar = $('.js-scroll');
            if ($scrollBar.length) {
                $scrollBar.niceScroll({
                    cursorcolor: '#2c2b2b',
                    horizrailenabled: false,
                    // autohidemode: false,
                    boxzoom: false,
                    verge: 500,
                    cursorwidth: '4px',
                    cursorborder: 'none',
                    cursorborderradius: '0'
                });
                $scrollBar.mouseover(function() {
                    $(this)
                        .getNiceScroll()
                        .resize();
                });
            }
        } else {
            $document.find('.js-scroll').removeClass('js-scroll');
        }
    },
    btnFavorite() {
        let checked = false;
        let CHECKED_CLASS = 'is-checked';
        $(document).on('click', '.js-button-icon--fav', function(e) {
            if (!checked) {
                $(this).addClass(CHECKED_CLASS);
                checked = true;
            } else {
                $(this).removeClass(CHECKED_CLASS);
                checked = false;
            }
            e.preventDefault();
        });
    },
    goTop() {
        let $btnGoTop = $('.js-go-top');

        //Click event to scroll to top
        $btnGoTop.on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 800);
        });

        $body.on('scroll', function() {
            if ($(this).scrollTop() > $(this).height()) {
                $btnGoTop.addClass('is-visible');
            } else {
                $btnGoTop.removeClass('is-visible');
                $btnGoTop.removeAttr('style');
            }
        });
    },
    goTo() {
        //Click event to scroll to section whith id like href
        $('.js-goto').click(function() {
            var elementClick = $(this).attr('href');
            var destination = $(elementClick).offset().top;
            $('html, body').animate(
                { scrollTop: destination - 90 + 'px' },
                300
            );
            return false;
        });
    },
    search() {
        //Mobile Search
        let $search = $('.js-search');
        let $searchInput = $search.find('.js-search-input');
        let $searchHhint = $search.find('.search__hint');
        let $searchBtnShow = $('.js-mobile-search--show');
        let open = false;
        let VISIBLE_CLASS = 'is-visible';

        $searchBtnShow.on('click', _toggle);
        $document.on('click', '.overlay--search', _toggle);

        function _toggle() {
            if (!open) {
                $search.addClass(VISIBLE_CLASS);
                // $overlay.addClass('is-visible overlay--search');
                open = true;
            } else {
                $search.removeClass(VISIBLE_CLASS);
                $searchInput.val('');
                $searchHhint.hide();
                // $overlay.removeClass('is-visible overlay--search');
                open = false;
            }
        }
    },
    headerScroll() {
        let $headerMain = $('.header-main');
        let $headerMainClone = $('<div class="header-main--clone">')
            .css('height', $headerMain.outerHeight(true))
            .insertAfter('.header-main')
            .hide();

        $window.on('scroll', function() {
            if ($(this).scrollTop() >= $('.header__top-line').outerHeight()) {
                $headerMain.addClass('header--fixed');
                $headerMainClone.show();
            } else {
                $headerMain.removeClass('header--fixed');
                $headerMainClone.hide();
            }
        });
    },
    stickyBlock() {
        //Sticky Block https://github.com/abouolia/sticky-sidebar
        let $stikyBlock = $('.js-stiky');

        if ($stikyBlock.length && $(window).width() > 768) {
            $stikyBlock.each(function() {
                let offsetTop = $(this).data('stiky-offset-top');

                new StickySidebar('.js-stiky', {
                    topSpacing: offsetTop,
                    bottomSpacing: 20,
                    containerSelector: '.stiky-content',
                    innerWrapperSelector: '.stiky-inner'
                });
            });
        }
    }
};

App.define = function(namespace) {
    var parts = namespace.split('.'),
        parent = Crm,
        i;

    //Убрать  начальный префикс если это являетсся глобальной переменной
    if (parts[0] == 'Crm') {
        parts = parts.slice(1);
    }

    //Если в глобальном объекте  нет  свойства  - создать  его.
    for (var i = 0; i < parts.length; i++) {
        if (typeof parent[parts[i]] == 'undefined') {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};

App.Utils = {
    init() {
        this.transformAccordeon(480);

        $window.on('resize', () => {
            this.transformAccordeon(480);
        });
        new LazyLoad({
            elements_selector: '.lazy'
        });
    },
    lazyLoadImage() {},
    transformAccordeon(width) {
        let $accordeon = $('[data-accordeon]');

        let $accordeonItem = $('[data-accordeon-item]');
        let $accordeonContent = $('[data-accordeon-content]');
        let $accordeonTitle = $('[data-accordeon-title]');

        if ($(window).width() <= width) {
            $accordeon.addClass('accordeon js-accordeon');
            $accordeonItem.addClass('accordeon__item');
            $accordeonContent.addClass('accordeon__content').slideUp();
            $accordeonTitle.addClass('accordeon__title');
        } else {
            $accordeon.removeClass('accordeon js-accordeon');
            $accordeonItem.removeClass('accordeon__item');
            $accordeonContent
                .removeClass('accordeon__content')
                .removeAttr('style');
            $accordeonTitle.removeClass('accordeon__title');
        }
    }
};

App.Menu = {
    open: false,
    ACTIVE_ClASS: 'is-active',

    el: {
        hamburger: $('.js-hamburger'),
        menu: $('.js-nav-main'),
        linkForward: $('.js-main-nav-link--forward'),
        overlay: $overlay,
        class: {
            active: 'is-active'
        }
    },

    init() {
        this.events();

        if ($window.width() <= 768) {
            this.el.menu.prependTo('.wrapper');
            this.mobileMenuWrap();
        }
    },

    events() {
        let mainScope = this;
        this.el.hamburger.on('click', () => {
            this._toggle();
        });

        this.el.linkForward.on('click', function(event) {
            mainScope.toggleDropdown(event, $(this));
        });

        $(document).on('click', '.overlay--menu', () => {
            this._toggle();
        });
    },

    toggleDropdown(event, _this) {
        if ($window.width() <= 768) {
            event.preventDefault();
            let $navItem = _this.closest('.nav-main__item');
            let $navItemDropdown = _this.closest('.nav-dropdown__item');
            let $navItemDropdown2 = $navItem.find('.nav-dropdown__item');
            let $mainDropdown = _this.closest('.nav-main__dropdown');

            let $title = _this.text();
            let $block = $(
                '<li class="nav-dropdown__title nav-dropdown__title--temp">'
            );

            if (
                !$navItem.hasClass(this.el.class.active) &&
                !_this.hasClass('nav-dropdown__title--link')
            ) {
                $navItem.addClass(this.el.class.active);
                $block
                    .insertAfter($navItem.find('.nav-dropdown__title--link'))
                    .text($title);
            } else if (
                $navItem.hasClass(this.el.class.active) &&
                !$navItemDropdown.hasClass(this.el.class.active) &&
                !(
                    _this.hasClass('nav-dropdown__title--link') ||
                    _this.hasClass('nav-dropdown__title--back')
                )
            ) {
                $navItemDropdown.addClass(this.el.class.active);
                $mainDropdown.css('overflow', 'hidden');
            } else if (
                $navItem.hasClass(this.el.class.active) &&
                !$navItemDropdown2.hasClass(this.el.class.active) &&
                (_this.hasClass('nav-dropdown__title--link') ||
                    _this.hasClass('nav-dropdown__title--back'))
            ) {
                $navItem.removeClass(this.el.class.active);
                $navItemDropdown.find('.nav-dropdown__title--temp').remove();
            } else if (
                $navItem.hasClass(this.el.class.active) &&
                $navItemDropdown2.hasClass(this.el.class.active) &&
                (_this.hasClass('nav-dropdown__title--link') ||
                    _this.hasClass('nav-dropdown__title--back'))
            ) {
                $navItemDropdown2.removeClass(this.el.class.active);
                $mainDropdown.removeAttr('style');
            }
        }
    },

    _toggle() {
        if (!this.open) {
            this.el.hamburger.addClass(this.el.class.active);
            this.el.menu.addClass(this.el.class.active);
            this.el.overlay.addClass('is-active overlay--menu');

            document.documentElement.style.overflow =
                document.documentElement.style.overflow === '' ? 'hidden' : '';

            this.open = true;
        } else {
            this.el.hamburger.removeClass(this.el.class.active);
            this.el.menu.removeClass(this.el.class.active);
            this.el.overlay.removeClass(this.el.class.active);

            document.documentElement.style.overflow =
                document.documentElement.style.overflow === '' ? 'hidden' : '';

            this.open = false;
        }
    },

    mobileMenuWrap() {
        App.Menu.el.menu.wrapInner('<div class="nav-main__inner">');
    }
};

App.Conponents = {
    init() {
        this.Select.init();
        this.Input.init();
        this.Slider.init();
        this.checkBtn();
        this.tabs();

        $window.on('resize', () => {
            this.Select.native();
        });

        if ($window.width() <= 480) {
            this.tabTransform();
        }
    },
    Select: {
        init() {
            this.native();
            this.icon();
        },
        native() {
            let $selectNative = $document.find('.js-select-native');
            if ($selectNative.length) {
                if ($window.width() > 480) {
                    if (!$selectNative.hasClass('select2-hidden-accessible')) {
                        $selectNative.each(function() {
                            let $parent = $(this).closest('.c-input--select');
                            $(this).select2({
                                minimumResultsForSearch: -1,
                                dropdownParent: $parent
                            });
                        });
                    }
                } else {
                    if ($selectNative.hasClass('select2-hidden-accessible')) {
                        $selectNative.select2('destroy');
                    }
                    $selectNative.each(function() {
                        let _this = $(this);
                        let $parent = _this.closest('.c-input');

                        let $title = $parent.find('.c-input__title');
                        let titleText = $title.text();

                        let placeholder = _this.data('placeholder');
                        let $firstOption = _this.find('option:first-child');
                        let $newOption = $('<option>').attr({
                            disabled: 'disabled',
                            selected: 'selected'
                        });
                        let type = $parent.data('type');

                        let text;
                        if (titleText !== '' || titleText !== 'undefined') {
                            text = titleText;
                        } else if (
                            placeholder !== '' ||
                            placeholder !== 'undefined'
                        ) {
                            text = placeholder;
                        } else {
                            return;
                        }

                        if ($parent.hasClass('c-input--transform')) {
                            if ($firstOption.is(':empty')) {
                                if (type === 'selected') {
                                    $firstOption.remove();
                                    $parent.addClass('is-focus');
                                } else {
                                    $firstOption.remove();

                                    _this
                                        .removeAttr('data-placeholder')
                                        .val(text);

                                    Select._addResetBtn(_this);
                                }
                                //firstOption not empty
                            } else {
                                if (type === 'selected') {
                                    $parent.addClass('is-focus');
                                } else {
                                    $newOption.prependTo(_this);

                                    Select._addResetBtn(_this);
                                }
                            }
                        } else {
                            if ($firstOption.is(':empty')) {
                                $firstOption
                                    .val(placeholder)
                                    .text(placeholder)
                                    .attr({
                                        selected: 'selected',
                                        disabled: 'disabled'
                                    });
                                _this
                                    .addClass('has-placeholder')
                                    .removeAttr('data-placeholder')
                                    .val(placeholder);
                            }
                        }

                        $(this).on('change', function() {
                            if ($(this).hasClass('has-placeholder')) {
                                $(this).removeClass('has-placeholder');
                            }

                            let $firstOption = _this.find('option:first-child');
                            if ($(this).val() !== '') {
                                $parent.addClass('is-focus');

                                if ($firstOption.is(':empty')) {
                                    $firstOption.remove();
                                }
                            } else {
                                $parent.removeClass('is-focus');
                            }
                        });

                        $(this).wrap('<label class="c-select">');
                    });
                }
            }
        },
        icon() {
            $('.js-select.select-with-icon').select2({
                templateResult: addUserPic,
                minimumResultsForSearch: -1
            });

            function addUserPic(opt) {
                if (!opt.id) {
                    return opt.text;
                }
                var optimage = $(opt.element).data('image');
                if (!optimage) {
                    return opt.text;
                } else {
                    var $opt = $(
                        '<span class="sorting-icon sorting-icon--' +
                            optimage +
                            '">' +
                            $(opt.element).text() +
                            '</span>'
                    );
                    return $opt;
                }
            }
        }
    },
    Input: {
        init() {
            this.masks();
            this.events();
        },
        masks() {
            let $inputPhone = $('.js-phone-mask');
            let $inputBorn = $('.js-born-mask');
            // //Masked inputmask https://github.com/RobinHerbots/Inputmask
            if ($inputPhone.length) {
                $inputPhone.inputmask({
                    mask: '+7 (999) 999-99-99',
                    clearIncomplete: true
                });
            }
            if ($inputBorn.length) {
                $inputBorn.inputmask({
                    mask: '99-99-9999',
                    clearIncomplete: true
                });
            }
        },
        events() {
            //Show Password
            $('.js-input-password--show').on('click', function() {
                $(this).css('display', 'none');
                $(this)
                    .next()
                    .css('display', 'block');
                $(this)
                    .parent()
                    .find('input[type="password"]')
                    .attr('type', 'text');
            });

            //Hide Password
            $('.js-input-password--hide').on('click', function() {
                $(this).css('display', 'none');
                $(this)
                    .prev()
                    .css('display', 'block');
                $(this)
                    .parent()
                    .find('input[type="text"]')
                    .attr('type', 'password');
            });
        }
    },
    Slider: {
        init() {
            this.new();
            this.color();
            this.card();
        },
        // card() {
        //     let $sliderCard = $('.js-bz-slider-card');
        //     console.log('---', 'INIT SLIDEr');

        //     if ($sliderCard.length) {
        //         var galleryTop = new Swiper('.js-bz-slider-gallery', {
        //             thumbs: {
        //                 swiper: galleryThumbs
        //             }
        //         });
        //         var galleryThumbs = new Swiper('.js-bz-slider-thumbs', {
        //             direction: 'vertical',
        //             spaceBetween: 10,
        //             // loop: true, bug too
        //             centeredSlides: true,
        //             slidesPerView: 4,
        //             touchRatio: 0.2,
        //             slideToClickedSlide: true
        //         });
        //     }
        // },
        // related() {
        //     let $sliderRelated = $('.js-bz-slider--related');
        //     if ($sliderRelated.length) {
        //         $sliderRelated.not('.slick-initialized').slick({
        //             arrows: true,
        //             infinite: true,
        //             slidesToShow: 8,
        //             slidesToScroll: 1,
        //             speed: 500,
        //             autoplaySpeed: 5000,
        //             autoplay: true,
        //             dots: false,
        //             responsive: [
        //                 {
        //                     breakpoint: 1025,
        //                     settings: {
        //                         slidesToShow: 6
        //                     }
        //                 },
        //                 {
        //                     breakpoint: 769,
        //                     settings: {
        //                         slidesToShow: 5
        //                     }
        //                 },
        //                 {
        //                     breakpoint: 481,
        //                     settings: {
        //                         slidesToShow: 3
        //                     }
        //                 },
        //                 {
        //                     breakpoint: 376,
        //                     settings: {
        //                         slidesToShow: 2
        //                     }
        //                 }
        //             ]
        //         });
        //     }
        // },
        new() {
            new Swiper('.js-bz-slider', {
                slidesPerView: 9,
                slidesPerGroup: 5,
                spaceBetween: 15,
                freeMode: true,
                grabCursor: true,
                lazy: true,

                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                breakpoints: {
                    1024: {
                        slidesPerView: 7
                    },
                    768: {
                        slidesPerView: 6
                    },
                    480: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                        navigation: false
                    }
                }
            });
        },
        card() {
            let galleryThumbs = new Swiper('.js-bz-slider-thumbs', {
                direction: 'vertical',
                spaceBetween: 10,
                centeredSlides: true,
                slidesPerView: 5,
                slideToClickedSlide: true,
                navigation: {
                    nextEl: '.bz-slider__thumbs .swiper-button-next',
                    prevEl: '.bz-slider__thumbs .swiper-button-prev'
                },
                breakpoints: {
                    1024: {
                        navigation: false
                    }
                }
            });

            let galleryTop = new Swiper('.js-bz-slider-gallery', {
                spaceBetween: 10,
                lazy: true,
                thumbs: {
                    swiper: galleryThumbs
                },
                navigation: {
                    nextEl: '.bz-slider__gallery .swiper-button-next',
                    prevEl: '.bz-slider__gallery .swiper-button-prev'
                },
                breakpoints: {
                    1024: {
                        thumbs: false
                    }
                }
            });

            if ($(window).width() > 1024) {
                galleryTop.params.control = galleryThumbs;
                galleryThumbs.params.control = galleryTop;
            } else {
                // galleryThumbs.destroy(true, true);
                $('.bz-slider__thumbs').remove();
            }
        },
        color() {
            new Swiper('.js-bz-slider-color', {
                slidesPerView: 7,
                slidesPerGroup: 5,
                spaceBetween: 10,
                freeMode: true,
                lazy: true,

                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },

                breakpoints: {
                    1024: {
                        slidesPerView: 7
                    },
                    768: {
                        slidesPerView: 6
                    },
                    480: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                        navigation: false
                    }
                }
            });
        }
    },
    checkBtn() {
        new CheckBox({ selector: '.js-checkbox' });
        new Radio({ selector: '.js-radio' });
    },
    // tabs() {
    //     let $tab = $(document).find('.js-tabs');
    //     if ($tab.length) {
    //         $tab.tabs();
    //     }
    // },
    tabs() {
        if ($(window).width() > 480) {
            new Tabs({ selector: '.js-tab' });
            new Tabs({ selector: '.js-tab-modal' });
        }
    },
    tabTransform() {
        var $tab = $('.js-tab--transform');

        $('.js-tab, .js-tab-modal')
            .unwrap()
            .addClass('accordeon accordeon--other js-accordeon')
            .removeClass('tab__titles');
        $tab.find('.tab__title')
            .addClass('accordeon__title')
            .removeClass('tab__title is-active')
            .wrap('<div class="accordeon__item">');

        $tab.find('[data-tab-content="0"]')
            .removeAttr('style')
            .insertAfter('[data-tab="0"]')
            .parent()
            .addClass('is-open');
        $tab.find('[data-tab-content="1"]')
            .css('display', 'none')
            .insertAfter('[data-tab="1"]');

        $tab.find('.tab__content')
            .addClass('accordeon__content')
            .removeClass('tab__content tab__content--product');
        $tab.find('.tab__contentes').remove();
    }
};

//=include pages/catalog.js
//=include pages/card.js

//=include components/CheckBox.js
//=include components/Changer.js
//=include components/Tabs.js
//=include components/PushUp.js
