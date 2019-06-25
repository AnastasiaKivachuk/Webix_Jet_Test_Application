import {
	JetView
} from "webix-jet";

export default class CommonData extends JetView {

	config() {
		return {
			rows: [
				// {
			// 	view: "datatable",
			// 	localId: "datatableCommon",
			// 	editable: true,
			// 	autoConfig: true,
			// 	editaction: "dblclick",
			// 	scroll: "auto",
			// 	select: true
			// },
			// {
			// 	view: "button",
			// 	value: "Add new",
			// 	click: () => {
			// 		this._tdata.add({"Name":"NEW"});
			// 		// this.$$("datatableCommon").add({});
			// 	}
			// },
			// {
			// 	view: "button",
			// 	value: "Delete",
			// 	click: () => {
			// 		// let idS = this.$$("datatableCommon").getSelectedId();
			// 		// if (idS) {
			// 		// 	this.$$("datatableCommon").remove(idS);
			// 		// }
			// 		let idS = this.$$("datatableCommon").getSelectedId();
			// 		if (idS) {
			// 			this._tdata.remove(idS);
			// 		}
			// 	}
			// }
			{
				view: "datatable",
				id: "contactsData",
				hover: "hoverLine",
				autoConfig: true,
				scrollX: false,
				select: true,
				columns:
					[
						{ id: "rank", header: "", width: 50, css: 'grayColumn', sort: "int" },
						{ id: "title", header: ["Film title", { content: "textFilter" }], width: 200, sort: "string", fillspace: true },
						{
							id: "categotyId", header: ["Categoty", { content: "selectFilter" }],
							editor: "select", options: collectionCategories, width: 100, sort: "string"
						},
						{ id: "votes", header: ["Votes", { content: "textFilter" }], width: 80, sort: "int" },
						{ id: "rating", header: ["Rating", { content: "textFilter" }], width: 80, sort: "int" },
						{ id: "year", header: ["Year"], width: 100, sort: "int" },
						{ template: "<span class='webix_icon wxi-trash removeBtn'></span>" }
					],
				// scheme: {
				// 	$init: function (obj) {
				// 		obj.categotyId = Math.floor(Math.random() * 4 + 1);
				// 		obj.votes = obj.votes.replace(",", ".");
				// 		obj.rating = obj.rating.replace(",", ".");
				// 	}
				// },

				// onClick: {
				// 	removeBtn: function (e, id) {
				// 		webix.confirm({
				// 			text: "Do you still want to continue?"
				// 		}).then(
				// 			function () {
				// 				$$("mydata").remove(id);
				// 				return false;
				// 			})
				// 	}
				// },
			};
			]
		};
	}

	init() {
		this.$$("datatableCommon").parse(this._tdata);
	}
}
