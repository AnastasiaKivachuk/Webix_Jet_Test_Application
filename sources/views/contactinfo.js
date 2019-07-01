import {
	JetView
} from "webix-jet";
import {
	Contacts
} from "../models/contacts";
import {
	Statuses
} from "../models/statuses";
import TabbarActivityFiles from "./tabbaractivityfiles";

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
							css: "webix_primary btnStyle",
							icon: "wxi-trash",
							label: "Delete",
							autowidth: true,
							click: () => {}
						},
						{
							view: "button",
							css: "webix_primary btnStyle",
							type: "icon",
							icon: "wxi-pencil",
							label: "Edit",
							autowidth: true,
							click: () => {}
						}
					]
				},
				{
					view: "template",
					autoheight: true,
					template: this.getInfo,
					borderless: true,
					css: "contact-info",
					localId: "infoContact"
				},
				TabbarActivityFiles
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
				const values = webix.copy(Contacts.getItem(id));
				values.statusStr = Statuses.getItem(values.StatusID).Value;
				this.$$("name").setValues(values);
				this.$$("infoContact").setValues(values);
			}
		});
	}

	getInfo(obj) {
		return `
		<div class="tempale">
		<div class="сolumn">
		<img class=img src="${obj.Photo || "https://img.lovepik.com/photo/40002/7350.jpg_wh860.jpg"}"/>
		<span class="status">${obj.statusStr || ""}</span>
		</div>
		<div class="сolumn">
		<div class="line"><span class="mdi mdi-email item"></span>${obj.Email || ""}</span></div>
		<div class="line"><span class="mdi mdi-skype item></span><span class="item">${obj.Skype || ""}</span></div>
		<div class="line"><span class="mdi mdi-tag item"></span><span class="item">${obj.Job || ""}</span></div>
		<div class="line"><span class="mdi mdi-briefcase item"></span><span class="item">${obj.Company || ""}</span></div>
		</div>
		<div class="сolumn">
		<div class="line"><span class="webix_icon mdi mdi-calendar item"></span><span class="item">${obj.Birthday || ""}</span></div>
		<div class="line"><span class="mdi mdi-map-marker item></span><span class="item">${obj.Address || ""}</span></div>
		</div>
		</div>`;
	}
}

