const enigmes = [
  {
    question: "Qu'est-ce qui est plus léger qu'une plume, mais même le plus fort ne peut le tenir plus de quelques minutes ?",
    answer: ["le souffle", "la respiration"]
  },
  {
    question: "Plus je sèche, plus je deviens humide. Qui suis-je ?",
    answer: ["une serviette"]
  },
  {
    question: "Je commence la nuit et finis le matin, mais je n’apparais jamais dans la journée. Qui suis-je ?",
    answer: ["la lettre n"]
  },
  {
    question: "Qu'est-ce qui a des clés mais ne peut pas ouvrir de portes ?",
    answer: ["un piano"]
  },
  {
    question: "Qu'est-ce qui a un cou mais pas de tête ?",
    answer: ["une bouteille"]
  },
  {
    question: "Qu'est-ce qui appartient à toi mais que les autres utilisent plus que toi ?",
    answer: ["ton nom", "le nom"]
  },
  {
    question: "Qu'est-ce qui a une tête, un pied mais pas de corps ?",
    answer: ["un lit"]
  },
  {
    question: "Qu'est-ce qui court sans jamais marcher, a une bouche mais ne parle jamais ?",
    answer: ["une rivière", "un fleuve"]
  },
  {
    question: "Qu'est-ce qui monte mais ne descend jamais ?",
    answer: ["l'âge", "ton age", "l age"]
  },
  {
    question: "Plus tu en prends, plus tu en laisses derrière toi. Que suis-je ?",
    answer: ["les pas", "des pas", "les empreintes", "empreintes"]
  },
  {
    question: "Qu'est-ce qui a des dents mais ne mord jamais ?",
    answer: ["un peigne"]
  },
  {
    question: "Qu'est-ce qui est à toi mais que tes amis utilisent plus que toi ?",
    answer: ["ton nom", "le nom"]
  },
  {
    question: "Qu'est-ce qui est cassé avant d'être utilisé ?",
    answer: ["un œuf", "un oeuf", "l'oeuf", "l’œuf"]
  },
  {
    question: "Qu'est-ce qui a une queue mais pas de corps ?",
    answer: ["une pièce", "une pièce de monnaie", "la pièce"]
  },
  {
    question: "Qu'est-ce qui a des branches mais pas de feuilles ni de fruits ?",
    answer: ["une banque", "la banque"]
  },
  {
    question: "Qu'est-ce qui a un lit mais ne dort jamais ?",
    answer: ["une rivière", "un fleuve"]
  },
  {
    question: "Je suis toujours devant toi mais tu ne peux jamais m’atteindre. Qui suis-je ?",
    answer: ["le futur", "l'avenir"]
  },
  {
    question: "Qu'est-ce qui grandit quand on en retire ?",
    answer: ["un trou"]
  },
  {
    question: "Qu'est-ce qui est plein de trous et retient pourtant l'eau ?",
    answer: ["une éponge", "une eponge"]
  },
  {
    question: "Qu'est-ce qui a un œil mais ne voit jamais ?",
    answer: ["une aiguille", "l'aiguille"]
  },
  {
    question: "Je suis pris avant de vous manger. Qui suis-je ?",
    answer: ["une photo", "la photo"]
  },
  {
    question: "Qu'est-ce qui a une main mais ne peut pas applaudir ?",
    answer: ["une horloge", "l'horloge", "une montre"]
  },
  {
    question: "Qu'est-ce qui est invisible mais te suit partout ?",
    answer: ["l'air", "le vent", "le souffle"]
  },
  {
    question: "Dans quel mois les gens dorment-ils le moins ?",
    answer: ["février", "fevrier"]
  },
  {
    question: "Qu'est-ce qui commence par E, finit par E et ne contient qu'une lettre ?",
    answer: ["une enveloppe", "l'enveloppe"]
  },
  {
    question: "Qu'est-ce qui a un tronc mais pas de feuilles ni de racines ?",
    answer: ["un éléphant", "elephant"]
  },
  {
    question: "Qu'est-ce qui tombe sans jamais se blesser ?",
    answer: ["la pluie", "la neige"]
  },
  {
    question: "Qu'est-ce qui est plus chaud que le feu mais ne brûle pas ?",
    answer: ["le soleil"]
  },
  {
    question: "Qu'est-ce qui commence par un T, finit par un T et contient du thé ?",
    answer: ["une théière", "theiere", "la théière"]
  },
  {
    question: "Qu'est-ce qui a un pouls mais n'est pas vivant ?",
    answer: ["une montre", "un réveil", "l'horloge", "une horloge"]
  },
  {
    question: "Qu'est-ce qui peut remplir une pièce sans prendre de place ?",
    answer: ["la lumière", "lumière"]
  },
  {
    question: "Qu'est-ce qui est à l'intérieur et à l'extérieur, mais ne peut pas être vu ?",
    answer: ["l’air", "air", "le vent"]
  },
  {
    question: "Qu'est-ce qui n'a ni début ni fin ni milieu ?",
    answer: ["un cercle", "le cercle"]
  },
  {
    question: "Qu'est-ce qui voyage autour du monde tout en restant dans un coin ?",
    answer: ["un timbre", "le timbre"]
  },
  {
    question: "Qu'est-ce qui a une racine mais ne pousse pas ?",
    answer: ["un mot", "le mot"]
  },
  {
    question: "Qu'est-ce qui traverse les villes et les champs sans bouger ?",
    answer: ["la route", "un chemin", "une route", "le chemin"]
  },
  {
    question: "Qu'est-ce qui est à la fois lourd et léger, dur et mou, et que l’on jette après l’avoir utilisé ?",
    answer: ["l’ancre", "une ancre"]
  },
  {
    question: "Qu'est-ce qui devient plus propre quand il est plus sale ?",
    answer: ["le tableau", "un tableau", "tableau"]
  },
  {
    question: "Qu'est-ce qui a une oreille mais ne peut pas entendre ?",
    answer: ["un champ de blé", "le blé", "blé", "champ de blé"]
  },
  {
    question: "Qu'est-ce qui est devant toi mais que tu ne peux jamais voir ?",
    answer: ["le futur", "l’avenir"]
  },
  {
    question: "Qu'est-ce qui a une langue mais ne parle jamais ?",
    answer: ["une chaussure", "la chaussure"]
  },
  {
    question: "Je suis grand quand je suis jeune et petit quand je suis vieux. Qui suis-je ?",
    answer: ["une bougie", "la bougie"]
  },
  {
    question: "Qu'est-ce qui a quatre pattes le matin, deux le midi, trois le soir ?",
    answer: ["l'homme", "un homme", "l etre humain", "être humain"]
  },
  {
    question: "Plus on en prend, plus il grandit. Qui suis-je ?",
    answer: ["un trou"]
  },
  {
    question: "Qu'est-ce qui est à la fois à l'intérieur et à l'extérieur d'une maison et qui commence par la lettre F ?",
    answer: ["la fenêtre", "fenêtre"]
  },
  {
    question: "Qu'est-ce qui n'a qu'une seule voix mais qui parle toutes les langues ?",
    answer: ["l'écho", "echo"]
  },
  {
    question: "Qu'est-ce qui peut être cassé sans être touché ?",
    answer: ["une promesse", "la promesse"]
  },
  {
    question: "Qu'est-ce qui a une couronne mais n'est pas roi ?",
    answer: ["une dent", "la dent"]
  },
  {
    question: "Qu'est-ce qui vit si on le nourrit mais meurt si on lui donne à boire ?",
    answer: ["le feu", "un feu"]
  },
  {
    question: "Je parle sans bouche et j’entends sans oreilles. Qui suis-je ?",
    answer: ["l'écho", "echo"]
  },
  {
    question: "Plus je suis grand, moins on me voit. Qui suis-je ?",
    answer: ["l’obscurité", "la nuit", "l'ombre"]
  },
  {
    question: "Qu'est-ce qui est à la fois une question et une réponse ?",
    answer: ["une devinette", "une énigme", "devinette", "énigme"]
  },
  {
    question: "Qu'est-ce qui a une lettre mais pas de timbre ?",
    answer: ["l’alphabet", "alphabet"]
  },
  {
    question: "Qu'est-ce qui a toujours faim et doit être nourri pour vivre ?",
    answer: ["le feu", "un feu"]
  },
  {
    question: "Qu'est-ce qui a plusieurs étages mais pas d’escalier ?",
    answer: ["un gâteau", "le gâteau", "gâteau"]
  },
  {
    question: "Qu'est-ce qui est à la fois une maison et une prison ?",
    answer: ["une cage", "la cage"]
  },
  {
    question: "Qu'est-ce qui peut être brisé mais jamais touché ?",
    answer: ["une promesse", "la promesse"]
  },
  {
    question: "Qu'est-ce qui est à la fois à l'intérieur et à l'extérieur d'une boîte ?",
    answer: ["la lettre x", "le x"]
  },
  {
    question: "Qu'est-ce qui est à l’abri du vent mais s’envole avec la pluie ?",
    answer: ["le parapluie", "un parapluie"]
  },
  {
    question: "Qu'est-ce qui est petit au début, grand à la fin et invisible entre les deux ?",
    answer: ["un trou"]
  },
  {
    question: "Qu'est-ce qui est à la fois un animal et un fruit ?",
    answer: ["une orange", "l’orange", "orange"]
  },
  {
    question: "Qu'est-ce qui est à la fois un poisson et un instrument de musique ?",
    answer: ["la raie", "raie"]
  },
  {
    question: "Qu'est-ce qui a une main mais ne peut pas applaudir ?",
    answer: ["une horloge", "la montre", "montre"]
  },
  {
    question: "Je suis rempli de secrets, mais je n'ai ni porte ni serrure. Qui suis-je ?",
    answer: ["un livre", "le livre"]
  },
  {
    question: "Qu'est-ce qui est à la fois un arbre et une couleur ?",
    answer: ["le sapin", "sapin"]
  },
  {
    question: "Qu'est-ce qui a des racines que personne ne voit, est plus haut qu’un arbre, grimpe pourtant vers le ciel ?",
    answer: ["une montagne", "la montagne"]
  },
  {
    question: "Qu'est-ce qui est aussi grand qu’un éléphant mais qui ne pèse rien ?",
    answer: ["l’ombre de l’éléphant", "l'ombre", "une ombre"]
  },
  {
    question: "Qu'est-ce qui peut traverser des vitres sans les casser ?",
    answer: ["la lumière", "un rayon de lumière"]
  },
  {
    question: "Qu'est-ce qui est à la fois une boisson et une lettre ?",
    answer: ["le thé", "thé"]
  },
  {
    question: "Qu'est-ce qui est à la fois un animal et un véhicule ?",
    answer: ["le cheval", "cheval"]
  },
  {
    question: "Qu'est-ce qui a des ailes mais ne vole pas ?",
    answer: ["un moulin", "le moulin"]
  },
  {
    question: "Qu’est-ce qui est toujours devant toi mais qu’on ne voit jamais ?",
    answer: ["l’avenir", "le futur"]
  },
  {
    question: "Qu'est-ce qui est plus léger qu'une plume, mais même le plus fort ne peut le tenir plus de quelques minutes ?",
    answer: ["le souffle", "la respiration"]
  }  
];

