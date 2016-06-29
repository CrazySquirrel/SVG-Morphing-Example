if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    }
}

function getBoundingClientRect() {
    var ret;
    if (node.getBoundingClientRect) {
        ret = node.getBoundingClientRect();
    } else {
        var element = node;
        var coords = {
            x: 0, y: 0, width: element.offsetWidth,
            height: element.offsetHeight
        };
        while (element) {
            coords.x += element.offsetLeft;
            coords.y += element.offsetTop;
            element = element.offsetParent;
        }
        ret = {
            left: coords.x, right: coords.x +
            coords.width, top: coords.y, bottom: coords.y + coords.height
        };
    }
}

var window_width, window_height, document_scroll;

function getDocumentScroll() {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return scrollTop;
}

function getWindowHeight() {
    if (document.body && document.body.offsetWidth) {
        winH = document.body.offsetHeight;
    }
    if (document.compatMode == 'CSS1Compat' &&
        document.documentElement &&
        document.documentElement.offsetWidth) {
        winH = document.documentElement.offsetHeight;
    }
    if (window.innerWidth && window.innerHeight) {
        winH = window.innerHeight;
    }
    return winH;
}

function getDocumentHeight() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
}

function getWindowWidth() {
    if (document.body && document.body.offsetWidth) {
        winW = document.body.offsetWidth;
    }
    if (document.compatMode == 'CSS1Compat' &&
        document.documentElement &&
        document.documentElement.offsetWidth) {
        winW = document.documentElement.offsetWidth;
    }
    if (window.innerWidth && window.innerHeight) {
        winW = window.innerWidth;
    }
    return winW;
}

function getDocumentWidth() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollWidth, D.documentElement.scrollWidth),
        Math.max(D.body.offsetWidth, D.documentElement.offsetWidth),
        Math.max(D.body.clientWidth, D.documentElement.clientWidth)
    );
}

function nullPad(input, length) {
    input = input.toString() || "";
    length = length || 0;
    length = length > 0 ? length : 0;
    length = length - input.length;
    length = length > 0 ? length : 0;
    for (var i = 0; i < length; i++) {
        input = "0" + input;
    }
    return input;
}
function toDayName(index) {
    index = index || 0;
    index = index > 0 ? index : 0;
    index = index < 6 ? index : 6;
    return (['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'])[index];
}

function initSameHeight() {
    function update(blocks) {
        var maxheight = 0;

        blocks.each(function () {
            $(this).css({'height': 'auto'});
            if (!$(this).is(".dependentheight") && !$(this).is(".hide") && $(this).outerHeight() > maxheight) {
                maxheight = $(this).outerHeight();
            }
        });

        if (maxheight > 0) {
            blocks.each(function () {
                $(this).css({'height': maxheight + 'px'});
            });
        }
    }

    $('.sameheight').each(function () {
        if ($(this).parents('.sameheightparent').length == 0) {
            $(this).parent().addClass('sameheightparent');
        }
    });
    $('.sameheightparent').each(function () {
        var parent = $(this);
        var blocks = $(this).find('.sameheight');
        update(blocks);
        $(window).on('resize', function () {
            update(blocks);
        });
        $(document).on('sameHeightUpdateNeeded', function () {
            update(blocks);
        });
    });
}

function initSameWidth() {
    function update(blocks) {
        blocks.css({'width': 100 / blocks.length + "%"});
    }

    $('.samewidth').each(function () {
        if ($(this).parents('.samewidthparent').length == 0) {
            $(this).parent().addClass('samewidthparent');
        }
    });
    $('.samewidthparent').each(function () {
        var parent = $(this);
        var blocks = $(this).find('.samewidth');
        update(blocks);
        $(window).on('resize', function () {
            update(blocks);
        });
        $(document).on('sameWidthUpdateNeeded', function () {
            update(blocks);
        });
    });
}

