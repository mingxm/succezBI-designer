/**
 * 
 */
 function BiasCellEditor(container,owner){
 	CellEditor.call(this,container,owner);
 	var _self = this;
	this.container.resize(function(){
		_self.drawSelf();
	})
 }
 
 _extendClass(BiasCellEditor,CellEditor,"BiasCellEditor");
 
 BiasCellEditor.prototype.getValue = function(){
 	var value = this.container.data("value");
 	return value?value:""
 }
 
 BiasCellEditor.prototype.setValue = function(value){
 	this.container.data("value",value);
 	this.drawSelf();
 }
 
 BiasCellEditor.prototype.drawSelf = function(){
 	this.container.empty();
 	var arr = this.getValue().split(",");
 	if(arr.length>3){
 		alert("不支持！");
 		return;
 	}
 	if(arr.length == 1){
 		this.container.html(this.value);
 	}else if(arr.length == 2){
 		this.drawBias1();
 	}else if(arr.length == 3){
 		this.drawBias2();
 	}
 }
 
 BiasCellEditor.prototype.drawBias1 = function(){
 	var arr = this.getValue().split(",");
 	var p = this.container.position();
 	this.drawBias({
 		x:p.left,
 		y:p.top
 	},{
 		x:this.container.width()+p.left,
 		y:this.container.height()+p.top
 	});
 	var t = $("<table height='100%' width='100%'/>").css("table-layout","fixed").appendTo(this.container);
 	var _self = this;
 	t.bind({
 		"click":function(e){
 			e.stopPropagation();
 			_self.container.trigger("click");
 		},
 		"dblclick":function(e){
 			e.stopPropagation();
 			_self.container.trigger("dblclick");
 		}
 	})
 	var row1 = $("<tr height='50%'/>").appendTo(t);
 	var row2 = $("<tr height='50%'/>").appendTo(t);
 	$("<td width='50%'/>").css("text-align","center").appendTo(row2).html(arr[0]);
 	$("<td width='50%'/>").css("text-align","center").appendTo(row1);
 	$("<td width='50%'/>").css("text-align","center").appendTo(row1).html(arr[1]);
 }
 
 BiasCellEditor.prototype.drawBias2 = function(){
 	
 }
 
 BiasCellEditor.prototype.drawBias = function(from,to){
 	var offx = to.x - from.x;
 	var slope = (to.y - from.y)/offx;
 	var arr = [];
 	for(var i=0;i<offx;i++){ 
 		arr.push("<div class='linediv' style='left:"+(from.x+i)+"px;top:"+(from.y+slope*i)+"px;'/>");
	} 
	this.container.append(arr.join(""));
 }
 
 BiasCellEditor.prototype.drawText = function(p,value){
 	var div = $("<div/>").css(p).html(value).appendTo(this.container);
 }
 