import {JetView} from "webix-jet";

export default class HeaderView extends JetView {
	config() {
		let header = {
			type: "header",
			width: 500,
			css: "webix_header app_header"
		};

		let ui = {
			type: "clean",
			paddingX: 5,
			css: "app_layout",
			cols: [
				{
					rows: [{css: "webix_shadow_medium",
						rows: [header]}]
				},
				{
					type: "wide",
					rows: [
						{$subview: true}
					]
				}
			]
		};

		return ui;
	}
}
