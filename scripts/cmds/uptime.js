const os = require('os');
const moment = require('moment-timezone');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

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
    onStart: async function ({ api, event, prefix, args }) {
        try {
            const backgroundPath = 'http://goatbiin.onrender.com/zdffy-5mc.jpg';
            const botUptime = process.uptime();
            const serverUptime = os.uptime(); // Get server uptime
            // Format bot uptime
            const botDays = Math.floor(botUptime / 86400);
            const botHours = Math.floor((botUptime % 86400) / 3600);
            const botMinutes = Math.floor((botUptime % 3600) / 60);
            const botSeconds = Math.floor(botUptime % 60);

            const botUptimeString = `${botDays}d ${botHours}h ${botMinutes}m ${botSeconds}s`;

            // Format server uptime
            const serverDays = Math.floor(serverUptime / 86400);
            const serverHours = Math.floor((serverUptime % 86400) / 3600);
            const serverMinutes = Math.floor((serverUptime % 3600) / 60);
            const serverSeconds = Math.floor(serverUptime % 60);

            const serverUptimeString = `${serverDays}d ${serverHours}h ${serverMinutes}m ${serverSeconds}s`;

            const totalMem = os.totalmem() / (1024 * 1024 * 1024);
            const freeMem = os.freemem() / (1024 * 1024 * 1024);
            const usedMem = totalMem - freeMem;
            const speed = os.cpus()[0].speed;

            const systemStatus = "✅| 𝖲𝗆𝗈𝗈𝗍𝗁 𝖲𝗒𝗌𝗍𝖾𝗆";

            // Set timezone to Cameroon (Africa/Douala)
            const cameroonTimezone = 'Africa/Douala';
            const now = moment().tz(cameroonTimezone);
            const currentTime = now.format('YYYY-MM-DD HH:mm:ss');

            // Generate current date and time for the drawing
            const currentDate = now.format('MM/DD/YYYY');
            const currentTimeFormatted = now.format('HH:mm:ss A');

            // Create an image with the information
            const canvas = createCanvas(800, 1000);
            const ctx = canvas.getContext('2d');

            // Load the background image
            const backgroundImage = await loadImage(backgroundPath);
            ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

            // Draw the text with fluorescent colors
            ctx.font = '30px Arial';
            ctx.fillStyle = '#00ff00'; // Fluorescent green

            // Draw the drawing and text
            ctx.fillText('♡   ∩_∩', 50, 50);
            ctx.fillText('（„• ֊ •„)♡', 50, 90);
            ctx.fillText('╭─∪∪────────────⟡', 50, 130);
            ctx.fillText('│ 𝗨𝗣𝗧𝗜𝗠𝗘 𝗜𝗡𝗙𝗢', 50, 170);
            ctx.fillText('├───────────────⟡', 50, 210);
            ctx.fillText('│ ⏰ 𝗥𝗨𝗡𝗧𝗜𝗠𝗘', 50, 250);
            ctx.fillText(`│ ${botUptimeString}`, 50, 290);
            ctx.fillText('├───────────────⟡', 50, 330);
            ctx.fillText('│ 👑 𝗦𝗬𝗦𝗧𝗘𝗠 𝗜𝗡𝗙𝗢', 50, 370);
            ctx.fillText(`│𝙾𝚂: ${os.type()} ${os.arch()}`, 50, 410);
            ctx.fillText(`│𝙻𝙰𝙽𝙶 𝚅𝙴𝚁: ${process.version}`, 50, 450);
            ctx.fillText(`│𝙲𝙿𝚄 𝙼𝙾𝙳𝙴𝙻: ${os.cpus()[0].model}`, 50, 490);
            ctx.fillText(`│𝚂𝚃𝙾𝚁𝙰𝙶𝙴: ${usedMem.toFixed(2)} GB / ${totalMem.toFixed(2)} GB`, 50, 530);
            ctx.fillText(`│𝙲𝙿𝚄 𝚄𝚂𝗔𝗚𝙴: ${(os.loadavg()[0] * 100).toFixed(2)}%`, 50, 570);
            ctx.fillText(`│𝚁𝙰𝙼 𝚄𝚂𝗘: ${(os.totalmem() - os.freemem()) / (1024 * 1024)} MB`, 50, 610);
            ctx.fillText('├───────────────⟡', 50, 650);
            ctx.fillText('│ ☣️ 𝗢𝗧𝗛𝗘𝗥 𝗜𝗡𝗙𝗢', 50, 690);
            ctx.fillText(`│𝙳𝙰𝚃𝙴: ${currentDate}`, 50, 730);
            ctx.fillText(`│𝚃𝙸𝙼𝙴: ${currentTimeFormatted}`, 50, 770);
            ctx.fillText('│𝚄𝚂𝙴𝚁𝚂: 1', 50, 810);
            ctx.fillText('│𝚃𝙷𝚁𝙴𝙰𝙳𝚂: 2', 50, 850);
            ctx.fillText('│𝙿𝙸𝙽𝙶: 384𝚖𝚜', 50, 890);
            ctx.fillText(`│𝚂𝚃𝙰𝚃𝚄𝚂: ${systemStatus}`, 50, 930);
            ctx.fillText('╰───────────────⟡', 50, 970);

            // Save the image
            const buffer = canvas.toBuffer('image/png');
            const imagePath = './uptime.png';
            fs.writeFileSync(imagePath, buffer);

            // Send the image
            api.sendMessage({ body: 'Here is the uptime information:', attachment: fs.createReadStream(imagePath) }, event.threadID);

        } catch (error) {
            console.error(error);
            api.sendMessage(`🔴 Bad System: An error occurred while retrieving data. ${error.message}`, event.threadID);

            if (module.exports.config.author !== "ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡") {
                return api.sendMessage("❌ Tant que vous n'aurez pas remis le nom du créateur de cette commande... celle-ci cessera de fonctionner !🛠️⚙️", event.threadID);
            }
        }
    }
};