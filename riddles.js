// =============================================================================
// DHARMA INITIATIVE // STATION 13 : LE SPECTRE (MANOIR BLACKWOOD)
// PROTOCOLE SAMHAIN - TERMINAL DE CONFINEMENT PARANORMAL
// =============================================================================

const NATO_ALPHABET = {
  A: "Alpha",   B: "Bravo",    C: "Charlie", D: "Delta",    E: "Echo",
  F: "Foxtrot", G: "Golf",     H: "Hotel",   I: "India",    J: "Juliett",
  K: "Kilo",    L: "Lima",     M: "Mike",    N: "November", O: "Oscar",
  P: "Papa",    Q: "Quebec",   R: "Romeo",   S: "Sierra",   T: "Tango",
  U: "Uniform", V: "Victor",   W: "Whiskey", X: "X-ray",    Y: "Yankee",
  Z: "Zulu"
};

const MORSE_ALPHABET = {
  A: ".-",    B: "-...",  C: "-.-.",  D: "-..",   E: ".",     F: "..-.",
  G: "--.",   H: "....",  I: "..",    J: ".---",  K: "-.-",   L: ".-..",
  M: "--",    N: "-.",    O: "---",   P: ".--.",  Q: "--.-",  R: ".-.",
  S: "...",   T: "-",     U: "..-",   V: "...-",  W: ".--",   X: "-..-",
  Y: "-.--",  Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----."
};

