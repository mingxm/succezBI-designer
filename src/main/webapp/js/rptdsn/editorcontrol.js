/**
 * 
 */
 
 function ReportDesign(){
 	this.type = "ana_report";
 	this.hideGrid = false;
 	this.name = "";
 	this.caption = "";
 	this.rptid = "";
 	this._init();
 }

 ReportDesign.prototype._init = function(){
 	this.pControl = new propertyEditorControl($(".eastproperties"),this);
 }
 
 ReportDesign.prototype.getName = function(){
 	return this.name;
 }
 
 ReportDesign.prototype.setName = function(value){
 	this.name = value;
 }
 
 ReportDesign.prototype.getCaption = function(){
 	return this.caption;
 }
 
 ReportDesign.prototype.setCaption = function(value){
 	this.caption = value;
 }
 
 ReportDesign.prototype.isHiddenGrid = function(){
 	return !!this.hideGrid;
 }
 
 ReportDesign.prototype.hideGrid = function(value){
 	this.hideGrid = !!value;
 }
 
 ReportDesign.prototype.getType = function(){
 	return this.type;
 }
 
 ReportDesign.prototype.setType = function(value){
 	this.type = value;
 }