/**
 * 
 */
 function PropertyEditorControl(container,reportControl){
 	this.container = container;
 	this.reportControl = reportControl;
 	this.obj = reportControl;
 	this._init();
 }
 
 PropertyEditorControl.prototype._init = function(){
 	this._updateDom();
 }
 
 PropertyEditorControl.prototype.switchByObj = function(obj){
 	this.obj = obj;
 	this._updateDom();
 }
 
 PropertyEditorControl.prototype._updateDom = function(){
 	this.container.empty();
 	switch(this.obj.objtype){
 		case "text":
 		case "table":
 			this.updateDom_table();
 			return;
 		case "flashchart":
 		case "ditu":
 		case "report":
 			this.updateDom_report();
 			return;
 		default:
 			this.updateDom_report();
 			return;
 	}
 }
 
 PropertyEditorControl.prototype.updateDom_report = function() {
 	var _self = this;
	this.container.jproeditor({
		    defaultType	: 'edit',
		    items		    : [{
			        title		: '报表名称',
			        type		: 'edit',
			        defaultValue:_self.reportControl.getName(),
			        events	: [{
				            name	: 'change',
				            fn		: function(e) {
					            var obj = e.data;
					            _self.reportControl.setName(obj.attr("value"));
				            }
			            }]
		        }, {
			        title		: '报表标题',
			        type		: 'edit',
			        defaultValue:_self.reportControl.getCaption(),
			        events	: [{
				            name	: 'change',
				            fn		: function(e) {
					            _self.reportControl.setCaption(e.data.attr("value"));
				            }
			            }]
		        }, {
			        title		: '隐藏表格',
			        type		: 'checkbox',
			        defaultValue:_self.reportControl.isHiddenGrid(),
			        events	: [{
				            name	: 'change',
				            fn		: function(e) {
					            _self.reportControl.hideGrid(e.data.attr("checked"));
				            }
			            }]
		        }, {
			        title		: '报表类型',
			        type		: 'radio',
			        name		: 'report_type',
			        defaultValue:_self.reportControl.getType(),
			        items		: [{
				            value		: 'ana_document',
				            caption	: '分析报告',
				            checked	: true
			            }, {
				            value		: 'ana_report',
				            caption	: '分析表'
			            }, {
				            caption	: '主题表',
				            value		: 'dwsubject'
			            }],
			        events	: [{
				            name	: 'click',
				            fn		: function(e) {
					            _self.reportControl.setType(e.data.attr("value"));
				            }
			            }]
		        }]
	    });
}
 
 PropertyEditorControl.prototype.updateDom_table = function(){
 	var _self = this;
 	this.container.jproeditor({
 		defaultType:'edit',
 		items:[
				{
					title:'隐藏表格',
					type:'checkbox',
					defaultValue:_self.obj.isHiddenGrid(),
					events:[{
						name:'change',
						fn:function(e){
							_self.obj.hideGrid(e.data.attr("checked"));
						}
					}]
				},{
					title:'报表风格',
					type:'combobox',
					defaultValue:_self.obj.getReportStyle(),
					options:[{
						caption:'缺省',
						value:'#B6CADD'
					},{
						caption:'橘黄',
						value:'#E0C491'
					},{
						caption:'橘红',
						value:'#DEBDDE'
					},{
						caption:'淡蓝',
						value:'#AFD0A0'
					},{
						caption:'经典',
						value:'#C0C0C0'
					},{
						caption:'红色',
						value:'#FF0000'
					},{
						caption:'绿色',
						value:'00FF00'
					},{
						caption:'蓝色',
						value:'0000FF'
					}],
					events:[{
						name:'change',
						fn:function(e){
							_self.obj.setReportStyle(e.data.attr("value"));
						}
					}]
				},{
					title:'每页行数',
					type:'edit',
					defaultValue:_self.obj.getRowCountPerPage(),
					events:[{
						name:'change',
						fn:function(e){
							_self.obj.setRowCountPerPage(e.data.attr("value"));
						}
					}]
				}
			]
 	});
 }
 
 PropertyEditorControl.prototype.updateDom_edit = function(){
 	
 }
 
 PropertyEditorControl.prototype.updateDom_flash = function(){
 	
 }
 
 PropertyEditorControl.prototype.updateDom_ditu = function(){
 	
 }
 
 