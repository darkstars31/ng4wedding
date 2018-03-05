var fs = require('fs');
var csv = require('csv-parse');


var jsonObject = {
	rsvp : {
		families : {},
		health: true	
	}
};

fs.readFile('list.csv', (error, data) => {
	csv(data, {}, (error, rows) => {
		rows.forEach( fam => {
			let familyCode = (fam[2].replace('/','').trim().substring(0,5) + Math.random().toString().substring(2, 7)).toLowerCase();
			let familyObj =  {
				fname : fam[1].replace('/','').trim(),
				lname: fam[2].replace('/','').trim()
			};
			jsonObject.rsvp.families[familyCode] = familyObj;
		
		});
		console.log(jsonObject);

		fs.writeFile('generatedScripts/dbFile.json', JSON.stringify(jsonObject), (error) => {
			if(error) { console.log(error); }
			console.log("Complete");
		});

	});
});