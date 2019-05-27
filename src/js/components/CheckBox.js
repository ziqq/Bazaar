/* html example
<label class="bb-checkbox js-bb-checkbox">
    <input type="checkbox">
    <span class="bb-checkbox__box"></span>
    <span class="bb-checkbox__title">WhatsApp</span>
</label>
*/

class CheckBox {
    constructor(args) {
        this.selector = args.selector;
        this.init();
        this.checkStatus();
    }

    init() {
        $(this.selector).click(function() {
            let element = $(this);
            let elementToggle = element.find('input[type="checkbox"]');
            if (elementToggle.prop('checked')) {
                elementToggle.removeAttr('checked');
                elementToggle.prop('checked', false).trigger('change');
                element.removeClass('is-checked');
            } else {
                elementToggle.attr('checked', 'checked');
                elementToggle.prop('checked', true).trigger('change');
                element.addClass('is-checked');
            }
        });
    }

    checkStatus() {
        $(this.selector).each(function() {
            let element = $(this);
            let elementToggle = element.find('input[type="checkbox"]');
            if (!elementToggle.prop('checked')) {
                elementToggle.removeAttr('checked');
                elementToggle.prop('checked', false).trigger('change');
                element.removeClass('is-checked');
            } else {
                elementToggle.attr('checked', 'checked');
                elementToggle.prop('checked', true).trigger('change');
                element.addClass('is-checked');
            }
        });
    }
}

/* html example
<label class="bb-checkbox bb-checkbox--radio js-bb-radio">
    <input name="role" type="radio">
    <span class="bb-checkbox__box"></span>
    <span class="bb-checkbox__title">Салон</span>
</label>
*/
class Radio {
    constructor(args) {
        this.selector = args.selector;
        this.init();
    }

    init() {
        let mainScope = this;
        $(this.selector).click(function(event) {
            let element = $(this),
                elementToggle =
                    element.find('input[type="radio"]') ||
                    element.find('.bb-checkbox__toggle');
            let elementToggleName = elementToggle.attr('name');
            let allElements = $(
                mainScope.selector,
                '[name="' + elementToggleName + '"]'
            ).prevObject;
            for (let a = 0; a < allElements.length; a++) {
                if (allElements[a] != elementToggle[0]) {
                    let otherRadio = $(
                            mainScope._getClickElement(
                                mainScope.selector.split('.')[1],
                                allElements[a]
                            )
                        ),
                        otherRadioToggle = otherRadio.find(
                            'input[type="radio"]'
                        );
                    otherRadioToggle.removeAttr('checked');
                    otherRadioToggle.prop('checked', false).trigger('change');
                    otherRadio.removeClass('is-checked');
                }
            }
            if (!elementToggle.prop('checked')) {
                elementToggle.attr('checked', 'checked');
                elementToggle.prop('checked', true).trigger('change');
                element.addClass('is-checked');
            }
        });
    }

    _getClickElement(elementClass, newTarget) {
        let target = newTarget != undefined ? newTarget : event.target,
            body = document.querySelector('body');
        while (!target.classList.contains(elementClass) && target != body) {
            target = target.parentNode;
        }
        return target == body ? undefined : target;
    }
}
