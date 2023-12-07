  define("UsrPackageConstants", [], function() {
	var concertFrequency = {
		Daily: "c38a49df-59d5-46c7-8b74-d54ea538b527",
		Monthly: "9e00f18b-e4de-4d92-923e-53c37759ce7c",
		Weekly: "d94c194b-e4c7-4d55-9f9c-c77fea9f6c2a"
	};
	var schema = {
		UsrConcert: "UsrConcert"
	};
	var error = (param) => ({
    	LimitError: "There are few free concert halls and no more than " + param + " are allowed.",
    	QueryError: "Query error occurred" + param + " .",
	});
	var sysParamName = "UsrMaxActiveDailyShowLimit";
	return {
		ConcertFrequency: concertFrequency,
		Schema: schema,
		Error: error,
		SysParamName: sysParamName
	};
});