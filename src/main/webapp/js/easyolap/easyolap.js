(function($){
        $(function(){
            $('body').layout({
                applyDefaultStyles: true
            });
			
			$("#tree").treeview({
				collapsed: true,
				animated: "medium",
				//control:"#sidetreecontrol",
				persist: "location"
			});
			
			$("#btn_setting").click(function(){
				var settingPanel = $("#settingPanel");
				var page_setting = settingPanel.data("page_setting");
				if(!page_setting){
					var tbl = document.createElement("table");
					
					var tr=tbl.insertRow();
					var td = tr.insertCell();
					$(td).append("<span>标题</span>");
					td = tr.insertCell();
					var $td = $(td);
					$td.append("<input id='input_headerText' value='行业资产分析'/>");
					
					var tr=tbl.insertRow();
					var td = tr.insertCell();
					$(td).append("<span>背景色</span>");
					td = tr.insertCell();
					var $td = $(td);
					$td.append("<input value='#f0f0f0' id='input_bgcolorOfRpt'/>");

					var tr=tbl.insertRow();
					var td = tr.insertCell();
					$(td).append("<span>列头颜色</span>");
					td = tr.insertCell();
					var $td = $(td);
					$td.append("<input value='#a8a8a8' id='input_bgcolorOfColumn'/>");

					var tr=tbl.insertRow();
					var td = tr.insertCell();
					var $td = $(td);
					$td.append("<input type='button' value='确定'/>&#160;<input type='button' value='取消'/>");
					
					$td.delegate("input[type=button]", "click", function(){
						var headerText = $("#input_headerText").val();
						$("#rpt_header").text(headerText);
						
						var bgcolor = $("#input_bgcolorOfRpt").val();
						$("#resultPanel").css("background-color", bgcolor);
						
						var bgcolorOfColumn = $("#input_bgcolorOfColumn").val();
						var columnRow = $("#resultTable")[0].rows[0];
//						for(var i = 0;i < columnRow.cells.length;i++){
//							var td 
//						}
						$(columnRow).css("background-color", bgcolorOfColumn);
						
						settingPanel.hide();
					});
					
					settingPanel.append(tbl);
					page_setting = tbl;
					settingPanel.data("page_setting", page_setting);
				}
				
				settingPanel.show();
			});
        });
})(jQuery);
