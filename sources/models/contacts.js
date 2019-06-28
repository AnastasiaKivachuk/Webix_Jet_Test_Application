const strForatting = webix.Date.strToDate("%d-%m-%Y %H:%i");
const dateForatting = webix.Date.strToDate("%Y-%m-%d %H:%i");

export const Contacts = new webix.DataCollection({
	save: "rest->http://localhost:8096/api/v1/contacts/",
	url: "http://localhost:8096/api/v1/contacts/",
	scheme: {
		$init: (obj) => {
			obj.value = obj.FirstName + obj.LastName;
			obj.newStartDate = obj.newStartDate || strForatting(obj.StartDate);
			obj.newBirthday = obj.newBirthday || strForatting(obj.Birthday);
		},
		$save: (obj) => {
			obj.StartDate = new Date(obj.newStartDate);
			obj.StartDate = dateForatting(obj.StartDate);
			obj.newStartDate = new Date(obj.StartDate);

			obj.Birthday = new Date(obj.newBirthday);
			obj.Birthday = dateForatting(obj.Birthday);
			obj.newBirthday = new Date(obj.Birthday);
		}
	}
});

