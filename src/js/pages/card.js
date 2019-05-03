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
        });
    },
    selectItem() {
        new ProductSelect({ selector: '.js-item-select' }).init();
    }
};

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

        $('.js-item-select-control--plus').on('click', function(e) {
            let select = $(this).closest('.js-item-select');
            let input = select.find('.item-select__input');
            let value = select.find('.item-select__value');
            let curentVal = parseInt(input.val());
            let count = parseInt(input.val()) + 1 + ' ' + 'м';

            input.removeAttr('style').val(count);

            if (curentVal > 0) {
                input.change();
            } else {
                input.val(1 + 'м');
            }

            value.children('.item-select__title').css('display', 'none');
            e.stopPropagation();
        });

        $('.js-item-select-control--minus').on('click', function() {
            let select = $(this).closest('.js-item-select');
            let input = select.find('.item-select__input');
            let value = select.find('.item-select__value');
            let curentVal = parseInt(input.val());
            let count = parseInt(input.val()) - 1 + ' ' + 'м';

            if (curentVal > 1) {
                count = count < 1 ? 1 : count;
                input.val(count);
                input.change();
                select.removeClass('is-close');
            } else {
                value.children('.item-select__title').removeAttr('style');
                input.css('display', 'none');
                select.removeClass('is-active');
            }
            return false;
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
