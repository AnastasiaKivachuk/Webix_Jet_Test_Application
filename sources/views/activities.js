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
						],
						on: {
							onChange: () => {
								this.$$("contactsData").filterByAll();
							}
						}
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
					id: "State",
					header: "",
					checkValue: "Close",
					uncheckValue: "Open",
					template: "{common.checkbox()}",
					editor: "checkbox"

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
					id: "DueNewDate",
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
				this.$$("contactsData").sync(Activity);
				Activity.data.filter();
			}
		);

		this.$$("contactsData").registerFilter(
			webix.$$("tabbar"),
			{
				columnId: "State",
				compare: (value, filter) => {
					let filterData = parseInt(filter);
					if (filterData === 1) return value;
					else if (filterData === 2) return value === "Open";
					else if (filterData === 3) return value === "Close";
					else if (filterData === 4) console.log(4);
					else if (filterData === 5) console.log(5);
					else if (filterData === 6) console.log(6);
					return value === "Close";
				}


				// columnId: "DueNewDate",
				// compare: (value, filter) => {
				// 	let year = value.getFullYear().toString();
				// 	let filterData = parseInt(filter);
				// 	console.log(value);
				// 	console.log(filterData);
				// 	if (filterData === 1) return year;
				// 	// else if (filterData === 2) return value === "Open";
				// 	// else if (filterData === 3) return value === "Close";
				// 	else if (filterData === 4) return year === new Date().getFullYear().toString();
				// 	else if (filterData === 5) console.log(5);
				// 	else if (filterData === 6) console.log(7);
				// 	return value === "Close";
				// }
			},
			{
				getValue: node => node.getValue(),
				setValue: (node, value) => {
					node.setValue(value);
				}
			}
		);
	}


}
