require(`dotenv`).config();
const banchojs = require(`bancho.js`);
var client = new banchojs.BanchoClient({
	username: process.env.osuUsername,
	password: process.env.osuPassword
});

async function Update() {
	if (!client.isConnected())
		await client.connect();
	await client.getUser(`Tillerino`).sendMessage(`!u`);
	return null;
}

client.on("PM", (msg)=>{
	console.log(`[${new Date}] ${msg.user.ircUsername} > ${msg.recipient.ircUsername}: ${msg.content}`);
});

client.on('state',(s,e) => {
	if(s == banchojs.ConnectStates.Connected){
		console.log(`[${new Date}] Connected to ${process.env.osuUsername}`);
	}
})

let d;
let limited = false;
setInterval(() => {
	d = new Date;
	if (d.getMinutes() == 0 && d.getSeconds() == 0 && limited == false) {
		Update().then(() => {
			limited = true;
			console.info(`[${new Date}] limited = true`)
		});
	} else {
		if (limited == true) {
			limited = false;
			console.info(`[${new Date}] limited = false`)
		}
	}
}, 500);
Update();
