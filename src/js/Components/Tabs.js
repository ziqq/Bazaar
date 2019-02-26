/* html example
<div class="tab">
    <div class="tab__wrap">
        <div class="tab__titles">
            <div class="tab__title is-active" data-tab="0"></div>
        <div class="tab__contentes">
            <div class="tab__content" data-tab-content="1"></div>
        </div>
    </div>
</div>
*/
class Tabs {
    constructor(o) {
        this.element = o.selector;

        this.init();
    }
    init() {
        $(this.element).each(function() {
            let $title = $(this).find('.tab__title');
            let $content = $(this).find('.tab__content');

            $content.not(':first').hide();

            $title.on('click', function() {
                let tabId = $(this).attr('data-tab');

                $title.removeClass('is-active');
                $(this).addClass('is-active');

                $content.hide();
                $content.filter('[data-tab-content=' + tabId + ']').show();
            });
        });
    }
}
