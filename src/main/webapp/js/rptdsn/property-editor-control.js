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
 			this.updateDom_text();
 			return;
 		case "table":
 			this.updateDom_table();
 			return;
 		case "flashchart":
 		case "ditu":
 		case "cell":
 			this.updateDom_cell();
 			return;
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
 					title:"名称",
 					defaultValue:_self.obj.getName(),
 					events:[{
 						name:"change",
 						fn:function(e){
 							_self.obj.setName(e.data.attr("checked"));
 						}
 					}]
 				},{
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
 
 PropertyEditorControl.prototype.updateDom_text = function(){
 	var _self = this;
 	this.container.jproeditor({
 		defaultType:"edit",
 		items:[
 			{
 				title:"名称",
 				defaultValue:_self.obj.getName(),
 				events:[{
 					name:"change",
 					fn:function(e){
 						_self.obj.setName(e.data.attr("value"));
 					}
 				}]
 			},{
 				title:"值",
 				defaultValue:_self.obj.getValue(),
 				events:[{
 					name:"change",
 					fn:function(e){
 						_self.obj.setValue(e.data.attr("value"));
 					}
 				}]
 			},{
 				title:"字体",
 				type:"combobox",
 				options:[{
 					caption:"Sans-serif",
 					value:"Sans-serif"
 				},{
 					caption:"Monospace",
 					value:"Monospace"
 				},{
 					caption:"Serif",
 					value:"Serif"
 				},{
 					caption:"Cursive",
 					value:"Cursive"
 				},{
 					caption:"Fantasy",
 					value:"Fantasy"
 				}],
 				defaultValue:_self.obj.getProperty("font-family"),
 				events:[{
 					name:"change",
 					fn:function(e){
 						_self.obj.setProperty("font-family",e.data.attr("value"));
 					}
 				}]
 			},{
 				title:"加粗",
 				type:"checkbox",
 				defaultValue:_self.obj.getProperty("font-weight") == "bold",
 				events:[{
					name:"change",
					fn:function(e){
						_self.obj.setProperty("font-weight",e.data.attr("checked")?"bold":"normal");
					}
				}]
 			},{
 				title:"斜体",
 				type:"checkbox",
 				defaultValue:_self.obj.getProperty("font-style") == "italic",
 				events:[{
 					name:"change",
 					fn:function(e){
 						_self.obj.setProperty("font-style",e.data.attr("checked")?"italic":"normal");
 					}
 				}]
 			},{
 				title:"删除",
 				type:"checkbox",
 				defaultValue:_self.obj.getProperty("text-decoration") == "line-through",
 				events:[{
 					name:"change",
 					fn:function(e){
 						_self.obj.setProperty("text-decoration",e.data.attr("checked")?"line-through":"none");
 					}
 				}]
 			},{
 				title:"对齐",
 				type:"combobox",
 				defaultValue:_self.obj.getProperty("text-align"),
 				options:[{
 					caption:"居左",
 					value:"left"
 				},{
 					caption:"居中",
 					value:"center"
 				},{
 					caption:"居右",
 					value:"right"
 				}],
 				events:[{
 					name:"change",
 					fn:function(e){
 						_self.obj.setProperty("text-align",e.data.attr("value"));
 					}
 				}]
 			},{
 				title:"字间距",
 				defaultValue:_self.obj.getProperty("letter-spacing"),
 				events:[{
 					name:"change",
 					fn:function(e){
 						_self.obj.setProperty("letter-spacing",e.data.attr("value"));
 					}
 				}]
 			}
 		]
 	});
 }
 
 PropertyEditorControl.prototype.updateDom_cell = function(){
 	var _self = this;
 	this.container.jproeditor({
 		defaultType:"edit",
 		items:[
 			{
 				title:"值",
 				defaultValue:_self.obj.getValue(),
 				events:[{
 					name:"change",
 					fn:function(e){
 						_self.obj.setValue(e.data.attr("value"));
 					}
 				}]
 			},{
 				title:"字体",
 				type:"combobox",
 				options:[{
 					caption:"Serif",
 					value:"Serif"
 				},{
 					caption:"Sans-serif",
 					value:"Sans-serif"
 				},{
 					caption:"Monospace",
 					value:"Monospace"
 				},{
 					caption:"Cursive",
 					value:"Cursive"
 				},{
 					caption:"Fantasy",
 					value:"Fantasy"
 				}],
 				defaultValue:_self.obj.getProperty("font-family"),
 				events:[{
 					name:"change",
 					fn:function(e){
 						_self.obj.setProperty("font-family",e.data.attr("value"));
 					}
 				}]
 			},{
 				title:"加粗",
 				type:"checkbox",
 				defaultValue:_self.obj.getProperty("font-weight") == "bold",
 				events:[{
					name:"change",
					fn:function(e){
						_self.obj.setProperty("font-weight",e.data.attr("checked")?"bold":"normal");
					}
				}]
 			},{
 				title:"斜体",
 				type:"checkbox",
 				defaultValue:_self.obj.getProperty("font-style") == "italic",
 				events:[{
 					name:"change",
 					fn:function(e){
 						_self.obj.setProperty("font-style",e.data.attr("checked")?"italic":"normal");
 					}
 				}]
 			},{
 				title:"删除",
 				type:"checkbox",
 				defaultValue:_self.obj.getProperty("text-decoration") == "line-through",
 				events:[{
 					name:"change",
 					fn:function(e){
 						_self.obj.setProperty("text-decoration",e.data.attr("checked")?"line-through":"none");
 					}
 				}]
 			},{
 				title:"对齐",
 				type:"combobox",
 				defaultValue:_self.obj.getProperty("text-align"),
 				options:[{
 					caption:"居左",
 					value:"left"
 				},{
 					caption:"居中",
 					value:"center"
 				},{
 					caption:"居右",
 					value:"right"
 				}],
 				events:[{
 					name:"change",
 					fn:function(e){
 						_self.obj.setProperty("text-align",e.data.attr("value"));
 					}
 				}]
 			},{
 				title:"字间距",
 				defaultValue:_self.obj.getProperty("letter-spacing"),
 				events:[{
 					name:"change",
 					fn:function(e){
 						_self.obj.setProperty("letter-spacing",e.data.attr("value"));
 					}
 				}]
 			}
 		]
 	});
 }
 
 PropertyEditorControl.prototype.updateDom_flash = function(){
 	
 }
 
 PropertyEditorControl.prototype.updateDom_ditu = function(){
 	
 }
 
 