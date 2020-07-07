require('dotenv').config();
const banchojs = require('bancho.js');
const debug = process.env.debug;
var client = new banchojs.BanchoClient({
	username: process.env.osuUsername,
	password: process.env.osuPassword
});

var updateClient = 'Ameo';

client.on('state', (s, e) => {
	if (s == banchojs.ConnectStates.Connected) {
		console.log(`[${new Date}] Connected to ${process.env.osuUsername}`);
	}
})


async function Update() {
	if (!client.isConnected())
		await client.connect();
	await client.getUser(updateClient).sendMessage('!u');
	return null;
}

client.on("PM", (msg) => {
	// if (msg.recipient.ircUsername == updateClient || msg.user.ircUsername == updateClient)
	// 	console.log(`[${new Date}] ${msg.user.ircUsername} > ${msg.recipient.ircUsername}: ${msg.content}`);

	if(msg.content == '!u' && msg.recipient.ircUsername == updateClient){
		console.log(`[${new Date}] Sent !u to ${updateClient}`)
	}

	if(msg.user.ircUsername == updateClient){
		console.log(msg.content)
	}
});

let d;
let limited = false;
setInterval(() => {
	d = new Date;
	if (d.getMinutes() == 0 && d.getSeconds() == 0 && limited == false) {
		Update().then(() => {
			limited = true;
			if (debug)
				console.log(`[${new Date}] limited = true`)
		});
	} else {
		if (limited == true) {
			limited = false;
			if (debug)
				console.log(`[${new Date}] limited = false`)
		}
	}
}, 500);
Update();
