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

		this.$$("contactsData").registerFilter(
			webix.$$("tabbar"), {
				columnId: "State",
				compare: (value, filter, item) => {
					let filterData = parseInt(filter);
					// console.log(item);
					let state = item.State;
					let date = item.DueNewDate;
					let yearDate = date.getFullYear();
					let currentYear = new Date().getFullYear();
					let monthDate = date.getMonth();
					let currentMonth = new Date().getMonth();
					let dayDate = date.getDate();
					let currentDay = new Date().getDate();
					let tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

					let currentDayOfWeek = new Date().getDay();
					// console.log(currentDayOfWeek);

					let firstDayOfWeek = new Date(new Date().getTime() - 24 * 60 * 60 *
						1000 * currentDayOfWeek);
					firstDayOfWeek.setHours(0, 0, 0, 0);
					let lastDayOfWeek = new Date(new Date().getTime() + 24 * 60 * 60 *
						1000 * (6 - currentDayOfWeek));
					lastDayOfWeek.setHours(0, 0, 0, 0);
					// console.log(firstDayOfWeek);
					// console.log(lastDayOfWeek);
					if (filterData === 1) return item;
					else if (filterData === 2) {
						return state === "Open" && date <
							new Date();
					} else if (filterData === 3) return state === "Close";
					else if (filterData === 4) {
						return yearDate === currentYear &&
							monthDate === currentMonth && dayDate === currentDay;
					} else if (filterData === 5) {
						return yearDate === tomorrow
							.getFullYear() && monthDate === tomorrow.getMonth() &&
							dayDate === tomorrow.getDate();
					} else if (filterData === 6) {
						return date >= firstDayOfWeek && date <=
							lastDayOfWeek;
					}
					return yearDate === currentYear && monthDate === currentMonth;
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
