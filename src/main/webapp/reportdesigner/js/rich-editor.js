/**
 * 
 */
 EDIT_PROPERTIES = ["font-size","font-weight","font-style","text-decoration","font-family","text-align","letter-spacing"]
 
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
 
 /**
  * 编辑一个对象，在编辑的时候需要将对象的一些属性都设置给编辑器对象，这个过程比较耗时，所以优化处理，将
  * 编辑器显示前必须设置的一些属性：位置和高度先设置，其它的一些属性延迟设置，这样能很大的提高性能
  * @param {} obj
  */
 RichEditor.prototype.edit = function(obj){
 	log("开始执行RichEditor.prototype.edit方法");
	var t1 = new Date().getTime();
 	this._editObj = obj;
 	this.editor.css({
 		left:obj.getProperty("left"),
 		top:obj.getProperty("top"),
 		height:obj.getHeight(),
 		width:obj.getWidth()
 	});
 	this.editor.show();
 	this.editor.attr("value",obj.getValue());
 	var self = this;
 	setTimeout(function() {
		    for (var i = 0; i < EDIT_PROPERTIES.length; i++) {
			    var pname = EDIT_PROPERTIES[i];
			    self.editor.css(pname, obj.getProperty(pname));
		    }
		    self.editor.focus();
	    }, 300);
 	log("执行RichEditor.prototype.edit完毕！耗时"+(new Date().getTime()-t1)+"ms");
 }
 
 RichEditor.prototype.endEdit = function(){
 	log("开始执行RichEditor.prototype.endEdit方法");
	var t1 = new Date().getTime();
 	this._editObj.endEdit();
 	this.editor.hide();
 	log("执行RichEditor.prototype.endEdit完毕！耗时"+(new Date().getTime()-t1)+"ms");
 }
 
 RichEditor.prototype.setPosition = function(p){
 	log("开始执行RichEditor.prototype.setPosition方法");
 	var t1 = new Date().getTime();
 	this.editor.offset(p);
 	log("执行RichEditor.prototype.setPosition完毕！耗时"+(new Date().getTime()-t1)+"ms");
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
 