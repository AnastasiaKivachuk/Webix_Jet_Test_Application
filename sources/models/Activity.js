export const Activity = new webix.DataCollection({
	save: "rest->http://localhost:8096/api/v1/activities/",
	url: "http://localhost:8096/api/v1/activities/"
});
