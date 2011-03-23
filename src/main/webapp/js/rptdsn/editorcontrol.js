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
 	this._init();
 }

 ReportDesign.prototype._init = function(){
 	var _self = this;
 	this.pControl = new PropertyEditorControl($(".ui-layout-east"),this);
 	this.container.bind("click",function(e){
 		if(e.target != this) return;
 		_self.onClick(e);
 	})
 }
 
 ReportDesign.prototype.onClick = function(e){
 	this.clearAllSelected();
 	this.pControl.switchByObj(this);
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
 	if(type == "table"){
 		this.addTable();
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