const activeRiddles = {}; // threadID => {index, answered, timeout}

module.exports = {
  config: {
    name: "enigme",
    aliases: ["riddle", "énigme"],
    version: "1.1",
    author: "ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡",
    category: "game",
    shortDescription: "Jeu d'énigmes : devinez la réponse !",
    usage: "enigme"
  },

  onStart: async function ({ api, event }) {
    const threadID = event.threadID;
    const index = Math.floor(Math.random() * enigmes.length);

    // Si une énigme était déjà active, on annule l'ancien timer
    if (activeRiddles[threadID] && activeRiddles[threadID].timeout) {
      clearTimeout(activeRiddles[threadID].timeout);
    }

    // Préparer la réponse à donner après 30s
    const timeout = setTimeout(() => {
      if (activeRiddles[threadID] && !activeRiddles[threadID].answered) {
        const answers = enigmes[index].answer.join(" / ");
        api.sendMessage(`⏰ Temps écoulé ! La réponse était : ${answers}\nTapez 'enigme' pour une nouvelle énigme.`, threadID);
        activeRiddles[threadID].answered = true;
      }
    }, 30000);

    activeRiddles[threadID] = { index, answered: false, timeout };
    await api.sendMessage(
      `🧩 ENIGME :\n${enigmes[index].question}\n\nVous avez 30 secondes pour répondre !`,
      threadID,
      event.messageID
    );
  },

  onChat: async function ({ api, event }) {
    const threadID = event.threadID;
    if (!activeRiddles[threadID] || activeRiddles[threadID].answered) return;

    const { index, timeout } = activeRiddles[threadID];
    const userAnswer = event.body.trim().toLowerCase();

    if (enigmes[index].answer.some(rep => userAnswer.includes(rep))) {
      activeRiddles[threadID].answered = true;
      if (timeout) clearTimeout(timeout);
      return api.sendMessage("🎉 Bravo ! Bonne réponse ! Tapez 'enigme' pour une nouvelle énigme.", threadID, event.messageID);
    } else {
      return api.sendMessage("❌ Mauvaise réponse... Essayez encore !", threadID, event.messageID);
    }
  }
};