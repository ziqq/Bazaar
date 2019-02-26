//dropdown
if ($('.js-dropdown').length) {
    $(document).on('click', '.js-dropdown', function() {
        if ($(this).hasClass('is-active')) {
            $(this).removeClass('is-active');
        } else {
            $('.js-dropdown').removeClass('is-active');
            $(this).addClass('is-active');
        }
    });
    $(document).on('click', function(e) {
        if ($(e.target).closest('.js-dropdown').length) return;
        $('.js-dropdown').removeClass('is-active');
        e.stopPropagation();
    });
}
