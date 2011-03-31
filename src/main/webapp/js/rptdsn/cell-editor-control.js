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
 	this.owner.owner.clearAllSelected();
 	this.owner.owner.getTextEditor().edit(this);
 }
 
 CellEditor.prototype.endEdit = function(){
 	this.setValue(this.owner.owner.getTextEditor().getHtml());
 }
 
 CellEditor.prototype.setPosition = function(){
 	//TODO
 }