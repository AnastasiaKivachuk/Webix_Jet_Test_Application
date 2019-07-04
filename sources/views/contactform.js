import {
	JetView
} from "webix-jet";
import {
	Contacts
} from "../models/contacts";
import {
	Statuses
} from "../models/statuses";

export default class ContactFormView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			rows: [{
				template: _("Add contact"),
				align: "left",
				css: "nameStyle",
				localId: "name",
				autoheight: true
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
							label: _("First Name"),
							name: "FirstName",
							css: "inputStyle",
							invalidMessage: "Please write first name"
						},
						{
							view: "text",
							label: _("Last Name"),
							name: "LastName",
							invalidMessage: "Please write last name"
						},
						{
							view: "datepicker",
							label: _("Joing date"),
							format: "%d %M %Y",
							name: "newStartDate",
							invalidMessage: "Please select a date"
						},
						{
							label: _("Status"),
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
							label: _("Job"),
							name: "Job",
							invalidMessage: "Please write job"
						},
						{
							view: "text",
							label: _("Company"),
							name: "Company",
							invalidMessage: "Please write company"
						},
						{
							view: "text",
							label: _("Website"),
							name: "Website",
							invalidMessage: "Please write website"
						},
						{
							view: "text",
							label: _("Address"),
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
							label: _("Phone"),
							name: "Phone",
							invalidMessage: "Please write phone number"
						},
						{
							view: "datepicker",
							label: _("Birthday"),
							format: "%d %M %Y",
							name: "newBirthday",
							invalidMessage: "Please select a date"
						},
						{
							cols: [{
								view: "template",
								localId: "preview",
								template: "<img src='#src#' class='imgForm'></img>",
								height: 100,
								width: 100,
								borderless: true
							},
							{
								rows: [{
									view: "uploader",
									accept: "image/jpeg, image/png",
									value: _("Upload file"),
									localId: "Photo",
									name: "records",
									autowidth: true,
									autosend: false,
									multiple: false,
									on: {
										onBeforeFileAdd: (upload) => {
											let file = upload.file;
											let reader = new FileReader();
											reader.onload = (event) => {
												this.$$("preview").setValues({
													src: event.target.result
												});
												this.$$("myform").setValues({Photo: event.target.result}, true);
												this.$$("preview").show();
											};
											reader
												.readAsDataURL(
													file
												);
											return false;
										}
									}
								},
								{
									view: "button",
									css: "webix_primary btnStyle",
									label: _("Delete"),
									autowidth: true,
									click: () => {
										this.$$("preview").setValues({
											src: "https://img.lovepik.com/photo/40002/7350.jpg_wh860.jpg"
										});
										this.$$("preview").show();
									}
								}
								]
							}

							]
						}

						]
					}

					]
				},
				{
					cols: [{},
						{
							view: "button",
							value: _("Cancel"),
							autowidth: true,
							css: "webix-primary",
							click: () => {
								let id = this.getParam("id", true);
								this.app.callEvent("showContactInfoView", [id]);
								this.getRoot().getParentView().queryView("list").enable();
							}
						},
						{
							view: "button",
							localId: "SaveAddBTN",
							width: 70,
							css: "webix-primary",
							click: () => {
								let formValue = this.$$("myform")
									.getValues();
								if (this.$$("myform").validate()) {
									if (formValue.id) {
										Contacts.updateItem(formValue
											.id, formValue);
									}
									else {
										Contacts.add(formValue);
										let lastId = this.getRoot().getParentView().queryView("list").getLastId();
										this.app.callEvent("showContactInfoView", [lastId]);
										this.getRoot().getParentView().queryView("list").enable();
									}
								}
							}
						}
					]
				}

				],
				rules: {
					FirstName: webix.rules.isNotEmpty,
					LastName: webix.rules.isNotEmpty,
					newStartDate: value => value <= new Date(),
					StatusID: webix.rules.isNotEmpty,
					Job: webix.rules.isNotEmpty,
					// Email: webix.rules.isEmail,
					newBirthday: value => value < new Date()
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
			const mode = this.getParam("mode", true);
			if (mode) {
				this.$$("name").setHTML(`<H2 class="nameStyle">${mode} contact</H2>`);

				if (mode === "Add") {
					this.$$("myform").setValues({});
					this.$$("SaveAddBTN").setValue("Add");
					this.$$("preview").setValues({src: "https://img.lovepik.com/photo/40002/7350.jpg_wh860.jpg"});
					this.getRoot().getParentView().queryView("list").disable();
				}
				if (mode === "Edit") {
					const id = this.getParam("id", true);
					let contactItem = Contacts.getItem(id);
					this.$$("SaveAddBTN").setValue("Save");
					if (id && Contacts.exists(id)) {
						this.$$("myform").setValues(Contacts.getItem(id));
						this.$$("preview").setValues({src: contactItem.Photo || "https://img.lovepik.com/photo/40002/7350.jpg_wh860.jpg"});
					}
					else {
						this.$$("myform").clear();
						this.$$("myform").clearValidation();
					}
				}
			}
		});
	}
}
