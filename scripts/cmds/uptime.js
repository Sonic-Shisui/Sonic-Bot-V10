const os = require('os');
const moment = require('moment-timezone');

module.exports = {
    config: {
        name: "uptime",
        aliases: ["upt", "up"],
        version: "1.0",
        author: "ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡", // don't change credits 
        role: 0,
        shortDescription: {
            en: "Displays bot uptime, system information, and current time in Cameroon."
        },
        longDescription: {
            en: "Displays bot uptime, system information, CPU speed, storage usage, RAM usage, and current time in Cameroon."
        },
        category: "system",
        guide: {
            en: "Use {p}uptime to display bot uptime, system information, and current time in Cameroon."
        }
    },
    onStart: async function ({ api, event, prefix }) {
        try {
            const botUptime = process.uptime();
            const serverUptime = os.uptime(); // Get server uptime

            // Format bot uptime
            const botDays = Math.floor(botUptime / 86400);
            const botHours = Math.floor((botUptime % 86400) / 3600);
            const botMinutes = Math.floor((botUptime % 3600) / 60);
            const botSeconds = Math.floor(botUptime % 60);

            const botUptimeString = `\n│🎶✨${botDays} 𝐝𝐚𝐲𝐬✨🎶\n│🎶✨${botHours} 𝐡𝐨𝐮𝐫𝐬✨🎶\n│🎶✨${botMinutes} 𝐦𝐢𝐧𝐮𝐭𝐞𝐬✨🎶\n│🎶✨${botSeconds} 𝐬𝐞𝐜𝐨𝐧𝐝𝐬✨🎶`;

            // Format server uptime
            const serverDays = Math.floor(serverUptime / 86400);
            const serverHours = Math.floor((serverUptime % 86400) / 3600);
            const serverMinutes = Math.floor((serverUptime % 3600) / 60);
            const serverSeconds = Math.floor(serverUptime % 60);

            const serverUptimeString = `│🔰✨${serverDays} 𝐝𝐚𝐲𝐬✨🔰\n│🔰✨${serverHours} 𝐡𝐨𝐮𝐫𝐬✨🔰\n│🔰✨${serverMinutes} 𝐦𝐢𝐧𝐮𝐭𝐞𝐬✨🔰\n│🔰✨${serverSeconds} 𝐬𝐞𝐜𝐨𝐧𝐝𝐬✨🔰`;

            const totalMem = os.totalmem() / (1024 * 1024 * 1024);
            const freeMem = os.freemem() / (1024 * 1024 * 1024);
            const usedMem = totalMem - freeMem;
            const speed = os.cpus()[0].speed;

            const totalStorage = os.totalmem() / (1024 * 1024 * 1024);
            const usedStorage = usedMem;

            const systemStatus = "🟢| 𝐆𝐨𝐨𝐝 𝐒𝐲𝐬𝐭𝐞𝐦";

            // Set timezone to Cameroon (Africa/Douala)
            const cameroonTimezone = 'Africa/Douala';
            const now = moment().tz(cameroonTimezone);
            const currentTime = now.format('【YYYY-MM-DD】  〖HH:mm:ss〗');

            // Function to send loading messages
            const sendLoadingMessage = (progress, callback) => {
                const loadingMessages = [
                    "□□□□□ 0%",
                    "■□□□□ 20%",
                    "■■□□□ 40%",
                    "■■■□□ 60%",
                    "■■■■□ 80%",
                    "■■■■■ 100%"
                ];
                if (progress < loadingMessages.length) {
                    setTimeout(() => {
                        api.sendMessage(loadingMessages[progress], event.threadID, () => {
                            sendLoadingMessage(progress + 1, callback);
                        });
                    }, 3000);
                } else {
                    callback();
                }
            };

            // Send initial loading message and then the loading progression
            api.sendMessage(`📶| 𝐿𝑜𝑎𝑑𝑖𝑛𝑔 𝑜𝑓 𝑈𝑝𝑡𝑖𝑚𝑒𝑅𝑜𝑏𝑜𝑡 𝑝𝑙𝑒𝑎𝑠𝑒 𝑤𝑎𝑖𝑡...`, event.threadID, () => {
                sendLoadingMessage(0, () => {
                    api.sendMessage("✅| 𝑆𝑢𝑐𝑐𝑒𝑠𝑠𝑓𝑢𝑙𝑙𝑦", event.threadID, () => {
                        api.sendMessage(
                            `♡   ∩_∩\n（„• ֊ •„)♡\n╭∪∪─⌾🌿𝗛𝗘𝗗𝗚𝗘𝗛𝗢𝗚🌿\n│𝐍𝐚𝐦𝐞:➣ ✘.𝚂𝙾𝙽𝙸𝙲〈 な\n│𝐏𝐫𝐞𝐟𝐢𝐱 𝐒𝐲𝐬𝐭𝐞𝐦: ${prefix}\n│𝐎𝐰𝐧𝐞𝐫:ミ𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄彡\n╰─────────⌾\n╭─⌾⏰𝗕𝗢𝗧 𝗨𝗣𝗧𝗜𝗠𝗘⏰ ${botUptimeString}\n╰─────────⌾\n╭─⌾⏰𝗦𝗘𝗥𝗩𝗘𝗥 𝗨𝗣𝗧𝗜𝗠𝗘⏰\n${serverUptimeString}\n╰─────────⌾\n╭─⌾🟢𝗖𝗔𝗣𝗔𝗖𝗜𝗧𝗬🟢\n│𝐒𝐩𝐞𝐞𝐝📶: ${speed} ko/s\n│𝐒𝐭𝐨𝐜𝐤𝐚𝐠𝐞💽: ${usedStorage.toFixed(2)}/${totalStorage.toFixed(2)} GB\n│𝐑𝐀𝐌💾: ${usedMem.toFixed(2)}/${totalMem.toFixed(2)} GB\n│${systemStatus}\n╰────────⌾\n╭─⌾📅🕰️ 𝐓𝐢𝐦𝐞 🕰️📅\n│${currentTime}\n╰─────────⌾`,
                            event.threadID
                        );
                    });
                });
            });

        } catch (error) {
            console.error(error);
            api.sendMessage(`🔴| 𝐁𝐚𝐝 𝐒𝐲𝐬𝐭𝐞𝐦: An error occurred while retrieving data. ${error.message}`, event.threadID);

            if (module.exports.config.author !== "ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡") {
                return api.sendMessage("❌| 𝐓𝐚𝐧𝐭 𝐪𝐮𝐞 𝐯𝐨𝐮𝐬 𝐧'𝐚𝐮𝐫𝐞𝐳 𝐩𝐚𝐬 𝐫𝐞𝐦𝐢𝐬 𝐥𝐞 𝐧𝐨𝐦 𝐝𝐮 𝐜𝐫𝐞𝐚𝐭𝐞𝐮𝐫 𝐝𝐞 𝐜𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞...𝐜𝐞𝐥𝐥𝐞-𝐜𝐢 𝐜𝐞𝐬𝐬𝐞𝐫𝐚 𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞𝐫 !🛠️⚙️", event.threadID);
            }
        }
    }
};