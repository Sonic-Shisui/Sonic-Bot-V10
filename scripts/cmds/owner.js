const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "owner",
    aliases: ["isagi"],
    author: " Aesther ", 
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "get bot owner info"
    },
    category: "system",
    guide: {
      en: "{p}{n}"
    }
  },
  onStart: async function ({ api, event }) {
      try {
        const loadingMessage = "⏳| 𝑳𝒐𝒂𝒅𝒊𝒏𝒈 𝒐𝒇 𝒊𝒏𝒇𝒐𝒓𝒎𝒂𝒕𝒊𝒐𝒏 𝒐𝒇 𝒎𝒚 𝒐𝒘𝒏𝒆𝒓...𝒑𝒍𝒆𝒂𝒔𝒆 𝒘𝒂𝒊𝒕 ";
        await api.sendMessage(loadingMessage, event.threadID);

        const ownerInfo = {
          name: 'ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡',
          gender: '𝗕𝗢𝗬♂️',
          hobby: '𝐅𝐨𝐨𝐭𝐛𝐚𝐥𝐥⚽',
          relationship: '𝐄𝐧 𝐜𝐨𝐮𝐩𝐥𝐞❤✨🎀 𝐚𝐯𝐞𝐜 𝐌𝐀𝐑𝐈𝐀𝐌 𝐊𝐎𝐍𝐄🌿❤🍀',
          facebookLink: 'https://www.facebook.com/hentai.san.1492',
          bio: '🚀| 𝑷𝑹𝑶𝑱𝑬𝑪𝑻 𝑯𝑬𝑫𝑮𝑬𝑯𝑶𝑮 𝑮𝑷𝑻 🦔🤖'
        };

        const videoUrl = 
["http://goatbiin.onrender.com/_f2IBLHJ1.jpg"];
        const tmpFolderPath = path.join(__dirname, 'tmp');

        if (!fs.existsSync(tmpFolderPath)) {
          fs.mkdirSync(tmpFolderPath);
        }

        const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
        const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

        fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

        const response = `
          𝗼𝘄𝗻𝗲𝗿 𝗶𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻🍀:
❍⌇─➭ 
(◍•ᴗ•◍)𝗡𝗔𝗠𝗘 : ${ownerInfo.name}
❍⌇─➭ 
♀𝗚𝗘𝗡𝗥𝗘♂: ${ownerInfo.gender}
❍⌇─➭ 
🏓𝗛𝗢𝗕𝗕𝗬⛹‍♂: ${ownerInfo.hobby}
❍⌇─➭ 
𝗥𝗘𝗟𝗔𝗧𝗢𝗡𝗦𝗛𝗜𝘗💞: ${ownerInfo.relationship}
❍⌇─➭ 
 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞🔗: ${ownerInfo.facebookLink}
❍⌇─➭ 
      ◈ 𝗦𝗧𝗔𝗧𝗨𝗦 ◈: ${ownerInfo.bio} 🇨🇲       `;

        await api.sendMessage({
          body: response,
          attachment: fs.createReadStream(videoPath)
        }, event.threadID);
      } catch (error) {
        console.error('Error in owner command:', error);
        api.sendMessage('An error occurred while processing the command.', event.threadID);
      }
    },
    onChat: async function({ api, event }) {
      try {
        const lowerCaseBody = event.body.toLowerCase();
        
        if (lowerCaseBody === "isagi" || lowerCaseBody.startsWith("{p}owner")) {
          await this.onStart({ api, event });
        }
      } catch (error) {
        console.error('Error in onChat function:', error);
      }
    }
  };