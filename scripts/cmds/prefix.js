const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');
const GIFEncoder = require('gifencoder');
const { utils } = global;

module.exports = {
  config: {
    name: "prefix",
    version: "2.0",
    author: "ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡",
    countDown: 5,
    role: 0,
    description: "Change ou affiche le préfixe du bot (global ou local) et génère un GIF animé.",
    category: "config",
    guide: {
      fr: "   {pn} : affiche les préfixes actuels\n"
        + "   {pn} <nouveau prefix> : change le préfixe dans ce salon\n"
        + "   {pn} <nouveau prefix> -g : change le préfixe global (admin seulement)\n"
        + "   {pn} reset : remet le préfixe local par défaut",
      en: "   {pn} : displays current prefixes\n"
        + "   {pn} <new prefix>: change prefix in this thread\n"
        + "   {pn} <new prefix> -g: change global prefix\n"
        + "   {pn} reset: reset thread prefix to default"
    }
  },

  langs: {
    fr: {
      reset: "Préfixe local réinitialisé par défaut : %1",
      onlyAdmin: "Seul un admin peut changer le préfixe global.",
      confirmGlobal: "Réagis à ce message pour confirmer le changement du préfixe global.",
      confirmThread: "Réagis à ce message pour confirmer le changement du préfixe du salon.",
      successGlobal: "Préfixe global changé pour : %1",
      successThread: "Préfixe du salon changé pour : %1",
      myPrefix: "╭─⌾🌿𝙷𝙴𝐃𝐆𝐄𝐇𝐎𝐆🌿\n│🦔| 𝐒𝐲𝐬𝐭𝐞𝐦 𝐏𝐫𝐞𝐟𝐢𝐱 : %1\n│🔖| 𝐁𝐨𝐱 𝐂𝐡𝐚𝐭 𝐏𝐫𝐞𝐟𝐢𝐱 : %2\n╰──────────⌾"
    },
    en: {
      reset: "Thread prefix has been reset to default: %1",
      onlyAdmin: "Only admin can change the bot system prefix.",
      confirmGlobal: "React to this message to confirm changing the global prefix.",
      confirmThread: "React to this message to confirm changing the thread prefix.",
      successGlobal: "System (global) prefix changed to: %1",
      successThread: "Thread prefix changed to: %1",
      myPrefix: "╭─⌾🌿𝙷𝙴𝐃𝐆𝐄𝐇𝐎𝐆🌿\n│🦔| 𝐒𝐲𝐬𝐭𝐞𝐦 𝐏𝐫𝐞𝐟𝐢𝐱: %1\n│🔖| 𝐁𝐨𝐱 𝐂𝐡𝐚𝐭 𝐏𝐫𝐞𝐟𝐢𝐱 : %2\n╰──────────⌾"
    }
  },

  generatePrefixGif: async function(systemPrefix, threadPrefix) {
    try {
      const lines = [
        "╭─⌾🌿𝙷𝙴𝐃𝐆𝐄𝐇𝐎𝐆🌿",
        `│🦔| 𝐒𝐲𝐬𝐭𝐞𝐦 𝐏𝐫𝐞𝐟𝐢𝐱 : ${systemPrefix}`,
        `│🔖| 𝐁𝐨𝐱 𝐂𝐡𝐚𝐭 𝐏𝐫𝐞𝐟𝐢𝐱 : ${threadPrefix}`,
        "╰──────────⌾"
      ];
      const fullText = lines.join('\n');
      const neonColors = ["#00FFD0", "#39FF14", "#FF00DE", "#FFFB00", "#00B3FF", "#FF006F"];

      const width = 500, height = 250;
      const encoder = new GIFEncoder(width, height);
      // Removed special characters from gifName to ensure valid filename
      const gifName = `prefix_${systemPrefix.replace(/[^a-z0-9]/gi,'')}_${threadPrefix.replace(/[^a-z0-9]/gi,'')}.gif`;
      const gifPath = path.join(__dirname, gifName);

      // If the gif exists, return it instead of regenerating
      if (fs.existsSync(gifPath)) return gifPath;

      const out = fs.createWriteStream(gifPath);
      encoder.createReadStream().pipe(out);

      encoder.start();
      encoder.setRepeat(0);
      encoder.setDelay(40);
      encoder.setQuality(2);

      for (let i = 1; i <= fullText.length; i++) {
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#050014";
        ctx.fillRect(0, 0, width, height);

        let charIdx = 0, y = 60;
        for (let l = 0; l < lines.length; l++) {
          const line = lines[l];
          let toShow = Math.max(0, Math.min(line.length, i - charIdx));
          let textToDraw = line.slice(0, toShow);
          ctx.font = "bold 30px Arial";
          ctx.shadowColor = neonColors[l % neonColors.length];
          ctx.shadowBlur = 14;
          ctx.strokeStyle = neonColors[l % neonColors.length];
          ctx.lineWidth = 2;
          ctx.fillStyle = neonColors[l % neonColors.length];
          ctx.strokeText(textToDraw, 32, y);
          ctx.fillText(textToDraw, 32, y);
          charIdx += line.length + 1; // +1 for the newline character
          y += 48;
        }
        encoder.addFrame(ctx);
      }

      encoder.finish();
      await new Promise((resolve, reject) => {
        out.on("finish", resolve);
        out.on("error", reject);
      });
      return gifPath;
    } catch (e) {
      console.error("Erreur lors de la génération du GIF prefix :", e);
      return null;
    }
  },

  onStart: async function({ message, role, args, commandName, event, threadsData, getLang }) {
    const systemPrefix = global.GoatBot.config.prefix;
    const threadPrefix = await threadsData.get(event.threadID, "data.prefix") || systemPrefix;

    // If no arguments are provided (i.e., just "prefix" was typed)
    if (args.length === 0) {
      const gifPath = await this.generatePrefixGif(systemPrefix, threadPrefix);
      return message.reply({
        body: getLang("myPrefix", systemPrefix, threadPrefix),
        attachment: fs.createReadStream(gifPath)
      });
    }

    // Reset local prefix
    if (args[0] === "reset") {
      await threadsData.set(event.threadID, null, "data.prefix");
      const updatedThreadPrefix = await threadsData.get(event.threadID, "data.prefix") || systemPrefix;
      const gifPath = await this.generatePrefixGif(systemPrefix, updatedThreadPrefix);
      return message.reply({
        body: getLang("reset", systemPrefix),
        attachment: fs.createReadStream(gifPath)
      });
    }

    // Prefix change logic
    const newPrefix = args[0];
    const isGlobal = args[1] === "-g";
    const confirmMsg = isGlobal ? getLang("confirmGlobal") : getLang("confirmThread");

    if (isGlobal && role < 2) { // Assuming role 2 or higher is admin
      return message.reply(getLang("onlyAdmin"));
    }

    // Confirmation logic
    message.reply(confirmMsg, (err, info) => {
      if (info) {
        global.GoatBot.onReaction.set(info.messageID, {
          commandName,
          author: event.senderID,
          newPrefix,
          isGlobal
        });
      }
    });
  },

  onReaction: async function({ message, threadsData, event, Reaction, getLang }) {
    const { author, newPrefix, isGlobal } = Reaction;
    if (event.userID !== author) return;

    if (isGlobal) {
      global.GoatBot.config.prefix = newPrefix;
      fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
      // Generate GIF with the NEW global prefix
      const gifPath = await this.generatePrefixGif(newPrefix, newPrefix);
      return message.reply({
        body: getLang("successGlobal", newPrefix),
        attachment: fs.createReadStream(gifPath)
      });
    } else {
      await threadsData.set(event.threadID, newPrefix, "data.prefix");
      const systemPrefix = global.GoatBot.config.prefix;
      // Generate GIF with the system prefix and the NEW thread prefix
      const gifPath = await this.generatePrefixGif(systemPrefix, newPrefix);
      return message.reply({
        body: getLang("successThread", newPrefix),
        attachment: fs.createReadStream(gifPath)
      });
    }
  },

  onChat: async function({ event, message, getLang, threadsData }) {
    const systemPrefix = global.GoatBot.config.prefix;
    const threadPrefix = await threadsData.get(event.threadID, "data.prefix") || systemPrefix;

    if (event.body === systemPrefix) { // If the message is exactly the system prefix
      const gifPath = await this.generatePrefixGif(systemPrefix, threadPrefix);
      return message.reply({
        body: getLang("myPrefix", systemPrefix, threadPrefix),
        attachment: fs.createReadStream(gifPath)
      });
    }
  }
};