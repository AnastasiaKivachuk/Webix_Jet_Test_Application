const strForatting = webix.Date.strToDate("%d-%m-%Y %H:%i");
const dateForatting = webix.Date.strToDate("%Y-%m-%d %H:%i");

export const Activity = new webix.DataCollection({
	save: "rest->http://localhost:8096/api/v1/activities/",
	url: "http://localhost:8096/api/v1/activities/",
	scheme: {
		$init: (obj) => {
			obj.DueNewDate = obj.DueNewDate || strForatting(obj.DueDate);
			obj.DueNewTime = obj.DueNewTime || new Date(obj.DueNewDate);
		},
		$save: (obj) => {
			obj.DueDate = new Date(obj.DueNewDate);
			obj.DueTime = new Date(obj.DueNewTime);
			obj.DueDate.setHours(obj.DueTime.getHours());
			obj.DueDate.setMinutes(obj.DueTime.getMinutes());
			obj.DueDate = dateForatting(obj.DueDate);
			obj.DueNewDate = new Date(obj.DueDate);
		}
	}
});
