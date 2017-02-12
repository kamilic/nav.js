Nav = (function ($) {

    function NavController(config) {
        this.config = config;
        this.$obj = $(config.navClassName);
    }

    return {
        init: function (settings) {
            if (!settings) {
                settings = {};
            }

            var config = {
                    // Specifying the className added in nav item when user's visible area is scrolled to predefined position or user clicked nav_item by Nav.js.
                    navActiveClassName: settings.navActiveClassName || "active",
                    // Defined the className of each nav_item element, this value MUST be equal to the nav_item elements in your HTML files.
                    // Otherwise Nav.js will not run successfully because of failing to search nav_items.
                    navItemClassName: settings.navItemClassName || "nav_item",
                    // You MUST specify your nav_items "data-" attributes.
                    // It helps Nav.js to find your nav_items and provide position to callback function ${onNavClick} ,
                    // Also to activate the nav_item when visible area is scrolled to defined position or user clicked nav_item.
                    targetAttr: settings.targetAttr || "target",
                    // Your nav element className
                    navClassName: settings.navClassName || "nav",

                    // In most of situation, web page will scroll to predefined position when user's click on nav_item.
                    autoScroll: settings.autoScroll || false,
                    // Similarly, nav_item will be highlighted when user's visible viewport scroll to your predefined position.
                    // 是否采用内部自带的滚动高亮检测
                    autoScrollDetect: settings.autoScrollDetect || false,
                    // but, if you want to use the two functions above. you Must define "data-attr" using "css-selector".
                    // example : <div class = "nav_item" data-target=".my-target1"/>my nav button 1</div>
                    // Nav.js will calculate the position of your defined positions automatically.
                    // 如果采用，必须提供一个类的对象
                    detectionLine: settings.detectionLine || 0.4,
                    detectionInterval: settings.detectionInterval || 50,
                    // In some situation , you won't use these two functions.
                    // (example : I want a nav for slide.
                    //            I want slide jump to slide-number2 when user's click the nav-item 2.)
                    // Now you can set "data-attr" in nav_items, shut off these useless functions above.(use default)
                    // Defined the callback function $(onNavClick) , it will provide param which is the predefined "data-attr" for you.
                    onNavClick: settings.onNavClick || new Function(),
                    // IN DESTRUCTION.
                    useCustomDetector: settings.useCustomDetector || false,
                    onCustomDetectorRegister: settings.onCustomDetectorRegister || new Function()

                },
                nav = $(getClassSelector(config.navClassName)),
                ontime = true; //用于延迟检测。

            function getClassSelector(className) {
                return "." + className;
            }

            function scroll(targetValue) {
                // var visibleTop = $(window).height();
                if (/chrome|iphone|MicroMessager|android/i.test(navigator.userAgent)) {
                    $(document.body).animate({scrollTop: $(targetValue).offset().top}, 1000);
                } else {
                    $(document.documentElement).animate({scrollTop: $(targetValue).offset().top}, 1000);
                }
            }

            function getAllOffsetTop() {
                config.autoScrollSet = {};
                var windowHeight = $(window).height(),
                    domList = $(getClassSelector(config.navItemClassName)),
                    list = config.autoScrollSet;

                $.each(domList, function (i, v) {
                    try {
                        var selector = $(v).data(config.targetAttr).toString(),
                            top = Math.floor($(selector).offset().top - (windowHeight * config.detectionLine));
                        list[selector] = top < 0 ? 0 : top;
                    }
                    catch (e) {
                        console.error("Navjs : It seems that the provided selector in data-attr doesn't match any of elements in this document.");
                        console.error("Original error(s) : " + e);
                    }
                });
            }

            function getPos(list, top) {
                var temp = 0,
                    result = null;
                $.each(list, function (index, value) {
                    if (value < top) {
                        temp = Math.max.apply(null, [temp, value]);
                        // temp等于value意味着value是最大值，把index赋予result,否则不管。
                        result = temp === value ? index : result;
                    }
                });
                return result;
            }

            function activeNav($target) {
                var activeClassName = config.navActiveClassName;
                $(getClassSelector(config.navClassName) + " " + getClassSelector(activeClassName)).removeClass(activeClassName);
                $target.addClass(activeClassName);
            }

            function activator(id) {
                activeNav($(getClassSelector(config.navClassName) + " "
                    + getClassSelector(config.navItemClassName)
                    + '[' + 'data-' + config.targetAttr + '=\"' + id + '\"]'));
            }

            function registerScrollDetector() {
                $(window).on("scroll", function () {
                    if (ontime) {
                        var $window = $(window);
                        var top = $window.scrollTop(),
                            id = getPos(config.autoScrollSet, top);
                        activator(id);
                        ontime = false;
                        setTimeout(function () {
                            ontime = true;
                        }, 30);
                    }
                })
            }

            function registerClick() {
                nav.click(function (e) {
                    var target = e.target || window.event.target,
                        $target = $(target);
                    if (!$target.hasClass(config.navClassName)) {
                        if (!$target.hasClass(config.navItemClassName)) {
                            $target = $target.parent(getClassSelector(config.navItemClassName));
                        }

                        if ($target.length == 0 || $target.hasClass(config.navActiveClassName)) {
                            return;
                        }

                        // data-target 的值
                        var targetValue = $target.data(config.targetAttr);
                        if (targetValue !== undefined && targetValue !== "") {

                            if (config.onNavClick.call(null, targetValue)) {
                                return;
                                // callback
                            }
                            if (config.autoScroll) {
                                scroll(targetValue);
                            }

                        }
                        return false;
                    }
                    return true;
                });
            }

            function init() {
                registerClick();

                if (config.autoScroll || config.autoScrollDetect) {
                    getAllOffsetTop();
                }

                if (config.autoScrollDetect) {
                    registerScrollDetector();
                }

                if (config.useCustomDetector) {
                    try {
                        config.onCustomDetectorRegister(activator);
                    } catch (e) {
                        console.error(e);
                    }
                }
            }

            init();

            return new NavController(config);
        }
    }

})(jQuery);