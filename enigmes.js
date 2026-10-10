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
    histoire: "Le stream vient de crash sec. Animato s'est mangé un vieux jumpscare et il hurle 'Toucher !' dans le micro avant que tout coupe. En tant que Modo, tu dois relancer le stream avec le code sacré DHARMA avant que tout le monde parte.",
    question: "CLÉ DE STREAM DHARMA :\nTape la légendaire suite de 6 nombres sacrés (avec des espaces) pour relancer OBS.",
    reponses: [
      "4 8 15 16 23 42",
      "4, 8, 15, 16, 23, 42",
      "4-8-15-16-23-42",
      "4815162342",
      "4,8,15,16,23,42"
    ],
    indices: [
      "Quatre, huit, quinze, seize, vingt-trois...",
      "Les fameux 6 chiffres maudits de la station DHARMA."
    ],
    messageVictoire: "> CLÉ VALIDÉE. OBS est relancé, let's go."
  },
  {
    id: 2,
    etape: "ÉTAPE 02 // CODE OTAN - L'INFECTION DU TCHAT",
    secteur: "LE TCHAT TWITCH",
    histoire: "Le live revient, mais le tchat part en vrille ! Un viewer trop chiant arrête pas de spoiler le jeu et dit à Animato quoi faire. 'Toucher !' lâche Animato, gavé par ce troll.",
    question: "DÉTECTION DU FORCEUR (CODE OTAN) :\nLe bot modo a flaggé ce comportement :\n>> BRAVO - ALPHA - CHARLIE - KILO - SIERRA - ECHO - ALPHA - TANGO <<\nComment on appelle ce genre de gars insupportable en stream ?",
    reponses: [
      "backseat",
      "le backseat",
      "back seat"
    ],
    indices: [
      "La première lettre de chaque mot OTAN : B - A - C - K - S - E - A - T.",
      "Le mec qui te dit comment jouer à ta place."
    ],
    messageVictoire: "> EXACT : Timeout de 10 min appliqué au backseater. C'est carré."
  },
  {
    id: 3,
    etape: "ÉTAPE 03 // CODE MORSE - LE SUB-GOAL SECRET",
    secteur: "PANNEAU DES DONATIONS",
    histoire: "Soudain, une alerte de sub retentit. Mais au lieu de la musique habituelle, c'est une série de bips flippants. 'C'est quoi ce délire ?' crie Animato.",
    question: "SUB-ALERT PARANORMALE (CODE MORSE) :\nImpulsion captée :\n...  /  -.-.  /  .-.  /  .  /  .-  /  --  /  .  /  .-.\nComment on appelle cette frayeur soudaine qui fait hurler les streamers ?\n(Astuce : tape 'bip' pour entendre l'alerte)",
    audioMorse: "... -.-. .-. . .- -- . .-.",
    reponses: [
      "screamer",
      "un screamer",
      "le screamer",
      "jumpscare"
    ],
    indices: [
      "Décodage : ... (S) / -.-. (C) / .-. (R) / . (E) / .- (A) / -- (M) / . (E) / .-. (R)",
      "Un truc qui pop d'un coup à l'écran avec un gros cri."
    ],
    messageVictoire: "> SUB-ALERT DÉCODÉE : SCREAMER ! Animato a fait un bond de 3 mètres, Toucher !"
  },
  {
    id: 4,
    etape: "ÉTAPE 04 // LE COMPTE À REBOURS DU LIVE",
    secteur: "LE TABLEAU DE BORD DU MODÉRATEUR",
    histoire: "Dans le Manoir, y a un chrono géant qui tourne. Animato prévient : 'Les gars, le live va couper automatiquement à la fin du timer !' Ce timer, c'est la somme de tous les chiffres de la clé de stream.",
    question: "MATHÉMATIQUES DU LIVE :\nLe chrono total, c'est la somme exacte des nombres (4 + 8 + 15 + 16 + 23 + 42).\nCombien de minutes dure ce live horreur au total ?",
    reponses: [
      "108",
      "108 minutes",
      "cent huit",
      "cent-huit",
      "108 min"
    ],
    indices: [
      "Calcule juste la somme : 4 + 8 + 15 + 16 + 23 + 42 = ?",
      "C'est le nombre de minutes mythique de LOST."
    ],
    messageVictoire: "> CHRONO CALIBRÉ : 108 minutes. On est bien."
  },
  {
    id: 5,
    etape: "ÉTAPE 05 // CODE OTAN - L'ENTITÉ EN JEU",
    secteur: "LA PARTIE MULTIJOUEUR EN COURS",
    histoire: "Animato lance son jeu d'horreur préféré. Directement dans la maison virtuelle, les chaises volent. 'Toucher !' s'exclame-t-il en voyant son matos s'envoler.",
    question: "IDENTIFICATION DE L'ENTITÉ (CODE OTAN) :\nLe carnet du jeu épelle le type de fantôme :\n>> PAPA - OSCAR - LIMA - TANGO - ECHO - ROMEO - GOLF - ECHO - INDIA - SIERRA - TANGO <<\nC'est quoi cette entité qui jette tous les objets ?",
    reponses: [
      "poltergeist",
      "un poltergeist",
      "le poltergeist",
      "esprit frappeur"
    ],
    indices: [
      "Prends les initiales : P - O - L - T - E - R - G - E - I - S - T.",
      "Le fantôme ultra bruyant qui te vide la sanity en balançant des assiettes."
    ],
    messageVictoire: "> ESPRIT IDENTIFIÉ : Poltergeist. Animato trace direct au camion !"
  },
  {
    id: 6,
    etape: "ÉTAPE 06 // CODE MORSE - LE DÉFENSEUR DU TCHAT",
    secteur: "LES LOGS DU TCHAT",
    histoire: "Les fantômes spamment le tchat, ça devient illisible. Heureusement, Animato peut compter sur une seule catégorie de viewers pour purger tout ça à coups de clics droits.",
    question: "LE GRADE UTILE (CODE MORSE) :\nSignal intercepté :\n--  /  ---  /  -..  /  ---\nC'est quoi ton rôle officiel sur ce stream ?\n(Astuce : tape 'bip' pour écouter)",
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
      "Celui qui a l'épée verte à côté de son pseudo Twitch."
    ],
    messageVictoire: "> RÔLE VÉRIFIÉ : Modo. Prépare-toi à bannir les forceurs."
  },
  {
    id: 7,
    etape: "ÉTAPE 07 // L'ÉMOTE HALLOWEEN DU STREAM",
    secteur: "LE PANNEAU DES ÉMOTES",
    histoire: "Pour contrer les esprits du jeu, Animato demande au tchat de spammer une émote d'Halloween bien précise pour illuminer l'écran.",
    question: "L'ÉNIGME D'HALLOWEEN DU TCHAT :\n'Née dans un potager brumeux, on m'a vidé les tripes et sculpté un sourire diabolique. Je suis la reine d'octobre. Y a une bougie dedans.\nQuelle est cette émote que le tchat doit spammer ?'",
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
      "Le légume orange typique du 31 octobre.",
      "C'est la Jack O'Lantern."
    ],
    messageVictoire: "> LE TCHAT FLAMBE : Des centaines d'émotes Citrouille pop de partout."
  },
  {
    id: 8,
    etape: "ÉTAPE 08 // LE JEU D'HORREUR DU MOIS",
    secteur: "LA BIBLIOTHÈQUE STEAM",
    histoire: "On a identifié le fantôme de tout à l'heure, mais au fait, à quel jeu de chasse aux fantômes mythique Animato est en train de jouer ?",
    question: "CULTURE GAMING :\nC'est quoi le nom du jeu coop' ultra connu où tu sors l'EMF, la Spirit Box et les lampes UV pour trouver l'entité ?",
    reponses: [
      "phasmophobia",
      "phasmo",
      "phasmaphobia"
    ],
    indices: [
      "Le jeu commence par Phasm...",
      "Le classique ultime de la chasse aux fantômes."
    ],
    messageVictoire: "> JEU IDENTIFIÉ : Phasmophobia. GG le tchat, Touché !"
  },
  {
    id: 9,
    etape: "ÉTAPE 09 // LA SANCTION DIVINE (OTAN + MORSE)",
    secteur: "LE CLIC DROIT ULTIME",
    histoire: "Le boss final des viewers trolls débarque. Tu vas devoir taper la commande ultime des modos (l'expulsion définitive) accompagnée d'une marque de respect pour son enterrement numérique.",
    question: "INTERCEPTION DOUBLE (OTAN + MORSE) :\nPartie A (OTAN) : BRAVO - ALPHA - NOVEMBER\nPartie B (Morse) : .-.  /  ..  /  .--.\nCombine les deux mots (ex: 'BAN RIP') pour le dégager définitivement :",
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
      "Partie A (OTAN) : B - A - N (L'expulsion définitive)",
      "Partie B (Morse) : .-. (R) / .. (I) / .--. (P) (Repose en Paix)",
      "Combinaison attendue : BAN RIP"
    ],
    messageVictoire: "> COUP DE GRÂCE : BAN RIP ! Le viewer troll a disparu dans les abysses du tchat."
  },
  {
    id: 10,
    etape: "ÉTAPE 10 // FIN DE LIVE - LE PROTOCOLE RAID",
    secteur: "L'ÉCRAN DE FIN DE STREAM",
    histoire: "ALERTE ! C'est la fin du live ! Animato est rincé et dit 'Bon, je vous envoie chez un pote, Touché !'. Il va lâcher sa phrase fétiche de l'univers DHARMA pour dire au revoir de manière zen.",
    question: "DÉCHARGE FINALE :\nQuel est ce petit mot indien, super zen (7 lettres, commence par N) qu'Animato dit tout le temps pour clôturer ses streams ?",
    reponses: [
      "namaste",
      "namasté",
      "raid",
      "fin du live"
    ],
    indices: [
      "Le mot qui signifie 'Je salue le divin en toi', utilisé à la fin des vidéos DHARMA.",
      "N - A - M - A - S - T - E... 'Namaste le tchat !'"
    ],
    messageVictoire: "> FIN DU LIVE RÉUSSIE ! LE RAID EST PARTI ! T'AS GÉRÉ !"
  }
];

window.ALPHABET_OTAN = ALPHABET_OTAN;
window.ALPHABET_MORSE = ALPHABET_MORSE;
window.ENIGMES = ENIGMES;
