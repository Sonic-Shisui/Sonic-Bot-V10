const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "help",
    version: "2.0",
    author: "ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡",
    countDown: 5,
    role: 0,
    shortDescription: "Image téléphone avec la liste des commandes",
    longDescription: "Génère une image d'un téléphone contenant la liste de toutes les commandes du bot en 5 colonnes.",
    category: "system"
  },

  onStart: async function ({ message }) {
    try {
      // Chemin du dossier de commandes, à adapter si besoin :
      const cmdsDir = __dirname;
      const files = fs.readdirSync(cmdsDir)
        .filter(f => f.endsWith('.js') && f !== 'help.js');

      // Récupérer les noms des commandes
      const commands = [];
      for (const file of files) {
        try {
          const cmd = require(path.join(cmdsDir, file));
          if (cmd.config && cmd.config.name)
            commands.push(cmd.config.name);
        } catch (e) {}
      }
      if (commands.length === 0) {
        return message.reply("Aucune commande trouvée dans ce dossier.");
      }

      // --- Définir la taille dynamique du canvas selon le nombre de commandes ---
      const cols = 5;
      const colSpacing = 40;
      const colWidth = 180;
      const rowHeight = 34;
      const phoneMargin = 50;
      const screenPadX = 20;
      const screenPadY = 40;
      const titleHeight = 60;
      const headerHeight = 35;
      const btnHomeHeight = 60;

      // Calcul du nombre de lignes par colonne
      const commandsPerCol = Math.ceil(commands.length / cols);
      // Calcul hauteur de l'écran selon nombre de lignes
      const screenH = titleHeight + headerHeight + commandsPerCol * rowHeight + 40;
      const screenW = cols * colWidth + (cols - 1) * colSpacing;
      // Calcul taille totale du canvas
      const width = screenW + phoneMargin * 2 + screenPadX * 2;
      const height = screenH + phoneMargin * 2 + screenPadY * 2 + btnHomeHeight;

      // Positionnement de l'écran sur le canvas
      const screenX = phoneMargin + screenPadX;
      const screenY = phoneMargin + screenPadY;

      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext('2d');

      // Fond général
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(0, 0, width, height);

      // Corps du téléphone (bordures arrondies)
      ctx.fillStyle = "#333";
      ctx.beginPath();
      ctx.moveTo(phoneMargin + 30, phoneMargin);
      ctx.lineTo(width - phoneMargin - 30, phoneMargin);
      ctx.quadraticCurveTo(width - phoneMargin, phoneMargin, width - phoneMargin, phoneMargin + 30);
      ctx.lineTo(width - phoneMargin, height - phoneMargin - 30);
      ctx.quadraticCurveTo(width - phoneMargin, height - phoneMargin, width - phoneMargin - 30, height - phoneMargin);
      ctx.lineTo(phoneMargin + 30, height - phoneMargin);
      ctx.quadraticCurveTo(phoneMargin, height - phoneMargin, phoneMargin, height - phoneMargin - 30);
      ctx.lineTo(phoneMargin, phoneMargin + 30);
      ctx.quadraticCurveTo(phoneMargin, phoneMargin, phoneMargin + 30, phoneMargin);
      ctx.closePath();
      ctx.fill();

      // Écran du téléphone (bordures arrondies)
      ctx.fillStyle = "#191d25";
      ctx.strokeStyle = "#0099ff";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(screenX + 30, screenY);
      ctx.lineTo(screenX + screenW - 30, screenY);
      ctx.quadraticCurveTo(screenX + screenW, screenY, screenX + screenW, screenY + 30);
      ctx.lineTo(screenX + screenW, screenY + screenH - 30);
      ctx.quadraticCurveTo(screenX + screenW, screenY + screenH, screenX + screenW - 30, screenY + screenH);
      ctx.lineTo(screenX + 30, screenY + screenH);
      ctx.quadraticCurveTo(screenX, screenY + screenH, screenX, screenY + screenH - 30);
      ctx.lineTo(screenX, screenY + 30);
      ctx.quadraticCurveTo(screenX, screenY, screenX + 30, screenY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Haut-parleur
      ctx.fillStyle = "#444";
      ctx.beginPath();
      ctx.ellipse(width / 2, phoneMargin + 15, 55, 10, 0, 0, 2 * Math.PI);
      ctx.fill();

      // Titre - petit ("Hedgehog-Bot-V2")
      ctx.font = "18px Arial";
      ctx.fillStyle = "#00ffea";
      ctx.textAlign = "center";
      ctx.fillText("Hedgehog-Bot-V2", width / 2, screenY + 32);

      // Affichage des commandes en 5 colonnes
      ctx.font = "18px Arial";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "left";

      let colStarts = [];
      for (let c = 0; c < cols; c++) {
        colStarts[c] = screenX + c * (colWidth + colSpacing);
      }
      let startY = screenY + 32 + headerHeight; // sous le titre

      let idx = 0;
      for (let c = 0; c < cols; c++) {
        let y = startY;
        for (let r = 0; r < commandsPerCol && idx < commands.length; r++) {
          ctx.fillText(`${idx + 1}. ${commands[idx]}`, colStarts[c], y);
          y += rowHeight;
          idx++;
        }
      }

      // Bouton Home
      ctx.beginPath();
      ctx.arc(width / 2, height - phoneMargin - 25, 20, 0, 2 * Math.PI);
      ctx.fillStyle = "#23272f";
      ctx.fill();
      ctx.strokeStyle = "#444";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Sauvegarder temporairement le fichier (obligatoire sur Goatbot/Sonic pour l'envoi en pièce jointe)
      const imgPath = path.join(cmdsDir, `help_phone_${Date.now()}.png`);
      fs.writeFileSync(imgPath, canvas.toBuffer());

      await message.reply({
        body: "Voici la liste des commandes du bot :",
        attachment: fs.createReadStream(imgPath)
      });

      // Nettoyage du fichier temporaire
      setTimeout(() => {
        try { fs.unlinkSync(imgPath); } catch {}
      }, 30_000);

    } catch (e) {
      return message.reply("Erreur lors de la génération de l'image : " + e.message);
    }
  }
};