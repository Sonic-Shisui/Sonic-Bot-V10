const axios = require('axios');

const apiKey = "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"; // API Key Groq
const url = "https://api.groq.com/openai/v1/chat/completions"; // Groq API endpoint

async function getAIResponse(input, messageID) {
    try {
        const requestBody = {
            model: "llama3-8b-8192",
            messages: [
                { role: "user", content: input }
            ]
        };

        const response = await axios.post(url, requestBody, {
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            }
        });

        const reply = response.data.choices[0]?.message?.content || "Désolé, je n'ai pas de réponse pour le moment.";
        return { response: reply, messageID };

    } catch (error) {
        console.error("Erreur API Groq:", error);
        return { response: "Une erreur est survenue avec l'IA.", messageID };
    }
}

module.exports = {
    config: {
        name: 'ask',
        author: 'messie', // modified by ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡
        role: 0,
        category: 'ai',
        shortDescription: 'ai to ask anything',
    },
    onStart: async function ({ api, event, args }) {
        const input = args.join(' ').trim();
        if (!input) return;

        let response;
        if (input.toLowerCase() === "sonic") {
            response = "𝐒𝐚𝐥𝐮𝐭 𝐥'𝐚𝐦𝐢(𝐞) 🎶❤️‍🔥😸 𝐉𝐞 𝐦𝐞 𝐧𝐨𝐦𝐦𝐞 ➣ ✘.𝚂𝙾𝙽𝙸𝙲〈 な 𝐓𝐡𝐞 𝐇𝐞𝐝𝐠𝐞𝐡𝐨𝐠 𝐁𝐨𝐭 🦔...𝐣𝐞 𝐬𝐮𝐢𝐬 𝐢𝐜𝐢 𝐩𝐨𝐮𝐫 𝐫𝐞𝐬𝐨𝐮𝐝𝐫𝐞 𝐭𝐞𝐬 𝐩𝐫𝐨𝐛𝐥𝐞𝐦𝐞𝐬...𝐪𝐮𝐞𝐥 𝐞𝐬𝐭 𝐥𝐞 𝐬𝐨𝐮𝐜𝐢 ⁉️";
        } else {
            const aiResponse = await getAIResponse(input, event.messageID);
            response = aiResponse.response;
        }

        api.sendMessage(`➣ ✘.𝚂𝙾𝙽𝙸𝙲〈 な\n❦ ════ •⊰❂⊱• ════ ❦\n🪄| ${response} 🦔🤍🍓\n❦ ════ •⊰❂⊱• ════ ❦`, event.threadID, event.messageID);
    },

    onChat: async function ({ event, message }) {
        const messageContent = event.body.trim();
        if (!messageContent.toLowerCase().startsWith("sonic")) return;

        let response;
        if (messageContent.toLowerCase() === "sonic") {
            response = "𝐒𝐚𝐥𝐮𝐭 𝐥'𝐚𝐦𝐢(𝐞) 🎶❤️‍🔥😸 𝐉𝐞 𝐦𝐞 𝐧𝐨𝐦𝐦𝐞 ➣ ✘.𝚂𝙾𝙽𝙸𝙲〈 な 𝐓𝐡𝐞 𝐇𝐞𝐝𝐠𝐞𝐡𝐨𝐠 𝐁𝐨𝐭 🦔...𝐣𝐞 𝐬𝐮𝐢𝐬 𝐢𝐜𝐢 𝐩𝐨𝐮𝐫 𝐫𝐞𝐬𝐨𝐮𝐝𝐫𝐞 𝐭𝐞𝐬 𝐩𝐫𝐨𝐛𝐥𝐞𝐦𝐞𝐬...𝐪𝐮𝐞𝐥 𝐞𝐬𝐭 𝐥𝐞 𝐬𝐨𝐮𝐜𝐢 ⁉️";
        } else {
            const input = messageContent.replace(/^sonic\s*/i, "").trim();
            const aiResponse = await getAIResponse(input, event.messageID);
            response = aiResponse.response;
        }

        message.reply(`➣ ✘.𝚂𝙾𝙽𝙸𝙲〈 な\n❦ ════ •⊰❂⊱• ════ ❦\n🪄| ${response} 🦔🤍🍓\n❦ ════ •⊰❂⊱• ════ ❦`);
    }
};