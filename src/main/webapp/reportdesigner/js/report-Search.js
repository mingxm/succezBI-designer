/*
 * 该单元处理设计器内部的查找替换
 */
(function($){
	var _owner = {},
		ignoreCase = false,
		wholeWordsOnly = false,
		generateTree = false,
		//下面数组用来记录用户输入的Find和Replace历史值，当然该值并不保存到硬盘
		findArr = [],
		replaceArr = [],
		//下拉框最多显示的备选项的条数
		itemNuber = 10;
		
	$.fn.szSearch =function(owner,option){
		_owner = owner;
				
		var searchPlugin = this,
			_findSelect = $("#findSelect",searchPlugin),
			_replaceSelect = $("#replaceSelect", searchPlugin),
			_findInput = $("#findInput",searchPlugin),
			_replaceInput = $("#replaceInput",searchPlugin);
		
		$.extend(searchPlugin,{
			_initEvent:function(){
				$(searchPlugin).bind("selectstart",function(){
						return false;
				});	
				$("#searchClose",searchPlugin).click(function(e){
					searchPlugin._hide();
				});
				$("#szFind",searchPlugin).click(function(e){
					searchPlugin._getOption();
					var exp = _synchWithSelect(_findInput,findArr,_findSelect);
					_find(exp);
				});
				$("#szReplace",searchPlugin).click(function(e){
					searchPlugin._getOption();
					var exp = _synchWithSelect(_replaceInput,replaceArr,_replaceSelect);
					_replace(exp);
				});
				$("#szReplaceAll",searchPlugin).click(function(e){
					searchPlugin._getOption();
					_replaceAll();
				});
				$(".title",searchPlugin).mousedown(function(e){
					var _parentDiv = $(this).parent(); 
						_x = _parentDiv.offset().left,
					    _y = _parentDiv.offset().top,
						mousedownPoint = {x:e.pageX,y:e.pageY};
 					$(document).bind("mousemove.reportSearch",function(e){
						_parentDiv.css("left",_x+(e.pageX-mousedownPoint.x));
						_parentDiv.css("top",_y+(e.pageY-mousedownPoint.y));	
					}).bind("mouseup.reportSearch",function(){
						$(this).unbind(".reportSearch")
					});
				});
			},
			/*
			 * 将查询的结果以树状形式返回，然后另一个控件“查询结果树”可以据
			 * 此构造树形结构
			 */
			getResultTree:function(){
				return false;				
			},
			_getOption:function(){
				ignoreCase = $("#szIgnoreCase",searchPlugin).attr("checked");
				wholeWordsOnly = $("#szWholeWords",searchPlugin).attr("checked");
				generateTree = $("#szGenerateTree",searchPlugin).attr("checked");
			},
			_show:function(){
				searchPlugin.css("z-index","100");	
			},
			_hide:function(){
				searchPlugin.css("z-index","-1");
			}			
		});	
		
		searchPlugin._initEvent();
		return searchPlugin;
		
		function _find(value){
			//To-do
		};		
		
		function _replace(value){
			//To-do
		};
		
		function _replaceAll(option){
		};
		
		function _generateTree(option){
			if (!generateTree) return;	
		};
		
		//字符串数组是否包含字符元素
		function _isInStrArr(str,strArr){
			for (var i =0;i<strArr.length;i++){
				if (strArr[i] == str) return true;
			}
			return false;
		}
		
		function _synchWithSelect(InputDom,Arr,selectDom){
			var value = InputDom.attr("value");
			if (!_isInStrArr(value, Arr)) {
				Arr.push(value);
				selectDom.prepend($("<option value =" + value + ">" + value + "</option>"));
				selectDom.attr("value",value);
				if (Arr.length > itemNuber) {
					selectDom.find("option:last").remove();
				};
			};
			return value;
		};	
	};
})(jQuery)
