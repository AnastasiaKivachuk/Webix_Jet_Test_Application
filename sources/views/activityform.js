import {
	JetView
} from "webix-jet";
import {
	ActivityType
} from "../models/ActivityType";
import {
	Contacts
} from "../models/contacts";
import {
	Activity
} from "../models/Activity";

export default class ActivityForm extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			view: "window",
			locaIid: "windowForm",
			width: 600,
			position: "center",
			modal: true,
			head: {
				view: "label",
				localId: "headForm",
				align: "center"
			},
			body: {
				view: "form",
				localId: "form",
				borderless: true,
				elements: [
					{
						rows: [
							{
								view: "textarea",
								name: "Details",
								label: _("Details"),
								labelAlign: "right",
								invalidMessage: "Please write details"
							},
							{
								view: "richselect",
								label: _("Type"),
								name: "TypeID",
								invalidMessage: "Please select a type",
								options: ActivityType
							},
							{
								view: "richselect",
								label: _("Contact"),
								name: "ContactID",
								localId: "ContactID",
								invalidMessage: "Please select a contact",
								options: Contacts
							},
							{
								cols: [
									{
										view: "datepicker",
										label: _("Date"),
										format: "%d %M %Y",
										name: "DueNewDate",
										invalidMessage: "Please select a date"
									},
									{
										view: "datepicker",
										label: _("Time"),
										format: "%H:%i",
										name: "DueNewTime",
										timepicker: true,
										type: "time",
										invalidMessage: "Please select time"
									}
								]
							},
							{
								view: "checkbox",
								label: _("Completed"),
								name: "State",
								checkValue: "Close",
								uncheckValue: "Open"
							},
							{
								cols: [{
									view: "button",
									localId: "addBtn",
									value: _("Save"),
									click: () => {
										let formValue = this.$$("form").getValues();
										if (this.$$("form").validate()) {
											if (formValue.id) {
												Activity.updateItem(formValue.id, formValue);
											}
											else {
												Activity.add(formValue);
											}
											this.closeForm();
										}
									}
								},
								{
									view: "button",
									value: _("Cancel"),
									click: () => {
										this.closeForm();
									}
								}
								]
							}
						]
					}],
				rules: {
					$all: webix.rules.isNotEmpty
				}
			}
		};
	}

	showForm(data, mode, dis) {
		this.getRoot().show();
		if (data) {
			this.$$("form").setValues(data);
		}
		if (mode) {
			this.$$("headForm").setValue(`${mode} activity`);
		}
		if (dis) {
			this.$$("ContactID").disable();
		}
	}

	closeForm() {
		this.$$("form").clear();
		this.$$("form").clearValidation();
		this.getRoot().hide();
	}
}
