/**
 * 
 */
 
 (function($){
 	$.fn.layoutTable = function(setting){
 		var defaultConfig = {
 			rowCount:3,
 			colCount:3,
 			hasBorder:false,
 			hasFrame:false
 		}
 		var config = $.extend({},defaultConfig,setting);
 		this.css("padding",0);
 		var tobj = $("<table border='0' cellspacing='0' cellpadding='0'/>").css({
 			height:"100%",
 			width:"100%"
 		}).css("table-layout","fixed").appendTo(this);
 		var arr = [];
 		var _height = this.height();
 		var _width = this.width();
 		arr.push("<thead height='0px'>");
		for(var i=0;i<config.colCount;i++){
			arr.push("<th width='"+_width/config.colCount+"px'/>");
		}
 		for (var i = 0; i < config.rowCount; i++) {
			arr.push("<tr height='"+_height/config.rowCount+"px'>");
			for (var j = 0; j < config.colCount; j++) {
				arr.push("<td width='"+_width/config.colCount+"' style='padding:0;border:1px dotted'/>");
			}
			arr.push("</tr>");
		}
		tobj.html(arr.join(""));
		var lineCol = $("<div/>").addClass("col_change_line").appendTo(this);
		var lineRow = $("<div/>").addClass("row_change_line").appendTo(this);
		var _mousedown = false;
		var onSelectStart = false;
		var state = "";
		
		lineRow.mouseup(function(e){
			updateTable(e);
		})
		lineCol.mouseup(function(e){
			updateTable(e);
		})
		tobj.mousemove(function(e){
			if (!_mousedown) {
				var item = $(e.target);
				if (!item.is("td"))
					return;
				var off = item.offset();
				if (e.clientX - off.left < 4 || (item.width() - (e.clientX - off.left)) < 4) {
					item.css("cursor", "e-resize");
					state = "ew";
				}else if(e.clientY-off.top<4 || (item.height() - (e.clientY-off.top))<4){
					item.css("cursor", "n-resize");
					state = "sn";
				}else{
					item.css("cursor", "default");
					state = "";
				}
			}else {
				if (!onSelectStart) {
					onSelectStart = function() {
						return false
					};
					$("body").css("-moz-user-select","none");
					$("body").bind("selectstart", onSelectStart);
				}
				if(state == "ew"){
					lineCol.offset({
						"left"	: e.pageX
					}).show();
				}else if(state == "sn"){
					lineRow.offset({
						"top":e.pageY
					}).show();
				}
			}
		}).mousedown(function(e){
			_mousedown = true;
			var item = $(e.target);
			var pos = item.offset();
			if(state == "ew"){
				if(e.pageX - pos.left<item.width()/2){
					curCell = item.prev();
				}else {
					curCell = item;
				}
			}else if(state == "sn"){
				if(e.pageY - pos.top<item.height()/2){
					var index = item.attr("cellIndex");
					curCell = item.parent().prev().find("td").eq(index);
				}else{
					curCell = item;
				}
			}else{
				curCell = item;
			}
		}).mouseup(function(e){
			updateTable(e);
		})
		tobj.find("td").dblclick(function(e){
			e.stopPropagation();
			var item = $(e.target);
			if(item.is("td")){
				item.layoutTable();
			}
		});
		
		var updateTable = function(e){
			if(!curCell) return;
			var pos = curCell.offset();
			if(state == "ew"){
				var index = curCell.attr("cellIndex");
				var curTh = tobj.find("th").eq(index);
				var nTh = curTh.next();
				var w = curTh.width();
				var w2 = e.pageX - pos.left;
				var w3 = nTh.width() - w2 + w;
				if(w2>0&&w3>0){
					curTh.css("width",w2);
					nTh.css("width",w3);
				}
				lineCol.hide();
			}else if(state == "sn"){
				var row = curCell.parent();
				var nrow = row.next();
				var h = row.height();
				var h2 = e.pageY - pos.top;
				var h3 = nrow.height() - h2 + h;
				if(h2>0&&h3>0){
					row.css("height",h2);
					nrow.css("height",h3);
				}
				lineRow.hide();
			}
			state = "";
			_mousedown = false;
			curCell = false;
			$("body").unbind("selectstart", onSelectStart);
			$("body").css("-moz-user-select","-moz-all");
			onSelectStart = false;
		}
 	}
 })(jQuery);