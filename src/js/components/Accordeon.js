/* html example
<div class="accordeon js-accordeon">
	<div class="accordeon__item">
		<div class="accordeon__title"></div>
		<div class="accordeon__content"></div>
    </div>
</div>
*/

(function() {
    let $accordeon = $('.js-accordeon');
    let $content = $('.js-accordeon > .accordeon__content');
    let $item = $accordeon.find('.accordeon__item');

    if ($accordeon.length) {
        $content.slideUp();
        $item.each(function() {
            if ($(this).hasClass('is-open')) {
                $(this)
                    .find('.accordeon__content')
                    .slideDown();
            }
        });
    }

    $(document).on('click', '.js-accordeon .accordeon__title', function() {
        let $parent = $(this).closest('.js-accordeon');
        let $item = $(this).parent('.accordeon__item');

        if ($parent.data('accordeon') === 'collapse') {
            if ($item.hasClass('is-open')) {
                $item
                    .removeClass('is-open')
                    .find('.accordeon__content')
                    .slideUp();
            } else {
                $parent
                    .find('.accordeon__item')
                    .removeClass('is-open')
                    .find('.accordeon__content')
                    .slideUp();
                $item
                    .addClass('is-open')
                    .find('.accordeon__content')
                    .slideDown();
            }
        } else {
            console.log('--- $item', $item);
            console.log('--- $content', $item.find('.accordeon__content'));
            if ($item.hasClass('is-open')) {
                $item.removeClass('is-open');

                $item.children('.accordeon__content').slideUp();
            } else {
                $item.addClass('is-open');

                $item.children('.accordeon__content').slideDown();
            }
        }
    });
})();
