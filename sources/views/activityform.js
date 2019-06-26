import {
	JetView
} from "webix-jet";
import {
	ActivityType
} from "../models/ActivityType";
import {
	Contacts
} from "../models/contacts";

export default class ActivityForm extends JetView {
	config() {
		return {
			view: "window",
			locaIid: "windowForm",
			width: 600,
			position: "center",
			modal: true,
			head: "Add activity",
			body: {
				view: "form",
				localId: "form",
				borderless: true,
				elements: [
					{
						rows: [
							{
								view: "textarea",
								label: "Details",
								labelAlign: "right"
							},
							{
								view: "richselect",
								label: "Type",
								options: {
									body: {
										template: "#Value#",
										data: ActivityType

									}
								}
							},
							{
								view: "richselect",
								label: "Contact",
								options: {
									body: {
										template: "#FirstName# #LastName#",
										data: Contacts

									}
								}
							},
							{
								cols: [
									{
										view: "datepicker",
										date: new Date(2012, 6, 8),
										label: "Date",
										name: "Date"
									},
									{
										view: "datepicker",
										date: new Date(2018, 6, 1, 8, 30),
										label: "Time",
										name: "Time",
										timepicker: true,
										type: "time"
									}
								]
							},
							{
								cols: [
									{
										view: "button",
										value: "Add"
										// click: function() {
										//     if (this.getParentView().validate()) { //validate form
										//         webix.message("All is correct");
										//         this.getTopParentView().hide(); //hide window
										//     } else
										//         webix.message({ type: "error", text: "Form data is invalid" });
										// }
									},
									{
										view: "button",
										value: "Cansel",
										click: () => {
											this.$$("windowForm").close();
										}
									}]
							}
						]
					}
				],
				rules: {
					$all: webix.rules.isNotEmpty
				}
			}
		};
	}

	showForm(data) {
		this.getRoot().show();
		if (data) {
			this.$$("form").setValues(data);
		}
	}
}
