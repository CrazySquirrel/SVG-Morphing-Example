var Logotype = new (function () {
    this.logotypeMorphingScheme = [
        {
            "#logotype-kokoc-1": "#logotype-webprofy-1",
            "#logotype-kokoc-2": "#logotype-webprofy-5",
            "#logotype-kokoc-3": "#logotype-webprofy-3",
            "#logotype-kokoc-4": "#logotype-webprofy-2",
            "#logotype-kokoc-5-1": "#logotype-webprofy-10",
            "#logotype-kokoc-5-2": "#logotype-webprofy-11",
            "#logotype-kokoc-6": "#logotype-webprofy-4",
            "#logotype-kokoc-7": "#logotype-webprofy-6",
            "#logotype-kokoc-8": "#logotype-webprofy-7",
            "#logotype-kokoc-9": "#logotype-webprofy-8",
            "#logotype-kokoc-10-1": "#logotype-webprofy-9",
            "#logotype-kokoc-10-2": "#logotype-webprofy-12",
            "#logotype-kokoc-11": "#logotype-webprofy-13",
            "#logotype-kokoc-12": "#logotype-webprofy-14"
        },
        {
            "#logotype-webprofy-7": "#logotype-projects-1",
            "#logotype-webprofy-8": "#logotype-projects-2",
            "#logotype-webprofy-9": "#logotype-projects-3",
            "#logotype-webprofy-10": "#logotype-staff-1",
            "#logotype-webprofy-11": "#logotype-staff-2",
            "#logotype-webprofy-12": "#logotype-rating-1",
            "#logotype-webprofy-13": "#logotype-experience-1",
            "#logotype-webprofy-14": "#logotype-experience-2",
            "#logotype-webprofy-5": "#logotype-projects-4",
            "#logotype-webprofy-4": "#logotype-staff-3",
            "#logotype-webprofy-2": "#logotype-rating-2",
            "#logotype-webprofy-3": "#logotype-rating-3",
            "#logotype-webprofy-6": "#logotype-rating-4",
            "#logotype-webprofy-1": "#logotype-experience-3"
        },
        {
            "#logotype-projects-1": "#logotype-projects-text-1",
            "#logotype-projects-2": "#logotype-projects-text-1",
            "#logotype-projects-3": "#logotype-projects-text-1",
            "#logotype-projects-4": "#logotype-projects-text-2",
            "#logotype-staff-1": "#logotype-staff-text-1",
            "#logotype-staff-2": "#logotype-staff-text-1",
            "#logotype-staff-3": "#logotype-staff-text-2",
            "#logotype-rating-1": "#logotype-rating-text-1",
            "#logotype-rating-2": "#logotype-rating-text-2",
            "#logotype-rating-3": "#logotype-rating-text-2",
            "#logotype-rating-4": "#logotype-rating-text-2",
            "#logotype-experience-1": "#logotype-experience-text-1",
            "#logotype-experience-2": "#logotype-experience-text-1",
            "#logotype-experience-3": "#logotype-experience-text-2"
        }
    ];
    this.logotypeMorphing = [];
    for (var x in this.logotypeMorphingScheme) {
        if (this.logotypeMorphingScheme.hasOwnProperty(x)) {
            this.logotypeMorphing[x] = [];
            for (var y in this.logotypeMorphingScheme[x]) {
                if (this.logotypeMorphingScheme[x].hasOwnProperty(y)) {
                    this.logotypeMorphing[x].push(
                        new TweenLite.to(y, 1,
                            {
                                morphSVG: {
                                    shape: this.logotypeMorphingScheme[x][y]
                                }
                            }
                        )
                    );
                }
            }
        }
    }
    this.scrollEvent = function () {
        var scrollTop = getDocumentScroll();
        var firstSlider = $(".page-slide.is-slide-1");
        var firstSliderHeight = firstSlider.height();
        var firstSliderHeight01 = firstSliderHeight / 5;
        if ($("html").is(".no-touch")) {
            firstSliderHeight01 = firstSliderHeight / 5;
        } else {
            firstSliderHeight01 = firstSliderHeight / 20;
        }
        var changedIndex = scrollTop / firstSliderHeight01;
        changedIndex = changedIndex > 1 ? 1 : changedIndex;
        changedIndex = changedIndex < 0 ? 0 : changedIndex;
        for (var i = 0; i < this.logotypeMorphing[0].length; i++) {
            this.logotypeMorphing[0][i].progress(changedIndex).pause();
        }
        firstSlider.css({
            "background": "rgb(" + Math.round(208 * (1 - changedIndex) + 27 * changedIndex) + "," + Math.round(20 * (1 - changedIndex) + 31 * changedIndex) + "," + Math.round(25 * (1 - changedIndex) + 39 * changedIndex) + ")"
        });

        if (changedIndex == 1) {
            $("#logotype-webprofy").css({"opacity": 1});
        } else {
            $("#logotype-webprofy").css({"opacity": 0});
        }

        changedIndex = (scrollTop - firstSliderHeight01 * 2) / firstSliderHeight01;
        changedIndex = changedIndex > 1 ? 1 : changedIndex;
        changedIndex = changedIndex < 0 ? 0 : changedIndex;

        for (var i = 0; i < this.logotypeMorphing[1].length; i++) {
            this.logotypeMorphing[1][i].progress(changedIndex).pause();
        }

        if (changedIndex == 1) {
            $("#logotype-achievements").css({"opacity": 1});
        } else {
            $("#logotype-achievements").css({"opacity": 0});
        }

        changedIndex = (scrollTop - firstSliderHeight01 * 4) / firstSliderHeight01;
        changedIndex = changedIndex > 1 ? 1 : changedIndex;
        changedIndex = changedIndex < 0 ? 0 : changedIndex;

        for (var i = 0; i < this.logotypeMorphing[2].length; i++) {
            this.logotypeMorphing[2][i].progress(changedIndex).pause();
        }
        if ($("html").is(".no-touch")) {
            if (scrollTop < firstSliderHeight01 * 6) {
                $(".page").css({
                    "padding-top": firstSliderHeight01 * 6
                });
                firstSlider.css({
                    "position": "fixed",
                    "margin-top": 0
                });
            } else {
                $(".page").css({
                    "padding-top": 0
                });
                firstSlider.css({
                    "position": "relative",
                    "margin-top": Math.min(scrollTop, firstSliderHeight01 * 6)
                });
            }
        }
    }
});

