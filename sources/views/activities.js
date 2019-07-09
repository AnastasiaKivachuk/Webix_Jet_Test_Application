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

function getDates() {
	let d = new Date();
	let dates = {};
	dates.currentYear = d.getFullYear();
	dates.currentMonth = d.getMonth();
	dates.currentDay = d.getDate();
	dates.tomorrow = new Date(d.getTime() + 24 * 60 * 60 * 1000);
	dates.currentDayOfWeek = d.getDay();
	dates.firstDayOfWeek = new Date(d.getTime() - 24 * 60 * 60 *
		1000 * dates.currentDayOfWeek);
	dates.firstDayOfWeek.setHours(0, 0, 0, 0);
	dates.lastDayOfWeek = new Date(d.getTime() + 24 * 60 * 60 *
		1000 * (6 - dates.currentDayOfWeek));
	dates.lastDayOfWeek.setHours(0, 0, 0, 0);
	return dates;
}
export default class ActivityView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			rows: [{
				cols: [{
					view: "tabbar",
					id: "tabbar",
					autodidth: true,
					options: [{
						id: 1,
						value: _("All")
					},
					{
						id: 2,
						value: _("Overdue")
					},
					{
						id: 3,
						value: _("Completed")
					},
					{
						id: 4,
						value: _("Today")
					},
					{
						id: 5,
						value: _("Tomorrow")
					},
					{
						id: 6,
						value: _("This week")
					},
					{
						id: 7,
						value: _("This month")
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
					label: _("Add activity"),
					autowidth: true,
					click: () => {
						this.form.showForm({}, _("Add"));
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
					template: (obj, common, value, config) => {
						const item = config.collection.getItem(value);
						return `<span class='webix_icon ${item.Icon}'>  ${item.Value}</span>`;
					},
					width: 300,
					sort: "string"
				},
				{
					id: "DueNewDate",
					format: webix.i18n.longDateFormatStr,
					header: [_("Due date"), {
						content: "dateRangeFilter"
					}],
					width: 300,
					sort: "date"
				},
				{
					id: "Details",
					header: [_("Details"), {
						content: "textFilter"
					}],
					fillspace: true,
					sort: "string"
				},
				{
					id: "ContactID",
					editor: "select",
					header: [_("Contact"), {
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
							text: _("Do you still want to continue?"),
							callback: (result) => {
								if (result) {
									Activity.remove(id);
								}
							}
						});
						return false;
					},
					editBtn: (el, id) => {
						this.form.showForm(Activity.getItem(id), _("Edit"));
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
		const dates = getDates();
		this.$$("contactsData").registerFilter(
			webix.$$("tabbar"), {
				columnId: "State",
				compare: (value, filter, item) => {
					let filterData = parseInt(filter);
					let state = item.State;
					let date = item.DueNewDate;
					let yearDate = date.getFullYear();
					let monthDate = date.getMonth();
					let dayDate = date.getDate();
					if (filterData === 1) return item;
					else if (filterData === 2) {
						return state === "Open" && date <
							new Date();
					}
					else if (filterData === 3) return state === "Close";
					else if (filterData === 4) {
						return yearDate === dates.currentYear &&
							monthDate === dates.currentMonth && dayDate === dates.currentDay &&
							state === "Open";
					}
					else if (filterData === 5) {
						return yearDate === dates.tomorrow
							.getFullYear() && monthDate === dates.tomorrow.getMonth() &&
							dayDate === dates.tomorrow.getDate() && state === "Open";
					}
					else if (filterData === 6) {
						return date >= dates.firstDayOfWeek && date <=
							dates.lastDayOfWeek && state === "Open";
					}
					return yearDate === dates.currentYear && monthDate === dates.currentMonth && state === "Open";
				}
			}, {
				getValue: node => node.getValue(),
				setValue: (node, value) => {
					node.setValue(value);
				}
			}
		);
	}
}

