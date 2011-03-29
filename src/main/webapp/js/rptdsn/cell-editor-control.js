/**
 * 
 */
 
 function CellEditor(owner,obj){
 	this.objtype = "cell";
 	this.container = obj;
 	this.owner = owner;
 	this._initEvents();
 }
 
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
 
 CellEditor.prototype.onDBLClick = function(e){
 	this.beginEdit();
 }
 
 CellEditor.prototype.getValue = function(){
 	return this.container.text();
 }
 
 CellEditor.prototype.setValue = function(value){
 	this.container.text(value);
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
 
 CellEditor.prototype.getPosition = function(){
 	var offset = this.container.offset();
 	return {
 		left:offset.left,
 		top:offset.top
 	}
 }
 
 CellEditor.prototype.getProperty = function(name){
 	return this.container.css(name);
 }
 
 CellEditor.prototype.setProperty = function(name,value){
 	this.container.css(name,value);
 }