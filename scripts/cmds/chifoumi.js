const pfcGames = {};

const choices = {
  "pierre": "🪨",a
  "feuille": "📄",
  "ciseaux": "✂️"
};

function getWinner(choice1, choice2) {
  if (choice1 === choice2) return 0; // égalité
  if (
    (choice1 === "pierre" && choice2 === "ciseaux") ||
    (choice1 === "feuille" && choice2 === "pierre") ||
    (choice1 === "ciseaux" && choice2 === "feuille")
  ) return 1; // joueur 1 gagne
  return 2; // joueur 2 gagne
}

module.exports = {
  config: {
    name: "chifoumi",
    aliases: ["pierrefeuilleciseaux", "pierre-feuille-ciseaux", "rps"],
    version: "1.0",
    author: "ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡",
    category: "game",
    shortDescription: "Pierre feuille ciseaux à 2 joueurs",
    usage: "pfc @ami",
  },

  onStart: async function ({ api, event, args }) {
    const threadID = event.threadID;
    const senderID = event.senderID;
    let opponentID;
    const mentionedIDs = Object.keys(event.mentions);

    if (mentionedIDs.length > 0) opponentID = mentionedIDs[0];
    else if (args[0] && /^\d+$/.test(args[0])) opponentID = args[0];

    if (!opponentID)
      return api.sendMessage("Mentionnez un ami ou donnez son ID pour commencer une partie de Pierre-Feuille-Ciseaux !", threadID, event.messageID);

    if (opponentID == senderID)
      return api.sendMessage("Vous ne pouvez pas jouer contre vous-même !", threadID, event.messageID);

    const gameID = `${threadID}:${Math.min(senderID, opponentID)}:${Math.max(senderID, opponentID)}`;
    if (pfcGames[gameID] && pfcGames[gameID].inProgress)
      return api.sendMessage("Une partie est déjà en cours entre ces joueurs.", threadID, event.messageID);

    const player1Info = await api.getUserInfo(senderID);
    const player2Info = await api.getUserInfo(opponentID);

    if (!player2Info[opponentID])
      return api.sendMessage("Impossible de trouver l'utilisateur avec cet ID.", threadID, event.messageID);

    pfcGames[gameID] = {
      players: [
        { id: senderID, name: player1Info[senderID].name, choice: null },
        { id: opponentID, name: player2Info[opponentID].name, choice: null }
      ],
      inProgress: true,
      threadID
    };

    api.sendMessage(
      `👊 Partie de Pierre-Feuille-Ciseaux entre ${player1Info[senderID].name} et ${player2Info[opponentID].name} !\n` +
      `Envoyez votre choix (**pierre**, **feuille**, ou **ciseaux**) en **message privé au bot** pour plus de suspense !`,
      threadID,
      event.messageID
    );

    // Optionnel : rappeler en MP
    for (const player of [senderID, opponentID]) {
      api.sendMessage(
        "Envoyez simplement : pierre, feuille ou ciseaux pour jouer à Pierre-Feuille-Ciseaux !",
        player
      );
    }
  },

  onChat: async function ({ api, event }) {
    const senderID = event.senderID;
    const threadID = event.threadID;
    const body = event.body.trim().toLowerCase();

    // Trouve le jeu en cours où ce joueur participe
    const gameID = Object.keys(pfcGames).find(id => {
      const g = pfcGames[id];
      return g.inProgress && g.players.some(p => p.id == senderID);
    });
    if (!gameID) return;
    const game = pfcGames[gameID];

    // Vérifie si le message est un choix valide
    if (!choices[body]) return;

    // Enregistre le choix du joueur
    const playerIndex = game.players.findIndex(p => p.id == senderID);
    if (playerIndex === -1) return;
    if (game.players[playerIndex].choice)
      return api.sendMessage("Vous avez déjà joué ! Attendez l'autre joueur.", senderID);

    game.players[playerIndex].choice = body;
    api.sendMessage(`Votre choix "${body}" (${choices[body]}) a été enregistré !`, senderID);

    // Si les deux ont joué, annonce le résultat
    if (game.players[0].choice && game.players[1].choice) {
      const c1 = game.players[0].choice;
      const c2 = game.players[1].choice;
      const res = getWinner(c1, c2);
      let msg =
        `Résultats Pierre-Feuille-Ciseaux :\n` +
        `${game.players[0].name} : ${c1} ${choices[c1]}\n` +
        `${game.players[1].name} : ${c2} ${choices[c2]}\n`;

      if (res === 0) msg += "\n⚖️ Égalité !";
      else msg += `\n🏆 Le gagnant est : ${game.players[res - 1].name} !`;

      game.inProgress = false;
      api.sendMessage(msg, game.threadID);
    }
  }
};