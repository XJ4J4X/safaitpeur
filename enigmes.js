// =============================================================================
// DHARMA INITIATIVE // STATION MANOIR ANIMATO
// BASE DE DONNÉES DES VIEWERS ET MODÉRATION DU LIVE HORREUR
// =============================================================================

const ALPHABET_OTAN = {
  A: "Alpha",   B: "Bravo",    C: "Charlie", D: "Delta",    E: "Echo",
  F: "Foxtrot", G: "Golf",     H: "Hotel",   I: "India",    J: "Juliett",
  K: "Kilo",    L: "Lima",     M: "Mike",    N: "November", O: "Oscar",
  P: "Papa",    Q: "Quebec",   R: "Romeo",   S: "Sierra",   T: "Tango",
  U: "Uniform", V: "Victor",   W: "Whiskey", X: "X-ray",    Y: "Yankee",
  Z: "Zulu"
};

const ALPHABET_MORSE = {
  A: ".-",    B: "-...",  C: "-.-.",  D: "-..",   E: ".",     F: "..-.",
  G: "--.",   H: "....",  I: "..",    J: ".---",  K: "-.-",   L: ".-..",
  M: "--",    N: "-.",    O: "---",   P: ".--.",  Q: "--.-",  R: ".-.",
  S: "...",   T: "-",     U: "..-",   V: "...-",  W: ".--",   X: "-..-",
  Y: "-.--",  Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----."
};

