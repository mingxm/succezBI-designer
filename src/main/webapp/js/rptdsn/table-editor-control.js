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
 		defaultRowCount:100,
 		defaultColCount:30,
 		defaultRowHeight:24,
 		defaultColWidth:72
 	});
 	this._initEvents();
 }
 
 TableEditorControl.prototype._initEvents = function(){
 	var _self = this;
 	this.container.bind({
		    "click"	: function(e) {
			    _self.onClick(e);
		    },
		    "dblclick":function(e){
		    	_self.onDBLClick(e);
		    }
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
 
 TableEditorControl.prototype.doClick = function(e){
 	log("开始执行TableEditorControl.prototype.doClick方法");
	var t1 = new Date().getTime();
 	var item = $(e.target);
 	if(item.is("td")){
 		this.owner.endEdit();
 		new CellEditor(item,this).onClick();
 	}else {
 		this.owner.select(this);
 	}
	log("执行TableEditorControl.prototype.doClick完毕！耗时"+(new Date().getTime()-t1)+"ms");
 }
 
 TableEditorControl.prototype.doDBLClick = function(e){
 	log("开始执行TableEditorControl.prototype.doDBLClick方法");
	var t1 = new Date().getTime();
 	var item = $(e.target);
 	if(item.is("td")){
 		new CellEditor(item,this).beginEdit();
 	}
	log("执行TableEditorControl.prototype.doDBLClick完毕！耗时"+(new Date().getTime()-t1)+"ms");
 }
