/*
 * 该单元主要处理编辑器的工具栏，主要功能有：
 * 1、鼠标移进移出按钮的时候，按钮的颜色应该有变化
 * 2、绑定好每个工具的点击事件
 * 3、支持每个工具的隐藏和显现
 * 4、tooltip提示
 * 5、拖动工具按钮可以任意改变位置
 */
(function($){
	var oldcolor='';
	$.fn.ToolBar=function(option){
		var defaltSetting={
	    	//工具按钮横向排列还是竖向排列，默认为横向排列
			DisplayStyle:"horiz",
			//工具按钮的数量，必传参数
			count:0,
			/*
			 * 因为每个按钮的背景图案是不一样的，而其他部分差不多，每个按钮背景图案样式
			 * 可以放到一个css文件中，然后初始化的时候传进来，同时该样式名称+id也将作为按钮
			 * 的id来使用，方便在html中调用，样式涉及到很多按钮的样式，所以传进来的是一个
			 * 数组，该参数为必传参数
			 * 更新：
			 * 后来想想还是定义为json对象吧，因为可能不只需要图案还有可能需要tooltip信息
			 * 传递参数的格式为:_buttons:[{cssStyle:'toolBarNew',tooltip:'新建'},{...},...]
			 * 更新：
			 * 其实传参数进行初始化感觉没有太大必要，那些按钮什么的完全可以在html里面进行定义，
			 * 然后传个id过来，根据id分别执行不同的动作就可以了
			 * 传参数的格式为_btttonsid{new:'szToolBarNew',save'szToolBarSave'}
			 */
			_buttonsid:{}
						
		}
		//to-do:注意将html按钮元素的id设置为new，save等，这样就可以实现，一个循环将所有的事件全部
		//绑定的效果
	
	}
/*	
 * 鼠标进入某个元素内部的时候发生的事件
 * @param m_element 元素
 */
	
	function mouseInTools(m_element){
		oldcolor=$(m_element).css('background-color');
		$(m_element).css('background-color','#8E8E8E');		
	};
/*
 * 鼠标移出某个按钮内部的时候发生的事件
 * @param m_element 元素
 */	
	function mouseOutTools(m_element){
		$(m_element).css('background-color',oldcolor);
	}
/*
 * '新建'按钮的点击事件
 */	
	function lbtnClickNew(m_element){
		alert("new button has been clicked");
	}
/*
 * '保存'按钮的点击事件
 */
	function lbtnClickSave(m_element){
		alert("save button has been clicked");
	}
/*
 * '另存为'按钮的点击事件
 */	
	function lbtnClickSaveAs(m_element){
		alert("saveAs button has been clicked");
	}
/*
 * '复制'按钮的点击事件
 */	
	function lbtnClickCopy(m_element){
		alert("copy button has been clicked");
	}
/*
 * '剪切'按钮的点击事件
 */	
	function lbtnClickCut(m_element){
		alert("cut button has been clicked");
	}
/*
 * '粘贴'按钮的点击事件
 */	
	function lbtnClickPaste(m_element){
		alert("paste button has been clicked");
	}
/*
 * '重做'按钮的点击事件
 */	
	function lbtnClickRedo(m_element){
		alert("redo button has been clicked");
	}
/*
 * '撤销'按钮的点击事件
 */	
	function lbtnClickUndo(m_element){
		alert("undo button has been clicked");
	}
/*
 * '计算'按钮的点击事件
 */
	function lbtnClickDo(m_element){
		alert("Do button has been clicked")
	}
/*
 * '创建分析区'按钮的点击事件
 */
	function lbtnClickNewFxq(m_element){
		alert("NewFxq button has been clicked")
	}
/*
 * '统计图'按钮的点击事件
 */	
	function lbtnClickChart(m_element){
		alert("chart button has been clicked");
	}
/*
 * '橡皮擦'按钮的点击事件
 */	
	function lbtnClickEraser(m_element){
		alert("eraser button has been clicked");
	}
/*
 * '绘表格'按钮的点击事件
 */
	function lbtnClickDrawForm(m_element){
		alert("drawForm button has been clicked");
	}
/*
 * '格式刷'按钮的点击事件
 */	
	function lbtnClickFormatBrush(m_element){
		alert("formatBrush button has been clicked");
	}
/*
 * '粗体'按钮的点击事件
 */	
	function lbtnClickBold(m_element){
		alert("bold button has been clicked");
	}	
/*
 * '斜体'按钮的点击事件
 */	
	function lbtnClickItalic(m_element){
		alert("italic button has been Clicked");
	}
/*
 * '下划线'按钮的点击事件
 */	
	function lbtnClickUnderline(m_element){
		alert("underline button has been Clicked");
	}
})(jQuery)