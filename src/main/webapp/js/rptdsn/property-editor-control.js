/**
 * 
 */
 function propertyEditorControl(container){
 	this.container = container;
 	this.obj = false;
 	this.type = false;
 }
 
 propertyEditorControl.prototype._init = function(){
 	this.switchByObj()
 }
 
 propertyEditorControl.prototype.switchByObj = function(obj,type){
 	this.obj = obj;
 	this.type = type;
 }