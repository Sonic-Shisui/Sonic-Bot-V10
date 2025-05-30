const axios = require('axios');



let lastResponseMessageID = null;



async function handleCommand(api, event, args, message) {

    try {

        const question = args.join(" ").trim();



        if (!question) {

            return message.reply("Please provide a question to get an answer.");

        }



        const { response, messageID } = await getAIResponse(question, event.senderID, event.messageID);

        lastResponseMessageID = messageID;



        api.sendMessage(`웃➣『𝐒𝐇𝐈𝐒𝐔𝐈』ツ\n══════ •『🧡』• ══════\n${response}\n══════ •『🧡』• ══════`, event.threadID, messageID);

    } catch (error) {

        console.error("Error in handleCommand:", error.message);

        message.reply("An error occurred while processing your request.");

    }

}



async function getAnswerFromAI(question) {

    try {

        const services = [

            { url: 'https://markdevs-last-api.onrender.com/gpt4', params: { prompt: question, uid: 'your-uid-here' } },

            { url: 'http://markdevs-last-api.onrender.com/api/v2/gpt4', params: { query: question } },

            { url: 'https://markdevs-last-api.onrender.com/api/v3/gpt4', params: { ask: question } }

        ];



        for (const service of services) {

            const data = await fetchFromAI(service.url, service.params);

            if (data) return data;

        }



        throw new Error("No valid response from any AI service");

    } catch (error) {

        console.error("Error in getAnswerFromAI:", error.message);

        throw new Error("Failed to get AI response");

    }

}



async function fetchFromAI(url, params) {

    try {

        const { data } = await axios.get(url, { params });

        if (data && (data.gpt4 || data.reply || data.response || data.answer || data.message)) {

            const response = data.gpt4 || data.reply || data.response || data.answer || data.message;

            console.log("AI Response:", response);

            return response;

        } else {

            throw new Error("No valid response from AI");

        }

    } catch (error) {

        console.error("Network Error:", error.message);

        return null;

    }

}



async function getAIResponse(input, userId, messageID) {

    const query = input.trim() || "hi";

    try {

        const response = await getAnswerFromAI(query);

        return { response, messageID };

    } catch (error) {

        console.error("Error in getAIResponse:", error.message);

        throw error;

    }

}



module.exports = {

    config: {

        name: 'ask2',

        author: 'coffee',

        role: 0,

        category: 'ai',

        shortDescription: 'AI to answer any question',

    },

    onStart: async function ({ api, event, args }) {

        const input = args.join(' ').trim();

        try {

            const { response, messageID } = await getAIResponse(input, event.senderID, event.messageID);

            lastResponseMessageID = messageID;

            api.sendMessage(`웃➣『𝐒𝐇𝐈𝐒𝐔𝐈』ツ\n══════ •『🖤』• ══════\n🌱${response}🌱\n══════ •『🖤』• ══════`, event.threadID, messageID);

        } catch (error) {

            console.error("Error in onStart:", error.message);

            api.sendMessage("𝐒𝐚𝐥𝐮𝐭 𝐦𝐨𝐧 𝐜𝐡𝐨𝐮...𝐪𝐮𝐞𝐥 𝐞𝐬𝐭 𝐥𝐞 𝐩𝐫𝐨𝐛𝐥𝐞𝐦𝐞 !?💙.", event.threadID);

        }

    },

    onChat: async function ({ event, message, api }) {

        const messageContent = event.body.trim().toLowerCase();



        // Check if the message is a reply to the bot's message or starts with "shisui"

        if ((event.messageReply && event.messageReply.senderID === api.getCurrentUserID()) || (messageContent.startsWith("shisui") && event.senderID !== api.getCurrentUserID())) {

            const input = messageContent.replace(/^ai\ s*/, "").trim();

            try {

                const { response, messageID } = await getAIResponse(input, event.senderID, event.messageID);

                lastResponseMessageID = messageID;

                api.sendMessage(`웃➣『𝐒𝐇𝐈𝐒𝐔𝐈』ツ\n══════ •『🧡』• ══════\n 🍂${response}🍂\n══════ •『🖤』• ══════`, event.threadID, messageID);

            } catch (error) {

                console.error("Error in onChat:", error.message);

                api.sendMessage("➣ ✘.𝚂𝙾𝙽𝙸𝙲〈 な\n══════ •『💙』• ══════\n💣| 𝐄𝐭 𝐝𝐢𝐫𝐞 𝐪𝐮𝐞 𝐣'𝐩𝐞𝐧𝐬𝐚𝐢𝐬 𝐪𝐮𝐞 𝐭'𝐞𝐭𝐚𝐢𝐬 𝐢𝐧𝐭𝐞𝐥𝐥𝐢𝐠𝐞𝐧𝐭..𝐯𝐢𝐬𝐢𝐛𝐥𝐞𝐦𝐞𝐧𝐭 𝐣'𝐦𝐞 𝐬𝐮𝐢𝐬 𝐭𝐫𝐨𝐦𝐩é 🤦‍♂️", event.threadID);

            }

        }

    },

    handleCommand // Export the handleCommand function for command-based interactions

};