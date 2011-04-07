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
 
 /**
  * 获取表元的属性，如果是位置的话需要特殊处理，先获取它相对于父节点的偏移量，再加上父节点的相对位置
  * @param {} name
  * @return {}
  */
 CellEditor.prototype.getProperty = function(name){
 	if(name == "left" || name == "top"){
 		return this.container.position()[name]+this.owner.container.position()[name];
 	}else {
 		return this.container.css(name);
 	}
 }