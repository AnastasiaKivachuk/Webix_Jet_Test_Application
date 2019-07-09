import {
	JetView
} from "webix-jet";
import {
	Icons
} from "../models/icons";

export default class CommonTable extends JetView {
	constructor(app, name, data) {
		super(app, name);
		this._tdata = data;
	}

	config() {
		const _ = this.app.getService("locale")._;
		return {
			rows: [{
				view: "datatable",
				localId: "datatableCommon",
				editable: true,
				scrollY: true,
				scrollX: false,
				select: true,
				editaction: "dblclick",
				columns: [{
					id: "Value",
					header: _("Value"),
					fillspace: true,
					editor: "text"
				},
				{
					id: "Icon",
					header: _("Icon"),
					width: 300,
					editor: "richselect",
					collection: Icons,
					template: "<span class='webix_icon #Icon#'></span>",
					suggest: {
						body: {
							template: "<span class='webix_icon #value#'></span>"
						}
					}
				}
				]
			},
			{
				view: "button",
				value: _("Add new"),
				click: () => {
					this._tdata.add({
						Value: "New value",
						Icon: "New Icon"
					}, 0);
				}
			},
			{
				view: "button",
				value: _("Delete"),
				click: () => {
					let idS = this.$$("datatableCommon")
						.getSelectedId();
					if (idS) {
						webix.confirm({
							text: _("Do you still want to continue?"),
							callback: (result) => {
								if (result) {
									this._tdata.remove(idS);
								}
							}
						});
					}
				}
			}
			]
		};
	}

	init() {
		this.$$("datatableCommon").sync(this._tdata);
	}
}
