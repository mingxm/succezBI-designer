/*
 * 该单元主要处理编辑器的工具栏，主要功能有：
 * 1、鼠标移进移出按钮的时候，按钮的颜色变化
 * 2、绑定好每个工具的点击事件
 * 3、支持每个工具的隐藏和显现
 * 4、tooltip提示(这里不实现，可以用一个单独的插件实现)
 * 5、拖动工具按钮可以任意改变位置
 * 6、当用户点击了菜单之后，要能够将用户这一行为通知出去，从而通知其他插件执行相应的操作
 * 注意：
 * 1、菜单上每个按钮的id名称是有限定的，必须用Menu_New、Menu_Save这种形式
 */
(function($){
	
	//该插件的版本号
	VERSION = '0.0.0.1';
	
	//按钮的状态
	var boldTag = false,
	italicTag = false,
	underlineTag = false;
	
	/*
 	 * 与菜单关联的编辑器，该编辑器中应该提供回调函数，供菜单调用以便改变编辑器中文字的大小，颜色
 	 * 以及对编辑内容的新建、保存、另存为等操作
 	 */
	var _rptEditor={};

	$.fn.ToolBar=function(){
		/*
		 * 缺省设置，有待增加内容
		 */
		var _pluginSetting={
			/*
		 	 * 按钮的id，用来绑定事件 
	     	 */
	    	_buttonsid:[]
		};
		/*
		 * 构造函数
		 * @m_elment ：菜单原型所属的html对象
		 * @option : _buttonsid ,每个菜单的id号
		 */
		this._create = function(m_element,option,rptEditor){
			var buttonsid = option._buttonsid;			
			$.extend(_pluginSetting._buttonsid,buttonsid);
			_rptEditor = rptEditor;
			toolBarInit(m_element,_pluginSetting);
		}
		//析构函数
		this._destroy = function(param){
			alert("ToolBar plugin has been destroy");
		}
		//返回插件的版本号函数
		this._getvision = function(){
			return VERSION;
		}	
		return this;
	}

	/*
	 * 初始化插件
	 */
	function toolBarInit(m_element,Setting){
		/*
		 * 首先绑定鼠标的in和out事件
		 */
		$.each(Setting._buttonsid,function(n,value){
			$(m_element).find('#'+value).find("img").hover(function(e){
				mouseInTools(e.target)
			},function(e){
				mouseOutTools(e.target)
			});		
		})
		
        /*
		 * 绑定各个按钮的click事件，注意按钮的id是约定好的，html中必须按照该约定形式定义id
		 */
		$.each(Setting._buttonsid,function(n,value){
			var tmpid = value.split('_')[1];
			
			if (tmpid == "New"){ 
		    	$(m_element).find('#'+value).find("img").bind('click',function(e){
		    		lbtnClickNew(e.target);
		    	})	
		    	.bind('mousedown',function(e){

		    	})
		    	.bind('mouseup',function(e){

		    	})
		    	.bind('contextMenu',function(e){
		    	
		    	})
			}
		    else if (tmpid == "Save")
		        $(m_element).find('#'+value+" > img").bind('click',function(e){
		        	lbtnClickSave(e.target);
		    })
		    else if (tmpid == "SaveAs")
		        $(m_element).find('#'+value+" > img").bind('click',function(e){
		        	lbtnClickSaveAs(e.target);
		    })
		    else if (tmpid == "Copy")
		        $(m_element).find('#'+value+" > img").bind('click',function(e){
		        	lbtnClickCopy(e.target);
		    })	
		    else if (tmpid == "Cut")
		        $(m_element).find('#'+value+" > img").bind('click',function(e){
		        	lbtnClickCut();
		    }) 
		    else if (tmpid == "Paste")
		        $(m_element).find('#'+value+" > img").bind('click',function(e){
		        	lbtnClickPaste(e.target);
		    })
		    else if (tmpid == "Redo")
		        $(m_element).find('#'+value+" > img").bind('click',function(e){
		        	lbtnClickRedo(e.target);
		    })
		    else if (tmpid == "Undo")
		        $(m_element).find('#'+value+" > img").bind('click',function(e){
		        	lbtnClickUndo(e.target);
		    })
		    else if (tmpid == "Do")
		        $(m_element).find('#'+value+" > img").bind('click',function(e){
		        	lbtnClickDo(e.target);
		    })	
		    else if (tmpid == "NewFxq")
		        $(m_element).find('#'+value+" > img").bind('click',function(e){
		        	lbtnClickNewFxq(e.target);
		    })
		    else if (tmpid == "Chart")
		        $(m_element).find('#'+value+" > img").bind('click',function(e){
		        	lbtnClickChart(e.target);
		    })
		    else if (tmpid == "Eraser")
		        $(m_element).find('#'+value+" > img").bind('click',function(e){
		        	lbtnClickEraser(e.target);
		    })
		    else if (tmpid == "DrawForm")
		        $(m_element).find('#'+value+" > img").bind('click',function(e){
		        	lbtnClickDrawForm(e.target);
		    })
		    else if (tmpid == "FormatBrush")
		        $(m_element).find('#'+value+" > img").bind('click',function(e){
		        	lbtnClickFormatBrush(e.target);
		    })	
		    else if (tmpid == "Bold")
		        $(m_element).find('#'+value+" > img").bind('click',function(e){
		        	lbtnClickBold(e.target);
		    })
		    else if (tmpid == "Italic")
		        $(m_element).find('#'+value+" > img").bind('click',function(e){
		        	lbtnClickItalic(e.target);
		    })	
		    else if (tmpid == "Underline")
		        $(m_element).find('#'+value+" > img").bind('click',function(e){
		        	lbtnClickUnderline(e.target);
		        	this.blur();
		    })			    
		})		
	}
	/*	
	 * 鼠标进入某个元素内部的时候发生的事件
	 * @param m_element 元素
	 */
	function mouseInTools(m_element){
		$(m_element).css("border-color","#000000");
	};
	/*
 	* 鼠标移出某个按钮内部的时候发生的事件
 	* @param m_element 元素
 	*/	
	function mouseOutTools(m_element){
		$(m_element).css("border-color","#E7E5E2");	
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
		_rptEditor.setCellProperty();
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
		changeInOrOutSet(boldTag,m_element);
		boldTag = !boldTag;
	}	
	/*
	 * '斜体'按钮的点击事件
	 */	
	function lbtnClickItalic(m_element){
		changeInOrOutSet(italicTag,m_element);
		italicTag = !italicTag;
	}
	/*
	 * '下划线'按钮的点击事件
	 */	
	function lbtnClickUnderline(m_element){
		changeInOrOutSet(underlineTag,m_element);
		underlineTag = !underlineTag;
	}
	/*
	 * 改变元素的按下和谈起状态
	 */
	function changeInOrOutSet(flag,item){
		if (flag)
			$(item).css("border-style","outset");
		else
			$(item).css("border-style","inset");
	}
})(jQuery)