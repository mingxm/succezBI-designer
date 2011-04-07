/**
 * 
 */

 function ReportStructControl(container,owner,Setting){
 	this.container = container;
	this.owner = owner;
	this._init(Setting);
 }
 
 ReportStructControl.prototype._init = function(defaultConfig){
 	var rsHtml = getReportStruct(this.owner);
    var reportStructCollection = this.container.append(rsHtml).simpleTree(defaultConfig);	 	
 	this.reportStruct = reportStructCollection[0];
 };
 
 ReportStructControl.prototype.update = function(){
 	
 };
 
 /*
  * name为新添加元素的名称，'reportStuct_'+name为新节点的id号
  */
 ReportStructControl.prototype.addNode = function(name){
 	var id = 'reportStuct_'+name;
	var text = name;
	this.reportStruct.addNode(id,name,function(){
		alert("node has been added!");
	})
 }
 
 /*
  * 删除节点时候默认是必然有节点是选中的
  */
 ReportStructControl.prototype.deleteNode = function(){
 	this.reportStruct.delNode(function(){
		alert('this node has been deleted')
	})	
 }

  /*
   * 当设计器上的元素被选中的情况下，设置树节点的相应节点也为选中的状态
   * @param name为元素的名称，调用时可以直接获取元素的名称作为参数传入
   */ 
 ReportStructControl.prototype.selectNode = function(name){
	var tempId = 'reportStruct_'+name;
	this.reportStruct.setSelected($('#'+tempId));
 }
 
 ReportStructControl.prototype.renameNode = function(name){
 	
 }
 
 /*
  * 获取控件结构，该结构不需保存，只是在初始化的时候随设计器的创建而动态的创建
  * 该函数的返回一个html，从而对结构树控件执行初始化
  */
 function getReportStruct (reportDesigner){
 	var self = reportDesigner;
	var Structhtml =$("<li class='root'><span>ReportDesinger Structs</span></li>");
	var node = $("<ul></ul>");
	var name = '';
	//如果存在表格，那么将表格加进来
	if (self.tables.len > 0){
		for (var key in self.tables.elements) {
			name = self.tables.elements[key].getName();
			node.append($("<li id ="+"reportStuct_"+name+"><span>"+name+"</span></li>"));
    	};	
		node.appendTo(Structhtml);
	}
	//如果有表头，那么将表头加进来
	if (self.headers.len > 0) {
		node = $("<ul></ul>")
		for (var key in self.headers.elements) {
			name = self.headers.elements[key].getName();
			node.append($("<li id ="+"reportStuct_"+name+"><span>"+name+"</span></li>"));
		}
		node.appendTo(Structhtml);
	}
	return Structhtml;
 };