function initCounte() {
    function counter(e, stop_time) {
        now_time = new Date();
        if (stop_time) {
            m = stop_time.match(/(\d+)-(\d+)-(\d+)\s+(\d+):(\d+):(\d+)/);
            stop_time = new Date(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6]);

            difference_time = stop_time.getTime() - now_time.getTime();

            if (Math.floor(difference_time / (60 * 1e3)) < 0) {
                $(e).remove();
            } else {
                day = "" + Math.floor(difference_time / (24 * 60 * 60 * 1e3));
                hours = "" + Math.floor(difference_time / (60 * 60 * 1e3) - 24 * day);
                minutes = "" + Math.floor(difference_time / (60 * 1e3) - 24 * 60 * day - hours * 60);
                seconds = "" + Math.floor(difference_time / 1e3 - 24 * 60 * 60 * day - hours * 60 * 60 - minutes * 60);

                if (day == "0") {
                    e.find(".day").hide();
                    e.find(".sec").show();
                } else {
                    e.find(".day").show();
                    e.find(".sec").hide();
                }

                day = day.length == 2 ? day : "0" + day;
                hours = hours.length == 2 ? hours : "0" + hours;
                minutes = minutes.length == 2 ? minutes : "0" + minutes;
                seconds = seconds.length == 2 ? seconds : "0" + seconds;

                $(e).find(".day>span").html("<span>" + day.split("").join("</span><span>") + "</span>");
                $(e).find(".hou>span").html("<span>" + hours.split("").join("</span><span>") + "</span>");
                $(e).find(".min>span").html("<span>" + minutes.split("").join("</span><span>") + "</span>");
                $(e).find(".sec>span").html("<span>" + seconds.split("").join("</span><span>") + "</span>");
            }
        }
    }

    $(".counter").each(
        function () {
            time_parth = {
                "day": "дней",
                "hou": "часов",
                "min": "минут",
                "sec": "секунды"
            };
            for (i in time_parth) {
                $(this).append(
                    [
                        '<div class="' + i + '">',
                        '<span>',
                        '<span>0</span>',
                        '<span>0</span>',
                        '</span>',
                        '<div>' + time_parth[i] + '</div>',
                        '</div>'
                    ].join("")
                );
            }
            $(this).append('<div class="clear"></div>');
            counter($(this), $(this).attr("data-counter"));
        }
    );

    setInterval(
        function () {
            $(".counter").each(
                function () {
                    counter($(this), $(this).attr("data-counter"));
                }
            );
        },
        1e3
    );
}

function initSmartLinks() {
    $(".phone-link").each(
        function () {
            var data = ($(this).attr("data-phone") || $(this).text() || "").replace(/\D+/g, "");
            if (data) {
                $(this).attr("href", "tel:+" + data);
            }
        }
    );
    $(".email-link").each(
        function () {
            var data = ($(this).attr("data-email") || $(this).text() || "").trim();
            if (data) {
                $(this).attr("href", "mailto:" + data);
            }
        }
    );
    $(".skype-link").each(
        function () {
            var data = ($(this).attr("data-skype") || $(this).text() || "").trim();
            if (data) {
                $(this).attr("href", "skype:+" + data);
            }
        }
    );
    $(".icq-link").each(
        function () {
            var data = ($(this).attr("data-icq") || $(this).text() || "").trim();
            if (data) {
                $(this).attr("href", "icq:" + data);
            }
        }
    );
    $(".geo-link").each(
        function () {
            var ua = navigator.userAgent.toLowerCase();
            var device = ua.match(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera/i) ? ua.match(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera/i)[0] : false;
            var data = ($(this).attr("data-geo") || "").trim();
            if (data) {
                if (device) {
                    switch (device) {
                        case 'iphone':
                        case 'ipad':
                        case 'ipod':
                            var href = "maps://maps.google.com/maps?saddr=Current+Location&daddr=" + data + "&ll=";
                            break;
                        case 'android':
                            var href = "https://maps.google.com/maps?f=d&daddr=" + data;
                            break;
                        default:
                            var href = "https://maps.google.com/maps?saddr=Current+Location&daddr=" + data + "&ll=";
                    }
                } else {
                    var href = "https://maps.google.com/maps?saddr=Current+Location&daddr=" + data + "&ll=";
                }
                $(this).attr("href", href);
            }
        }
    );

    $(".phone-link,.email-link,.skype-link,.icq-link,.geo-link").each(
        function () {
            $(this).attr("target", "_blank");
            var attributes = $(this).prop("attributes");
            var attr = "";
            $.each(attributes, function () {
                attr += " " + this.name + "='" + this.value + "'";
            });
            var e = $(this).replaceWith("<a" + attr + ">" + $(this).html() + "</a>");
        }
    );
}

function initSmartParalax() {
    if ($("html").is(".no-touch")) {
        $(".smart-paralax").each(
            function () {
                try {
                    window_height = $(window).height();
                    scrolltop = $(document).scrollTop() + window_height * 0.5;
                    parent = $(this).closest(".smart-paralax-parent");
                    parent_top = parent.offset().top;
                    parent_height = parent.height();
                    paralax_height = $(this).height() - parent_height;
                    if (paralax_height > 0) {
                        paralax_parent_height = parent_height > window_height ? window_height : parent_height;
                        paralax = (scrolltop - parent_top) / paralax_parent_height;
                        paralax = paralax < 0 ? 0 : paralax;
                        paralax = paralax > 1 ? 1 : paralax;
                        $(this).css({
                            "top": -paralax_height * (1 - paralax)
                        });
                    }
                } catch (e) {

                }
            }
        );
    }
}

function WebProfyScrollEvent() {
    initSmartParalax();
}

function WebProfyResizeEvent() {
    WebProfyScrollEvent();
}

