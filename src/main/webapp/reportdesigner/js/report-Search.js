/*
 * 该单元处理设计器内部的查找替换
 */
(function($){
	var _owner = {},
		ignoreCase = false,
		wholeWordsOnly = false,
		generateTree = false;
		
	$.fn.szSearch =function(owner,option){
		_owner = owner;
				
		var searchPlugin = this;
		
		$.extend(searchPlugin,{
			_initEvent:function(){
				$("#searchClose",searchPlugin).click(function(e){
					searchPlugin.css("z-index","-1");	
				});
			},
			/*
			 * 将查询的结果以树状形式返回，然后另一个控件“查询结果树”可以据
			 * 此构造树形结构
			 */
			getResultTree:function(){
				return false;
				
			}
		});	
		
		searchPlugin._initEvent();
		return searchPlugin;
		
		function _find(option){
			
		};		
		
		function _replace(option){
			
		};
		
		function _replaceAll(option){
			
		};
		
		function _generateTree(option){
			if (!generateTree) return;
			
		};
		
	};
})(jQuery)
