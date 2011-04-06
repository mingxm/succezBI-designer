/**
 * 
 */
 
 function rptdsnComponent(container,owner,name){
 	if(_biInPrototype) return;
 	this.owner = owner;
 	this.container = container;
 	this.name = name;
 	this._bindDragEvents();
 }
 
 /**
  * 绑定控件的容器的拖动的相关事件，拖动的时候需要清空所有选中的对象，拖动结束后选中当前拖动的对象
  */
 rptdsnComponent.prototype._bindDragEvents = function(){
 	var _self = this;
 	this.container.bind("drag",function(e,ui){
 		_self.onDrag(e);
 	});
 	this.container.bind("dragstop",function(e,ui){
 		_self.onDragStop(e);
 	});
 }
 
 rptdsnComponent.prototype.getName = function(){
 	return this.name;
 }
 
 rptdsnComponent.prototype.setName = function(value){
 	this.name = value;
 }
 
 rptdsnComponent.prototype.getValue = function(){
 	return this.container.html().replace(/<BR>/gi,"\n");
 }
 
 rptdsnComponent.prototype.setValue = function(value) {
	this.container.html(value);
 }
 
 rptdsnComponent.prototype.getPosition = function(){
 	var offset = this.container.offset();
 	return {
 		left:offset.left,
 		top:offset.top
 	}
 }
 
 rptdsnComponent.prototype.getRect = function(){
 	var off = this.container.offset();
 	return{
 		left:off.left,
 		top:off.top,
 		width:this.container.width(),
 		height:this.container.height()
 	}
 }
 
 rptdsnComponent.prototype.getProperty = function(name){
 	return this.container.css(name);
 }
 
 rptdsnComponent.prototype.setProperty = function(name,value){
 	this.container.css(name,value);
 }
 
 rptdsnComponent.prototype.doClick = function(e){
 	this.owner.endEdit();
 	this.owner.select(this);
 }
 
 rptdsnComponent.prototype.onClick = function(e){
 	e.stopPropagation();
 	if(this._clicktimeid){
 		clearTimeout(this._clicktimeid);
 	}
 	var self = this;
 	this._clicktimeid = setTimeout(function(){
 		self.doClick(e);
 		self._clicktimeid = 0;
 	},100);
 }
 
 rptdsnComponent.prototype.doDBLClick = function(e){
 	this.beginEdit(e);
 }
 
 rptdsnComponent.prototype.onDBLClick = function(e){
 	e.stopPropagation();
 	if(this._clicktimeid){
 		clearTimeout(this._clicktimeid);
 	}
 	this.doDBLClick(e);
 }
 
 rptdsnComponent.prototype.onDrag = function(e){
 	this.owner.clearAllSelected();
 }
 
 rptdsnComponent.prototype.onDragStop = function(e){
 	this.owner.select(this);
 }
 
 rptdsnComponent.prototype.beginEdit = function(e){
 	
 }
 
 rptdsnComponent.prototype.inRect = function(r){
 	return rectInRect(this.getRect(),r);
 }