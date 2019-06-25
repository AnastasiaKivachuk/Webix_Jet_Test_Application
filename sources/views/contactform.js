import {
	JetView
} from "webix-jet";
import {
	contacts
} from "../models/contacts";




export default class ContactFormView extends JetView {
	config() {
		return {
			rows: [{
					cols: [{
							view: "template",
							autoheight: true,
							template: "#FirstName# #LastName#",
							align: "left",
							localId: "name"
						},
						{
							view: "button",
							type:"icon",
							icon:"wxi-trash",
							label:"Delete",
							autowidth: true,
							click: () => {}
						},
						{
							view: "button",
							type:"icon",
							icon:"wxi-pencil",
							label:"Edit",
							autowidth: true,
							click: () => {}
						}
					]

				},
				{
					view: "form",
					localId: "myform",
					elements: [
						// {
						// 	view: "text",
						// 	label: "User Name",
						// 	name: "Name"
						// },
						{
							view: "text",
							label: "Email",
							name: "Email"
						},
						{
							view: "text",
							label: "Skype",
							name: "Skype"
						},
						{
							view: "text",
							label: "Job",
							name: "Job"
						},
						{
							view: "text",
							label: "Company",
							name: "Company"
						},
						{
							view: "text",
							label: "Birthday",
							name: "Birthday"
						},
						{
							view: "text",
							label: "Address",
							name: "Address"
						},
						{
							view: "text",
							label: "StatusID",
							name: "StatusID"
						}
					]
					},
					{},
					// {
					// 	view: "template",
					// 	autoheight: true,
					// 	template: "<span class="Email">Email</span> #Email# -<span class="Skype">Skype</span> #Skype#",
					// 	localId: "personInfo"
					// },

			]
			};
		}

		urlChange() {
			contacts.waitData.then(() => {
				const id = this.getParam("id");
				if (id && contacts.exists(id)) {
					this.$$("name").setValues(contacts.getItem(id));
					this.$$("myform").setValues(contacts.getItem(id));
					// this.$$("personInfo").setValues(contacts.getItem(id));
				} else {
					this.$$("name").clear();
					this.$$("myform").clear();
					// this.$$("personInfo").clear();

				}
			});
		}
	}

