/**
 * 
 */
 
 function ReportDesign(container,name,caption){
 	this.type = "ana_report";
 	this.objtype = "report";
 	this._hideGrid = false;
 	this.container = container;
 	this.name = name || "";
 	this.caption = caption || "";
 	this.rptid = "";
 	this.tables = new Map();
 	this.headers = new Map();
 	this.selects = [];
 	this.mousedown = false;
 	this._init();
 }

 ReportDesign.prototype._init = function(){
 	var _self = this;
 	this.pControl = new PropertyEditorControl($(".ui-layout-east"),this);
 	this.selectFrame = this.container.find("#select_frameid");
 	this._initEvents();
 }
 
 ReportDesign.prototype._initEvents = function(){
 	var _self = this;
 	this.container.bind("click",function(e){
 		if(e.target != this) return true;
 		_self.onClick(e);
 	});
 	this.container.bind("dblclick",function(e){
 		if(e.target != this) return true;
 		_self.onDBLClick(e);
 	});
 	this.container.bind("mousedown",function(e){
 		_self.onMouseDown(e);
 	});
 	this.container.bind("scroll",function(e){
 		_self.onScroll(e);
 	});
 }
 
 ReportDesign.prototype.endEdit = function(){
 	if(this.isEditing()){
 		this.getTextEditor().endEdit();
 	}
 }
 
 ReportDesign.prototype.onDBLClick = function(e){
 	log("开始执行ReportDesign.prototype.onDBLClick方法");
	var t1 = new Date().getTime();
 	if(this._clicktimeid){
 		clearTimeout(this._clicktimeid);
 	}
 	this.endEdit();
 	var off = this.container.offset();
 	var ot = this.container.scrollTop();
 	var ol = this.container.scrollLeft();
 	var config = {
 		x:e.pageX - off.left+ol,
 		y:e.pageY - off.top+ot
 	}
 	var th = this.addTextHeader(config);
 	th.beginEdit();
	log("执行ReportDesign.prototype.onDBLClick完毕！耗时"+(new Date().getTime()-t1)+"ms");
 }
 
 ReportDesign.prototype.onClick = function(e){
 	log("开始执行ReportDesign.prototype.onClick方法");
	var t1 = new Date().getTime();
 	if(this._clicktimeid){
 		clearTimeout(this._clicktimeid);
 		this._clicktimeid = false;
 	}
 	var self = this;
 	this._clicktimeid = setTimeout(function(){
 		self.endEdit();
 	},100);
	log("执行ReportDesign.prototype.onClick完毕！耗时"+(new Date().getTime()-t1)+"ms");
 }
 
 ReportDesign.prototype.onMouseDown = function(e){
 	log("开始执行ReportDesign.prototype.onMouseDown方法");
	var t1 = new Date().getTime();
	if(e.which !=1) return;
 	var target = $(e.target);
 	/**
 	 * 有可能是拖动界面上的某一个控件，那么这个时候就不需要有框选框
 	 */
 	if(target.hasClass("drag_handler") || !target.draggable("option","disabled") || target.is("th")) return;
	if (target.attr("id").indexOf("checkBox") !=-1 ) return;
 	this.mousedown = true;
 	var _self = this;
	if(!this._mouseMoveEvent)
		this._mouseMoveEvent = this.onMouseMove.bind(this);
	if(!this._mouseUpEvent)
		this._mouseUpEvent = this.onMouseUp.bind(this);
 	this.container.bind({
 		"mousemove":this._mouseMoveEvent,
 		"mouseup":this._mouseUpEvent
 	});
 	if(this.container[0].setCapture){
 		this.container[0].setCapture();
 	}else {
 		window.captureEvents("MouseUp");
 	}
 	this.mousedownPt = {
 		left:e.pageX,
 		top:e.pageY
 	}
	log("执行ReportDesign.prototype.onMouseDown完毕！耗时"+(new Date().getTime()-t1)+"ms");
 }
 
 ReportDesign.prototype.onMouseMove = function(e){
 	log("开始执行ReportDesign.prototype.onMouseMove方法");
	var t1 = new Date().getTime();
 	if(!this.mousedown) return;
 	/**
 	 * 在框选的过程中设置整个界面不允许选取文字，在鼠标松起的时候再unbind
 	 */
 	if (!this.onSelectStart) {
		this.onSelectStart = function() {
			return false;
		}
		$("body").bind("selectstart", this.onSelectStart);
	}
 	this.selectFrame.css("visibility","inherit");
 	this.selectFrame.offset(this.mousedownPt);
 	var w = e.pageX - this.mousedownPt.left;
 	var h = e.pageY - this.mousedownPt.top;
 	this.selectFrame.css("width",w).css("height",h);
	log("执行ReportDesign.prototype.onMouseMove完毕！耗时"+(new Date().getTime()-t1)+"ms");
 }
 
 ReportDesign.prototype.onMouseUp = function(e){
 	log("开始执行ReportDesign.prototype.onMouseUp方法");
	var t1 = new Date().getTime();
 	if(!this.mousedown) return;
 	this.clearAllSelected();
 	var target = $(e.target);
 	this.mousedown = false;
 	$("body").unbind("selectstart",this.onSelectStart);
 	this.onSelectStart = false;
 	var _self = this;
 	this.container.unbind({
 		"mousemove":this._mouseMoveEvent,
 		"mouseup":this._mouseUpEvent
 	});
 	if(this.container[0].releaseCapture){
 		this.container[0].releaseCapture();
 	}else {
 		window.releaseEvents("MouseUp");
 	}
 	if(this.mousedownPt.left == e.pageX && this.mousedownPt.top == e.pageY) return true;
 	var off = this.selectFrame.offset();
 	var r = {
 		left:off.left,
 		top:off.top,
 		width:this.selectFrame.width(),
 		height:this.selectFrame.height()
 	}
 	this.selectFrame.css("visibility","hidden");
 	this.selectByRect(r);
	log("执行ReportDesign.prototype.onMouseUp完毕！耗时"+(new Date().getTime()-t1)+"ms");
 }
 
 ReportDesign.prototype.onScroll = function(e){
 	var len = e.scrollTop;
 }
 
 ReportDesign.prototype.getName = function(){
 	return this.name;
 }
 
 ReportDesign.prototype.setName = function(value){
 	this.name = value;
 }
 
 ReportDesign.prototype.getCaption = function(){
 	return this.caption;
 }
 
 ReportDesign.prototype.setCaption = function(value){
 	this.caption = value;
 }
 
 ReportDesign.prototype.isHiddenGrid = function(){
 	return !!this._hideGrid;
 }
 
 ReportDesign.prototype.hideGrid = function(value){
 	this._hideGrid = !!value;
 }
 
 ReportDesign.prototype.getType = function(){
 	return this.type;
 }
 
 ReportDesign.prototype.setType = function(value){
 	this.type = value;
 }
 
 ReportDesign.prototype.addComponent = function(type,defaultConfig){
 	defaultConfig = defaultConfig || {};
 	switch(type){
 		case "table":
 			this.addTable(defaultConfig);
 			return;
 		case "text":
 			this.addTextHeader(defaultConfig);
 			return;
		case "checkBox":
			this.addCheckBox(defaultConfig);
			return;
 		case "toolbar":
 			/*
 		 	 * toolbar对象会开放一些函数出来，供reportDesign调用，从而来设置
 		 	 * 菜单的状态、按钮的属性等等
 		 	 */
 			this.toolbar = this.addToolBar(defaultConfig);
 			return;
	    case "reportStruct":
			/*
			 * 可以通过调用该对象内部提供的方法来对结构树的节点进行操作，内部的方法列表如下：
			 * _update;_addNode(name);_deleteNode;_selectNode(name);_renameNode;_test
			 */
			this.reportStruct = this.addReportStruct(defaultConfig);
 			return;
		case "toolsControl":
			this.toolsControl = this.addToolsControl(defaultConfig);
			return;
		case "reportSearch":
			this.reportSearch = this.addReportSearch(defaultConfig);	
		    return;				
 	}
 }
 
 ReportDesign.prototype.selectSelectionCells = function(r,ownerTable){
 	this.clearAllSelected();
 	var div = $("<div/>").addClass("selected_div").css({
 		"left":r.left,
 		"top":r.top,
 		"width":r.width,
 		"height":r.height
 	}).appendTo(this.container);
 	this.selects.push(ownerTable);
 	this.pControl.switchByObj(ownerTable);
 }
 
 ReportDesign.prototype.select = function(obj,multi){
 	if(!obj) return;
 	if(!multi){
 		this.clearAllSelected();
 	}
 	var div = $("<div/>").addClass("selected_div").css({
 		"left":obj.getLeft(),
 		"top":obj.getTop(),
 		"width":obj.getWidth(),
 		"height":obj.getHeight()
 	}).appendTo(this.container);
 	this.pControl.switchByObj(obj);
 	this.selects.push(obj);
 }
 
 ReportDesign.prototype.selectCellByRect = function(r){
 	for(var i=0;i<this.tables.size();i++){
 		var table = this.tables.get(i);
 		table.selectCellByRect(r);
 	}
 }
 
 ReportDesign.prototype.selectHeaderByRect = function(r){
 	var hasSelected = false;
 	for(var i=0;i<this.headers.size();i++){
 		var obj = this.headers.get(i);
 		if(obj.inRect(r)){
 			this.select(obj,true);
 			hasSelected = true;
 		}
 	}
 	return hasSelected;
 }
 
 ReportDesign.prototype.selectByRect = function(r){
 	if(!this.selectHeaderByRect(r)){
 		this.selectCellByRect(r);
 	}
 }
 
 ReportDesign.prototype.clearAllSelected = function(){
 	if(this.selects.length == 0) return;
 	log("开始执行ReportDesign.prototype.clearAllSelected方法");
	var t1 = new Date().getTime();
 	this.container.find(".selected_div").remove();
 	this.selects = [];
 	this.pControl.switchByObj(this);
 	log("执行ReportDesign.prototype.clearAllSelected完毕！耗时"+(new Date().getTime()-t1)+"ms");
 }
 
 ReportDesign.prototype.addTable = function(defaultConfig){
 	var x = defaultConfig.x || 100;
 	var y = defaultConfig.y || 100;
 	var name = defaultConfig.name || this.getUniqueName("table",this.tables);
 	var div = $("<div/>").appendTo(this.container).draggable({
 		handle:".drag_handler",
 	//	refreshPositions:false,
 		addClass:false
 	//	grid:[10,10]
 	});
	var table = new TableEditorControl(div,this,name,x,y);
	this.tables.put(table.getName(),table);
    this.reportStruct._addNode(name,name);		
 }
 
 ReportDesign.prototype.addTextHeader = function(defaultConfig){
 	var x = defaultConfig.x || 100;
 	var y = defaultConfig.y || 100;
 	var name = defaultConfig.name || this.getUniqueName("HHH",this.headers);
 	var initValue = defaultConfig.value || "";
 	var div = $("<div/>").addClass("textheader").appendTo(this.container).draggable();
 	var th = new TextHeader(div,this,name,initValue,x,y);
 	this.headers.put(th.getName(),th);
    this.reportStruct._addNode(name,name);	
 	return th;
 }
 
 ReportDesign.prototype.addCheckBox = function(defaultConfig){
	if (this.checkBoxMap == undefined)
	{
		this.checkBoxMap = new Map();
	}
 	var name = defaultConfig.name || this.getUniqueName("checkBox",this.checkBoxMap);
	var div = $("<div><input type='checkbox' text="+name+" value="+name+" id="+name+" /></div>");
 	div.appendTo(this.container).draggable();
	var checkBox = div.find(">input").jCheckbox()[0];
	this.checkBoxMap.put(name,checkBox);
	this.reportStruct._addNode(name,name);
 }
 
  ReportDesign.prototype.addToolBar = function(option){
 	var tb = option.m_element.ToolBar();
 	tb._create(option.m_element,option.setting,this);
 	return tb; 	
  }

  ReportDesign.prototype.addReportStruct = function(option){
 	var rs = $(".simpleTree").ReportStructControl(this,option);
	return rs;
  }  
  
  ReportDesign.prototype.addToolsControl = function(option){
  	var tc = $("#szDesignTools",document.body).DesignToolsControl(this,option)
	return tc;
  }
  
  ReportDesign.prototype.addReportSearch = function(Option){
  	var rs = $("#szSearchDialog").szSearch(this);
	return rs;
  }
  ReportDesign.prototype.ToolBarVersion = function(){
 	alert(this.toolbar._getvision());
  }
  
 /*
  * 测试该函数
  */
  ReportDesign.prototype.setCellProperty = function(name,value){
 	alert("With this we can set other control's Propery");
  }
   
 ReportDesign.prototype.getTextEditor = function(){
 	if(!this.textEditor){
 		this.textEditor = new RichEditor(this.container);
 	}
 	return this.textEditor;
 }
 
 ReportDesign.prototype.isEditing = function(){
 	return this.getTextEditor().isEditing();
 }
 
 ReportDesign.prototype.deleteHeader = function(th){
 	var name = typeof th == "string"?th:th.getName();
 	this.headers.remove(name);
 }
 
 ReportDesign.prototype.getUniqueName = function(name,map){
 	var i = 1;
	var result = name;
	name = name+1;
 	while(map.contains(name)){
 		name = result+i;
 		i++;
 	}
	return name;	
 }
