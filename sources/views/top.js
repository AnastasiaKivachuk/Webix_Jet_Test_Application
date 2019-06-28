import {JetView, plugins} from "webix-jet";

export default class TopView extends JetView {
	config() {
		let header = {
			type: "header",
			template: "#value#",
			localId: "header",
			css: "webix_header pageTitle"
		};


		let menu = {
			view: "menu",
			id: "top:menu",
			css: "app_menu",
			width: 180,
			layout: "y",
			select: true,
			template: "<span class='webix_icon #icon#'></span>  #value# ",
			data: [
				{value: "Contacts", id: "contacts", icon: "mdi mdi-account"},
				{value: "Activities", id: "activities", icon: "wxi-calendar"},
				{value: "Settings", id: "settings", icon: "mdi mdi-cogs"}
			],
			on: {
				onAfterSelect: (id) => {
					const value = this.$$("top:menu").getItem(id);
					this.$$("header").setValues(value);
				}
			}
		};

		// let ui = {
		// 	type: "clean",
		// 	paddingX: 5,
		// 	css: "app_layout",
		// 	cols: [
		// 		{
		// 			paddingX: 5,
		// 			paddingY: 10,
		// 			rows: [{css: "webix_shadow_medium", rows: [menu]}]
		// 		},
		// 		{
		// 			type: "wide",
		// 			paddingY: 10,
		// 			paddingX: 5,
		// 			rows: [
		// 				{$subview: true}
		// 			]
		// 		}
		// 	]
		// };

		// return ui;

		return {
			rows: [
				header,
				{
					cols: [
						menu,
						{$subview: true}
					]
				}
			]
		};
	}

	init() {
		this.use(plugins.Menu, "top:menu");
	}
}
