/*
 * 该单元主要是控制报表设计器的各种控件
 */
(function($){
	var _owner,
	toolsControler = {};
	
	$.fn.DesignToolsControl = function(owner, setting){
		_owner = owner;
		
		var _container = this,
		    _controls = $("li", _container),
		    _toolContainer =$("<div id = 'toolContainer'><ul><li>tool container</li></ul></div>"),
			controlMoved = false,
			divLayOutCenter = $(".ui-layout-center",document.body),
			divLayOutWest = $(".ui-layout-west",document.body),
			offsetX = 10,
			offsetY = 10;

			
		
		$.extend(_container, {
			_init:function(){
				//设置工具容器位于最上方，从而可以显示出来
				_toolContainer.css({"position":"absolute","z-index":"999","width":"","height":"","left":"100px","top":"100px","filter":"alpha(opacity=90)","opacity":"0.9"}); 
				//初始化的时候同时初始化所需的容器
				_toolContainer.appendTo(document.body);
				_toolContainer.hide();			
			},
			/*
			 * 初始化绑定事件
			 */
			_initEvent: function(){
				_controls.each(function(){
					var self = $(this);
					self.hover(function(){
						//当控件本身处于选取状态的时候，不能清除其背景色
						if (self.hasClass("active")) return;
						self.css("background-color","#ccc");
					}, function(){
						if (self.hasClass("active")) return;
						self.css("background-color","#fff");
					}).click(function(){
						return false;												
					})				
					/*
				 	 * 绑定鼠标的按下事件，在该事件中还要绑定鼠标的移动事件
				 	 */
					.mousedown(function(event){
						var mousedownPoint = {x:event.pageX,y:event.pageY};												
						_container._setSelected(this);	
						var cloneLi = self.clone();	
						cloneLi.css({
							"background-color": "#ccc",
							"color": "#ccc",
							"width":"150px",
							"background-position":mousedownPoint.x,
							"border":"2px solid #cacaff"
						});											
						$("#toolContainer").find("li").replaceWith(cloneLi);
						$(document).bind("mousemove.toolContainer",function(event){
							//光标移动一定的距离的情况下才认为要添加控件
							if ((Math.abs(mousedownPoint.x - event.pageX) >20) || (Math.abs(mousedownPoint.y - event.pageY)>20))
							{
								_toolContainer.show("fast");
								controlMoved =true;
							}
							_toolContainer.css("left",event.pageX-mousedownPoint.x);
							_toolContainer.css("top",event.pageY-8);
						}).bind("mouseup.toolContainer",function(event){
							_toolContainer.hide("fast");
							$(this).unbind(".toolContainer");
							if (controlMoved) {
								controlMoved = false;
								var topLeft = divLayOutCenter.offset(),
									right = topLeft.left + divLayOutCenter.width(),
									bottom = topLeft.top + divLayOutCenter.height();
								if ((event.pageX > topLeft.left) && (event.pageX < right) && (event.pageY > topLeft.top) && (event.pageY < bottom)) {
									_owner.addComponent(self.attr("objName"),{
										x:event.pageX-divLayOutWest.width()+15,
										y:event.pageY-8
									});
								}
							}
						});							
					})
					.dblclick(function(){
						_owner.addComponent(self.attr("objName"),{
							x : offsetX,
							y : offsetY							
						})
						offsetX +=10;
						offsetY +=10;
						$("#accordion1").show();
						return false;
					})
					.bind("selectstart",function(){
						return false;
					});					
				});
			},
			/*
		 	 * 当该控件失去叫焦点的时候，应该清除选择状态
		 	 */
			_lostFocus: function(){
				
			},
			/*
		 	 * 获取当前选择的控件
		 	 */
			_getSelected: function(){
				return $('.active', _container);
			},
			/*
		 	 * 获取当前被选中控件对象的名称，依据该名称可以创建对象
			 */
			_getSelectedObjName: function(obj){
				var name;
				if (obj==undefined)
				{
					name =_container._getSelected().attr("objName");
				}else {
					name = $(obj).attr("objName");
				}
				return name;
			},
			/*
			 * 设置该控件为选中状态，必须传入表示控件的<li>对象
			 */
			_setSelected:function(control){
				if (control==undefined) return;
				if (_container._getSelectedObjName() != _container._getSelectedObjName(control)) 
				{
					_container._clearSelected();
				}																						
				$(control).css({
							"background-color":"#8080FF",
							"border":"1px,solid,#000"
						});
				$(control).addClass("active");				
			},
			_clearSelected:function(){
				var currentControl = _container._getSelected();
				if (currentControl != "undefined") 
				{
					$(currentControl).removeClass("active");
					$(currentControl).css({"border":"","background-color":""});
				};				
			}
			
		});
		
		_container._init();
		_container._initEvent();
		return _container;		
	}	
				
})(jQuery)
