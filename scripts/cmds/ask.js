const axios = require('axios');
const moment = require('moment-timezone');

const UPoLPrefix = ['Sonic'];

module.exports = {
  config: {
    name: 'ask',
    version: '1.0.3',
    role: 0,
    category: 'AI',
    author: 'ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡',
    shortDescription: 'Interagir avec Sonic IA',
    longDescription: 'Sonic IA répond à vos questions.',
  },

  conversationHistory: {},

  applyBold: (text) => {
    const normalToBold = {
      'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌', 'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙',
      'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟', 'g': '𝐠', 'h': '𝐡', 'i': '𝐢', 'j': '𝐣', 'k': '𝐤', 'l': '𝐥', 'm': '𝐦', 'n': '𝐧', 'o': '𝐨', 'p': '𝐩', 'q': '𝐪', 'r': '𝐫', 's': '𝐬', 't': '𝐭', 'u': '𝐮', 'v': '𝐯', 'w': '𝐰', 'x': '𝐱', 'y': '𝐲', 'z': '𝐳'
    };
    let transformed = text;
    transformed = transformed.replace(/\*\*(.*?)\*\*/g, (match, p1) => p1.split('').map(char => normalToBold[char] || char).join(''));
    transformed = transformed.replace(/\*(.*?)(?:\s|$)/g, (match, p1) => p1.split('').map(char => normalToBold[char] || char).join('') + ' ');
    return transformed;
  },

  countTokens: (history) => {
    return history.reduce((total, msg) => total + msg.content.length, 0);
  },

  getCurrentDateTime: async () => {
    try {
      const geoResponse = await axios.get('https://freegeoip.app/json/', { timeout: 5000 });
      const timezone = geoResponse.data.time_zone || 'Africa/Lagos';
      const dt = moment().tz(timezone);
      return `${dt.format('DD MMMM YYYY, HH:mm')} ${dt.zoneAbbr()}`;
    } catch (err) {
      console.error('Erreur récupération fuseau horaire:', err.message);
      const dt = moment().tz('Africa/Lagos');
      return `${dt.format('DD MMMM YYYY, HH:mm')} WAT`;
    }
  },

  onStart: async function () {},

  onChat: async function ({ message, event, args, api, threadID, messageID }) {
    const ahprefix = UPoLPrefix.find((p) => event.body && event.body.toLowerCase().startsWith(p.toLowerCase()));
    if (!ahprefix) {
      console.log('Préfixe non trouvé:', event.body);
      return;
    }

    const upol = event.body.substring(ahprefix.length).trim();
    console.log('Message reçu:', event.body, 'Upol:', upol);

    const userId = event.senderID;

    let senderName = 'Ami';
    try {
      const userInfo = await api.getUserInfo(userId);
      if (userInfo && userInfo[userId] && userInfo[userId].name) {
        senderName = userInfo[userId].name;
      }
    } catch (err) {
      console.error('Erreur récupération nom:', err.message);
    }

    if (!upol) {
      const styledResponse = `
◎ ─━──━─❖─━──━─ ◎
Salut ${senderName} ! Pose-moi une question pour que je puisse t'aider.
◎ ─━──━─❖─━──━─ ◎
`;
      console.log('Envoi message préfixe seul:', styledResponse);
      await message.reply(styledResponse);
      return;
    }

    if (!this.conversationHistory[userId]) {
      this.conversationHistory[userId] = [];
    }

    this.conversationHistory[userId].push({ role: 'user', content: upol });

    if (this.countTokens(this.conversationHistory[userId]) > 4000) {
      this.conversationHistory[userId] = [];
      this.conversationHistory[userId].push({ role: 'user', content: upol });
    }

    const historyString = this.conversationHistory[userId].map(msg => `${msg.role}: ${msg.content}`).join('\n');
    const currentDateTime = await this.getCurrentDateTime();

    const prompt = `Tu t'appelles Sonic IA, créé par ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡 connu sous le nom de ʚʆɞ Sønïč Ĩsågï ʚʆɞ. L'utilisateur est ${senderName}. Date actuelle: ${currentDateTime}. Utilise l’historique complet: ${historyString} pour répondre de manière cohérente à toutes les interactions. Réponds en français, de manière amicale et professionnelle. Analyse: "${upol}".

1. Si salutation (ex. "salut"), réponds directement en tenant compte de l’historique.
2. Si question claire avec données internes (pré-2024), réponds précisément.
3. Si données post-2024 ou inconnues, renvoie strictement et rien d'autres : "Recherche en cours [${upol}]". je ne vois pas voir de bonjour dans ta réponse.
4. Si calcul ou suivi de conversation, utilise l’historique pour rester cohérent.
5. Ne dis pas "bonjour" à tout les coups dans tes réponses.
Pas de recherche web initiale.`;

    try {
      console.log('Envoi requête API avec prompt:', prompt);
      const response = await axios.post(
        'https://uchiha-perdu-ia-five.vercel.app/api',
        { prompt },
        { headers: { 'Content-Type': 'application/json' }, timeout: 60000 }
      );

      console.log('Réponse API:', response.data);

      let answer = response.data.response || 'Erreur : pas de réponse.';

      if (answer.startsWith('Recherche en cours')) {
        console.log('Déclenchement recherche:', upol);
        const searchResponse = await axios.post(
          'https://uchiha-perdu-search-api.vercel.app/search',
          { query: upol },
          { headers: { 'Content-Type': 'application/json' }, timeout: 60000 }
        );
        answer = searchResponse.data.response || 'Aucun résultat.';
        console.log('Résultat recherche:', answer);
      }

      answer = this.applyBold(answer);

      this.conversationHistory[userId].push({ role: 'assistant', content: answer });

      const styledResponse = `
◎ ─━──━─❖─━──━─ ◎
${answer}
◎ ─━──━─❖─━──━─ ◎
`;

      console.log('Envoi réponse:', styledResponse);
      await message.reply(styledResponse);
    } catch (err) {
      console.error('Erreur API:', err.message);
      const styledResponse = `
◎ ─━──━─❖─━──━─ ◎
Erreur serveur. Réessaie plus tard.
◎ ─━──━─❖─━──━─ ◎
`;
      console.log('Envoi erreur:', styledResponse);
      await message.reply(styledResponse);
    }
  }
};