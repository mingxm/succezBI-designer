/**
 * 
 */
 
 function TextHeader(container,owner,name,value,x,y){
 	this.container = container;
 	this.objtype = "text";
 	this.owner = owner;
 	this.name = name;
 	this.x = x;
 	this.y = y;
 	this.defaultFont = "18px/20px Sans-serif pre-wrap";
 	this._init(value);
 }
 
 TextHeader.prototype._init = function(value){
 	this.container.text(value).css("left",this.x).css("top",this.y).css("position","absolute")
 		.css("font",this.defaultFont).css("white-space","nowrap").data("control",this);
 	this._initEvents();
 }
 
 TextHeader.prototype._initEvents = function(){
 	var _self = this;
 	this.container.bind("dblclick",function(e){
 		_self.onDBLClick(e);
 	});
 	this.container.bind("click",function(e){
 		_self.onClick(e);
 	})
 }
 
 TextHeader.prototype.onClick = function(e){
 	this.owner.select(this);
 }
 
 TextHeader.prototype.onDBLClick = function(e){
 	this.container.data("control").beginEdit();
 }
 
 TextHeader.prototype.beginEdit = function(){
 	this.container.hide();
 	this.owner.getTextEditor().edit(this);
 }
 
 TextHeader.prototype.endEdit = function(){
 	this.setValue(this.owner.getTextEditor().getValue());
 	this.container.show();
 }
 
 TextHeader.prototype.getName = function(){
 	return this.name;
 }
 
 TextHeader.prototype.setName = function(value){
 	if(this.name == value){
 		return;
 	}
 	if(this.owner.headers.contains(value)){
 		throw new Error("已经存在相同名称的表格！");
 	}else{
 		this.name = value;
 	}
 }
 
 TextHeader.prototype.getValue = function(){
 	return this.container.html();
 }
 
 TextHeader.prototype.setValue = function(value) {
	if (value == "") {
		this.container.remove();
		this.owner.deleteHeader(this);
	}
	else {
		this.container.html(value);
	}
}
 
 TextHeader.prototype.getProperty = function(name){
 	return this.container.css(name);
 }
 
 TextHeader.prototype.setProperty = function(name,value){
 	this.container.css(name,value);
 }