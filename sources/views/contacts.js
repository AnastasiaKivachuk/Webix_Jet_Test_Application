import {
	JetView
} from "webix-jet";
import {
	Contacts
} from "../models/contacts";

export default class ContactView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			cols: [{
				rows: [{
					view: "text",
					localId: "listInput",
					placeholder: _("Type something here"),
					on: {
						onTimedKeyPress: () => {
							let valueInput = this.$$("listInput").getValue().toLowerCase();
							this.$$("contactList").filter(obj => obj.value.toLowerCase().indexOf(valueInput) !== -1 ||
								obj.Job.toLowerCase().indexOf(valueInput) !== -1);
						}
					}
				},
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

				},
				{
					view: "button",
					type: "icon",
					css: "webix_primary",
					icon: "wxi-plus",
					label: _("Add contact"),
					click: () => {
						this.setParam("mode", "Add");
						this.show("contactform").then();
					}
				}
				]
			},
			{$subview: true}
			]
		};
	}


	init() {
		Contacts.waitData.then(() => {
			this.$$("contactList").sync(Contacts);
			this.show("/top/contacts/contactinfo").then();
		});

		this.on(this.app, "showContactInfoView", (id) => {
			this.show("/top/contacts/contactinfo").then(() => {
				this.setParam("id", id, true);
			});
		});
		this.on(this.app, "showContactForm", (mode) => {
			this.show("contactform").then(() => {
				this.setParam("mode", mode, true);
			});
		});
	}

	urlChange() {
		Contacts.waitData.then(() => {
			const list = this.$$("contactList");
			let id = this.getParam("id");
			if (!id || !Contacts.exists(id)) {
				id = Contacts.getFirstId();
			}
			if (id && id !== list.getSelectedId()) {
				list.select(id);
			}
		});
	}


	getUser(obj) {
		return `<div class='contactItem'>
					<image class="littleImg" src="${obj.Photo || "https://img.lovepik.com/photo/40002/7350.jpg_wh860.jpg"}" />
					<div class="contactInfo">
						<span class="contactName">${obj.FirstName} ${obj.LastName}</span>
						<span class="contactJob">${obj.Job || ""}</span>
					</div>
					</div>
					`;
	}
}

