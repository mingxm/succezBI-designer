/**
 * 
 */
 EDIT_PROPERTIES = ["left","top","font-size","font-weight","font-style","text-decoration","font-family","text-align","letter-spacing"]
 
 function RichEditor(container){
 	this.container = container;
 	this._init();
 }
 
 RichEditor.prototype._init = function(){
 	this.editor = $("<input type='text'/>").css("overflow","visible").css("position","absolute").appendTo(this.container).hide();
 }
 
 RichEditor.prototype.edit = function(obj){
 	this._editObj = obj;
 	for(var i=0;i<EDIT_PROPERTIES.length;i++){
 		var pname = EDIT_PROPERTIES[i];
 		this.editor.css(pname,obj.getProperty(pname));
 	}
 	this.editor.show();
 	this.editor.attr("value",obj.getValue());
 }
 
 RichEditor.prototype.endEdit = function(){
 	this._editObj.endEdit();
 	this.editor.hide();
 }
 
 RichEditor.prototype.isEditing = function(){
 	return this.editor.is(":visible");
 }
 
 RichEditor.prototype.getValue = function(){
 	return this.editor.attr("value");
 }
 