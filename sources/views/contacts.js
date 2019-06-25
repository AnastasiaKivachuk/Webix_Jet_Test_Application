import {
	JetView
} from "webix-jet";
import {
	contacts
}  from "../models/contacts";
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
						width: 400,
						css: "webix_shadow_medium",
						select: true,
						template: "<span class='top'>#FirstName# #LastName#</span> #Company#",
						on: {
							onAfterSelect: (id) => {
								this.setParam("id", id, true);

							}
						},

					},
				]
			},
			ContactInfoView
			]
		};
	}


	init(view) {
		contacts.waitData.then(() => {
			view.queryView("list").sync(contacts);
		});
	}


	urlChange() {
		contacts.waitData.then(() => {
			const list = this.$$("contactList");
			let id = this.getParam("id");

			if (!id || !contacts.exists(id)) {
				id = contacts.getFirstId();
			}
			if (id) {
				list.select(id);
			}
		});
	}
}