const ENIGMES = [
  {
    id: 1,
    etape: "ÉTAPE 01 // ACCÈS MODÉRATEUR DHARMA",
    secteur: "SOUS-SOLS DU MANOIR - SETUP DE STREAM",
    histoire: "Le stream est planté. Animato le VTuber vient de se prendre un vieux jumpscare et son avatar a crashé. En tant que Modo VIP, tu dois taper la légendaire clé de stream DHARMA pour relancer OBS avant que les viewers ne désertent.",
    question: "CLÉ DE STREAM DHARMA :\nEntrez la fameuse suite des 6 nombres sacrés (séparés par un espace) pour relancer le live.",
    reponses: [
      "4 8 15 16 23 42",
      "4, 8, 15, 16, 23, 42",
      "4-8-15-16-23-42",
      "4815162342",
      "4,8,15,16,23,42"
    ],
    indices: [
      "Quatre, huit, quinze, seize, vingt-trois...",
      "Les 6 nombres maudits de la station DHARMA."
    ],
    messageVictoire: "> CLÉ DE STREAM VALIDÉE. OBS reconnecté. Le live reprend."
  },
  {
    id: 2,
    etape: "ÉTAPE 02 // CODE OTAN - L'INFECTION DU TCHAT",
    secteur: "LE TCHAT TWITCH",
    histoire: "Le live est de retour, mais le Tchat est incontrôlable ! Un viewer insupportable n'arrête pas de dire à Animato quoi faire dans son jeu d'horreur.",
    question: "DÉTECTION D'INFRACTION (CODE OTAN) :\nLe bot modo a flaggé ce mot :\n>> BRAVO - ALPHA - CHARLIE - KILO - SIERRA - ECHO - ALPHA - TANGO <<\nQuel est ce terme insupportable qu'on déteste tous en stream ?",
    reponses: [
      "backseat",
      "le backseat",
      "back seat"
    ],
    indices: [
      "Prends la première lettre de chaque mot OTAN : B - A - C - K - S - E - A - T.",
      "Le fait de dire au streamer comment jouer à sa place."
    ],
    messageVictoire: "> EXACT : Ban de 10 minutes appliqué au backseater. Le calme revient."
  },
  {
    id: 3,
    etape: "ÉTAPE 03 // CODE MORSE - LE SUB-GOAL SECRET",
    secteur: "PANNEAU DES DONATIONS",
    histoire: "Soudain, une donation étrange passe sur l'écran. L'alerte de sub n'est pas une musique, mais une série de bips effrayants. C'est le cri de ralliement de la commu d'Animato quand il panique !",
    question: "SUB-ALERT PARANORMALE (CODE MORSE) :\nImpulsion captée :\n...  /  -.-.  /  .-.  /  .  /  .-  /  --  /  .  /  .-.\nComment s'appelle cette frayeur soudaine qui fait hurler le VTuber ?\n(Astuce : tape 'bip' pour entendre l'alerte)",
    audioMorse: "... -.-. .-. . .- -- . .-.",
    reponses: [
      "screamer",
      "un screamer",
      "le screamer",
      "jumpscare"
    ],
    indices: [
      "Décodage : ... (S) / -.-. (C) / .-. (R) / . (E) / .- (A) / -- (M) / . (E) / .-. (R)",
      "Une image effrayante qui apparaît d'un coup avec un cri."
    ],
    messageVictoire: "> SUB-ALERT COMPRISE : SCREAMER ! Le casque d'Animato a volé à travers la pièce !"
  },
  {
    id: 4,
    etape: "ÉTAPE 04 // LE COMPTE À REBOURS DU LIVE",
    secteur: "LE TABLEAU DE BORD DU MODÉRATEUR",
    histoire: "Dans la station du Manoir, un timer géant rappelle aux modos qu'ils doivent régulièrement purger le tchat. C'est exactement la somme totale des nombres de la clé de stream.",
    question: "MATHÉMATIQUES DU LIVE :\nLe cycle du live correspond à la somme des nombres (4 + 8 + 15 + 16 + 23 + 42).\nCombien de minutes dure ce live horreur avant la saturation des serveurs ?",
    reponses: [
      "108",
      "108 minutes",
      "cent huit",
      "cent-huit",
      "108 min"
    ],
    indices: [
      "Faites la somme : 4 + 8 + 15 + 16 + 23 + 42 = ?",
      "C'est le nombre légendaire de LOST, et la durée du stream en minutes."
    ],
    messageVictoire: "> MINUTERIE DU LIVE SYNCHRONISÉE : 108 minutes. On est repartis."
  },
  {
    id: 5,
    etape: "ÉTAPE 05 // CODE OTAN - L'ENTITÉ EN JEU",
    secteur: "LA PARTIE MULTIJOUEUR EN COURS",
    histoire: "Animato joue au jeu de chasse aux fantômes le plus connu. Dans la maison, tous les objets volent dans sa direction ! Le Spirit Box affiche l'entité.",
    question: "IDENTIFICATION DE L'ENTITÉ (CODE OTAN) :\nLe carnet du jeu épelle l'esprit :\n>> PAPA - OSCAR - LIMA - TANGO - ECHO - ROMEO - GOLF - ECHO - INDIA - SIERRA - TANGO <<\nQuelle est cette entité capable de jeter le stuff du VTuber ?",
    reponses: [
      "poltergeist",
      "un poltergeist",
      "le poltergeist",
      "esprit frappeur"
    ],
    indices: [
      "Prenez les initiales : P - O - L - T - E - R - G - E - I - S - T.",
      "Le fameux fantôme bruyant qui vide ta sanity en jetant des assiettes."
    ],
    messageVictoire: "> ENTITÉ COCHÉE DANS LE CARNET : Poltergeist. Animato s'enfuit dans le camion."
  },
  {
    id: 6,
    etape: "ÉTAPE 06 // CODE MORSE - LE DÉFENSEUR DU TCHAT",
    secteur: "LES LOGS DU TCHAT",
    histoire: "Les viewers fantômes reviennent à la charge. Il n'y a qu'une seule catégorie de personnes capable de manier l'Épée du Banhammer pour sauver le live d'Animato.",
    question: "GRADE DANS LE TCHAT (CODE MORSE) :\nSignal intercepté :\n--  /  ---  /  -..  /  ---\nQuel est ton titre honorifique sur ce stream ?\n(Astuce : tape 'bip' pour écouter)",
    audioMorse: "-- --- -.. ---",
    reponses: [
      "modo",
      "modérateur",
      "moderateur",
      "un modo",
      "le modo"
    ],
    indices: [
      "Décodage : -- (M) / --- (O) / -.. (D) / --- (O)",
      "Celui qui a l'épée verte à côté de son pseudo."
    ],
    messageVictoire: "> TITRE VÉRIFIÉ : Modo. Ton Banhammer luit dans les ténèbres du Manoir."
  },
  {
    id: 7,
    etape: "ÉTAPE 07 // L'ÉMOTE HALLOWEEN DU STREAM",
    secteur: "LE PANNEAU DES ÉMOTES",
    histoire: "Pour contrer les esprits, Animato demande au tchat de spammer une émote très précise pour éclairer le stream.",
    question: "L'ÉNIGME D'HALLOWEEN DU TCHAT :\n'Née au creux d'un potager brumeux, on a vidé mes entrailles et découpé sur mon écorce un rictus démoniaque. Je suis l'émote préférée du mois d'octobre. Une flamme vacille en mon sein.\nQue doit spammer le tchat ?'",
    reponses: [
      "citrouille",
      "la citrouille",
      "une citrouille",
      "jack o lantern",
      "jack-o-lantern",
      "jack o'lantern",
      "lanterne",
      "potiron",
      "citrouille d'halloween"
    ],
    indices: [
      "Le légume orange sculpté chaque 31 octobre.",
      "Jack O'Lantern..."
    ],
    messageVictoire: "> LE TCHAT S'ILLUMINE : Des centaines d'émotes Citrouille réchauffent le Manoir."
  },
  {
    id: 8,
    etape: "ÉTAPE 08 // LE JEU D'HORREUR DU MOIS",
    secteur: "LA BIBLIOTHÈQUE STEAM",
    histoire: "On a identifié le Poltergeist tout à l'heure, mais quel est ce jeu vidéo de chasse aux fantômes dans lequel Animato vient de laisser sa vie ?",
    question: "CULTURE GAMING :\nQuel est le nom du jeu vidéo coopératif légendaire où tu utilises EMF, Spirit Box et DOTS pour identifier des esprits ?",
    reponses: [
      "phasmophobia",
      "phasmo",
      "phasmaphobia"
    ],
    indices: [
      "Commence par Phasm...",
      "Le classique de la chasse aux fantômes."
    ],
    messageVictoire: "> JEU IDENTIFIÉ : Phasmophobia. GG le tchat."
  },
  {
    id: 9,
    etape: "ÉTAPE 09 // LA SANCTION DIVINE (OTAN + MORSE)",
    secteur: "LE BANHAMMER ULTIME",
    histoire: "Le boss final des viewers trolls est là. Tu dois combiner la commande ultime des modos avec une petite marque de respect funèbre.",
    question: "INTERCEPTION DOUBLE (OTAN + MORSE) :\nPartie A (OTAN) : BRAVO - ALPHA - NOVEMBER\nPartie B (Morse) : .-.  /  ..  /  .--.\nCombinez les deux réponses en un seul ordre (ex: 'BAN RIP') pour le kick définitivement :",
    audioMorse: ".-. .. .--.",
    reponses: [
      "ban rip",
      "ban-rip",
      "ban / rip",
      "banrip",
      "ban r.i.p",
      "ban r.i.p."
    ],
    indices: [
      "Partie A (OTAN) : B - A - N (La sentence du modérateur)",
      "Partie B (Morse) : .-. (R) / .. (I) / .--. (P) (Repose En Paix)",
      "Combinaison attendue : BAN RIP"
    ],
    messageVictoire: "> BANHAMMER DÉPLOYÉ : BAN RIP ! Le viewer fantôme a été annihilé de la chaîne."
  },
  {
    id: 10,
    etape: "ÉTAPE 10 // FIN DE LIVE - LE PROTOCOLE RAID",
    secteur: "L'ÉCRAN DE FIN DE STREAM",
    histoire: "URGENCE ! LE LIVE S'ACHÈVE ! Le Manoir va exploser sous le sel du tchat ! Animato lance un dernier message pour apaiser la commu et dire au revoir de façon très zen (façon DHARMA).",
    question: "DÉCHARGE FINALE :\nQuelle salutation pacifique de la DHARMA Initiative (7 lettres, commence par N) Animato utilise-t-il toujours pour clôturer le stream proprement ?",
    reponses: [
      "namaste",
      "namasté",
      "raid",
      "decharge",
      "fin du live"
    ],
    indices: [
      "La salutation indienne signifiant 'Je salue le divin en toi', employée à la fin de chaque vidéo DHARMA.",
      "N - A - M - A - S - T - E... 'Namaste, et bon stream !'"
    ],
    messageVictoire: "> FIN DU LIVE RÉUSSIE ! RAID ENVOYÉ ! BRÈCHE COLMATÉE !"
  }
];

window.ALPHABET_OTAN = ALPHABET_OTAN;
window.ALPHABET_MORSE = ALPHABET_MORSE;
window.ENIGMES = ENIGMES;
