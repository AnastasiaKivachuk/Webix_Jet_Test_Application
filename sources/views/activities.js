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
	contacts
} from "../models/contacts";

export default class ActivityView extends JetView {

	config() {
		return {

			rows: [
				{
					cols: [
						{
							view: "tabbar",
							id: "tabbar",
							autodidth: true,
							options:
								[
									{id: 1, value: "All"},
									{id: 2, value: "Overdue"},
									{id: 3, value: "Completed"},
									{id: 4, value: "Today"},
									{id: 5, value: "Tomorrow"},
									{id: 6, value: "This week"},
									{id: 7, value: "This month"}
								]
						},
						{

							view: "button",
							type: "icon",
							css: "webix_primary",
							icon: "wxi-plus",
							label: "Add activity",
							autowidth: true,
							click: () => { }

						}]
				},
				{
					view: "datatable",
					localId: "contactsData",
					hover: "hoverLine",
					autoConfig: true,
					scrollX: false,
					select: true,
					columns: [
						{id: "checkbox", header: "", template: "{common.checkbox()}", width: 50},
						{id: "ActivityTypeId", editor: "select", header: ["Activity type", {content: "selectFilter"}], options: ActivityType, width: 200, sort: "string"},
						{id: "DueDate", editor: "select", header: ["Due date", {content: "textFilter"}], width: 150, sort: "string"},
						{id: "Details", header: ["Details", {content: "textFilter"}], width: 400, sort: "string"},
						{id: "contactsId", editor: "select", header: ["Contact", {content: "selectFilter"}], options: contacts, width: 200, sort: "string"},
						{template: "<span class='webix_icon wxi-pencil editBtn'></span>", width: 40},
						{template: "<span class='webix_icon wxi-trash removeBtn'></span>", width: 40}
					],
					onClick: {
						removeBtn: (e, id) => {
							webix.confirm({
								text: "Do you still want to continue?"
							}).then(
								() => {
									Activity.remove(id);
									return false;
								})
						}
					}
				}
			]
		};
	}

	init() {
		webix.promise.all([
			Activity.waitData,
			contacts.waitData,
			ActivityType.waitData
		]).then(
			() => {
				this.$$("contactsData").parse(Activity);
			}
		)
	}
}
