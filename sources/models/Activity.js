export const Activity = new webix.DataCollection({
	save: "rest->http://localhost:8096/api/v1/activities/",
	url: "http://localhost:8096/api/v1/activities/",
	scheme: {
		$init: (obj) => {
			obj.DueTime = new Date(obj.DueDate).toLocaleTimeString();
			obj.DueNewDate = new Date(obj.DueDate).toLocaleDateString();
			console.log(obj.DueTime);
			console.log(obj.DueNewDate);
		},
		$save: (obj) => {
			let currentTime = new Date(obj.DueTime);
			let currentDate = new Date(obj.DueNewDate);
			let formattedDate = currentDate.getFullYear() + "-" + (
				currentDate.getMonth() + 1) + "-" + currentDate
			.getDate() + " " + currentTime.getHours() + ":" + currentTime
				.getMinutes();
			console.log(formattedDate);
		}
	}
});


