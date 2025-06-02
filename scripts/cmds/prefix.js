const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');
const GIFEncoder = require('gifencoder');

let cachedGifPath = null; // Store the path to the pre-generated GIF

module.exports = {
  config: {
    name: "prefix",
    version: "1.2",
    author: "Copilot Chat",
    countDown: 5,
    role: 0,
    shortDescription: "Génère une image animée du préfixe du bot",
    longDescription: "Affiche un gif animé avec le préfixe du bot écrit de façon stylée et fluorescente.",
    category: "system"
  },

  onLoad: async function () { // New onLoad function
    try {
      // Texte et couleurs
      const lines = [
        "╭─⌾🌿𝙷𝙴𝙳𝙶𝙴𝙷𝙾𝙶🌿",
        "│🦔|𝐒𝐲𝐬𝐭𝐞𝐦 𝐏𝐫𝐞𝐟𝐢𝐱: ~",
        "│🔖|𝐁𝐨𝐱 𝐂𝐡𝐚𝐭 𝐏𝐫𝐞𝐟𝐢𝐱: ~",
        "╰──────────⌾"
      ];
      const fullText = lines.join('\n');
      const neonColors = ["#00FFD0", "#39FF14", "#FF00DE", "#FFFB00", "#00B3FF", "#FF006F"];

      // Dimensions du GIF
      const width = 500, height = 250;

      // Création du GIF
      const encoder = new GIFEncoder(width, height);
      cachedGifPath = path.join(__dirname, `prefix_cached.gif`); // Use a fixed name
      const out = fs.createWriteStream(cachedGifPath);
      encoder.createReadStream().pipe(out);

      encoder.start();
      encoder.setRepeat(0);
      encoder.setDelay(40); // ms par frame
      encoder.setQuality(2);

      for (let i = 1; i <= fullText.length; i++) {
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");

        // Fond
        ctx.fillStyle = "#050014";
        ctx.fillRect(0, 0, width, height);

        // Texte lettre par lettre, couleur néon
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
          charIdx += line.length + 1; // +1 pour le \n
          y += 48;
        }
        encoder.addFrame(ctx);
      }

      encoder.finish();

      // Attendre la fin de l'écriture du fichier
      await new Promise((resolve, reject) => {
        out.on("finish", resolve);
        out.on("error", reject);
      });

      console.log("Prefix GIF pre-generated and cached.");

    } catch (e) {
      console.error("Error pre-generating prefix GIF:", e);
    }
  },

  onStart: async function ({ message }) {
    if (!cachedGifPath) {
      return message.reply("Le GIF du préfixe n'a pas encore été généré. Veuillez réessayer dans quelques secondes.");
    }

    try {
      await message.reply({
        body: "",
        attachment: fs.createReadStream(cachedGifPath)
      });
    } catch (e) {
      return message.reply("Erreur lors de l'envoi du GIF : " + e.message);
    }
  },

  onChat: async function ({ event, message }) {
    if (event.body && event.body.toLowerCase() === "prefix") {
      await this.onStart({ message });
    }
  }
};