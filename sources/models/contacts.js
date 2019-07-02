const strForatting = webix.Date.strToDate("%d-%m-%Y %H:%i");
const dateForatting = webix.Date.strToDate("%Y-%m-%d %H:%i");

export const Contacts = new webix.DataCollection({
	save: "rest->http://localhost:8096/api/v1/contacts/",
	url: "http://localhost:8096/api/v1/contacts/",
	scheme: {
		$init: (obj) => {
			obj.value = `${obj.FirstName}  ${obj.LastName}`;
			obj.newStartDate = obj.newStartDate || strForatting(obj.StartDate);
			obj.newBirthday = obj.newBirthday || strForatting(obj.Birthday);
		},
		$save: (obj) => {
			obj.StartDate = `${dateForatting(obj.newStartDate)}`;
			obj.Birthday = `${dateForatting(obj.newBirthday)}`;
		}

	}
});

