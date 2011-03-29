/**
 * 
 */
 
 function rptdsnComponent(container,owner,name){
 	this.owner = owner;
 	this.container = container;
 	this.name = name;
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
 	return{
 		left:this.getProperty("left"),
 		top:this.getProperty("top"),
 		width:this.getProperty("width"),
 		height:this.getProperty("height")
 	}
 }
 
 rptdsnComponent.prototype.getProperty = function(name){
 	return this.container.css(name);
 }
 
 rptdsnComponent.prototype.setProperty = function(name,value){
 	this.container.css(name,value);
 }
 
 rptdsnComponent.prototype.onClick = function(e){
 	this.owner.endEdit();
 	this.owner.select(this);
 }
 
 rptdsnComponent.prototype.onDBLClick = function(e){
 	this.beginEdit(e);
 }
 
 rptdsnComponent.prototype.beginEdit = function(e){
 	
 }