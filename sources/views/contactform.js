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
					cols: [{
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
					{
						view: "template",
						width: 50,
						borderless: true
					},
					{
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
							view: "uploader",
							value: "Upload file",
							id: "Photo",
							name: "records",
							// link: "mylist",
							upload: "http://localhost:8096/api/v1/contacts/"
						}

						]
					}

					]
				},
				{},
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
								let formValue = this.$$("myform")
									.getValues();
								console.log(formValue);
								console.log(formValue.id);
								if (this.$$("myform")
									.validate()) {
									if (formValue.id) {
										Contacts.updateItem(
											formValue.id,
											formValue
										);
									}
									else {
										Contacts.add(formValue);
									}
									this.$$("myform")
										.clearValidation();
									// this.closeForm();
								}
							}
						}
					]
				}

				],
				rules: {
					$all: webix.rules.isNotEmpty,
					Email: webix.rules.isEmail
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
			}
		});
	}
}
