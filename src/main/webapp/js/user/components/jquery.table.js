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
			    var arr = [];
			    var tobj = $("<table></table>").addClass("mytable").css("width", totalWidth).appendTo(this);
			    arr.push("<thead height='20px'>");
			    for(var i=0;i<config.defaultColCount;i++){
			    	arr.push("<th width='"+config.defaultColWidth+"px'>"+int2char(i)+"</th>");
			    }
			    arr.push("</thead>");
			    for (var i = 0; i < config.defaultRowCount; i++) {
			    	arr.push("<tr height='"+config.defaultRowHeight+"px'>");
				    for (var j = 0; j < config.defaultColCount; j++) {
				    	arr.push("<td style='word-break:break-all;'/>")
				    }
				    arr.push("</tr>");
			    }
			    tobj.html(arr.join(""));
			    tobj.attr("frame", "border");
			    tobj.attr("rules", "all");
			    
			    var onSelectStart = false;
			    var lineMove = false;
			    var line = $("<div/>").addClass("col_change_line").appendTo(this);
			    var onMouseMove = function(event) {
				    if (lineMove) {
					    $("body").css("-moz-user-select", "none");
					    line.offset({
						        "left"	: event.pageX
					        }).show();
				    }
			    }
			    
			    var onMouseUp = function(event) {
				    if (lineMove) {
					    line.hide();
					    lineMove = false;
					    var pos = currTh.offset();
					    var index = currTh.prevAll().length;
					    currTh.width(event.clientX - pos.left);
					    $("body").css("-moz-user-select", "-moz-all");
				    }
			    }

			    this.find("th").bind({
				        "mousemove"	: function(event) {
				        	if (!lineMove) {
						        var th = $(this);
						        if (th.prevAll().length <= 1 || th.nextAll().length < 1) {
							        return;
						        }
						        var left = th.offset().left;
						        if (event.clientX - left < 4 || (th.width() - (event.clientX - left)) < 4) {
							        th.css("cursor", "e-resize");
						        }
						        else if (!lineMove) {
							        th.css("cursor", "default");
						        }
					        }
					        else {
					        	if (!onSelectStart) {
							        onSelectStart = function() {
								        return false
							        };
							        $("body").css("-moz-user-select","none");
							        $("body").bind("selectstart", onSelectStart);
						        }
						        line.offset({
							            "left"	: event.pageX
						            }).show();
					        }
				        },
				        "mousedown"	: function(event) {
					        var th = $(this);
					        if (th.prevAll().length <= 1 | th.nextAll().length < 1) {
						        return;
					        }
					        var pos = th.offset();
					        if (event.clientX - pos.left < 4 || (th.width() - (event.clientX - pos.left)) < 4) {
						        var height = th.parent().parent().height();
						        lineMove = true;
						        if (this.setCapture) {
							        this.setCapture();
						        }
						        else {
						        	$("body").bind({
						        		"mousemove":onMouseMove,
						        		"mouseup":onMouseUp
						        	});
						        }
						        if (event.clientX - pos.left < th.width() / 2) {
							        currTh = th.prev();
						        }
						        else {
							        currTh = th;
						        }
					        }
				        },
				        "mouseup"		: function(event) {
					        if (lineMove == true) {
						        line.hide();
						        lineMove = false;
						        var pos = currTh.offset();
						        var index = currTh.prevAll().length;
						        currTh.width(event.clientX - pos.left);
						        if (this.releaseCapture) {
							        this.releaseCapture();
						        }else {
						        	$("body").unbind({
						        		"mousemove":onMouseMove,
						        		"mouseup":onMouseUp
						        	});
						        }
						        $("body").unbind("selectstart", onSelectStart);
						        $("body").css("-moz-user-select","-moz-all");
						        onSelectStart = false;
					        }
				        }
			        });

		    }
	    });
 	function int2char(i){
 		var arr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
 		var r = "";
 		var p = Math.floor(i/26);
 		var k = i % 26;
 		r = arr[k] + r;
 		while(p != 0){
 			i = p;
 			p = Math.floor(i/26);
 		 	k = i % 26;
 			r = arr[k] + r;
 		}
 		return r;
 	}
 })(jQuery);