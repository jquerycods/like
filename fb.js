/*
 * doc: http://bloggereklentileri.blogspot.com.tr/
 * doc: http://cizgifilmhikayeleri.blogspot.com.tr/
 */
(function ($) {
    "use strict";
    
    $(window).on('keyup', function (event) {
        if (event.keyCode === 27) {
            var data = $('.bepopup').data('bepopup');
            if (data.options.closable) {
                $('.bepopup').bepopup('hide');
            }
        }
    });

    $(document).on('click', '.bepopup', function () {
        var data = $(this).data('bepopup');
        if (data.options.closable) {
            $(this).bepopup('hide');
        }
    });

    $(document).on('click', '.bepopup .bepopup-container', function (event) {
        event.stopPropagation();
    });
    
    $(document).on('click', '[data-dismiss="bepopup"]', function () {
        $(this).parent().parent().parent().bepopup('hide');
    });

    $(document).on('click', '[bepopup-target]', function () {
        $($(this).attr('bepopup-target')).bepopup('show');
    });

    var bepopup = function (element, options) {
        this.options = options;
        this.$element = $(element);
    };

    bepopup.prototype = {
        width: function () {

            
        },
        
        show: function () {
            this.$element.show();
            this.options.onShow();
        },
        
        hide: function () {
            this.$element.hide();
            this.options.onClose();
        },

        isVisible: function () {
            return this.$element.css('visibility') === 'visible' ? true : false;
        },
        
        constructor: function () {
            var _this = this,
                container = this.$element.find('.bepopup-container');
                
            if (this.options.autoOpen) {
                this.show();
            }
            
            if (Number(this.options.width)) {
                container.css({
                    'width':  _this.options.width+'px'
                });
            } else {
                switch (_this.options.width) {
                    case 'small':
                        container.css({'width': '40%'});
                        break;
                    case 'medium':
                        container.css({'width': '75%'});
                        break;
                    case 'full':
                        container.css({'width': '95%'});
                        break;
                }
            }
        }
    };

    var old = $.fn.bepopup;

    $.fn.bepopup = function (option, value) {
        var get = '',
            element = this.each(function () {
                var $this = $(this),
                    data = $this.data('bepopup'),
                    options = $.extend({}, $.fn.bepopup.defaults, option, typeof option === 'object' && option);

                if (!data) {
                    $this.data('bepopup', (data = new bepopup(this, options)));
                    data.constructor();
                }

                if (typeof option === 'string') {
                    get = data[option](value);
                }
            });

        if (typeof get !== 'undefined') {
            return get;
        } else {
            return element;
        }
    };

    $.fn.bepopup.defaults = {
        'closable': true,
        'autoOpen': false,
        'onShow': function () {},
        'onClose': function () {}
    };

    $.fn.bepopup.noConflict = function () {
        $.fn.bepopup = old;
        return this;
    };
})(window.jQuery);