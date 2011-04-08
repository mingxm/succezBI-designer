/**
 * 
 */
(function($){
	var _owner ={},
	_reportStruct={};
	
	$.fn.ReportStructControl = function(owner,Setting){
		_owner = owner;
		
		var _container =this;
				
		$.extend(_container,{
			_init:function(defaultConfig){
				var rsHtml = getReportStruct(_owner);
				$.extend(defaultConfig,{afterClick:afterClickNode});
    			var reportStructCollection = _container.append(rsHtml).simpleTree(defaultConfig);	 	
 				_reportStruct = reportStructCollection[0];				
			},
			_update:function(){
				
			},
 			/*
 			 * name为新添加元素的名称，'reportStuct_'+name为新节点的id号
  			 */			
			_addNode:function(name){
				var id = 'reportStuct_'+name;
				var text = name;
				_reportStruct.addNode(id,name,function(){
					alert("node has been added!");
				})				
			},
 		   /*
  			* 删除节点时候默认是必然有节点是选中的
  			*/			
			_deleteNode:function(){
 				_reportStruct.delNode(function(){
					alert('this node has been deleted')
				})					
			},
 		   /*
   			* 当设计器上的元素被选中的情况下，设置树节点的相应节点也为选中的状态
   			* @param name为元素的名称，调用时可以直接获取元素的名称作为参数传入
   			*/			
			_selectNode:function(name){
				var tempId = 'reportStruct_'+name;
				_reportStruct.setSelected($('#'+tempId));				
			},
			
			_renameNode:function(){
				
			},
			//测试该这种形式的方法能否正常工作
			_test:function(){
				alert('this is a test!');
			}			
		});
		
	//初始化	
	this._init(Setting);
		
	return _container;
	
 	/*
  	* 获取控件结构，该结构不需保存，只是在初始化的时候随设计器的创建而动态的创建
  	* 该函数的返回一个html，从而对结构树控件执行初始化
  	*/
 	function getReportStruct(reportDesigner){
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
		
	/*
	 * 回调函数，点击节点之后的回调函数，可以在该函数中设置选中表格或者表头为选中状态
	 */
	function afterClickNode(target){	
	
		var name = target.text();
		
		if (_owner.tables.containsKey(name)) 
		{
		    alert(_owner.tables.get(name).getName());
		} 
		else if(_owner.headers.containsKey(name)) 
		{
			alert(_owner.headers.get(name).getName());	
		} 
		else{
			alert("It is wrong!");
		}
 	}		
}
})(jQuery)

