import {
	JetView
} from "webix-jet";

export default class SettingsView extends JetView {
	config() {
		return {
			rows: [
				{
					view: "template",
					css: "contactTitle",
					autoheight: true,
					template: "Settings",
					align: "center"
				}

			],
		}

	};
}
