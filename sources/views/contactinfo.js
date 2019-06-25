import {
	JetView
} from "webix-jet";
import {
	Contacts
} from "../models/contacts";
import {
	statuses
} from "../models/statuses";




export default class ContactInfoView extends JetView {
	config() {
		return {
			rows: [
				{
					cols: [
						{
							view: "template",
							autoheight: true,
							template: "#FirstName# #LastName#",
							align: "left",
							css: "nameStyle",
							localId: "name"
						},
						{
							view: "button",
							type: "icon",
							css: "webix_primary",
							icon: "wxi-trash",
							label: "Delete",
							autowidth: true,
							click: () => { }
						},
						{
							view: "button",
							css: "webix_primary",
							type: "icon",
							icon: "wxi-pencil",
							label: "Edit",
							autowidth: true,
							click: () => { }
						}
					],
				},
				{
					view: "template",
					autoheight: true,
					template: this.getInfo
				},
				{}
			]
		};
	}


	urlChange() {
		Contacts.waitData.then(() => {
			const id = this.getParam("id");
			
			if (id && Contacts.exists(id)) {
				this.$$("name").setValues(Contacts.getItem(id));
				this.$$("obj").setValues(Contacts.getItem(id));
			} else {
				this.$$("name").clear();
				this.$$("obj").clear();

			}
		});
	}
}
function getInfo(obj) {
let html =`<div class="leftColumn">
<img width=100, heigth=100>
<div class="status">${Value}</div>
</div><div class="centerColumn">
<div class="webix_icon mdi mdi-email">${Email}</div>
<div class="webix_icon mdi mdi-skype>${Skype}</div>
<div class="webix_icon mdi mdi-job">${Job}</div>
<div class="webix_icon mdi mdi-company>${Company}</div>
</div>
<div class="rightColumn">
<div class="webix_icon mdi mdi-calendar">${Birthday}</div>
<div class="webix_icon mdi mdi-location>${Adress}</div>
</div>`;
return html; }