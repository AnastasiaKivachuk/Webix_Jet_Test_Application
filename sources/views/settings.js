import {
	JetView
} from "webix-jet";
import CommonTable from "./commonTable";
import {
	ActivityType
} from "../models/ActivityType";
import {
	Statuses
} from "../models/statuses";

export default class SettingsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const lang = this.app.getService("locale").getLang();

		return {
			rows: [
				{
					name: "lang",
					optionWidth: 120,
					view: "segmented",
					label: _("Language"),
					options: [
						{ id: "en", value: "English" },
						{ id: "ru", value: "Russian" }
					],
					click: () => this.toggleLanguage(),
					value: lang
				},
				{
					view: "template",
					template: _("Activity type"),
					type: "header",
					css: "webix_header app_header"
				},
				new CommonTable(this.app, "", ActivityType),
				{
					view: "template",
					template: _("Statuses"),
					type: "header",
					css: "webix_header app_header"
				},
				new CommonTable(this.app, "", Statuses)
			]

		};
	}

	toggleLanguage() {
		const langs = this.app.getService("locale");
		const value = this.getRoot().queryView({ name: "lang" }).getValue();
		langs.setLang(value);
	}
}

