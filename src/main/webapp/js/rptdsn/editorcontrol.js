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
 	this._init();
 }

 ReportDesign.prototype._init = function(){
 	var _self = this;
 	this.pControl = new PropertyEditorControl($(".ui-layout-east"),this);
 	this._initEvents();
 }
 
 ReportDesign.prototype._initEvents = function(){
 	var _self = this;
 	this.container.bind("click",function(e){
 		if(e.target != this) return;
 		_self.onClick(e);
 	});
 	this.container.bind("dblclick",function(e){
 		if(e.target != this) return;
 		_self.onDBLClick(e);
 	})
 }
 
 ReportDesign.prototype.endEdit = function(){
 	if(this.isEditing()){
 		this.getTextEditor().endEdit();
 	}
 }
 
 ReportDesign.prototype.onDBLClick = function(e){
 	this.endEdit();
 	var off = this.container.offset();
 	var config = {
 		x:e.pageX - off.left,
 		y:e.pageY - off.top
 	}
 	var th = this.addTextHeader(config);
 	th.beginEdit();
 }
 
 ReportDesign.prototype.onClick = function(e){
 	this.clearAllSelected();
 	this.pControl.switchByObj(this);
 	this.endEdit();
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
 	}
 }
 
 ReportDesign.prototype.select = function(obj){
 	if(!obj) return;
 	this.clearAllSelected();
 	var r = obj.getRect();
 	var div = $("<div/>").addClass("selected_div").appendTo(this.container);
 	$.each(r,function(key,value){
 		div.css(key,value);
 	});
 	this.pControl.switchByObj(obj);
 	this.selects.push(obj);
 }
 
 ReportDesign.prototype.clearAllSelected = function(){
 	this.container.find(".selected_div").remove();
 	this.selects = [];
 }
 
 ReportDesign.prototype.addTable = function(defaultConfig){
 	var x = defaultConfig.x || 10;
 	var y = defaultConfig.y || 100;
 	var name = defaultConfig.name || this.getUniqueTableName();
 	var div = $("<div/>").appendTo(this.container).draggable({handle:".drag_handler"});
	var table = new TableEditorControl(div,this,name,x,y);
	this.tables.put(table.getName(),table);
 }
 
 ReportDesign.prototype.addTextHeader = function(defaultConfig){
 	var x = defaultConfig.x || 100;
 	var y = defaultConfig.y || 100;
 	var name = defaultConfig.name || this.getUniqueHeadersName();
 	var initValue = defaultConfig.value || "";
 	var div = $("<div/>").addClass("textheader").appendTo(this.container).draggable();
 	var th = new TextHeader(div,this,name,initValue,x,y);
 	this.headers.put(th.getName(),th);
 	return th;
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
 
 ReportDesign.prototype.getUniqueTableName = function(){
 	var name = "table";
 	var i = 0;
 	while(this.tables.contains(name)){
 		name = "table"+i;
 		i++;
 	}
 	return name;
 }
 
 ReportDesign.prototype.getUniqueHeadersName = function(){
 	var name = "header";
 	var i = 0;
 	while(this.headers.contains(name)){
 		name = "header"+i;
 		i++;
 	}
 	return name;
 }