App.Card = {
    init() {
        this.tabs();
        this.selectItem();
    },
    tabs() {
        $('.js-card-tab-related, .js-card-tab-related--modal').tabs();

        $(document).on('click', '.js-related-tab', function() {
            $(this)
                .closest('.js-card-tab-related--modal')
                .find('.js-bz-slider--related-modal')
                .slick('setPosition');
            $(this)
                .closest('.js-card-tab-related')
                .find('.js-bz-slider--related')
                .slick('setPosition');
        });

        $('#preview').on('shown.bs.modal', function(e) {
            $('.js-bz-slider--card-modal').resize();
            $('.js-bz-slider--related-modal').resize();

            App.Conponents.Slider.card();
            App.Conponents.Slider.new();

            // if ($(window).width() <= 480) {
            //     tabTransform();
            // }
        });
    },
    selectItem() {
        new ProductSelect({ selector: '.js-item-select' }).init();
    }
};

// $(document).ready(function() {
//     //card properties tabs
//     //tabs ---> accordeon
//     // function tabTransform() {
//     //     var tab = $('.js-tab--transform');
//     //     $('.js-tab, .js-tab-modal')
//     //         .unwrap()
//     //         .addClass('accordeon accordeon--other js-accordeon')
//     //         .removeClass('tab__titles');
//     //     tab.find('.tab__title')
//     //         .addClass('accordeon__title')
//     //         .removeClass('tab__title is-active')
//     //         .wrap('<div class="accordeon__item">');
//     //     tab.find('[data-tab-content="0"]')
//     //         .removeAttr('style')
//     //         .insertAfter('[data-tab="0"]')
//     //         .parent()
//     //         .addClass('is-open');
//     //     tab.find('[data-tab-content="1"]')
//     //         .css('display', 'none')
//     //         .insertAfter('[data-tab="1"]');
//     //     tab.find('.tab__content')
//     //         .addClass('accordeon__content')
//     //         .removeClass('tab__content tab__content--product');
//     //     tab.find('.tab__contentes').remove();
//     // }
//     // if ($(window).width() <= 480) {
//     //     tabTransform();
//     // }
//     //Card Item Select
//     // changeColor();
//     // $(document).on('click', '.js-item-select', function() {
//     //     if ($(this).hasClass('is-active')) {
//     //         $('.js-item-select').removeClass('is-active');
//     //         $(this).removeClass('is-active');
//     //     } else {
//     //         $('.js-item-select').removeClass('is-active');
//     //         $(this).addClass('is-active');
//     //     }
//     // });
//     // $(document).on('click', function(e) {
//     //     if ($(e.target).closest('.js-item-select').length) return;
//     //     $('.js-item-select').removeClass('is-active');
//     //     e.stopPropagation();
//     // });
//     // $(document).on('click', '.js-item-select-item', function() {
//     //     let select = $(this).closest('.js-item-select');
//     //     let text = $(this)
//     //         .find('.item-select__title')
//     //         .text();
//     //     let color = $(this)
//     //         .find('.item-select__color')
//     //         .data('item-select-color');
//     //     let value = select.find('.item-select__value');
//     //     let input = select.find('.item-select__input');
//     //     input.val(text);
//     //     value.children('.item-select__color').data('item-select-color', color);
//     //     changeColor();
//     //     if (select.hasClass('item-select--count')) {
//     //         if ($(this).hasClass('item-select__item--header')) {
//     //             value
//     //                 .children('.item-select__title')
//     //                 .removeAttr('style')
//     //                 .text('Выбрать');
//     //             input.css('display', 'none');
//     //         } else {
//     //             input.removeAttr('style');
//     //             value.children('.item-select__title').css('display', 'none');
//     //         }
//     //     }
//     // });
// });

class ProductSelect {
    constructor(o) {
        this.element = o.selector;
        this.active = false;
        this.overlay = '.js-overlay';
    }
    init() {
        this.events();
        this.changeColor();
    }
    events() {
        let mainScope = this;

        $(this.element).on('click', function() {
            mainScope.toggle(mainScope, $(this));
        });

        $(document).on('click', '.js-item-select-item', function() {
            let $select = $(this).closest(mainScope.element);
            let text = $(this)
                .find('.item-select__title')
                .text();
            let color = $(this)
                .find('.item-select__color')
                .data('item-select-color');
            let $value = $select.find('.item-select__value');
            let $input = $select.find('.item-select__input');

            $input.val(text);

            $value
                .children('.item-select__color')
                .data('item-select-color', color);

            mainScope.changeColor();

            if ($select.hasClass('item-select--count')) {
                if ($(this).hasClass('item-select__item--header')) {
                    $value
                        .children('.item-select__title')
                        .removeAttr('style')
                        .text('Выбрать');
                    $input.css('display', 'none');
                } else {
                    $input.removeAttr('style');
                    $value
                        .children('.item-select__title')
                        .css('display', 'none');
                }
            }
        });

        $document.on('click', '.overlay--transparent', function() {
            mainScope.toggle(mainScope, $(this));
            $('.js-overlay').removeClass('overlay--transparent');
        });
    }
    toggle(mainScope, _this) {
        if (!_this.hasClass('is-active') || !mainScope.active) {
            $(mainScope.element).removeClass('is-active');
            _this.addClass('is-active');
            $('.js-overlay').addClass('overlay--transparent');
            mainScope.active = true;
        } else {
            $(mainScope.element).removeClass('is-active');
            _this.removeClass('is-active');
            $('.js-overlay').removeClass('overlay--transparent');
            mainScope.active = false;
        }
    }
    changeColor() {
        $(this.element)
            .each(function() {
                var colorBox = $(this).find('.item-select__color');
                var color = colorBox.data('item-select-color');
                colorBox.css('background-color', color);
            })
            .find('.item-select__item')
            .each(function() {
                var colorBox = $(this).find('.item-select__color');
                var color = colorBox.data('item-select-color');
                colorBox.css('background-color', color);
            });
    }
}

//Select Item changeColor
// function changeColor() {
//     $('.js-item-select')
//         .each(function() {
//             var colorBox = $(this).find('.item-select__color');
//             var color = colorBox.data('item-select-color');
//             colorBox.css('background-color', color);
//         })
//         .find('.item-select__item')
//         .each(function() {
//             var colorBox = $(this).find('.item-select__color');
//             var color = colorBox.data('item-select-color');
//             colorBox.css('background-color', color);
//         });
// }
