class Changer {
    constructor(o) {
        this.element = o.selector;
        this.check = false;

        this.init();
    }
    init() {
        let mainScope = this;

        $(this.element).each(function() {
            let $item = $(this).find('.changer__item');
            let $btnReset = $(this).find('.changer__reset');

            $item.on('click', function() {
                mainScope.toggle($item, $(this));
            });
            $btnReset.on('click', function(e) {
                mainScope.toggle($item, $(this));
                e.stopPropagation();
            });
        });
    }
    toggle(elements, _this) {
        if (!_this.hasClass('is-checked')) {
            elements.removeClass('is-checked');
            _this.addClass('is-checked');
            this.check = true;
        } else {
            elements.removeClass('is-checked');
            this.check = false;
        }
    }
}
