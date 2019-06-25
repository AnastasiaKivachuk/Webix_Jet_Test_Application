import {JetView, plugins} from "webix-jet";

export default class HeaderView extends JetView {
	config() {
		let header = {
			type: "header",
			template: "nice",
			width: 500,
			css: "webix_header app_header"
		};

		let ui = {
			type: "clean",
			paddingX: 5,
			css: "app_layout",
			cols: [
				{
					paddingX: 5,
					paddingY: 10,
					rows: [{css: "webix_shadow_medium", rows: [header]}]
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


}
