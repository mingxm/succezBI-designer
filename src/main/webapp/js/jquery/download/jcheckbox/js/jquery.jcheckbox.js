/// <reference path="jquery.js"/>
/*
* jcheckbox
* version: 1.0.0 (05/13/2009)
* @ jQuery v1.2.*
*
* Licensed under the GPL:
*   http://gplv3.fsf.org
*
* Copyright 2008, 2009 Jericho [ thisnamemeansnothing[at]gmail.com ] 
*  usage:
*  $('[CHECKBOX]').jCheckbox({
*      //parameters
*   });
*/
(function($) {
$.fn.jCheckbox = function(opts) {
    var ps = $.fn.extend({
        normalcssName: 'sp_xjCheckBox',
        hovercssName: 'sp_xjCheckBox_H',
        checkedcssName: 'sp_xjCheckBox_C',
        plugCss: {},
        maxlength: 10,
        onChange: null
    }, opts);
    function chkAdapter(target, item) {
        if ((target).attr('checked')) {
            item.attr('class', ps.normalcssName + ' ' + ps.checkedcssName);
        }
        else {
            item.attr('class', ps.normalcssName);
        }
    }
    return this.each(function(i) {
        var target = $(this);
        var item = $('<span />').insertAfter(this).attr({
            'id': target.attr('id') || 'xjcheckbox_' + i,
            'class': ps.normalcssName
        }).html(target.attr('text').cut(ps.maxlength))
            .css(ps.plugCss)
                .attr('title', target.attr('title') == '' ? target.attr('text') : target.attr('title'))
                  .attr('value', target.attr('value'))
                    .attr('checked', target.attr('checked') || false);
        chkAdapter(target, item);
        item.attr('target', target);
        target.css('display', 'none');
        item.hover(function() {
            $(this).attr('class', ps.normalcssName + ' ' + (eval('(' + $(this).attr('checked') + ')') ? ps.checkedcssName : ps.hovercssName));
        }, function() {
            $(this).attr('class', ps.normalcssName + ' ' + (eval('(' + $(this).attr('checked') + ')') ? ps.checkedcssName : ps.normalcssName));
        }).mousedown(function(e) {
            target.attr('checked', !target.attr('checked'));
            $(this).attr('checked', target.attr('checked'));
            chkAdapter(target, item);
            if (ps.onChange != null) {
                ps.onChange(target);
            }
        });
        chkAdapter(target, item);
        if (!target.attr('checked')) {
            item.css(ps.normalcssName);
        }
    });
};
})(jQuery);