export const ActivityType = new webix.DataCollection({
	save: "rest->http://localhost:8096/api/v1/activitytypes/",
	url: "rest->http://localhost:8096/api/v1/activitytypes/",
	scheme: {
		$init: (obj) => {
			obj.value = obj.Value;
		}
	}
});