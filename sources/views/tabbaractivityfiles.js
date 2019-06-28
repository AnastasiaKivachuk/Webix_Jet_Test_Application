import {
	JetView
} from "webix-jet";
import {
	Activity
} from "../models/Activity";
import {
	Statuses
} from "../models/statuses";
import ActivityForm from "./activityform";

export default class TabbarActivityFiles extends JetView {
	config() {
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
							options: Statuses,
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
						},



					},
					{
						view: "button",
						type: "icon",
						css: "webix_primary",
						icon: "wxi-plus",
						label: "Add activity",
						autowidth: true,
						click: () => {
							this.form.showForm({}, "Add");
						}

					},
					{
						id: "files",
						view: "datatable",
						content: "areaB"
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
		]).then(
			() => {
				webix.$$("activities").parse(Activity);
			}
		);
	}
}
