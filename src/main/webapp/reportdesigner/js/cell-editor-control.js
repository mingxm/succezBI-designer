/**
 * 
 */
 
 function CellEditor(container,owner){
 	this.objtype = "cell";
 	rptdsnComponent.call(this,container,owner);
 }
 
 _extendClass(CellEditor,rptdsnComponent,"CellEditor");
 
 CellEditor.prototype.onClick = function(e){
 	this.owner.owner.select(this);
 }
 
 CellEditor.prototype.beginEdit = function(){
 	log("开始执行CellEditor.prototype.beginEdit方法");
	var t1 = new Date().getTime();
 	this.owner.owner.clearAllSelected();
 	this.owner.owner.getTextEditor().edit(this);
 	log("执行CellEditor.prototype.beginEdit完毕！耗时"+(new Date().getTime()-t1)+"ms");
 }
 
 CellEditor.prototype.endEdit = function(){
 	this.setValue(this.owner.owner.getTextEditor().getHtml());
 }
 
 CellEditor.prototype.setPosition = function(){
 	//TODO
 }
 
 CellEditor.prototype.getLeft = function(){
 	return this.container.position().left+this.owner.container.position().left+this.owner.owner.container.scrollLeft();
 }
 
 CellEditor.prototype.getTop = function(){
 	return this.container.position().top+this.owner.container.position().top+this.owner.owner.container.scrollTop();
 }
 
 CellEditor.prototype.getCellType = function(){
 	var type = this.container.data("type");
 	return type?type:"data";
 }
 
 CellEditor.prototype.setCellType = function(value){
 	this.container.data("type",value);
 }