const fs = require('fs');

module.exports = {
  config: {
    name: "owner2",
    version: "1.0",
    author: "ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡", // don't change credits 
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "reply",
  },
 
  onStart: async function() {},
 
  onChat: async function({ event, message, getLang, api }) {
   const link = [
"http://goatbiin.onrender.com/60bf2tK6j.gif",
]
  let img =
link[Math.floor(Math.random()*link.length)]
    if (event.body) {
      const word = event.body.toLowerCase();
      switch (word) {
        case "sonic qui est ton créateur":
          const replies = [
            "Mais si tu veux vraiment savoir qui est mon vrai créateur, il s'agit du programmeur ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡 plus connu sous le nom de ʚʆɞ Sønïč Ĩsågï ʚʆɞ. Un utilisateur très réputé en matière de Bots ayant créé un projet Hedgehog GPT. Il est trouvable sur Facebook et son lien est le suivant : https://facebook.com/hentai.san.1492",
          ];
          api.setMessageReaction("🪄", event.messageID, event.messageID, api); 
          const randomIndex = Math.floor(Math.random() * replies.length);
          message.reply({
            body: replies[randomIndex],
attachment: await global.utils.getStreamFromURL(img)})
          break;
        default:
          return; 
      }
    }
  },
};