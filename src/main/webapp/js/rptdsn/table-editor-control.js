/**
 * 
 */
 function TableEditorControl(container,owner){
 	this._style = "default";
 	this.objtype = "table";
 	this.owner = owner;
 	this.container = container;
 	this.rowCountPerPage = 1000;
 	this._hidegird = false;
 	this._init();
 }
 
 TableEditorControl.prototype._init = function(){
 	var _self = this;
 	this.container.jTable({
 		defaultRowCount:10,
 		defaultColCount:10,
 		defaultRowHeight:24,
 		defaultColWidth:72
 	});
 	this.container.bind("click",function(e){
 		_self.onClick(e)
 	});
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
 
 TableEditorControl.prototype.onClick = function(e){
 	this.owner.select(this);
 }
