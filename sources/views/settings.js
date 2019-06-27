import {
	JetView
} from "webix-jet";

export default class SettingsView extends JetView {
	config() {
		return {
			view: "template",
			template: "Settings"
		};
	}
}

// {
// 	cols: [
// 		{
// 			view: "template",
// 			// template: "Photo",
// 			css: "img",
// 			height: 50,
// 			width: 50,
// 			template: "Photo"
// 			// "<img class="img", src="" />"
// 		},
// 		{
// 			rows:
// 				[
// 					{
// 						view: "uploader",
// 						value: "Upload file",
// 						id: "Photo",
// 						name: "records",
// 						link: "mylist",
// 						upload: "http://localhost:8096/api/v1/contacts/"
// 					},
// 					{
// 						view: "button",
// 						css: "webix_primary btnStyle",
// 						label: "Delete",
// 						autowidth: true,
// 						click: () => {}
// 					}
// 				]
// 		}

// 	]
// }
