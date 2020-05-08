require('dotenv').config();
const banchojs = require('bancho.js');
var client = new banchojs.BanchoClient({
	username: process.env.osuUsername,
	password: process.env.osuPassword
});

async function Update() {
	if (!client.isConnected())
		await client.connect();
	client.getUser('Tillerino').sendMessage('!u').then(() => {
		console.log('Sent !u to Tillerino');
	});
}

setInterval(Update, 1800000);
Update();
