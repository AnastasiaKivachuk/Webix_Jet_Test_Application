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
								label: "Details",
								labelAlign: "right",
								invalidMessage: "Please write details"
							},
							{
								view: "richselect",
								label: "Type",
								name: "TypeID",
								invalidMessage: "Please select a type",
								options: ActivityType
							},
							{
								view: "richselect",
								label: "Contact",
								name: "ContactID",
								invalidMessage: "Please select a contact",
								options: Contacts
							},
							{
								cols: [
									{
										view: "datepicker",
										label: "Date",
										format: "%d %M %Y",
										name: "DueNewDate",
										invalidMessage: "Please select a date"
									},
									{
										view: "datepicker",
										label: "Time",
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
								label: "Completed",
								name: "State",
								checkValue: "Close",
								uncheckValue: "Open",
								template: "{common.checkbox()}",
								editor: "checkbox"
							},
							{
								cols: [{
									view: "button",
									localId: "addBtn",
									value: "Save",
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
									value: "Cansel",
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

	showForm(data, mode) {
		this.getRoot().show();
		if (data) {
			this.$$("form").setValues(data);
		}
		if (mode) {
			this.$$("headForm").setValue(`${mode} activity`);
		}
	}

	closeForm() {
		this.$$("form").clearValidation();
		this.getRoot().hide();
	}
}
