jQuery(function ($) {
    $(document).ready(function () {
        function scrollToElement(cont, elem, speed) {
            cont.animate({
                scrollTop: cont.scrollTop() - cont.offset().top + $(elem).offset().top - 20
            }, speed == undefined ? 1000 : speed);
            return this;
        };
        $('.constr-wrap').on('submit', '.constructo-form', function (e) {
            let els = $(this).find('[data-required]');
            let arrayElements = new Array();
            for (let i = 0; i < els.length; i++) {
                if ($(els[i]).parents('.question-name').length > 0) {
                    let queationName = $(els[i]).val().split('. ');
                    console.log(queationName)
                    console.log(queationName.length)
                    if (queationName.length < 1 || queationName[1] === "") {
                        arrayElements.push($(els[i]));
                        $(els[i]).addClass('has-error');
                        $(els[i]).parents('.question-wrap').addClass('has-error')
                        $(els[i]).focus(function (e) {
                            $(this).removeClass('has-error');
                            $(this).parents('.question-wrap').removeClass('has-error')
                        });
                    }
                }
                if ($(els[i]).val() == null || $(els[i]).val() == "") {
                    arrayElements.push($(els[i]));
                    $(els[i]).addClass('has-error');
                    $(els[i]).parents('.question-wrap').addClass('has-error')
                    $(els[i]).focus(function (e) {
                        $(this).removeClass('has-error');
                        $(this).parents('.question-wrap').removeClass('has-error')
                    });
                }
                let questions = $('.constructo-form').find('.question-wrap');
                for (let i = 0; i < questions.length; i++) {
                    let questionType = $(questions[i]).find('input[name^=type_]').val();
                    switch (questionType) {
                        case 'single':
                            if ($(questions[i]).find('.answer-row').find('.radio-item').length < 1) {
                                arrayElements.push($(questions[i]));
                                addError($(questions[i]), '???????????????? ???????? ???? ???????? ?????????????? ????????????');
                            }
                            break;
                        case 'dropdown':
                            if ($(questions[i]).find('.optins-list').find('.option-item').length < 2) {
                                arrayElements.push($(questions[i]));
                                addError($(questions[i]), '???????????????? ???????? ???? ???????? ?????????????? ????????????');
                            }
                            break;
                        case 'matrix':
                            if ($(questions[i]).find('.matrix-options').find('.matrix-row').length < 2 ||
                                $(questions[i]).find('.matrix-options').find('.matrix-col').length < 2) {
                                arrayElements.push($(questions[i]));
                                addError($(questions[i]), '???????????????? ???????? ???? ???????? ?????????????? ?? ????????????');
                            }
                            break;
                        case 'ranging':
                            if ($(questions[i]).find('.ranging-list').find('.ranging-item').length < 3) {
                                arrayElements.push($(questions[i]));
                                addError($(questions[i]), '???????????????? ???????? ???? ?????? ???????????????? ????????????');
                            }
                            break;
                    }
                }
            }
            if (arrayElements.length > 0) {
                e.preventDefault();
                scrollToElement($('.questions-box'), $(arrayElements[0]), 1000);
            }
        });

        function addError(question, message) {
            let htmlError = `<div class="question-error">${message}</div>`;
            $(question).addClass('has-error');
            if ($(question).find('.question-error').length === 0) {
                $(question).find('.question-content').append(htmlError);
            }
            $(question).click(function (e) {
                $(this).removeClass('has-error');
                $(this).find('.question-error').remove();
            });
        }
    });
});