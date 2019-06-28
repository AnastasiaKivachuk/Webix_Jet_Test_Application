import {
	JetView
} from "webix-jet";
import {
	Contacts
} from "../models/contacts";
import {
	Statuses
} from "../models/statuses";

export default class ContactFromView extends JetView {
	config() {
		return {
			rows: [{
				template: "Add contact",
				align: "left",
				css: "nameStyle",
				autoheigth: true,
				localId: "name",
				height: 40
			},
			{
				view: "form",
				localId: "myform",
				borderless: true,
				elements: [{
					paddingY: 50,
					cols: [{
						width: 500,
						margin: 10,
						paddingX: 60,
						borderless: true,
						rows: [{
							view: "text",
							label: "First Name",
							name: "FirstName",
							css: "inputStyle",
							invalidMessage: "Please write first name"
						},
						{
							view: "text",
							label: "Last Name",
							name: "LastName",
							invalidMessage: "Please write last name"
						},
						{
							view: "datepicker",
							label: "Joing date",
							format: "%d %M %Y",
							name: "newStartDate",
							invalidMessage: "Please select a date"
						},
						{
							label: "Status",
							name: "StatusID",
							view: "richselect",
							invalidMessage: "Please select status",
							options: {
								body: {
									template: "#Value#",
									data: Statuses

								}
							}
						},
						{
							view: "text",
							label: "Job",
							name: "Job",
							invalidMessage: "Please write job"
						},
						{
							view: "text",
							label: "Company",
							name: "Company",
							invalidMessage: "Please write company"
						},
						{
							view: "text",
							label: "Website",
							name: "Website",
							invalidMessage: "Please write website"
						},
						{
							view: "text",
							label: "Address",
							name: "Address",
							invalidMessage: "Please write address"
						}
						]
					},
					{},
					{
						width: 500,
						margin: 10,
						paddingX: 60,
						borderless: true,
						rows: [{
							view: "text",
							label: "Email",
							name: "Email",
							invalidMessage: "Please write email"
						},
						{
							view: "text",
							label: "Skype",
							name: "Skype",
							invalidMessage: "Please write skype"
						},
						{
							view: "text",
							label: "Phone",
							name: "Phone",
							invalidMessage: "Please write phone number"
						},
						{
							view: "datepicker",
							label: "Birthday",
							format: "%d %M %Y",
							name: "newBirthday",
							invalidMessage: "Please select a date"
						},
						{
							cols: [
								{
									view: "template",
									// template: <img class="img", src="" />,
									css: "img",
									height: 100,
									width: 100,
									template: "Photo"
									// "<img class="img", src="" />"
								},
								{
									rows:
										[
											{
												view: "uploader",
												value: "Upload file",
												id: "Photo",
												name: "records",
												autowidth: true,
												// link: "mylist",
												upload: "http://localhost:8096/api/v1/contacts/"
											},
											{
												view: "button",
												css: "webix_primary btnStyle",
												label: "Delete",
												autowidth: true,
												click: () => { }
											}
										]
								}

							]
						}
							// {
							// 	view: "uploader",
							// 	value: "Upload file",
							// 	id: "Photo",
							// 	name: "records",
							// 	// link: "mylist",
							// 	upload: "http://localhost:8096/api/v1/contacts/"
							// }

						]
					}

					]
				},
				{
					cols: [{},
						{
							view: "button",
							value: "Cancel",
							autowidth: true,
							css: "webix-primary",
							click: () => {
							// let form = this.$$("myform");
							// if (form.isDirty()) {
							// 	if (!form.validate()) { return false; }
							// 	let changed = this.$$("myform").getDirtyValues();
							// 	contacts.updateItem(this.getParam("id"), changed);
							}
						},
						{
							view: "button",
							value: "Save",
							autowidth: true,
							css: "webix-primary",
							click: () => {
								let formValue = this.$$("myform").getValues();
								if (this.$$("myform").validate()) {
									if (formValue.id) {
										Contacts.updateItem(formValue.id, formValue);
									}
									else {
										Contacts.add(formValue);
									}
								// this.closeForm();
								}
							}
						}
					]
				}

				],
				rules: {
					FirstName: webix.rules.isNotEmpty,
					LastName: webix.rules.isNotEmpty,
					newStartDate: webix.rules.isNotEmpty,
					StatusID: webix.rules.isNotEmpty,
					Job: webix.rules.isNotEmpty,
					Company: webix.rules.isNotEmpty,
					Website: webix.rules.isNotEmpty,
					Email: webix.rules.isEmail,
					Skype: webix.rules.isNotEmpty,
					Phone: webix.rules.isNotEmpty,
					newBirthday: webix.rules.isNotEmpty
				}


			},
			{}
			]
		};
	}

	urlChange() {
		webix.promise.all([
			Contacts.waitData,
			Statuses.waitData
		]).then(() => {
			const id = this.getParam("id");
			if (id && Contacts.exists(id)) {
				this.$$("myform").setValues(Contacts.getItem(id));
			}
			else {
				this.$$("myform").clear();
				this.$$("myform").clearValidation();
			}
		});
	}
}
