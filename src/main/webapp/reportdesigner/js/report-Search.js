/*
 * 该单元处理设计器内部的查找替换
 */
(function($){
	var _owner = {},
		//选项配置
		ignoreCase = false,
		wholeWordsOnly = false,
		//是否构造树形结构来展示查询的结果
		generateTree = false,
		//下面数组用来记录用户输入的Find和Replace历史值，当然该值并不保存到硬盘
		findArr = [],
		replaceArr = [],
		//找到了的字符串所在表元的位置值会被变为数组存储起来，currentPos是指向数组的指针
		currentPos = 0,
		allResultPos = [],
		//下拉框最多显示的备选项的条数
		itemNuber = 10,
		preBkcolor = '';
		
	$.fn.szSearch =function(owner,option){
		_owner = owner;
				
		var searchPlugin = this,
			_findSelect = $("#findSelect",searchPlugin),
			_replaceSelect = $("#replaceSelect", searchPlugin),
			_findInput = $("#findInput",searchPlugin),
			_replaceInput = $("#replaceInput",searchPlugin);
		
		$.extend(searchPlugin,{
			_initEvent:function(){
				$("#szSearchNext",searchPlugin).click(function(e){
					_next();
				});
				$("#szSearchPrev",searchPlugin).click(function(e){
					_pre();
				})
				$("#searchClose",searchPlugin).click(function(e){
					searchPlugin._hide();
				});
				$("#szFind",searchPlugin).click(function(e){
					searchPlugin._getOption();
					var exp = _findInput.attr("value");
					if (exp =='') return;
					_find(exp);
					if (allResultPos.length > 0) {
						_synchWithSelect(exp, findArr, _findSelect);
					}
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
		
		function _find(str)
		{
			//首先清空存储查询结果的数组
			allResultPos.length = 0;
			currentPos = 0;
			var _cells = {},
				_count = 0;
			if (_owner.tables.len > 0) {
				//首先查找表体内的表元的内容和属性
				for (var key in _owner.tables.elements) {
					_cells = _owner.tables.elements[key].cells; 
					$.map(_cells, function(td,j){
						$.map(td,function(tr,i){ 
							if (tr.text().indexOf(str)!=-1) {
							  ++_count;
							  if (_count == 1) {
							  	preBkcolor = tr.css("background-color");
							  	tr.css("background-color","#D40000")
							  }
							  allResultPos.push(String(j)+"_"+String(i)+"_"+key);	
							}  												
						});
					});
				};
				if (allResultPos.length == 0) {
					alert("String not found")
				};
			};
		};		
		
		function _replace(value){
			//To-do
			
		};
		
		function _replaceAll(option){
			//To-do
		};
		
		function _next(){
			doSelection(preBkcolor);
			++currentPos;
			doSelection("#D40000");
		};
		
		function _pre(){
			doSelection(preBkcolor);
			--currentPos;
			doSelection("#D40000");
		};
		
		function doSelection(color){
			if (currentPos < allResultPos.length){
				var pos = allResultPos[currentPos],
				      i = parseInt(pos.split("_")[0]),
					  j = parseInt(pos.split("_")[1]),
					key = pos.split("_")[2];
				 _cells = _owner.tables.elements[key].cells;
				 preBkcolor = _cells[i][j].css("background-color");
				 _cells[i][j].css("background-color",color);	
			}else{
				alert("string not found");
			}
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
		
		function _synchWithSelect(value,Arr,selectDom){
			if (!_isInStrArr(value, Arr)) {
				Arr.push(value);
				selectDom.prepend($("<option value =" + value + ">" + value + "</option>"));
				selectDom.attr("value",value);
				if (Arr.length > itemNuber) {
					selectDom.find("option:last").remove();
				};
			};
		};	
	};
})(jQuery)
