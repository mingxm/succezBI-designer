/**
 * 
 */
 
 function TextHeader(container,owner,value,x,y){
 	this.container = container;
 	this.owner = owner;
 	this.value = value;
 	this.x = x;
 	this.y = y;
 	this.defaultFont = "12px/20px 宋体";
 	this._init();
 }
 
 TextHeader.prototype._init = function(){
 	this.obj = $("<div/>").text(this.value).css("left",this.x).css("top",this.y).css("position","absolute")
 		.css("font",this.defaultFont).data("control",this).draggable().appendTo(this.container);
 	this.obj.bind("dblclick",function(e){
 		var p = $(this).data("control");
 		p.beginEdit();
 	});
 }
 
 TextHeader.prototype.beginEdit = function(){
 	this.owner.getTextEditor().edit(this);
 }
 
 TextHeader.prototype.endEdit = function(){
 	this.setValue(this.owner.getTextEditor().text());
 }
 
 TextHeader.prototype.getValue = function(){
 	return this.value;
 }
 
 TextHeader.prototype.setValue = function(value) {
	if (value == "") {
		this.obj.remove();
		this.owner.deleteHeader(this);
	}
	else {
		this.value = value;
		this.obj.text(value);
	}
}
 
 TextHeader.prototype.getProperty = function(name){
 	return this.obj.css(name);
 }
 
 TextHeader.prototype.setProperty = function(name,value){
 	this.obj.css(name,value);
 }