package com.succezbi.pages.test;

import java.util.Date;

import org.apache.tapestry5.annotations.Log;
import org.apache.tapestry5.json.JSONObject;

public class AjaxActionLink2 {
	@Log
	public String getCurrentTime(){
		return ((new Date()).toString());
	}
	
	@Log
	JSONObject onActionFromRefreshTime(){
		JSONObject json = new JSONObject();
		json.put("time", ((new Date()).toString()));
		return json;
	}
}