const RIDDLES = [
  {
    id: 1,
    stage: "STAGE 01 // ACCÈS FONDATION DHARMA",
    sector: "SOUS-SOLS DU MANOIR - TERMINAL DU CYGNE PARANORMAL",
    story: "Une bande magnétique tourne sur un vieux magnétoscope Betamax. Le Dr. Marvin Candle apparaît : 'Bienvenue à la Station 13 Le Spectre, construite sous le Manoir Blackwood. Chaque nuit de Samhain, l'énergie électromagnétique fusionne avec l'au-delà. Pour stabiliser la console de confinement, saisissez la suite numérique fondamentale de l'Initiative...'",
    question: "SAISIE DU CODE MAÎTRE DHARMA :\nEntrez la légendaire suite des 6 nombres de Lost (séparés par un espace) qui contrôle la décharge électromagnétique.",
    answers: [
      "4 8 15 16 23 42",
      "4, 8, 15, 16, 23, 42",
      "4-8-15-16-23-42",
      "4815162342",
      "4,8,15,16,23,42"
    ],
    hints: [
      "Quatre, huit, quinze, seize, vingt-trois...",
      "Les 6 nombres gravés sur la trappe du Cygne et sur le ticket de loterie de Hurley."
    ],
    successMessage: "> SUITE NUMÉRIQUE VALIDÉE. Générateur électromagnétique en ligne. Fréquence spectrale verrouillée."
  },
  {
    id: 2,
    stage: "STAGE 02 // CODE OTAN - TRANSMISSION RADIO DU VESTIBULE",
    sector: "LE GRAND HALL DU MANOIR",
    story: "L'interphone du terminal crépite. Une transmission radio d'urgence de l'ancien gardien du manoir a été enregistrée en 1977 juste avant la disparition de son équipe.",
    question: "INTERCEPTION RADIO MILITAIRE (ALPHABET PHONÉTIQUE OTAN) :\n>> SIERRA - HOTEL - ALPHA - DELTA - OSCAR - WHISKEY <<\nQuel mot en anglais a-t-il hurlé à travers la radio pour désigner la silhouette sombre glissant sur les murs du manoir ?",
    answers: [
      "shadow",
      "l'ombre",
      "ombre",
      "une ombre",
      "the shadow"
    ],
    hints: [
      "Prenez la première lettre de chaque mot OTAN : S - H - A - D - O - W.",
      "Le mot signifie 'Ombre' dans la langue de Shakespeare."
    ],
    natoRef: "SIERRA (S) - HOTEL (H) - ALPHA (A) - DELTA (D) - OSCAR (O) - WHISKEY (W)",
    successMessage: "> EXACT : L'Ombre du Manoir recule vers la bibliothèque ancienne..."
  },
  {
    id: 3,
    stage: "STAGE 03 // CODE MORSE - LA SPIRIT BOX DES ARCHIVES",
    sector: "LA BIBLIOTHÈQUE DU MANOIR - FRÉQUENCE 108.4 kHz",
    story: "Dans la pénombre de la bibliothèque, une radio spirit box couplée au terminal se déclenche toute seule. Des impulsions courtes et longues résonnent à travers les haut-parleurs cathodiques.",
    question: "RÉCEPTION TÉLÉGRAPHIQUE PARANORMALE (CODE MORSE) :\nImpulsion captée :\n...  /  .-  /  --  /  ....  /  .-  /  ..  /  -.\nQuel est le nom celtique originel de la fête d'Halloween où les esprits traversent le Voile ?\n(Astuce : tapez 'bip' pour entendre le signal sonore Morse)",
    morseAudio: "... .- -- .... .- .. -.",
    answers: [
      "samhain",
      "samain",
      "la samhain",
      "fete de samhain"
    ],
    hints: [
      "Décodage : ... (S) / .- (A) / -- (M) / .... (H) / .- (A) / .. (I) / -. (N)",
      "C'est la célébration païenne millénaire qui a donné naissance à Halloween le 31 octobre."
    ],
    successMessage: "> FRÉQUENCE ACCORDÉE : Samhain. La nuit où les morts marchent parmi les vivants..."
  },
  {
    id: 4,
    stage: "STAGE 04 // LE COMPTE À REBOURS DU CYGNE",
    sector: "LA SALLE DES VOLETS ÉLECTROMAGNÉTIQUES",
    story: "Sur le mur de la crypte, un grand chronomètre à lamelles basculantes mécanique tourne sans arrêt. Comme dans la célèbre station Le Cygne de l'Île, un cycle régulier en minutes impose de réinitialiser la décharge pour éviter une explosion d'ectoplasme.",
    question: "MATHÉMATIQUES DU COMPTE À REBOURS DHARMA :\nLa durée complète en minutes du compte à rebours correspond à la somme arithmétique exacte des 6 nombres de Lost (4 + 8 + 15 + 16 + 23 + 42).\nCombien de minutes dure ce cycle avant la surcharge ?",
    answers: [
      "108",
      "108 minutes",
      "cent huit",
      "cent-huit",
      "108 min"
    ],
    hints: [
      "Faites la somme : 4 + 8 + 15 + 16 + 23 + 42 = ?",
      "C'est le nombre de minutes légendaire qui sépare chaque saisie du code dans Lost."
    ],
    successMessage: "> MINUTERIE SYNCHRONISÉE : 108 minutes. Les volets magnétiques sont réinitialisés."
  },
  {
    id: 5,
    stage: "STAGE 05 // CODE OTAN - L'ESPRIT FRAPPEUR DE LA SALLE DE BAL",
    sector: "LA SALLE DE BAL AUX LUSTRES BRISÉS",
    story: "Un fracas assourdissant retentit au rez-de-chaussée : les lustres en cristal se balancent, les lourdes chaises de chêne s'empilent jusqu'au plafond par lévitation spontanée !",
    question: "DÉTECTION D'ENTITÉ SPECTRAULE (CODE OTAN) :\nLe capteur psychokinétique PKE épelle la signature de l'entité :\n>> PAPA - OSCAR - LIMA - TANGO - ECHO - ROMEO - GOLF - ECHO - INDIA - SIERRA - TANGO <<\nQuel est le nom de cet esprit frappeur et tapageur ?",
    answers: [
      "poltergeist",
      "un poltergeist",
      "le poltergeist",
      "esprit frappeur",
      "un esprit frappeur"
    ],
    hints: [
      "Prenez les initiales : P - O - L - T - E - R - G - E - I - S - T.",
      "Mot allemand désignant un 'fantôme bruyant' qui projette les objets dans les pièces."
    ],
    natoRef: "PAPA (P) - OSCAR (O) - LIMA (L) - TANGO (T) - ECHO (E) - ROMEO (R) - GOLF (G) - ECHO (E) - INDIA (I) - SIERRA (S) - TANGO (T)",
    successMessage: "> SPECTRE IDENTIFIÉ : Poltergeist neutralisé par contre-champ magnétique."
  },
  {
    id: 6,
    stage: "STAGE 06 // CODE MORSE - L'ÉCHO DU PUITS SANS FOND",
    sector: "LA CAVE VOÛTÉE DU MANOIR",
    story: "L'humidité glace l'air à 4°C. Un ancien téléscripteur à ruban perforé posé sur une caisse de ravitaillement DHARMA martèle une série de bips rapides.",
    question: "MESSAGE DU TÉLÉGRAPHE SPECTRAL (CODE MORSE) :\nSignal intercepté :\n--.  /  ....  /  ---  /  ...  /  -\nQuel mot anglais (ou son équivalent français) désigne cette apparition surnaturelle ?\n(Astuce : tapez 'bip' pour écouter le morse)",
    morseAudio: "--. .... --- ... -",
    answers: [
      "ghost",
      "fantome",
      "fantôme",
      "un fantome",
      "un fantôme",
      "le fantome",
      "spectre",
      "un spectre"
    ],
    hints: [
      "Décodage : --. (G) / .... (H) / --- (O) / ... (S) / - (T)",
      "Le terme universel désignant un revenant ou un fantôme."
    ],
    successMessage: "> DÉCRYPTAGE RÉUSSI : GHOST. L'entité tente d'entrer en contact avec le terminal."
  },
  {
    id: 7,
    stage: "STAGE 07 // LE GARDIEN CITROUILLE DU MANOIR",
    sector: "LE PORCHE GOTHIQUE ET LES BOIS MORTS",
    story: "Une inscription taillée à la pointe d'un couteau sur la poutre maîtresse du manoir barre l'accès à la crypte secrète.",
    question: "L'ÉNIGME ANCESTRALE D'HALLOWEEN :\n'Née au creux d'un potager brumeux d'octobre, on a vidé mes entrailles et découpé sur mon écorce un rictus démoniaque. Une flamme vacille en mon sein pour chasser les démons et guider l'âme errante de Stingy Jack.\nQui suis-je ?'",
    answers: [
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
    hints: [
      "Le légume orange sculpté chaque 31 octobre avec une bougie à l'intérieur.",
      "Jack O'Lantern..."
    ],
    successMessage: "> PASSAGE OUVERT : Le sourire flamboyant de la citrouille éclaire la grille rouillée."
  },
  {
    id: 8,
    stage: "STAGE 08 // LES ARCHIVES PERDUES DE LA FONDATION HANSO",
    sector: "LE BUNKER SOUTERRAIN - SECTION CLASSIFIÉE",
    story: "Dans les classeurs poussiéreux de la Hanso Foundation, un rapport de 1974 révèle que la Station 13 sous le manoir était le pendant paranormal de la Station 3 située sur l'Île du Pacifique, célèbre pour son ordinateur à commande manuelle et son dôme géodésique.",
    question: "ARCHIVES DES STATIONS DE LOST :\nQuel est le nom français ou anglais de la mythique Station 3 de la DHARMA Initiative, dont l'emblème octogonal représente un oiseau blanc au long cou majestueux ?",
    answers: [
      "le cygne",
      "cygne",
      "the swan",
      "swan",
      "station cygne",
      "station le cygne",
      "station the swan"
    ],
    hints: [
      "L'oiseau blanc qui nage sur l'eau et déploie de grandes ailes blanches.",
      "Station 'The Swan' en version originale, où vivait Desmond Hume."
    ],
    successMessage: "> PROTOCOLE CYGNE CONFIRMÉ. Résonance électromagnétique établie avec l'Île."
  },
  {
    id: 9,
    stage: "STAGE 09 // FRÉQUENCE HYBRIDE (OTAN + MORSE)",
    sector: "LA CHAMBRE DES MIROIRS SANS TAIN",
    story: "Deux transmissions radio se superposent sur le moniteur vert, envoyées simultanément par deux spectres prisonniers de la glace électromagnétique. Vous devez déchiffrer les deux moitiés pour assembler la formule d'effroi.",
    question: "INTERCEPTION DOUBLE (OTAN + MORSE) :\nPartie A (Code OTAN) : BRAVO - OSCAR - OSCAR\nPartie B (Code Morse) : .-.  /  ..  /  .--.\nCombinez les deux réponses en un seul mot de passe (ex: 'BOO RIP') pour dissiper le brouillard spectral :",
    morseAudio: ".-. .. .--.",
    answers: [
      "boo rip",
      "boo-rip",
      "boo / rip",
      "boorip",
      "bouh rip",
      "bouh-rip",
      "boo r.i.p",
      "boo r.i.p."
    ],
    hints: [
      "Partie A (OTAN) : B - O - O (Le cri classique du fantôme : BOO)",
      "Partie B (Morse) : .-. (R) / .. (I) / .--. (P) -> R-I-P (Requiescat In Pace)",
      "Combinaison attendue : BOO RIP"
    ],
    successMessage: "> RÉSONANCE STABILISÉE : BOO RIP ! Le miroir se fige, les spectres s'apaisent."
  },
  {
    id: 10,
    stage: "STAGE 10 // CONFINEMENT FINAL - LE PROTOCOLE D'HALLOWEEN",
    sector: "NOYAU MAGNÉTIQUE CENTRAL DU MANOIR",
    story: "URGENCE ABSOLUE ! LE COMPTE À REBOURS DU MANOIR EST EN PHASE CRITIQUE ! L'alarme de la station retentit, les volets mécaniques tremblent, les glyphes de surcharge apparaissent sur les cadrans !\nPour réinitialiser le système, sceller la brèche dimensionnelle d'Halloween et purger les spectres du manoir jusqu'à l'année prochaine, vous devez taper la célèbre formule de paix et d'au revoir de la DHARMA Initiative qui conclut chaque film d'orientation du Dr. Pierre Chang (ou la commande ultime 'EXECUTE') !",
    question: "DÉCHARGE SPECTRALE FINALE :\nQuelle salutation de l'Initiative (7 lettres, commence par N) ou mot-clé d'exécution devez-vous saisir sur le terminal pour sauver le Manoir ?",
    answers: [
      "namaste",
      "namasté",
      "execute",
      "4 8 15 16 23 42",
      "decharge spectrale",
      "decharge"
    ],
    hints: [
      "La salutation hindoue traditionnelle signifiant 'Je salue le divin en toi', employée à la fin de chaque cassette vidéo d'orientation DHARMA.",
      "N - A - M - A - S - T - E... 'Namaste et bonne chance !'"
    ],
    successMessage: "> DÉCHARGE SPECTRALE MAJEURE EFFECTUÉE ! BRÈCHE COLMATÉE ! CONFINEMENT 100% OPÉRATIONNEL !"
  }
];

window.NATO_ALPHABET = NATO_ALPHABET;
window.MORSE_ALPHABET = MORSE_ALPHABET;
window.RIDDLES = RIDDLES;
