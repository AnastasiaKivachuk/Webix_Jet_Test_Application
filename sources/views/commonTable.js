import {
	JetView
} from "webix-jet";

export default class CommonTable extends JetView {
	constructor(app, name, data) {
		super(app, name);
		this._tdata = data;
	}

	config() {
		return {
			rows: [
				{
					view: "datatable",
					localId: "datatableCommon",
					editable: true,
					editaction: "dblclick",
					scroll: "auto",
					select: true,
					columns: [
						{
							id: "Value",
							header: "Value",
							fillspace: true,
							editor: "text"
						},
						{
							id: "Icon",
							header: "Icon",
							width: 300,
							editor: "text"
						}]
				},
				{
					view: "button",
					value: "Add new",
					click: () => {
						this._tdata.add({Value: "New value", Icon: "New Icon"});
					}
				},
				{
					view: "button",
					value: "Delete",
					click: () => {
						let idS = this.$$("datatableCommon").getSelectedId();
						this._tdata.remove(idS);
					}
				}
			]
		};
	}

	init() {
		this.$$("datatableCommon").sync(this._tdata);
	}
}
