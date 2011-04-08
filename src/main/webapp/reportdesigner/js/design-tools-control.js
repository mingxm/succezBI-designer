/*
 * 该单元主要是控制报表设计器的各种控件
 */
(function($){
	var _owner,
	toolsControler = {};
	
	$.fn.DesignToolsControl = function(owner, setting){
		_owner = owner;
		
		var _container = this;
		var _controls = $("li", _container);
		
		$.extend(_container, {
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
						_container._setSelected(this);												
						return false;
					})				
					/*
				 	 * 绑定鼠标的按下事件，在该事件中还要绑定鼠标的移动事件
				 	 */
					.mousedown(function(){
						var cloneLi = self.clone();
					})
					.dblclick(function(){
						return false;
					})
					.mouseup(function(){
						
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
							"background-color":"#8080ff",
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
		
		_container._initEvent();
		return _container;		
	}	
				
})(jQuery)
