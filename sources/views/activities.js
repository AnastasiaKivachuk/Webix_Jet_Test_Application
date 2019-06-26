import {
	JetView
} from "webix-jet";
import {
	ActivityType
} from "../models/ActivityType";
import {
	Activity
} from "../models/Activity";
import {
	Contacts
} from "../models/contacts";
import ActivityForm from "./activityform";

export default class ActivityView extends JetView {
	config() {
		return {

			rows: [{
				cols: [
					{
						view: "tabbar",
						id: "tabbar",
						autodidth: true,
						options: [
							{
								id: 1,
								value: "All"
							},
							{
								id: 2,
								value: "Overdue"
							},
							{
								id: 3,
								value: "Completed"
							},
							{
								id: 4,
								value: "Today"
							},
							{
								id: 5,
								value: "Tomorrow"
							},
							{
								id: 6,
								value: "This week"
							},
							{
								id: 7,
								value: "This month"
							}
						]
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

					}
				]
			},
			{
				view: "datatable",
				localId: "contactsData",
				hover: "hoverLine",
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
					header: ["Activity type", {
						content: "selectFilter"
					}],
					options: ActivityType,
					width: 300,
					sort: "string"
				},
				{
					id: "DueDate",
					format: webix.i18n.longDateFormatStr,
					header: ["Due date", {
						content: "dateRangeFilter"
					}],
					width: 300,
					sort: "date"
				},
				{
					id: "Details",
					header: ["Details", {
						content: "textFilter"
					}],
					fillspace: true,
					sort: "string"
				},
				{
					id: "ContactID",
					editor: "select",
					header: ["Contact", {
						content: "selectFilter"
					}],
					options: Contacts,
					width: 300,
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
						this.form.showForm(Activity.getItem(id), "Edit");
					}
				}
			}
			]
		};
	}

	init() {
		this.form = this.ui(ActivityForm);
		webix.promise.all([
			Activity.waitData,
			Contacts.waitData,
			ActivityType.waitData
		]).then(
			() => {
				this.$$("contactsData").parse(Activity);
			}
		);
	}
}
