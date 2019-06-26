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
							autoConfig: true,
							width: 300,
							css: "webix_shadow_medium",
							select: true,
							template: "<div class='contactItem'><span class='top'>#FirstName# #LastName#</span><span class='top'> #Company#</span></div>",
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


	init(view) {
		Contacts.waitData.then(() => {
			view.queryView("list").sync(Contacts);
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
}
