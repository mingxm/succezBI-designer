/**
 * 
 */
 EDIT_PROPERTIES = ["left","top","height","font-size","font-weight","font-style","text-decoration","font-family","text-align","letter-spacing"]
 
 function RichEditor(container){
 	this.container = container;
 	this._init();
 }
 
 RichEditor.prototype._init = function(){
 	this.editor = $("<textarea/>").addClass("text_editor").appendTo(this.container).hide();
 	this.editor.bind("mousedown",function(e){
 		e.stopPropagation();
 	});
 	this.editor.bind("mousemove",function(e){
 		e.stopPropagation();
 	});
 	this.editor.bind("mouseup",function(e){
 		e.stopPropagation();
 	});
 	
 }
 
 RichEditor.prototype.edit = function(obj){
 	this._editObj = obj;
 	for(var i=0;i<EDIT_PROPERTIES.length;i++){
 		var pname = EDIT_PROPERTIES[i];
 		this.editor.css(pname,obj.getProperty(pname));
 	}
 	this.editor.show();
 	this.editor.attr("value",obj.getValue());
 	if(obj.objtype == "cell"){
 		this.setPosition(obj.getPosition());
 	}
 	this.editor.focus();
 }
 
 RichEditor.prototype.endEdit = function(){
 	this._editObj.endEdit();
 	this.editor.hide();
 }
 
 RichEditor.prototype.setPosition = function(p){
 	this.editor.offset(p);
 }
 
 RichEditor.prototype.isEditing = function(){
 	return this.editor.is(":visible");
 }
 
 RichEditor.prototype.getHtml = function(){
 	return this.getValue().replace(/\n/g,"<br>");
 }
 
 RichEditor.prototype.getValue = function(){
 	return this.editor.val();
 }
 