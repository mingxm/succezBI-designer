/**
 * 
 */
 function propertyEditorControl(container,reportControl){
 	this.container = container;
 	this.reportControl = reportControl;
 	this.obj = reportControl;
 	this.type = "report";
 	this._init();
 }
 
 propertyEditorControl.prototype._init = function(){
 	this._updateDom()
 }
 
 propertyEditorControl.prototype.switchByObj = function(obj,type){
 	this.obj = obj;
 	this.type = type;
 	this._updateDom();
 }
 
 propertyEditorControl.prototype._updateDom = function(){
 	this.container.empty();
 	switch(this.type){
 		case "text":
 		case "table":
 		case "flashchart":
 		case "ditu":
 		case "report":
 			this.updateDom_report();
 			return;
 		case "":
 			this.updateDom_report();
 			return;
 	}
 }
 
 propertyEditorControl.prototype.updateDom_report = function() {
 	var _self = this;
	this.container.jproeditor({
		    defaultType	: 'type',
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
					            var obj = e.data;
					            _self.reportControl.setCaption(obj.attr("value"));
				            }
			            }]
		        }, {
			        title		: '隐藏表格',
			        type		: 'checkbox',
			        defaultValue:_self.reportControl.isHiddenGrid(),
			        events	: [{
				            name	: 'change',
				            fn		: function(e) {
					            var obj = e.data;
					            _self.reportControl.hiddenGrid(obj.attr("checked"));
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
 
 propertyEditorControl.prototype.updateDom_table = function(){
 	
 }
 
 propertyEditorControl.prototype.updateDom_edit = function(){
 	
 }
 
 propertyEditorControl.prototype.updateDom_flash = function(){
 	
 }
 
 propertyEditorControl.prototype.updateDom_ditu = function(){
 	
 }
 
 