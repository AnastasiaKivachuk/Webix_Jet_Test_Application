import {
	JetView
} from "webix-jet";
import {
	Contacts
} from "../models/contacts";
import ContactInfoView from "./contactinfo";


export default class ContactView extends JetView {
	config() {
		return {
			cols: [
				{
					rows: [
						{
							view: "list",
							localId: "contactList",
							width: 300,
							css: "webix_shadow_medium",
							select: true,
							template: this.getUser,
							type: {
								height: 60
							},
							on: {
								onAfterSelect: (id) => {
									this.setParam("id", id, true);
								}
							}
						}
					]
				},
				ContactInfoView
			]
		};
	}


	init() {
		Contacts.waitData.then(() => {
			this.$$("contactList").sync(Contacts);
		});
	}


	urlChange() {
		Contacts.waitData.then(() => {
			const list = this.$$("contactList");
			let id = this.getParam("id");

			if (!id || !Contacts.exists(id)) {
				id = Contacts.getFirstId();
			}
			if (id) {
				list.select(id);
			}
		});
	}

	getUser(obj) {
		return `<div class='contactItem'>
					<image class="littleImg" src="${obj.Photo}" /> 
					<div class="contactInfo">
						<span class="contactName">${obj.FirstName} ${obj.LastName}</span>
						<span class="contactJob">${obj.Job}</span>
					</div>
					</div>
					`;
	}
}
