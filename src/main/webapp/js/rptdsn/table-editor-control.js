/**
 * 
 */
 function TableEditorControl(container,owner,name,x,y){
 	this._style = "default";
 	this.objtype = "table";
 	this.x = x;
 	this.y = y;
 	this.rowCountPerPage = 1000;
 	this._hidegird = false;
 	rptdsnComponent.call(this,container,owner,name);
 	this._init();
 }
 
 _extendClass(TableEditorControl,rptdsnComponent,"TableEditorControl");
 
 TableEditorControl.prototype._init = function(){
 	var _self = this;
 	this.container.css("left",this.x).css("top",this.y).css("position","absolute");
 	this.handler = $("<div/>").addClass("drag_handler").appendTo(this.container);
 	this.container.jTable({
 		defaultRowCount:10,
 		defaultColCount:10,
 		defaultRowHeight:24,
 		defaultColWidth:72
 	});
 	this._initEvents();
 }
 
 TableEditorControl.prototype._initEvents = function(){
 	var _self = this;
 	this.handler.bind("click",function(e){
 		_self.onClick(e);
 	});
 	this.container.find("td").each(function(index,item){
 		new CellEditor($(item),_self);
 	});
 }
 
 TableEditorControl.prototype.setName = function(value){
 	if(this.name == value){
 		return;
 	}
 	if(this.owner.tables.contains(value)){
 		throwError("已经存在相同名称的表格！");
 	}else{
 		this.name = value;
 	}
 }
 
 TableEditorControl.prototype.setReportStyle = function(value){
 	this._style = value;
	var table = this.container.find("table");
	table.find("td").each(function(index, item) {
		    $(item).css("border-color", value);
	    });
	table.css("border-color",value);
 }
 
 TableEditorControl.prototype.getReportStyle = function(){
 	return this._style;
 }
 
 TableEditorControl.prototype.setRowCountPerPage = function(value){
 	this.rowCountPerPage = parseInt(value) || this.rowCountPerPage;
 }
 
 TableEditorControl.prototype.getRowCountPerPage = function(){
 	return this.rowCountPerPage;
 }
 
 TableEditorControl.prototype.isHiddenGrid = function(){
 	return !!this._hidegrid;
 }
 
 TableEditorControl.prototype.hideGrid = function(value){
 	this._hidegrid = !!value;
 }
