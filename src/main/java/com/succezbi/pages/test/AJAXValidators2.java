package com.succezbi.pages.test;

import java.util.ArrayList;
import java.util.List;

import org.apache.tapestry5.annotations.Import;
import org.apache.tapestry5.annotations.InjectPage;
import org.apache.tapestry5.annotations.Log;
import org.apache.tapestry5.annotations.Persist;
import org.apache.tapestry5.annotations.Property;
import org.apache.tapestry5.ioc.annotations.Inject;
import org.apache.tapestry5.json.JSONObject;
import org.apache.tapestry5.services.Request;

import com.succezbi.data.Person;

// This annotation tells Tapestry to declare the js file in the page so that the browser will pull it in.
public class AJAXValidators2 {
	private final int MAX_RESULTS = 30;

	// Screen fields

	@Property
	private String _firstName;

	@Property
	private String _lastName;

	@SuppressWarnings("unused")
	@Persist
	@Property
	private List<Person> _persons;

	// Other pages

	@InjectPage
	private NoValidationBubbles1 _page2;

	// Useful bits and pieces

	@Inject
	private Request _request;
//
//	@Inject
//	private IBusinessServicesLocator _businessServicesLocator;
//
	// The code

	void setupRender() {
		List<Person> lst = new ArrayList<Person>();
		Person p1 = new Person();
		p1.setFirstName("sss");
		p1.setLastName("kris");
		lst.add(p1);
		
		Person p2 = new Person();
		p2.setFirstName("tim");
		p2.setLastName("foo");
		lst.add(p2);
		
		this._persons = lst;
	}

	@Log
	JSONObject onAjaxValidateFromFirstName() {
		String firstName = _request.getParameter("param");

		try {
			validateFirstNameIsUnique(firstName);
		}
		catch (Exception e) {
			return new JSONObject().put("error", e.getMessage());
		}
		
		return new JSONObject();
	}

	JSONObject onAjaxValidateFromLastName() {
		String lastName = _request.getParameter("param");

		try {
			validateLastNameIsUnique(lastName);
		}
		catch (Exception e) {
			return new JSONObject().put("error", e.getMessage());
		}
		
		return new JSONObject();
	}

	Object onSuccess() {
		return _page2;
	}

	void validateFirstNameIsUnique(String firstName) throws Exception {
		if (firstName != null) {
			if (findPersonsByFirstName(firstName)) {
				throw new Exception("The name is not available.");
			}
		}
	}

	private boolean findPersonsByFirstName(String firstName) {
		List<Person> lst = this._persons;
		for (int i = 0; i < lst.size(); i++) {
			Person p = lst.get(i);
			if(p.getFirstName().equalsIgnoreCase(firstName)){
				return true;
			}
		}
		return false;
	}

	void validateLastNameIsUnique(String lastName) throws Exception {
		if (lastName != null) {
			if (findPersonsByLastName(lastName)) {
				throw new Exception("The name is not available.");
			}
		}
	}

	private boolean findPersonsByLastName(String lastName) {
		List<Person> lst = this._persons;
		for (int i = 0; i < lst.size(); i++) {
			Person p = lst.get(i);
			if(p.getLastName().equalsIgnoreCase(lastName)){
				return true;
			}
		}
		return false;
	}
}
