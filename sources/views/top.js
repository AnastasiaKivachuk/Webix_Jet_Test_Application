import {JetView, plugins} from "webix-jet";
import HeaderView from "./header";

export default class TopView extends JetView {
	config() {
		// let header = {
		// 	type: "header", template: "nice",
		// 	width: 1200
		// 	// css: "webix_header app_header"
		// };


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
			]
		};

		let ui = {
			type: "clean",
			paddingX: 5,
			css: "app_layout",
			cols: [
				{
					paddingX: 5,
					paddingY: 10,
					rows: [{css: "webix_shadow_medium", rows: [menu]}]
				},
				{
					type: "wide",
					paddingY: 10,
					paddingX: 5,
					rows: [
						{$subview: true}
					]
				}
			]
		};

		return ui;
	}

	init() {
		this.use(plugins.Menu, "top:menu");
	}
}