function initForms() {
    jQuery.datetimepicker.setLocale('ru');

    $('input[name*="PHN"],input[name*="phone"],input[name*="tel"],input[type="tel"]').mask('+7? (999) 999 - 99 - 99');
    $('input[name*="DATE"]').datetimepicker({
        inline: true,
        format: 'd.m.Y',
        mask:'99.99.9999'
    });
    $('input[type="text"], input[type="tel"], input[type="email"]').on("blur",
        function () {
            if ($(this).val()) {
                $(this).addClass("is-focus");
            } else {
                $(this).removeClass("is-focus");
            }
        }
    );
    $('input[type="text"], input[type="tel"], input[type="email"]').blur();

    $('.ajax-form').each(
        function () {
            if (!$(this).is(".is-inited")) {
                $(this).ajaxFormUnbind();
                $(this).ajaxForm({
                    beforeSubmit: function (data, form) {
                        curForm = $(form);
                        data.push({name: "call_value", value: window.call_value});
                        data.push({name: "clientId", value: window.clientId});
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.status == 'ok') {
                            formSuccess(data.id, curForm);
                        } else {
                            formError(data.errors, curForm);
                        }
                    },
                    error: function () {
                        formError(null, curForm);
                        alert('Извините, сервер недоступен. Попробуйте отправить запрос позднее.');
                    }
                });
                $(this).addClass("is-inited");
            }
        }
    );
}

function formSuccess(id, curForm) {

    $("#errormsg").html("");

    if (curForm.closest(".fancybox-inner").size() > 0) {
        curForm.css({"display": "none"});
        $.fancybox.toggle();
        curForm.find(':input:not(input[type=hidden], input[type=submit])').val('');
        if (curForm.find('label[for="filecv"]').size() > 0) {
            curForm.find('label[for="filecv"]').text('Прикрепить файл...');
        }
        curForm.find('input[name="confirm"]').val('1');
        var $successdiv = $("<div class='success_msg'/>").html(curForm.attr("data-success") || 'Спасибо! Сообщение было успешно отправлено!');
        curForm.parent().prepend($successdiv);
        $.fancybox.toggle();
        $successdiv.animate({opacity: "1"}, 800).delay(1000).animate({
            opacity: "0"
        }, {
            duration: 1000,
            complete: function () {
                $successdiv.remove();
                $.fancybox.toggle();
                curForm.css({"display": "block"});
                $.fancybox.toggle();
            }
        });
    } else {
        var content = curForm.html();
        curForm.animate({opacity: "0"}, {
            duration: 250,
            complete: function () {

                curForm.find(':input:not(input[type=hidden], input[type=submit])').val('');
                if (curForm.find('label[for="filecv"]').size() > 0) {
                    curForm.find('label[for="filecv"]').text('Прикрепить файл...');
                }
                curForm.find('input[name="confirm"]').val('1');

                var $successdiv = $("<div class='success_msg'/>").html(curForm.attr("data-success") || 'Спасибо! Сообщение было успешно отправлено!');
                curForm.parent().prepend($successdiv);
                $successdiv.animate({opacity: "1"}, 800).delay(1000).animate({
                    opacity: "0"
                }, {
                    duration: 1000,
                    complete: function () {
                        $successdiv.remove();
                        curForm.animate({opacity: "1"}, 500);
                    }
                });
            }
        });
    }
}

function in_array(what, where) {
    for (var i = 0; i < where.length; i++)
        if (what == where[i])
            return true;
    return false;
}


function formError(errors, curForm) {
    curForm.closest('.ajax-form').animate({left: "-20px"}, 100).animate({left: "20px"}, 200).animate({left: "0px"}, 100);
    if (errors) {
        var testerr = new Array;
        var err = "";

        $.each(errors, function (key, value) {
            if (!in_array(value.error, testerr)) testerr.push(value.error);
        });

        $("#errormsg").html("");
        $.each(errors, function (key, value) {
            var field = curForm.find(':input[name*="_' + value.field + '"],:input[name="' + value.field + '"]');

            if (errors.length > 0) {
                field.addClass('error');
                if (!in_array(value.error, testerr)) testerr.push(value.error);
            }
        });

        for (var i = 0; i < testerr.length; i++) {
            if (testerr[i] == 'EMAIL_NOT_PROVIDED') testerr[i] = 'Email указан не верно';
            if (testerr[i] == 'NAME_NOT_PROVIDED')  testerr[i] = 'Имя указано не верно';
        }

        $("#errormsg").html(testerr.join('<br>'));
    }
}

$(document).ready(
    function () {
        initCounte();
        initSmartLinks();

        initSameWidth();
        initSameHeight();

        WebProfyResizeEvent();

        initForms();

        $(document).on('click', '.ajax-form.is-inited .submit, .ajax-form.is-inited input[type=submit]', function (event) {
            $(this).parents('form').find('input[name="confirm"]').val("");
            $(this).parents('form').submit();
            event.preventDefault();
            return false;
        });
        $(document).on('click, focus', '.ajax-form.is-inited .error', function () {
            $(this).removeClass('error');
            return false;
        });
    }
);

$(function () {
    WebProfyResizeEvent();
});

$(window).resize(
    function () {
        WebProfyResizeEvent();
    }
);

$(window).scroll(
    function () {
        WebProfyScrollEvent();
    }
);

if (window.addEventListener) {
    window.addEventListener('orientationchange',
        function () {
            resizeEvent();
        }
    );
}
