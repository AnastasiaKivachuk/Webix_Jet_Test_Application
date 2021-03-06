export const ActivityType = new webix.DataCollection({
	save: "rest->http://localhost:8096/api/v1/activitytypes/",
	url: "http://localhost:8096/api/v1/activitytypes/",
	scheme: {
		$change: (obj) => {
			obj.value = obj.Value;
		},
		$save: (obj) => {
			obj.Value = obj.value;
			delete obj.value;
		}
	}
});
