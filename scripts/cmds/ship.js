module.exports = {
  config: {
    name: "ship",
    aliases: ["amour"],
    version: "1.0",
    author: "ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡",
    category: "fun",
    shortDescription: "Calcule le score d'amour entre deux personnes.",
    usage: "love @user1 @user2 OU love nom1 nom2"
  },

  onStart: async function ({ api, event, args }) {
    let user1 = null, user2 = null;

    // Si mentions
    const mentions = Object.keys(event.mentions);
    if (mentions.length === 2) {
      user1 = event.mentions[mentions[0]];
      user2 = event.mentions[mentions[1]];
      user1 = user1.replace(/@/g, '').trim();
      user2 = user2.replace(/@/g, '').trim();
    } else if (args.length >= 2) {
      user1 = args[0];
      user2 = args[1];
    } else {
      return api.sendMessage("𝐕𝐞𝐮𝐢𝐥𝐥𝐞𝐳 𝐦𝐞𝐧𝐭𝐢𝐨𝐧𝐧𝐞𝐫 𝐝𝐞𝐮𝐱 𝐜é𝐥𝐢𝐛𝐚𝐭𝐚𝐢𝐫𝐞𝐬 !👀", event.threadID, event.messageID);
    }

    // Calcul pseudo-aléatoire basé sur les deux noms pour un résultat stable
    function loveScore(a, b) {
      const str = (a + b).toLowerCase();
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash += str.charCodeAt(i) * (i + 1);
      }
      return (hash % 101); // Score sur 100
    }

    const score = loveScore(user1, user2);
    let comment = "";
    if (score > 90) comment = "💖 𝐀𝐦𝐞-𝐒𝐨𝐞𝐮𝐫𝐬 !";
    else if (score > 75) comment = "😍 𝐕𝐨𝐮𝐬 𝐞𝐭𝐞𝐬 𝐟𝐚𝐢𝐭 𝐥'𝐮𝐧 𝐩𝐨𝐮𝐫 𝐥'𝐚𝐮𝐭𝐫𝐞..𝐜'𝐞𝐬𝐭 é𝐯𝐢𝐝𝐞𝐧𝐭 !";
    else if (score > 60) comment = "😊 𝐁𝐞𝐥𝐥𝐞 𝐜𝐨𝐦𝐩𝐥𝐢𝐜𝐢𝐭é !";
    else if (score > 40) comment = "😅 𝐈𝐥 𝐲'𝐚 𝐞𝐧𝐜𝐨𝐫𝐞 𝐮𝐧 𝐞𝐬𝐩𝐨𝐢𝐫 𝐞𝐧𝐭𝐫𝐞 𝐯𝐨𝐮𝐬...";
    else if (score > 20) comment = "🙈 𝐎𝐮𝐩𝐬 𝐜'𝐞𝐬𝐭 𝐩𝐚𝐬 𝐠𝐚𝐠𝐧é...";
    else comment = "💔 𝐏𝐚𝐬 𝐜𝐨𝐦𝐩𝐚𝐭𝐢𝐛𝐥𝐞𝐬 𝐝𝐮 𝐭𝐨𝐮𝐭...𝐩𝐚𝐬 𝐥𝐚 𝐩𝐞𝐢𝐧𝐞 𝐝'𝐞𝐬𝐬𝐚𝐲𝐞𝐫...";

    // Petit graphique
    const bar = "█".repeat(Math.floor(score / 10)) + "░".repeat(10 - Math.floor(score / 10));

    api.sendMessage(
      `💘 Test d'amour entre ${user1} et ${user2} 💘\nScore : ${score}%\n[${bar}]\n${comment}`,
      event.threadID,
      event.messageID
    );
  }
};