var Advantages = new (function () {
    this.animationData = [];
    this.pointAnimation;
    this.pointIndex = 0;
    this.progressAnimation;

    this.scrollEvent = function () {
        var scrollTop = getDocumentScroll();
        var secondSlider = $(".page-slide.is-slide-2");
        var secondSliderOffsetTop = secondSlider.offset().top;
        var secondSliderHeight = secondSlider.height();
        var windowHeight = getWindowHeight();
        var changedIndex = (scrollTop - secondSliderOffsetTop + windowHeight * 0.5) / 100;
        changedIndex = changedIndex > 1 ? 1 : changedIndex;
        changedIndex = changedIndex < 0 ? 0 : changedIndex;

        $("#advantages__point").attr({
            "r": Math.round(20 * changedIndex)
        });

        if (this.pointAnimation && changedIndex == 1) {
            do {
                this.pointAnimation.progress(this.pointIndex).pause();
                this.pointIndex += 0.001;
            } while ($("#advantages__point").offset().top - scrollTop - windowHeight * 0.5 < 0.501 && this.pointIndex < 1);
            do {
                this.pointAnimation.progress(this.pointIndex).pause();
                this.pointIndex -= 0.001;
            } while ($("#advantages__point").offset().top - scrollTop - windowHeight * 0.5 > 0.499 && this.pointIndex > 0 && $("#advantages__point").offset().top - $("#advantages__bg").offset().top > 0);


            $("#advantages__clip rect").attr({
                "height": scrollTop - secondSliderOffsetTop + windowHeight * 0.5 + 20
            });

            $(".advantages-block__item-description").each(
                function () {
                    var item = $(this);
                    var itemOffsetTop = item.offset().top;
                    var itemHeight = item.height();
                    var _changedIndex = (scrollTop - itemOffsetTop + windowHeight * 0.5) / itemHeight;
                    _changedIndex = _changedIndex > 1 ? 1 : _changedIndex;
                    _changedIndex = _changedIndex < 0 ? 0 : _changedIndex;
                    item.css({
                        "opacity": _changedIndex
                    });
                }
            );

            secondSlider.css({
                "background": "rgb(" + Math.round(27 * (1 - this.pointIndex) + 48 * this.pointIndex) + "," + Math.round(31 * (1 - this.pointIndex) + 57 * this.pointIndex) + "," + Math.round(39 * (1 - this.pointIndex) + 74 * this.pointIndex) + ")"
            });
        }
    }
    this.resizeEvent = function () {
        $("#advantages").attr({
            "viewBox": "0 0 " + $(".advantages-block").width() + " " + (100 + $(".advantages-block").height())
        }).css({
            "width": $(".advantages-block").width(),
            "height": $(".advantages-block").height() + 100
        });
        var advantagesTop = $(".advantages-block").offset().top;
        var path = "";
        var i = -1;

        $("#advantages__point").attr({
            "cx": "0",
            "cy": "0",
            "r": "0"
        });

        var advantagesWidth = $(".advantages-block").width();

        path += "M" + (advantagesWidth * 0.5) + "," + Math.round($(".advantages-block__item:first").offset().top - advantagesTop - 75) + " Q" + (advantagesWidth * 0.5) + "," + Math.round($(".advantages-block__item:first").offset().top - advantagesTop - 50) + " " + (advantagesWidth * 0.5) + "," + Math.round($(".advantages-block__item:first").offset().top - advantagesTop) + "";

        $(".advantages-block__item").each(
            function () {
                path += "M" + (advantagesWidth * 0.5) + "," + Math.round($(this).offset().top - advantagesTop) + " Q" + Math.round((advantagesWidth * 0.5) / 48 * (50 + 10 * i)) + "," + Math.round($(this).offset().top - advantagesTop + $(this).height() * 0.1) + " " + Math.round((advantagesWidth * 0.5) / 48 * (50 + 10 * i)) + "," + Math.round($(this).offset().top - advantagesTop + $(this).height() * 0.25) + "";
                path += "M" + Math.round((advantagesWidth * 0.5) / 48 * (50 + 10 * i)) + "," + Math.round($(this).offset().top - advantagesTop + $(this).height() * 0.25) + " Q" + Math.round((advantagesWidth * 0.5) / 48 * (50 + 10 * i)) + "," + Math.round($(this).offset().top - advantagesTop + $(this).height() * 0.50) + " " + Math.round((advantagesWidth * 0.5) / 48 * (50 + 10 * i)) + "," + Math.round($(this).offset().top - advantagesTop + $(this).height() * 0.75) + "";
                path += "M" + Math.round((advantagesWidth * 0.5) / 48 * (50 + 10 * i)) + "," + Math.round($(this).offset().top - advantagesTop + $(this).height() * 0.75) + " Q" + Math.round((advantagesWidth * 0.5) / 48 * (50 + 10 * i)) + "," + Math.round($(this).offset().top - advantagesTop + $(this).height() * 0.90) + " " + (advantagesWidth * 0.5) + "," + Math.round($(this).offset().top - advantagesTop + $(this).height()) + "";
                i *= -1;
            }
        );

        path += "M" + (advantagesWidth * 0.5) + "," + Math.round($(".advantages-block__item:last").offset().top + $(".advantages-block__item:last").height() - advantagesTop) + " Q" + (advantagesWidth * 0.5) + "," + Math.round($(".advantages-block__item:last").offset().top + $(".advantages-block__item:last").height() - advantagesTop + 50) + " " + (advantagesWidth * 0.5) + "," + Math.round($(".advantages-block__item:last").offset().top + $(".advantages-block__item:last").height() - advantagesTop + 75) + "";

        $("#advantages__bg").attr("d", path);
        $("#advantages__progress").attr("d", path);

        var bezierData = MorphSVGPlugin.pathDataToRawBezier("#advantages__bg");
        this.animationData = [{x: (advantagesWidth * 0.5), y: 181}];
        for (var x = 0; x < bezierData.length; x++) {
            for (var y = 0; y < bezierData[x].length; y += 2) {
                this.animationData.push({"x": bezierData[x][y], "y": bezierData[x][y + 1]});
            }
        }

        this.pointAnimation = new TweenMax.to(document.getElementById("advantages__point"), 1, {bezier: {values: this.animationData}}).pause();

        Advantages.scrollEvent();
    };
});

$(window).scroll(
    function () {
        Logotype.scrollEvent();
        Advantages.scrollEvent();
    }
);

$(window).resize(
    function () {
        Advantages.resizeEvent();
    }
);

$(document).ready(
    function () {
        $(window).resize();
        $(window).scroll();

        $(".cstiles").CSTiles({
            "autoClone": false,
            "padding": 10,
            size: [4, "auto"],
            adaptivSize: {
                "big-desktop": [6, "auto"],
                "desktop": [4, "auto"],
                "tablet": [3, "auto"],
                "phone-landscape": [2, "auto"],
                "phone": [1, "auto"]
            },
        });

        $("body,html").animate({"scrollTop": "1"}, 1);

        //$("body,html").animate({"scrollTop":getDocumentHeight()},getDocumentHeight()*10);
    }
);

if (window.addEventListener) {
    window.addEventListener('orientationchange',
        function () {
            Advantages.resizeEvent();
        }
    );
}
