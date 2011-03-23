/**
 * 
 */
 
 function RichEditor(container){
 	this.container = container;
 	this._init();
 }
 
 RichEditor.prototype._init = function(){
 	this.editor = $("<textarea/>").css("position","absolute").appendTo(this.container).hide();
 }
 
 RichEditor.prototype.edit = function(obj){
 	this._editObj = obj;
 	this.editor.css("left",obj.getProperty("left")).css("top",obj.getProperty("top"));
 	this.editor.show();
 	this.editor.text(obj.getValue());
 }
 
 RichEditor.prototype.endEdit = function(){
 	this._editObj.setValue(this.editor.text());
 	this.editor.hide();
 }
 
 RichEditor.prototype.isEditing = function(){
 	return this.editor.is(":visible");
 }
 