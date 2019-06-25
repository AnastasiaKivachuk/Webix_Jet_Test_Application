import {
	JetView
} from "webix-jet";
import {
	contacts
} from "../models/contacts";
import ContactFormView from "./contactform";


export default class ContactView extends JetView {
	config() {
		return {
			cols: [{
					rows: [
						// {
					// 		view: "template",
					// 		css: "contactTitle",
					// 		autoheight: true,
					// 		template: "contact",
					// 		align: "center"
					// 	},
						{
							view: "list",
							localId: "contactList",
							autoConfig: true,
							width: 400,
							// autoheight: true,
							css: "webix_shadow_medium",
							select: true,
							template: "<span class='top'>#FirstName# #LastName#</span> #Company#",
							on: {
								onAfterSelect: (id) => {
									this.setParam("id", id, true);

								}
							},

							// onClick: {
							// 	removeUser: (e, id) => {
							// 		webix.confirm({
							// 			text: "Do you still want to continue?"
							// 		}).then(
							// 			() => {
							// 				id = contacts.getFirstId();
							// 				if (id) {
							// 					this.show("./contacts");
							// 					contacts.remove(id);
							// 				}

							// 				return false;
							// 			}
							// 		);
							// 	}
							// }
						},

						// {
						// 	view: "button",
						// 	value: "Add new",
						// 	click: () => {
						// 		contacts.add({"Name": "New name", "Email": "New email"});
						// 	}

				]
			},
			ContactFormView
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
