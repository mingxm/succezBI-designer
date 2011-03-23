/**
 * 
 */
 (function($){
 	$.fn.extend({
 		jTable	: function(setting) {
			    var defaultSetting = {
				    defaultRowCount				 : 10,
				    defaultColCount				 : 10,
				    defaultRowHeight	: 24,
				    defaultColWidth		: 72,
				    renderTo				 : $(document.body)
			    }
			    var config = $.extend({}, defaultSetting, setting);
			    var totalWidth = config.defaultColCount * config.defaultColWidth;
			    this.css("width", totalWidth);
			    var tobj = $("<table></table>").addClass("mytable").css("width", totalWidth).appendTo(this);
			    var cg = $("<colgroup></colgroup>").appendTo(tobj);
			    for (var i = 0; i < config.defaultRowCount; i++) {
				    var row = $("<tr></tr>").css("height", 24).appendTo(tobj);
				    for (var j = 0; j < config.defaultColCount; j++) {
					    $("<td></td>").appendTo(row);
					    if (i == 0) {
						    $("<tc></tc>").css("width", config.defaultColWidth).appendTo(cg);
					    }
				    }
			    }
			    tobj.attr("frame", "border");
			    tobj.attr("rules", "all");
		    }
 	})
 })(jQuery);