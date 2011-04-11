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
 	this.cells = [];
 	rptdsnComponent.call(this,container,owner,name);
 	this._init();
 }
 
 _extendClass(TableEditorControl,rptdsnComponent,"TableEditorControl");
 
 TableEditorControl.prototype._init = function(){
 	var _self = this;
 	this.container.css("left",this.x).css("top",this.y).css("position","absolute");
 	this.handler = $("<div/>").addClass("drag_handler").appendTo(this.container);
 	this.container.jTable({
 		defaultRowCount:30,
 		defaultColCount:30,
 		defaultRowHeight:24,
 		defaultColWidth:72
 	});
 	var _self = this;
 	this.container.find("table>tbody>tr").each(function(i,row){
 		var cells = [];
 		$(this).children().each(function(j,td){
 			cells.push($(td));
 		});
 		_self.cells.push(cells);
 	})
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
	var _self = this;
	this.container.contextMenu("tableMenu",{
			      	onContextMenu:function(e){
			      		_self.menuCell = $(e.target);
			      		return _self.menuCell.is("td");
			      	},
			      	bindings:{
			      		"split":function(t){
			      			_self.splitCell();
			      		},
			      		"combin":function(t){
			      			_self.combinCell();
			      		},
			      		"addRow":function(t){
			      			_self.addRow();
			      		},
			      		"removeRow":function(t){
			      			_self.removeRow();
			      		}
			      	}
			      }) 
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

 TableEditorControl.prototype.getName = function(){
 	return this.name;
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
 	}else if(item.is("th") || item.is("div")) {
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
 
 TableEditorControl.prototype.selectCellByRect = function(r){
 	this.selection = this.getSelectionByRect(r);
 	var rect = this.getRectBySelection(this.selection);
 	this.owner.selectSelectionCells(rect,this);
 }
 
 TableEditorControl.prototype.getSelectionByRect = function(r){
 	return {
 		left : this.getColIndexByPos(r.left),
 		right : this.getColIndexByPos(r.left+r.width),
 		top : this.getRowIndexByPos(r.top),
 		bottom : this.getRowIndexByPos(r.top+r.height)
 	}
 }
 
 TableEditorControl.prototype.getRectBySelection = function(s){
 	var c1 = this.cells[s.top][s.left];
 	var c2 = this.cells[s.bottom][s.right];
 	var l = this.getLeft();
 	var t = this.getTop();
 	var p1 = c1.position();
 	var p2 = c2.position();
 	return {
 		left : l + p1.left,
 		top : t + p1.top,
 		width : c2.width() + p2.left - p1.left,
 		height : c2.height() + p2.top - p1.top
 	}
 }
 
 TableEditorControl.prototype.combinCell = function(){
 	var fr = this.selection.top;
 	var er = this.selection.bottom;
 	var fc = this.selection.left;
 	var ec = this.selection.right;
 	for(var i=fr;i<=er;i++){
 		var row = this.cells[i];
 		for(var j=fc;j<=ec;j++){
 			if(j == fc && i == fr){
 				row[j].attr("rowSpan",er-fr+1).attr("colSpan",ec-fc+1);
 			}else {
 				row[j].hide();
 			}
 		}
 	}
 }
 
 TableEditorControl.prototype.splitCell = function(){
 	log("开始执行TableEditorControl.prototype.splitCell方法");
	var t1 = new Date().getTime();
 	if(!this.menuCell) return;
 	if(!this.menuCell.is(":visible")) return;
 	var colSpan = this.menuCell.attr("colSpan");
 	var rowSpan = this.menuCell.attr("rowSpan");
 	var col = this.menuCell.attr("cellIndex");
 	var row = this.menuCell.parent().attr("rowIndex")-1;
 	this.menuCell.attr("colSpan",1).attr("rowSpan",1);
 	for(var i=row;i<row+rowSpan;i++){
 		for(var j=col;j<col+colSpan;j++){
 			this.cells[i][j].show();
 		}
 	}
 	log("执行TableEditorControl.prototype.splitCell完毕！耗时"+(new Date().getTime()-t1)+"ms");
 }
 
 TableEditorControl.prototype.addRow = function(){
 	
 }
 
 TableEditorControl.prototype.removeRow = function(){
 	
 }
 
 TableEditorControl.prototype.getRowCount = function(){
 	return this.cells.length;
 }
 
 TableEditorControl.prototype.getColCount = function(){
 	return this.cells.length?this.cells[0].length:0;
 }
 
 TableEditorControl.prototype.getRowHeight = function(index){
 	if(this.cells.length <= index) return 0;
 	return this.cells[index][0].parent().height();
 }
 
 TableEditorControl.prototype.getColWidth = function(index){
 	if(this.cells.length == 0) return 0;
 	for(var i=0;i<this.cells.length;i++){
 		var cs = this.cells[i];
 		if(cs.length<=index) continue;
 		var cell = cs[index];
 		/**
 		 * 当该表元没有被合并的时候就直接获取它的宽度当做列宽
 		 */
 		if(cell.is(":visible") && cell.attr("colSpan") == 1) return cell.width();
 	}
 	return this.container.find("th:eq("+index+")").width();
 }
 
 TableEditorControl.prototype.getRowIndexByPos = function(p){
 	var r = this.getRect();
 	var top = r.top+20;
 	var bottom = r.top + r.height;
 	if(p<=top) return 0;
 	if(p>=bottom) return this.getRowCount();
 	var len = this.getRowCount();
 	var count = top;
 	for(var i=0;i<len;i++){
 		count += this.getRowHeight(i);
 		if(count>=p) return i;
 	}
 	return len;
 }
 
 TableEditorControl.prototype.getColIndexByPos = function(p){
 	var r = this.getRect();
 	var left = r.left;
 	var right = left + r.width;
 	if(p<=left) return 0;
 	if(p>=right) return this.getColCount();
 	var len = this.getColCount();
 	var count = left;
 	for(var i=0;i<len;i++){
 		count += this.getColWidth(i);
 		if(count>=p) return i;
 	}
 	return len;
 }
 
