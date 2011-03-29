/**
 * 
 */
 
 function TextHeader(container,owner,name,value,x,y){
 	this.objtype = "text";
 	this.x = x;
 	this.y = y;
 	rptdsnComponent.call(this,container,owner,name);
 	this._init(value);
 }
 
 _extendClass(TextHeader,rptdsnComponent,"TextHeader");
 
 TextHeader.prototype._init = function(value){
 	this.container.text(value).css("left",this.x).css("top",this.y).css("position","absolute")
 		.css("white-space","nowrap").data("pControl",this);
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
 
 TextHeader.prototype.beginEdit = function(){
 	this.owner.clearAllSelected();
 	//这两行代码顺序不能颠倒，否则在ff中会有问题
 	this.owner.getTextEditor().edit(this);
 	this.container.hide();
 }
 
 TextHeader.prototype.endEdit = function(){
 	//这两行代码顺序不能颠倒，否则在ff中会有问题
 	this.container.show();
 	this.setValue(this.owner.getTextEditor().getHtml());
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
 
 TextHeader.prototype.setValue = function(value) {
	if (value == "") {
		this.container.remove();
		this.owner.deleteHeader(this);
	}
	else {
		rptdsnComponent.prototype.setValue.call(this,value);
	}
 }