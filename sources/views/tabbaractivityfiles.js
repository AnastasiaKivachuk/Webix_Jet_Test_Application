import {
	JetView
} from "webix-jet";
import {
	Activity
} from "../models/Activity";
import {
	ActivityType
} from "../models/ActivityType";
import ActivityForm from "./activityform";

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
					{rows: [{
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
								console.log(Activity.getItem(id));
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

					}]},
					{
						view: "form",
						id: "files",
						rows: [{
							view: "list",
							id: "mylist",
							type: "uploader",
							autoheight: true,
							borderless: true
						},
						// {
						// 	view: "datatable",
						// 	autoConfig: true,
						// 	scrollX: false,
						// 	select: true,
						// 	columns: [
						// 	{
						// 		name: "Name",
						// 		header: "Name",
						// 		width: 300,
						// 		sort: "string"
						// 	},
						// 	{
						// 		name: "Change date",
						// 		format: webix.i18n.longDateFormatStr,
						// 		header: [{
						// 			content: "dateRangeFilter"
						// 		}],
						// 		width: 300,
						// 		sort: "date"
						// 	},
						// 	{
						// 		id: "Details",
						// 		header: [{
						// 			content: "textFilter"
						// 		}],
						// 		fillspace: true,
						// 		sort: "string"
						// 	},
						// 	{
						// 		template: "<span class='webix_icon wxi-pencil editBtn'></span>",
						// 		width: 40
						// 	},
						// 	{
						// 		template: "<span class='webix_icon wxi-trash removeBtn'></span>",
						// 		width: 40
						// 	}
						// 	],
						// 	onClick: {
						// 		removeBtn: (el, id) => {
						// 			webix.confirm({
						// 				text: "Do you still want to continue?",
						// 				callback: (result) => {
						// 					if (result) {
						// 						Activity.remove(id);
						// 					}
						// 				}
						// 			});
						// 			return false;
						// 		},
						// 		editBtn: (el, id) => {
						// 			console.log(Activity.getItem(id));
						// 			this.form.showForm(Activity.getItem(id),
						// 				"Edit");
						// 		}
						// 	}
						// },
						{},
						{
							view: "uploader",
							label: "Upload file",
							id: "records",
							name: "records",
							type: "icon",
							icon: "wxi-download",
							link: "mylist"
						// upload: "http://localhost:8096/api/v1/"
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
		webix.promise.all([
			Activity.waitData,
			ActivityType.waitData
		]).then(
			() => {
				webix.$$("activities").sync(Activity);
			}
		);
	}
}
