package com.succezbi.pages.test;

import org.apache.tapestry5.annotations.IncludeJavaScriptLibrary;
import org.apache.tapestry5.annotations.InjectPage;
import org.apache.tapestry5.annotations.Property;

/* This annotation tells Tapestry to declare the js file in the page so that the browser will pull it in. */
@IncludeJavaScriptLibrary("context:test/validators.js")
public class CreatingValidators1 {

	// Screen fields

	@Property
	private String _firstName;

	@Property
	private String _lastName;

	// Other pages

//	@InjectPage
//	private CreatingValidators2 _page2;

	// The code

//	Object onSuccess() {
//		_page2.set(_firstName, _lastName);
//		return _page2;
//	}
}
