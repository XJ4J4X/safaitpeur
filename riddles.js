// =============================================================================
// DHARMA INITIATIVE // STATION MANOIR ANIMATO
// PROTOCOLE VIEWERS FANTÔMES - TERMINAL DE CONFINEMENT PARANORMAL
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
    etape: "ÉTAPE 01 // ACCÈS FONDATION DHARMA ANIMATO",
    secteur: "SOUS-SOLS DU MANOIR - TERMINAL PRINCIPAL",
    histoire: "Une bande magnétique tourne sur un vieux moniteur cathodique. Le Dr. Animato, VTuber en blouse blanche de la DHARMA, apparaît à l'écran : 'Bienvenue à la Station du Manoir. Ce soir, les viewers ont percé le voile de la réalité et hantent les couloirs sous forme de spectres. Pour stabiliser la connexion du stream et contenir les apparitions, vous devez saisir la suite numérique fondamentale de l'Initiative...'",
    question: "SAISIE DU CODE MAÎTRE DHARMA :\nEntrez la légendaire suite des 6 nombres sacrés (séparés par un espace) qui contrôle le pare-feu électromagnétique.",
    reponses: [
      "4 8 15 16 23 42",
      "4, 8, 15, 16, 23, 42",
      "4-8-15-16-23-42",
      "4815162342",
      "4,8,15,16,23,42"
    ],
    indices: [
      "Quatre, huit, quinze, seize, vingt-trois...",
      "Les 6 nombres maudits de l'île."
    ],
    messageVictoire: "> SUITE NUMÉRIQUE VALIDÉE. Générateur du stream en ligne. Connexion verrouillée."
  },
  {
    id: 2,
    etape: "ÉTAPE 02 // CODE OTAN - LE TCHAT DANS LES COULOIRS",
    secteur: "LE GRAND HALL DU MANOIR",
    histoire: "Le micro de secours grésille. Un des modérateurs d'Animato a laissé un message d'urgence avant que la brume des viewers fantômes n'envahisse le vestibule.",
    question: "INTERCEPTION RADIO MILITAIRE (ALPHABET PHONÉTIQUE OTAN) :\n>> SIERRA - HOTEL - ALPHA - DELTA - OSCAR - WHISKEY <<\nQuel mot en anglais le modérateur a-t-il utilisé pour décrire la silhouette spectral d'un viewer caché ?",
    reponses: [
      "shadow",
      "l'ombre",
      "ombre",
      "une ombre",
      "the shadow"
    ],
    indices: [
      "Prends la première lettre de chaque mot OTAN : S - H - A - D - O - W.",
      "Le mot signifie 'Ombre' dans la langue de Shakespeare."
    ],
    messageVictoire: "> EXACT : L'Ombre du viewer recule vers la salle des serveurs..."
  },
  {
    id: 3,
    etape: "ÉTAPE 03 // CODE MORSE - LA SPIRIT BOX DU CHAT",
    secteur: "LA BIBLIOTHÈQUE DU MANOIR - FRÉQUENCE DU TCHAT",
    histoire: "Dans la pénombre, une radio spirit box couplée au terminal capte le flux du tchat Twitch. Des impulsions courtes et longues résonnent, un message direct des viewers passés dans l'au-delà.",
    question: "RÉCEPTION TÉLÉGRAPHIQUE PARANORMALE (CODE MORSE) :\nImpulsion captée :\n...-  /  ..  /  .  /  .--  /  .  /  .-.  /  ...\nQui tente de communiquer à travers l'écran cathodique ?\n(Astuce : tapez 'bip' pour entendre le signal sonore Morse)",
    audioMorse: "...- .. . .-- . .-. ...",
    reponses: [
      "viewers",
      "les viewers",
      "viewer",
      "un viewer",
      "des viewers"
    ],
    indices: [
      "Décodage : ...- (V) / .. (I) / . (E) / .-- (W) / . (E) / .-. (R) / ... (S)",
      "Ceux qui regardent le live d'Animato."
    ],
    messageVictoire: "> FRÉQUENCE ACCORDÉE : Les Viewers. Ils sont bien là, dans les murs..."
  },
  {
    id: 4,
    etape: "ÉTAPE 04 // LE COMPTE À REBOURS DU LIVE",
    secteur: "LA SALLE DE CONTRÔLE DU STREAM",
    histoire: "Sur le mur de la régie, un grand chronomètre à lamelles basculantes tourne sans arrêt. Comme dans la célèbre station Le Cygne, Animato doit réinitialiser le cycle pour éviter une déconnexion massive de la réalité.",
    question: "MATHÉMATIQUES DU COMPTE À REBOURS DHARMA :\nLa durée complète en minutes du cycle de live correspond à la somme arithmétique exacte des 6 nombres mystiques (4 + 8 + 15 + 16 + 23 + 42).\nCombien de minutes dure ce cycle avant la surcharge du serveur ?",
    reponses: [
      "108",
      "108 minutes",
      "cent huit",
      "cent-huit",
      "108 min"
    ],
    indices: [
      "Faites la somme : 4 + 8 + 15 + 16 + 23 + 42 = ?",
      "C'est le nombre de minutes légendaire qui sépare chaque saisie du code."
    ],
    messageVictoire: "> MINUTERIE DU LIVE SYNCHRONISÉE : 108 minutes. Les serveurs sont réinitialisés."
  },
  {
    id: 5,
    etape: "ÉTAPE 05 // CODE OTAN - LE TROLL FRAPPEUR",
    secteur: "LA SALLE DE BAL AUX LUSTRES BRISÉS",
    histoire: "Un fracas assourdissant retentit au rez-de-chaussée : un viewer banni tente d'attirer l'attention. Les chaises s'empilent par lévitation !",
    question: "DÉTECTION DE TROLL SPECTRAL (CODE OTAN) :\nLe capteur psychokinétique épelle la signature de l'entité :\n>> PAPA - OSCAR - LIMA - TANGO - ECHO - ROMEO - GOLF - ECHO - INDIA - SIERRA - TANGO <<\nComment appelle-t-on cet esprit frappeur et tapageur ?",
    reponses: [
      "poltergeist",
      "un poltergeist",
      "le poltergeist",
      "esprit frappeur",
      "un esprit frappeur"
    ],
    indices: [
      "Prenez les initiales : P - O - L - T - E - R - G - E - I - S - T.",
      "Mot allemand désignant un 'fantôme bruyant' qui projette les objets."
    ],
    messageVictoire: "> TROLL IDENTIFIÉ : Poltergeist banni temporairement par le bot de modération."
  },
  {
    id: 6,
    etape: "ÉTAPE 06 // CODE MORSE - L'ÉCHO DU SUB-GOAL",
    secteur: "LA CAVE VOÛTÉE DU MANOIR",
    histoire: "L'humidité glace l'air de la cave. Un ancien téléscripteur à ruban perforé DHARMA martèle une série de bips rapides provenant d'un ancien sub mystérieux.",
    question: "MESSAGE DU TCHAT SPECTRAL (CODE MORSE) :\nSignal intercepté :\n--.  /  ....  /  ---  /  ...  /  -\nQuel mot anglais utilise-t-on pour nommer ce viewer devenu apparition ?\n(Astuce : tapez 'bip' pour écouter le morse)",
    audioMorse: "--. .... --- ... -",
    reponses: [
      "ghost",
      "fantome",
      "fantôme",
      "un fantome",
      "un fantôme",
      "le fantome",
      "spectre",
      "un spectre"
    ],
    indices: [
      "Décodage : --. (G) / .... (H) / --- (O) / ... (S) / - (T)",
      "Le terme anglais pour 'fantôme'."
    ],
    messageVictoire: "> DÉCRYPTAGE RÉUSSI : GHOST. Le viewer fantôme observe silencieusement."
  },
  {
    id: 7,
    etape: "ÉTAPE 07 // L'ÉMOTE HALLOWEEN DU MANOIR",
    secteur: "LE PORCHE GOTHIQUE ET LES BOIS MORTS",
    histoire: "Une inscription taillée à la pointe d'un couteau sur la poutre maîtresse du manoir barre l'accès à la crypte secrète du setup d'Animato.",
    question: "L'ÉNIGME D'HALLOWEEN DU TCHAT :\n'Née au creux d'un potager brumeux, on a vidé mes entrailles et découpé sur mon écorce un rictus démoniaque. Je suis l'émote préférée d'octobre. Une flamme vacille en mon sein.\nQui suis-je ?'",
    reponses: [
      "citrouille",
      "la citrouille",
      "une citrouille",
      "jack o lantern",
      "jack-o-lantern",
      "jack o'lantern",
      "lanterne",
      "la lanterne",
      "potiron",
      "citrouille d'halloween"
    ],
    indices: [
      "Le légume orange sculpté chaque 31 octobre.",
      "Jack O'Lantern..."
    ],
    messageVictoire: "> PASSAGE OUVERT : Le sourire flamboyant éclaire la grille rouillée."
  },
  {
    id: 8,
    etape: "ÉTAPE 08 // LES ARCHIVES PERDUES DE LA FONDATION",
    secteur: "LE BUNKER SOUTERRAIN - SECTION CLASSIFIÉE",
    histoire: "Dans les classeurs poussiéreux, un rapport révèle que la Station d'Animato sous le manoir était le pendant paranormal d'une célèbre station souterraine de l'Île, connue pour son dôme géodésique.",
    question: "ARCHIVES DES STATIONS :\nQuel est le nom français ou anglais de la mythique Station 3 de la DHARMA, dont l'emblème représente un oiseau blanc au long cou gracieux ?",
    reponses: [
      "le cygne",
      "cygne",
      "the swan",
      "swan",
      "station cygne",
      "station le cygne",
      "station the swan"
    ],
    indices: [
      "L'oiseau blanc qui nage sur l'eau.",
      "Station 'The Swan' en version originale."
    ],
    messageVictoire: "> PROTOCOLE CYGNE CONFIRMÉ. Résonance électromagnétique établie avec l'Île."
  },
  {
    id: 9,
    etape: "ÉTAPE 09 // FRÉQUENCE HYBRIDE (OTAN + MORSE)",
    secteur: "LA CHAMBRE DES MIROIRS SANS TAIN",
    histoire: "Deux transmissions radio se superposent sur le moniteur. Vous devez déchiffrer les deux moitiés envoyées par le tchat pour assembler le sortilège.",
    question: "INTERCEPTION DOUBLE (OTAN + MORSE) :\nPartie A (Code OTAN) : BRAVO - OSCAR - OSCAR\nPartie B (Code Morse) : .-.  /  ..  /  .--.\nCombinez les deux réponses en un seul mot de passe (ex: 'BOO RIP') pour dissiper le brouillard :",
    audioMorse: ".-. .. .--.",
    reponses: [
      "boo rip",
      "boo-rip",
      "boo / rip",
      "boorip",
      "bouh rip",
      "bouh-rip",
      "boo r.i.p",
      "boo r.i.p."
    ],
    indices: [
      "Partie A (OTAN) : B - O - O (Le cri classique du fantôme)",
      "Partie B (Morse) : .-. (R) / .. (I) / .--. (P)",
      "Combinaison attendue : BOO RIP"
    ],
    messageVictoire: "> RÉSONANCE STABILISÉE : BOO RIP ! Le miroir se fige, les viewers fantômes s'apaisent."
  },
  {
    id: 10,
    etape: "ÉTAPE 10 // CONFINEMENT FINAL - LE PROTOCOLE ANIMATO",
    secteur: "NOYAU MAGNÉTIQUE CENTRAL DU STREAM",
    histoire: "URGENCE ABSOLUE ! LE COMPTE À REBOURS DU LIVE EST EN PHASE CRITIQUE ! Les spectres menacent de saturer les serveurs ! Les volets mécaniques tremblent !\nPour réinitialiser le système et sceller la brèche dimensionnelle, vous devez taper la célèbre formule de paix et de clôture de la DHARMA Initiative.",
    question: "DÉCHARGE SPECTRALE FINALE :\nQuelle salutation sacrée (7 lettres, commence par N) ou mot-clé d'exécution devez-vous saisir sur le terminal pour sauver le live du Manoir ?",
    reponses: [
      "namaste",
      "namasté",
      "execute",
      "4 8 15 16 23 42",
      "decharge spectrale",
      "decharge"
    ],
    indices: [
      "La salutation traditionnelle signifiant 'Je salue le divin en toi', employée à la fin de chaque vidéo DHARMA.",
      "N - A - M - A - S - T - E... 'Namaste et bon stream !'"
    ],
    messageVictoire: "> DÉCHARGE SPECTRALE MAJEURE EFFECTUÉE ! BRÈCHE COLMATÉE ! LE LIVE EST SAUVÉ !"
  }
];

window.ALPHABET_OTAN = ALPHABET_OTAN;
window.ALPHABET_MORSE = ALPHABET_MORSE;
window.ENIGMES = ENIGMES;
