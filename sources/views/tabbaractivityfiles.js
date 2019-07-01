import {
	JetView
} from "webix-jet";
import {
	Activity
} from "../models/Activity";
import {
	ActivityType
} from "../models/ActivityType";
import {
	Contacts
} from "../models/contacts";
import ActivityForm from "./activityform";

import {
	Records
} from "../models/records";

export default class TabbarActivityFiles extends JetView {
	config() {
		// webix.$$("records").send(() => {
		// 	// getting file properties
		// 	webix.$$("records").files.data.each((obj) => {
		// 		let size = obj.size;
		// 		let name = obj.name;
		// 		let idFile = obj.id;
		// 		webix.message(`name: ${name}, size ${size}, idFile ${idFile} `);
		// 	});
		// });
		return {
			rows: [{
				borderless: true,
				view: "tabbar",
				localId: "tabbar",
				multiview: true,
				options: [{
					value: "Activities",
					id: "activities"
				},
				{
					value: "Files",
					id: "files"
				}
				]
			},
			{
				cells: [
					{
						rows: [{
							id: "activities",
							view: "datatable",
							autoConfig: true,
							scrollX: false,
							select: true,
							columns: [{
								id: "checkbox",
								header: "",
								template: "{common.checkbox()}",
								width: 50
							},
							{
								id: "TypeID",
								editor: "select",
								header: [{
									content: "selectFilter"
								}],
								options: ActivityType,
								width: 300,
								sort: "string"
							},
							{
								id: "DueNewDate",
								format: webix.i18n.longDateFormatStr,
								header: [{
									content: "dateRangeFilter"
								}],
								width: 300,
								sort: "date"
							},
							{
								id: "Details",
								header: [{
									content: "textFilter"
								}],
								fillspace: true,
								sort: "string"
							},
							{
								template: "<span class='webix_icon wxi-pencil editBtn'></span>",
								width: 40
							},
							{
								template: "<span class='webix_icon wxi-trash removeBtn'></span>",
								width: 40
							}
							],
							onClick: {
								removeBtn: (el, id) => {
									webix.confirm({
										text: "Do you still want to continue?",
										callback: (result) => {
											if (result) {
												Activity.remove(id);
											}
										}
									});
									return false;
								},
								editBtn: (el, id) => {
									this.form.showForm(Activity.getItem(id),
										"Edit");
								}
							}
						},
						{
							view: "button",
							type: "icon",
							css: "webix_primary",
							icon: "wxi-plus",
							label: "Add activity",
							click: () => {
								this.form.showForm({}, "Add");
							}

						}]
					},
					{
						view: "form",
						id: "files",
						rows: [
							// 	{
							// 	view: "list",
							// 	id: "mylist",
							// 	type: "uploader",
							// 	autoheight: true,
							// 	borderless: true
							// },
							{
								localId: "mydatatable",
								view: "datatable",
								autoConfig: true,
								scrollX: false,
								select: true,
								columns: [
									{
										name: "name",
										header: "Name",
										width: 300,
										sort: "string",
										fillspace: true
									},
									{
										name: "lastModifiedDate",
										format: webix.i18n.longDateFormatStr,
										header: "Change date",
										width: 300,
										sort: "date"
									},
									{
										name: "sizetext",
										header: "Size",
										width: 300,
										sort: "string"
									},
									{
										template: "<span class='webix_icon wxi-trash removeBtn'></span>",
										width: 40
									}
								],
								onClick: {
									removeBtn: (el, id) => {
										webix.confirm({
											text: "Do you still want to continue?",
											callback: (result) => {
												if (result) {
													Activity.remove(id);
												}
											}
										});
										return false;
									}

								}
							},
							{
								view: "uploader",
								label: "Upload file",
								// localId: "records",
								name: "records",
								type: "icon",
								icon: "wxi-download",
								// link: "mydatatable",
								on: {
									onBeforeFileAdd(unload) {
										// const id = this.getParam("id");
										// console.log(id);
										Records.add({
											name: unload.name,
											sizetext: unload.sizetext,
											lastModifiedDate: unload.file.lastModifiedDate
											// contactID: idContact
										});
										console.log(unload);
										return false;
									}
								}
							}
						]
					}

				]
			}
			]
		};
	}

	init() {
		this.form = this.ui(ActivityForm);
	}

	urlChange() {
		Records.waitData.then(() => {
			// let id = this.getParam("id");
			// if (id && Contacts.exists(id)) {
			this.$$("mydatatable").sync(Records);
			// 	Records.data.filter(data => data.contactID.toString() === id.toString());
			// }
		});

		webix.promise.all([
			Activity.waitData,
			Contacts.waitData,
			ActivityType.waitData
		]).then(() => {
			let id = this.getParam("id");
			if (id && Contacts.exists(id)) {
				webix.$$("activities").sync(Activity);
				Activity.data.filter(obj => obj.ContactID.toString() === id.toString());
			}
		});
	}
}
