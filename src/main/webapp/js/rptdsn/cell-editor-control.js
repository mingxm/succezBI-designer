/**
 * 
 */
 
 function CellEditor(container,owner){
 	this.objtype = "cell";
 	rptdsnComponent.call(this,container,owner);
 	this._initEvents();
 }
 
 _extendClass(CellEditor,rptdsnComponent,"CellEditor");
 
 CellEditor.prototype._initEvents = function(){
 	var _self = this;
 	this.container.bind("click",function(e){
 		_self.onClick(e);
 	});
 	this.container.bind("dblclick",function(e){
 		_self.onDBLClick(e);
 	});
 	this.container.data("pControl",this);
 }
 
 CellEditor.prototype.onClick = function(e){
 	this.owner.owner.endEdit();
 	this.owner.owner.select(this);
 }
 
 CellEditor.prototype.beginEdit = function(){
 	this.owner.owner.getTextEditor().edit(this);
 }
 
 CellEditor.prototype.endEdit = function(){
 	this.setValue(this.owner.owner.getTextEditor().getValue());
 }
 
 CellEditor.prototype.setPosition = function(){
 	//TODO
 }
 
 CellEditor.prototype.getRect = function(){
 	var r = rptdsnComponent.prototype.getRect.call(this);
 	var off1 = this.container.offset();
 	var off2 = this.owner.owner.container.offset();
 	r.left = off1.left - off2.left;
 	r.top = off1.top - off2.top;
 	return r;
 }