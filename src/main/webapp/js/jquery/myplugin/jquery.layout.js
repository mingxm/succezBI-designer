/**
 * 
 */
 (function($){
 	$.fn.layoutPanel = function(setting){
 		var defaultConfig = {
 			vert:true,
 			splitClass:"splitclass",
 			splitWidth:3,
 			splitHeight:3
 		}
 		var config = $.extend({},defaultConfig,setting);
 		var height = this.height();
 		var width = this.width();
 		if(config.vert){
 			var topPanel = $("<div/>").addClass("toppanel_v").appendTo(this);
 			var splitPanel = $("<div/>").css({
 				height:config.splitHeight,
 				top:height*0.5,
 				width:"100%",
 				cursor:"n-resize",
 				position:"absolute"
 			}).addClass(config.splitClass).appendTo(this);
 			var bottomPanel = $("<div/>").addClass("bottompanel_v").css({
 				top:height*0.5+config.splitHeight,
 				height:height*0.5-config.splitHeight
 			}).appendTo(this);
 		}else{
 			var topPanel = $("<div/>").addClass("toppanel_h").appendTo(this);
 			var splitPanel = $("<div/>").css({
 				width:config.splitWidth,
 				left:width*0.5,
 				height:"100%",
 				cursor:"e-resize",
 				position:"absolute"
 			}).addClass(config.splitClass).appendTo(this);
 			var bottomPanel = $("<div/>").addClass("bottompanel_h").css({
 				left:width*0.5+config.splitWidth,
 				height:width*0.5-config.splitWidth
 			}).appendTo(this);
 		}
 		var drag = false;
 		splitPanel.mousedown(function(e){
 			drag = true;
 		});
 		this.mousemove(function(e){
 			if(!drag) return;
 			if (config.vert) {
				splitPanel.offset({
					"top"	: e.clientY
				});
			}
			else {
				splitPanel.offset({
					"left"	: e.clientX
				});
			}
 		})
 		var _self = this;
 		var update = function(){
 			var p = splitPanel.position();
 			var h = _self.height();
 			var w = _self.width();
 			if (config.vert) {
				topPanel.css("height", splitPanel.css("top"));
				bottomPanel.css("height", h - p.top - config.splitHeight);
			}else{
				topPanel.css("width", splitPanel.css("left"));
				bottomPanel.css("width", w - p.left - config.splitWidth);
			}
 		}
 		this.mouseup(function(e){
 			if(!drag) return;
 			drag = false;
 			if(config.vert){
 				splitPanel.offset({
 					"top":e.clientY
 				});
 				bottomPanel.offset({
 					"top":e.clientY+config.splitHeight
 				})
 			}else{
 				splitPanel.offset({
 					"left":e.clientX
 				});
 				bottomPanel.offset({
 					"left":e.clientX+config.splitWidth
 				})
 			}
 			update();
 		});
 		return{
 			top:topPanel,
 			bottom:bottomPanel
 		}
 	}
 })(jQuery);