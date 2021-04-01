const id = '9350342' //your osu! user ID
const mode = 0 //game mode to update; 0 = osu!, 1 = taiko, 2 = ctb, 3 = mania

const fetch = require('node-fetch');

async function Update() {
	console.log('Updating...');
	await fetch(`https://osutrack-api.ameo.dev/update?user=${id}&mode=${mode}`, {method: 'POST'});
	console.log('Updated!');
	return null;
}

let d;
let limited = false;
setInterval(() => {
	d = new Date;
	if (d.getMinutes() == 0 && d.getSeconds() == 0 && limited == false) {
		Update().then(() => {
			limited = true;
		});
	} else {
		if (limited == true) {
			limited = false;
		}
	}
}, 500);
Update();
