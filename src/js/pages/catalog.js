App.catalog = {
    init() {
        this.changer();
        this.colorBox();
        this.changeProductColor();

        this.filter.init();
    },
    filter: {
        open: false,

        init() {
            let mainScope = this;
            $('.js-catalog-filter--show').on('click', function() {
                mainScope.toggle();
            });
            $('.js-catalog-filter--hide').on('click', function() {
                mainScope.toggle();
            });
        },
        toggle() {
            let $filter = $('.js-catalog-filter');
            let VISIBLE_CLASS = 'is-visible';
            if (!this.open) {
                $filter.addClass(VISIBLE_CLASS);
                document.documentElement.style.overflow = 'hidden';
                this.open = true;
            } else {
                $filter.removeClass(VISIBLE_CLASS);
                document.documentElement.style = '';
                this.open = false;
            }
        }
    },
    changer() {
        if ($('.js-changer').length) {
            new Changer({ selector: '.js-changer' });
        }
    },
    colorBox() {
        $('.js-catalog-filter-item')
            .find('.catalog-filter__subitem')
            .each(function() {
                var $colorBox = $(this).find('.catalog-filter__color');
                var color = $colorBox.data('filter-color');
                $colorBox.css('background-color', color);
            });
    },
    changeProductColor() {
        $(document).on('click', '.js-color-item', function(e) {
            let item = $(this).closest('.js-product-item');
            let color = $(this).data('color');
            let img = item.find('.product-item__image');

            img.attr('src', color);
            e.preventDefault();
        });
    }
};

//Catalog Filter Action
// $('.js-catalog-filter--show').on('click', function() {
//     $('.js-catalog-filter').addClass('is-visible');
//     document.documentElement.style.overflow = 'hidden';
// });
// $('.js-catalog-filter--hide').on('click', function() {
//     $('.js-catalog-filter').removeClass('is-visible');
//     document.documentElement.style = '';
// });

//Sticky Block https://github.com/abouolia/sticky-sidebar
// if ($('.js-stiky').length > 0 && $(window).width() > 768) {
//     var sidebar = new StickySidebar('.js-stiky', {
//         topSpacing: 85,
//         bottomSpacing: 20,
//         containerSelector: '.stiky-content',
//         innerWrapperSelector: '.stiky-inner'
//     });
// }
