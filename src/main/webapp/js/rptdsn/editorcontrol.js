/**
 * 
 */
 
 function ReportDesign(container){
 	this.type = "ana_report";
 	this.objtype = "report";
 	this._hideGrid = false;
 	this.container = container;
 	this.name = "";
 	this.caption = "";
 	this.rptid = "";
 	this.tables = [];
 	this.headers = [];
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
 
 ReportDesign.prototype.onDBLClick = function(e){
 	if(this.isEditing()){
 		this.getTextEditor().endEdit();
 	}
 	var th = new TextHeader(this.container,this,"",e.offsetX,e.offsetY);
 	this.headers.push(th);
 	th.beginEdit();
 }
 
 ReportDesign.prototype.onClick = function(e){
 	this.clearAllSelected();
 	this.pControl.switchByObj(this);
 	if(this.isEditing()){
 		this.getTextEditor().endEdit();
 	}
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
 
 ReportDesign.prototype.addComponent = function(type){
 	switch(type){
 		case "table":
 			this.addTable();
 			return;
 		case "text":
 			this.addTextHeader();
 			return;
 	}
 }
 
 ReportDesign.prototype.select = function(obj){
 	if(!obj) return;
 	$(".selected_component").removeClass("selected_component");
 	obj.container.addClass("selected_component");
 	this.pControl.switchByObj(obj);
 }
 
 ReportDesign.prototype.clearAllSelected = function(){
 	$(".selected_component").removeClass("selected_component");
 }
 
 ReportDesign.prototype.addTable = function(){
 	var div = $("<div/>").appendTo(this.container).draggable();
	var table = new TableEditorControl(div,this);
	this.tables.push(table);
 }
 
 ReportDesign.prototype.addTextHeader = function(){
 	var th = new TextHeader(this.container,this,"表头",100,100);
 	this.headers.push(th);
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
 	var index = this.headers.valueOf(th);
 	if(index != -1){
 		this.headers.splice(index,1);
 	}
 }