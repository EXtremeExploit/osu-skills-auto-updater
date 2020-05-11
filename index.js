require('dotenv').config();
const banchojs = require('bancho.js');
var client = new banchojs.BanchoClient({
	username: process.env.osuUsername,
	password: process.env.osuPassword
});

async function Update() {
	if (!client.isConnected())
		await client.connect();
	await client.getUser('Tillerino').sendMessage('!u');
	return null;

}

client.on("PM", (msg)=>{
	console.log(msg.user.ircUsername+':'+msg.content);
})

let d;
let limited = false;
setInterval(() => {
	d = new Date();
	if (d.getMinutes() == 0 && d.getSeconds() == 0 && limited == false) {
		Update().then(() => {
			limited = true;
			console.info('limited = true')
		});
	} else {
		if (d.getMinutes() == 2 && limited == true) {
			limited = false;
			console.info('limited = false')
		}
	}
}, 500);
Update();
