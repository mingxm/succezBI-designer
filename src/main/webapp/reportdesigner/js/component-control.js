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
 	log("开始执行rptdsnComponent.prototype.getPosition方法");
 	var t1 = new Date().getTime();
 	var offset = this.container.offset();
 	log("执行rptdsnComponent.prototype.getPosition完毕！耗时"+(new Date().getTime()-t1)+"ms,x:"+offset.left+",y:"+offset.top);
 	return {
 		left:offset.left,
 		top:offset.top
 	}
 }
 
 /**
  * 获取控件的矩形区域，这个区域的坐标是相对于这个页面的绝对坐标
  * @return {}
  */
 rptdsnComponent.prototype.getRect = function(){
 	var off = this.container.offset();
 	return{
 		left:off.left,
 		top:off.top,
 		width:this.getWidth(),
 		height:this.getHeight()
 	}
 }
 
 /**
  * 获取控件的left，相对坐标，相对于报表区域的坐标，考虑了报表区域的滚动条
  * @return {}
  */
 rptdsnComponent.prototype.getLeft = function(){
 	return this.container.position().left + this.owner.container.scrollLeft();
 }
 
 /**
  * 获取控件的top，相对坐标，相对于报表区域的坐标，考虑了报表区域的滚动条
  * @return {}
  */
 rptdsnComponent.prototype.getTop = function(){
 	return this.container.position().top + this.owner.container.scrollTop();
 }
 
 rptdsnComponent.prototype.getWidth = function(){
 	return this.container.width();
 }
 
 rptdsnComponent.prototype.getHeight = function(){
 	return this.container.height();
 }
 
 rptdsnComponent.prototype.getProperty = function(name){
 	if(name == "left"){
 		return this.getLeft();
 	}else if(name == "top"){
 		return this.getTop();
 	}else {
 		return this.container.css(name);
 	}
 }
 
 rptdsnComponent.prototype.setProperty = function(name,value){
 	this.container.css(name,value);
 }
 
 rptdsnComponent.prototype.doClick = function(e){
 	this.owner.endEdit();
 	this.owner.select(this);
 }
 
 rptdsnComponent.prototype.onClick = function(e){
 //	e.stopPropagation();
 	if(this._clicktimeid){
 		clearTimeout(this._clicktimeid);
 	}
 	var self = this;
 	this._clicktimeid = setTimeout(function(){
 		self.doClick(e);
 		self._clicktimeid = 0;
 	},300);
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
 
 /**
  * 判断控件是否在矩形r区域中，r坐标应该是页面的绝对坐标
  * @param {} r
  * @return {}
  */
 rptdsnComponent.prototype.inRect = function(r){
 	return rectInRect(this.getRect(),r);
 }