module.exports = {
  config: {
    name: "ffprofile",
    aliases: ["freefire", "ff"],
    version: "1.0",
    author: "Sonic-Shisui",
    category: "fun",
    shortDescription: "Affiche un faux profil Free Fire stylé.",
    usage: "ffprofile [@ami]"
  },

  onStart: async function ({ api, event, args }) {
    const mentions = Object.keys(event.mentions);
    let targetID, targetName;

    if (mentions.length > 0) {
      targetID = mentions[0];
      targetName = event.mentions[targetID];
    } else {
      targetID = event.senderID;
      const userInfo = await api.getUserInfo(targetID);
      targetName = userInfo[targetID] ? userInfo[targetID].name : "Toi";
    }

    // Génération aléatoire de stats fun
    function randRange(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const level = randRange(10, 80);
    const kda = (Math.random() * (5 - 1) + 1).toFixed(2);
    const kills = randRange(500, 8000);
    const winrate = randRange(5, 70);
    const skin = ["Cobra", "Hip Hop", "Sakura", "Chrono", "Hayato", "Alok", "Moco", "Kelly"][randRange(0,7)];
    const rangs = ["Bronze", "Argent", "Or", "Platine", "Diamant", "Heroic", "Grand Master"];
    const rank = rangs[randRange(0, rangs.length-1)];
    const badge = "🟦".repeat(randRange(1,3)) + "🟥".repeat(randRange(0,2));
    const titre = ["🔥 King of Booyah!", "💀 Sniper Pro", "💎 Collectionneur de Skins", "🛡️ Survivor Master", "👑 Headshot Machine"][randRange(0,4)];

    // Message profil
    const msg = 
`🎮 Profil Free Fire de ${targetName} :

🏅 Rang : ${rank}   ${badge}
⭐ Niveau : ${level}
👕 Skin préféré : ${skin}
🔫 Kills : ${kills}
⚔️ K/D Ratio : ${kda}
🏆 Winrate : ${winrate}%
🏷️ Titre : ${titre}

Ajoute ton pseudo Free Fire pour plus de fun !`;

    api.sendMessage(msg, event.threadID, event.messageID);
  }
};