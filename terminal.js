// =============================================================================
// DHARMA INITIATIVE // STATION MANOIR ANIMATO
// Moteur de Terminal Cathodique Vert - J4X OS
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
  const ecranDemarrage = document.getElementById("boot-screen");
  const boutonDemarrage = document.getElementById("boot-btn");
  const ecranTerminal = document.getElementById("terminal-screen");
  const sortie = document.getElementById("output");
  const ligneSaisie = document.getElementById("input-line");
  const affichageSaisie = document.getElementById("input-display");
  const entreeCachee = document.getElementById("hidden-input");
  const compteurHud = document.getElementById("hud-timer");
  const progressionHud = document.getElementById("hud-progress");
  const boutonSon = document.getElementById("sound-btn");
  const barreRaccourcis = document.getElementById("shortcuts-bar");

  let enigmeActuelle = -1; // -1 = Phase de démarrage / question initiale
  let estSeul = true;
  let estEnTrainDEcrire = false;
  let compteurIndices = 0;

  // Compteur 108:00 DHARMA
  let totalSecondes = 108 * 60; // 108 minutes
  let intervalleCompteur = null;

  const mettreAJourCompteurHud = () => {
    const mins = Math.floor(totalSecondes / 60);
    const secs = totalSecondes % 60;
    const texteFormate = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    compteurHud.textContent = texteFormate;

    if (totalSecondes <= 240) { // Moins de 4 minutes = Urgence
      compteurHud.classList.add("urgent");
      if (totalSecondes % 30 === 0 && window.audioTerminal) {
        window.audioTerminal.jouerAlarmeDharma();
      }
    } else {
      compteurHud.classList.remove("urgent");
    }

    if (totalSecondes > 0) {
      totalSecondes--;
    } else {
      // Le compteur est tombé à 0:00 -> Reboot automatique d'urgence
      totalSecondes = 108 * 60;
      if (window.audioTerminal) window.audioTerminal.jouerAlarmeDharma();
    }
  };

  const mettreAJourProgression = () => {
    if (enigmeActuelle < 0) {
      progressionHud.textContent = "0%";
    } else {
      const pct = Math.min(100, Math.round((enigmeActuelle / window.ENIGMES.length) * 100));
      progressionHud.textContent = `${pct}%`;
    }
  };

  const demarrerCompteARebours = () => {
    if (!intervalleCompteur) {
      intervalleCompteur = setInterval(mettreAJourCompteurHud, 1000);
    }
  };

  // Gestion du son
  if (boutonSon) {
    boutonSon.addEventListener("click", () => {
      if (window.audioTerminal) {
        const actif = window.audioTerminal.basculerSon();
        boutonSon.textContent = actif ? "SON : ON" : "SON : OFF";
        boutonSon.style.color = actif ? "var(--green)" : "#ff4444";
      }
    });
  }

  // Démarrage du terminal au clic
  const initialiserDemarrage = () => {
    ecranDemarrage.classList.remove("active");
    ecranTerminal.classList.add("active");
    
    if (window.audioTerminal) {
      window.audioTerminal.initialiser();
      window.audioTerminal.jouerBruitAllumage();
      window.audioTerminal.jouerAlimentationCathodique();
      window.audioTerminal.demarrerBruitDeFond();
      setTimeout(() => {
        window.audioTerminal.jouerMurmureFantome();
      }, 1200);
    }

    demarrerCompteARebours();
    demarrerSequence();
  };

  boutonDemarrage.addEventListener("click", initialiserDemarrage);
  ecranDemarrage.addEventListener("click", (e) => {
    if (e.target === ecranDemarrage) initialiserDemarrage();
  });

  // Focus permanent pour saisie fluide (Corrige le bug de la double frappe)
  const focaliserEntree = () => {
    if (entreeCachee && !estEnTrainDEcrire) {
      entreeCachee.focus();
    }
  };

  document.addEventListener("click", focaliserEntree);

  // Animation d'écriture progressive (style CRT teletype)
  const ecrireTexte = async (texte, classeSupplementaire = "", vitesse = 18) => {
    estEnTrainDEcrire = true;
    ligneSaisie.classList.add("hidden");
    if (entreeCachee) entreeCachee.blur(); // Empêche de taper pendant l'animation

    const ligne = document.createElement("div");
    ligne.className = "line " + classeSupplementaire;
    sortie.appendChild(ligne);

    for (let i = 0; i < texte.length; i++) {
      ligne.textContent += texte[i];
      if (texte[i] !== ' ' && texte[i] !== '\n' && window.audioTerminal && Math.random() > 0.45) {
        window.audioTerminal.jouerClicTouche(texte[i] === ' ');
      }
      // Vitesse ajustable, avec pause sur la ponctuation
      let delai = vitesse + Math.random() * 15;
      if (texte[i] === '.' || texte[i] === '!' || texte[i] === '?') delai += 120;
      if (texte[i] === '\n') delai += 150;
      await new Promise(r => setTimeout(r, delai));
    }

    estEnTrainDEcrire = false;
    ligneSaisie.classList.remove("hidden");
    focaliserEntree();
    window.scrollTo(0, document.body.scrollHeight);
    return ligne;
  };

  // Affichage direct (sans effet d'écriture lente pour tables, ascii, etc.)
  const afficherDirectement = (texte, classeSupplementaire = "") => {
    const ligne = document.createElement("div");
    ligne.className = "line " + classeSupplementaire;
    ligne.textContent = texte;
    sortie.appendChild(ligne);
    window.scrollTo(0, document.body.scrollHeight);
    return ligne;
  };

  // Séquence d'introduction
  const demarrerSequence = async () => {
    await new Promise(r => setTimeout(r, 800));
    await ecrireTexte("> INITIALISATION DU TERMINAL MAINFRAME CATHODIQUE...", "system");
    await new Promise(r => setTimeout(r, 400));
    await ecrireTexte("> CONNEXION AU SERVEUR D'ANIMATO... CONNECTÉ.", "system");
    await new Promise(r => setTimeout(r, 600));
    await ecrireTexte("> LOCALISATION : SOUS-SOL DU MANOIR [ STATION DHARMA ].", "system");
    await new Promise(r => setTimeout(r, 800));
    await ecrireTexte("> ALERTE : INVASION DU MANOIR PAR LES VIEWERS FANTÔMES.", "alert");
    await new Promise(r => setTimeout(r, 1200));

    afficherDirectement(`
       .---.            .---.
      /     \\          /     \\
     | () () |  BOO ! | () () |  [ STATION MANOIR ]
      \\  ^  /          \\  ^  /   [ ANIMATO STREAM ]
       |||||            |||||
    `, "ascii");

    await ecrireTexte(" ");
    await ecrireTexte("Es-tu le modérateur chargé de sécuriser le stream ?", "question");
  };

  // Affichage de l'énigme en cours
  const poserEnigmeActuelle = async () => {
    mettreAJourProgression();
    compteurIndices = 0;

    if (enigmeActuelle >= window.ENIGMES.length) {
      // Victoire / Climax
      await declencherClimaxVictoire();
      return;
    }

    const enigme = window.ENIGMES[enigmeActuelle];

    // Badge d'étape
    afficherDirectement(`[ ${enigme.etape} ]`, "stage");
    afficherDirectement(`SECTEUR : ${enigme.secteur}`, "sector");
    
    // Histoire
    await ecrireTexte(enigme.histoire, "story", 14);
    await new Promise(r => setTimeout(r, 400));

    // Question
    await ecrireTexte(enigme.question, "question", 16);

    // Si un code Morse audio est associé, proposer un bouton pour l'écouter
    if (enigme.audioMorse) {
      const conteneurSon = document.createElement("div");
      conteneurSon.className = "line morse-cue";
      conteneurSon.innerHTML = `
        <span>🔊 Signal Morse détecté dans le tchat : <strong>${enigme.audioMorse}</strong></span>
        <button class="morse-play-btn" id="play-morse-btn">[ JOUER LE SIGNAL AUDIO ]</button>
      `;
      sortie.appendChild(conteneurSon);

      const boutonPlay = document.getElementById("play-morse-btn");
      if (boutonPlay) {
        boutonPlay.addEventListener("click", () => {
          if (window.audioTerminal) {
            boutonPlay.textContent = "SIGNAL EN COURS...";
            window.audioTerminal.jouerMorse(enigme.audioMorse, () => {
              boutonPlay.textContent = "[ RÉÉCOUTER LE SIGNAL ]";
            });
          }
        });
      }

      // Joue automatiquement le premier bip après 600ms
      setTimeout(() => {
        if (window.audioTerminal) {
          window.audioTerminal.jouerMorse(enigme.audioMorse);
        }
      }, 600);
    }
  };

  // Climax et fin avec Animato & J4X
  const declencherClimaxVictoire = async () => {
    if (window.audioTerminal) {
      window.audioTerminal.jouerSonVictoire();
      window.audioTerminal.jouerTonnerre();
    }

    await ecrireTexte("================================================================", "system");
    await ecrireTexte("PROTOCOLE ANIMATO COMPLÉTÉ AVEC SUCCÈS.", "success");
    await ecrireTexte("LA CONNEXION ÉLECTROMAGNÉTIQUE DU MANOIR EST STABILISÉE.", "success");
    await ecrireTexte("LES VIEWERS SONT DE NOUVEAU ENFERMÉS DANS LE TCHAT.", "success");
    await ecrireTexte("================================================================", "system");
    await new Promise(r => setTimeout(r, 1500));

    await ecrireTexte("Transmission entrante d'Animato...", "system");
    await new Promise(r => setTimeout(r, 1200));
    await ecrireTexte("'Félicitations modérateur. La Station du Manoir a accompli sa mission pour le live d'Halloween.'", "story");
    await ecrireTexte("'Comme nous le disons toujours au sein de l'Initiative DHARMA : Namaste, et bon stream...'", "story");
    await new Promise(r => setTimeout(r, 2000));

    if (window.audioTerminal) window.audioTerminal.jouerErreurGlitch();
    await ecrireTexte("> INTERCEPTION PAR J4X OS : ANALYSE DE L'OPÉRATEUR...", "alert");
    await new Promise(r => setTimeout(r, 1000));

    if (estSeul) {
      let ip = "192.168.108.42";
      let loc = "MANOIR - SALLE DES SERVEURS";
      try {
        const reponse = await fetch('https://ipapi.co/json/');
        const donnees = await reponse.json();
        if (donnees.ip) ip = donnees.ip;
        if (donnees.city) loc = \`\${donnees.city}, \${donnees.region} (\${donnees.country_name})\`;
      } catch (e) {}

      let os = "TERMINAL CATHODIQUE VINTAGE";
      const ua = navigator.userAgent;
      if (ua.includes("Win")) os = "WINDOWS CRT STATION";
      else if (ua.includes("Mac")) os = "MACOS STATION";
      else if (ua.includes("Linux")) os = "LINUX MAINFRAME";
      else if (ua.includes("Android")) os = "ANDROID COMMUNICATOR";
      else if (ua.includes("iPhone")) os = "IOS COMMUNICATOR";

      await ecrireTexte(\`> ADRESSE IP DU MODÉRATEUR IDENTIFIÉE : \${ip}\`, "alert");
      await new Promise(r => setTimeout(r, 600));
      await ecrireTexte(\`> SIGNATURE DU SYSTÈME : \${os}\`, "alert");
      await new Promise(r => setTimeout(r, 600));
      await ecrireTexte(\`> SECTEUR GÉOGRAPHIQUE : \${loc}\`, "alert");
      await new Promise(r => setTimeout(r, 600));
      await ecrireTexte("> TEMPÉRATURE DES VIEWERS : 3.8°C (PRÉSENCE IMMINENTE)", "alert");
    } else {
      await ecrireTexte("> ADRESSE IP : [ MASQUÉE PAR LE CHAMP ÉLECTROMAGNÉTIQUE ]", "alert-glitch");
      await new Promise(r => setTimeout(r, 600));
      await ecrireTexte("> SYSTÈME : [ CONFINÉ DANS LA CRYPTE DU TCHAT ]", "alert-glitch");
      await new Promise(r => setTimeout(r, 600));
      await ecrireTexte("> LOCALISATION : [ INCONNUE ]", "alert-glitch");
    }

    await new Promise(r => setTimeout(r, 1500));
    if (window.audioTerminal) window.audioTerminal.jouerRireDiabolique();
    await ecrireTexte("J4X SAIT TOUT. LES VIEWERS FANTÔMES TE REGARDENT À TRAVERS L'ÉCRAN.", "alert-massive");
    await new Promise(r => setTimeout(r, 3500));

    afficherDirectement(`
       .-.
      (o.o)   JOYEUX HALLOWEEN ET MERCI D'AVOIR SAUVÉ LE STREAM !
       |=|    Toutes les énigmes ont été résolues avec bravoure.
      __|__   Tapez 'reset' pour recommencer l'enquête du Manoir.
    `, "ascii");

    await ecrireTexte("[ ARCHIVE VIDÉO SECRÈTE DÉVERROUILLÉE : VERITE_SAMHAIN.mp4 ]", "system");
    await new Promise(r => setTimeout(r, 1500));

    const divVideo = document.createElement("div");
    divVideo.style.margin = "20px 0";
    divVideo.innerHTML = `
      <p style="margin-bottom: 12px; color: var(--bright-green);">Cliquez ci-dessous pour visionner l'archive déclassifiée de la station :</p>
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" style="color: #000; background: var(--bright-green); padding: 10px 18px; text-decoration: none; font-weight: bold; display: inline-block;">
        [ VISIONNER L'ARCHIVE CLASSIFIÉE DU MANOIR ]
      </a>
    `;
    sortie.appendChild(divVideo);
    ligneSaisie.classList.remove("hidden");
    focaliserEntree();
  };

  // Normalisation des réponses (minuscules, sans accents, sans ponctuation excessive)
  const normaliser = (chaine) => {
    return chaine
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/['’]/g, " ")
      .replace(/[.,;:!?]/g, "")
      .replace(/\s+/g, " ");
  };

  // Exécution d'une commande ou vérification de réponse
  const traiterCommande = async (commandeBrute) => {
    const commande = commandeBrute.trim();
    if (!commande) return;

    if (window.audioTerminal) window.audioTerminal.jouerBipValidation();

    // Echo de la commande entrée
    const echo = document.createElement("div");
    echo.className = "line echo";
    echo.textContent = ">_ " + commande;
    sortie.appendChild(echo);

    if (affichageSaisie) affichageSaisie.textContent = "";
    if (entreeCachee) entreeCachee.value = "";
    ligneSaisie.classList.add("hidden");

    const norm = normaliser(commande);

    // ================= COMMANDES SYSTÈME =================
    if (norm === "aide" || norm === "help" || norm === "?") {
      afficherDirectement(`
========================= GUIDE DES COMMANDES =========================
  * aide / help     : Affiche ce menu d'assistance.
  * indice / hint   : Dévoile un indice pour l'énigme en cours.
  * otan / nato     : Affiche l'alphabet phonétique radio de l'OTAN.
  * morse           : Affiche l'abécédaire du code Morse (. et -).
  * bip / play      : Fait retentir le signal sonore Morse de l'énigme.
  * dharma / lost   : Affiche l'histoire secrète du Manoir d'Animato.
  * manoir / carte  : Affiche le plan des ailes hantées du Manoir.
  * compteur / timer: Affiche l'état du chronomètre 108:00.
  * statut / status : Affiche votre progression de confinement.
  * son / audio     : Coupe ou réactive les effets sonores.
  * clear / cls     : Efface l'écran du terminal.
  * reset           : Réinitialise l'aventure au premier stage.
========================================================================
      `, "table");
      ligneSaisie.classList.remove("hidden");
      focaliserEntree();
      return;
    }

    if (norm === "otan" || norm === "nato") {
      if (window.audioTerminal) window.audioTerminal.jouerBruitDonnees();
      afficherDirectement(`
=================== ALPHABET PHONÉTIQUE DE L'OTAN ===================
  A : Alpha        H : Hotel        O : Oscar        V : Victor
  B : Bravo        I : India        P : Papa         W : Whiskey
  C : Charlie      J : Juliett      Q : Quebec       X : X-ray
  D : Delta        K : Kilo         R : Romeo        Y : Yankee
  E : Echo         L : Lima         S : Sierra       Z : Zulu
  F : Foxtrot      M : Mike         T : Tango
  G : Golf         N : November     U : Uniform
=====================================================================
Astuce : La première lettre de chaque mot forme le message caché !
      `, "table");
      ligneSaisie.classList.remove("hidden");
      focaliserEntree();
      return;
    }

    if (norm === "morse") {
      if (window.audioTerminal) window.audioTerminal.jouerBruitDonnees();
      afficherDirectement(`
======================== TABLE DU CODE MORSE ========================
  A : .-       G : --.      M : --       S : ...      Y : -.--
  B : -...     H : ....     N : -.       T : -        Z : --..
  C : -.-.     I : ..       O : ---      U : ..-      0 : -----
  D : -..      J : .---     P : .--.     V : ...-     1 : .----
  E : .        K : -.-      Q : --.-     W : .--      4 : ....-
  F : ..-.     L : .-..     R : .-.      X : -..-     8 : ---..
=====================================================================
Symbole court : . (ti)  |  Symbole long : - (taah)
      `, "table");
      ligneSaisie.classList.remove("hidden");
      focaliserEntree();
      return;
    }

    if (norm === "bip" || norm === "play" || norm === "son-morse") {
      if (enigmeActuelle >= 0 && enigmeActuelle < window.ENIGMES.length) {
        const enigme = window.ENIGMES[enigmeActuelle];
        if (enigme.audioMorse && window.audioTerminal) {
          await ecrireTexte(`> ÉMISSION DU SIGNAL MORSE : ${enigme.audioMorse}`, "system");
          window.audioTerminal.jouerMorse(enigme.audioMorse);
        } else {
          await ecrireTexte("> Aucune transmission Morse active sur cette fréquence.", "system");
        }
      }
      ligneSaisie.classList.remove("hidden");
      focaliserEntree();
      return;
    }

    if (norm === "indice" || norm === "hint") {
      if (enigmeActuelle >= 0 && enigmeActuelle < window.ENIGMES.length) {
        const enigme = window.ENIGMES[enigmeActuelle];
        if (enigme.indices && enigme.indices.length > 0) {
          const indice = enigme.indices[compteurIndices % enigme.indices.length];
          compteurIndices++;
          await ecrireTexte(`💡 INDICE TCHAT : ${indice}`, "hint");
        } else {
          await ecrireTexte("Aucun indice supplémentaire pour cette section.", "system");
        }
      } else {
        await ecrireTexte("Commencez par répondre à la question initiale.", "system");
      }
      ligneSaisie.classList.remove("hidden");
      focaliserEntree();
      return;
    }

    if (norm === "dharma" || norm === "lost") {
      if (window.audioTerminal) window.audioTerminal.jouerSonVictoire();
      afficherDirectement(`
                     /\\
                    /  \\
                   / /\\ \\
             /\\   / /  \\ \\   /\\
            /  \\ / / /\\ \\ \\ /  \\
           / /\\ \\ / /  \\ \\ / /\\ \\
          | |  | | | AM | | |  | |
           \\ \\/ / \\ \\  / / \\ \\/ /
            \\  /   \\ \\/ /   \\  /
             \\/     \\  /     \\/
          [ INITIATIVE DHARMA - SECTION ANIMATO ]
          STATION MANOIR // GESTION DES VIEWERS
  
  Fondée en 1974 par l'Initiative DHARMA.
  Objectif : Gérer le flux massif de spectateurs ectoplasmiques 
  lors des streams nocturnes d'Animato et les confiner.
  Mots d'ordre : Modération, Confinement, 'Namaste'.
      `, "ascii");
      ligneSaisie.classList.remove("hidden");
      focaliserEntree();
      return;
    }

    if (norm === "manoir" || norm === "carte" || norm === "map") {
      afficherDirectement(`
=================== RELEVÉ DU MANOIR ANIMATO ===================
  [ÉTAGE 2] : Combles obscurs, Viewers silencieux, Modérateurs
  [ÉTAGE 1] : Chambre des miroirs, Bibliothèque du Tchat
  [REZ-DE-CH] : Grand Vestibule, Set-up de Stream hanté
  [SOUS-SOL] : Cave voûtée, Serveurs DHARMA d'urgence
  [CATACAMBES] : STATION ANIMATO, Ordinateur et volets 108:00
================================================================
      `, "table");
      ligneSaisie.classList.remove("hidden");
      focaliserEntree();
      return;
    }

    if (norm === "compteur" || norm === "timer") {
      const mins = Math.floor(totalSecondes / 60);
      const secs = totalSecondes % 60;
      await ecrireTexte(`> COMPTEUR CYCLE LIVE : ${mins}m ${secs}s restantes avant déconnexion.`, "system");
      ligneSaisie.classList.remove("hidden");
      focaliserEntree();
      return;
    }

    if (norm === "statut" || norm === "status") {
      const pct = Math.min(100, Math.round((Math.max(0, enigmeActuelle) / window.ENIGMES.length) * 100));
      await ecrireTexte(`> RAPPORT DU LIVE : Énigme ${Math.max(0, enigmeActuelle) + 1} / ${window.ENIGMES.length}`, "system");
      await ecrireTexte(`> SÉCURITÉ DU MANOIR : ${pct}%`, "system");
      ligneSaisie.classList.remove("hidden");
      focaliserEntree();
      return;
    }

    if (norm === "clear" || norm === "cls") {
      sortie.innerHTML = "";
      if (enigmeActuelle >= 0 && enigmeActuelle < window.ENIGMES.length) {
        poserEnigmeActuelle();
      } else {
        ligneSaisie.classList.remove("hidden");
        focaliserEntree();
      }
      return;
    }

    if (norm === "son" || norm === "audio") {
      if (window.audioTerminal) {
        const actif = window.audioTerminal.basculerSon();
        if (boutonSon) {
          boutonSon.textContent = actif ? "SON : ON" : "SON : OFF";
          boutonSon.style.color = actif ? "var(--green)" : "#ff4444";
        }
        await ecrireTexte(`> Audio système : ${actif ? "ACTIVÉ" : "DÉSACTIVÉ"}`, "system");
      }
      ligneSaisie.classList.remove("hidden");
      focaliserEntree();
      return;
    }

    if (norm === "reset") {
      sortie.innerHTML = "";
      enigmeActuelle = 0;
      totalSecondes = 108 * 60;
      await ecrireTexte("> RÉINITIALISATION DU TERMINAL ET DU PROTOCOLE DU MANOIR...", "alert");
      await new Promise(r => setTimeout(r, 1000));
      poserEnigmeActuelle();
      return;
    }

    // Easter eggs
    if (norm === "4 8 15 16 23 42" && enigmeActuelle !== 0) {
      if (window.audioTerminal) window.audioTerminal.jouerSonVictoire();
      await ecrireTexte("> LES NOMBRES SACRÉS RÉSONNENT DANS LE MANOIR...", "success");
      ligneSaisie.classList.remove("hidden");
      focaliserEntree();
      return;
    }

    if (norm === "matrix") {
      await ecrireTexte("> FLUX SPECTRAL NUMÉRIQUE DU TCHAT...", "system");
      afficherDirectement("01100100 01101000 01100001 01110010 01101101 01100001 00100000 01100011 01101111 01100100 01100101", "echo");
      ligneSaisie.classList.remove("hidden");
      focaliserEntree();
      return;
    }

    // ================= QUESTION INITIALE (ÉCRAN D'ACCUEIL) =================
    if (enigmeActuelle === -1) {
      if (norm === "non" || norm === "no") {
        estSeul = false;
        await ecrireTexte("Sage décision de protéger les autres viewers.", "system");
      } else if (norm === "oui" || norm === "yes") {
        estSeul = true;
        if (window.audioTerminal) window.audioTerminal.jouerMurmureFantome();
        await ecrireTexte("Parfait. Nous n'aurons aucun témoin dans ce manoir.", "alert");
      } else {
        if (window.audioTerminal) window.audioTerminal.jouerErreurGlitch();
        await ecrireTexte("Réponds clairement par OUI ou par NON.");
        ligneSaisie.classList.remove("hidden");
        focaliserEntree();
        return;
      }

      await new Promise(r => setTimeout(r, 1000));
      await ecrireTexte("Connexion à la Station d'Animato...", "system");
      await new Promise(r => setTimeout(r, 1000));
      enigmeActuelle = 0;
      poserEnigmeActuelle();
      return;
    }

    // ================= VALIDATION DES ÉNIGMES =================
    await verifierReponseEnigme(commande);
  };

  const verifierReponseEnigme = async (saisieBrute) => {
    const enigme = window.ENIGMES[enigmeActuelle];
    const saisieNorm = normaliser(saisieBrute);

    const estCorrect = enigme.reponses.some(rep => {
      const repNorm = normaliser(rep);
      if (saisieNorm === repNorm) return true;
      if (saisieNorm.replace(/\s+/g, "") === repNorm.replace(/\s+/g, "")) return true;
      return false;
    });

    if (estCorrect) {
      if (window.audioTerminal) window.audioTerminal.jouerSonVictoire();
      await new Promise(r => setTimeout(r, 400));
      await ecrireTexte(enigme.messageVictoire || "> Exact. Protocole validé.", "success");
      await new Promise(r => setTimeout(r, 1200));
      enigmeActuelle++;
      poserEnigmeActuelle();
    } else {
      if (window.audioTerminal) window.audioTerminal.jouerErreurGlitch();
      await new Promise(r => setTimeout(r, 300));
      await ecrireTexte("Faux. Le message est rejeté par la station.", "alert");
      await new Promise(r => setTimeout(r, 600));
      await ecrireTexte("(Astuce : tapez 'indice' pour de l'aide, 'otan' pour l'alphabet radio, ou 'morse' pour le télégraphe)", "system");
      ligneSaisie.classList.remove("hidden");
      focaliserEntree();
    }
  };

  // ====== GESTION UNIQUE DU CLAVIER (CORRige LE BUG DE DOUBLE FRAPPE) ======
  if (entreeCachee) {
    // Chaque fois que l'utilisateur tape une touche (mobile et desktop)
    entreeCachee.addEventListener("input", (e) => {
      if (estEnTrainDEcrire) {
        entreeCachee.value = "";
        return;
      }
      const val = entreeCachee.value;
      if (affichageSaisie) affichageSaisie.textContent = val;
      // Joue le son du clavier s'il y a un ajout de lettre
      if (window.audioTerminal && val.length > (affichageSaisie.textContent.length || 0)) {
        window.audioTerminal.jouerClicTouche();
      }
    });

    // Capture exclusive de la touche Entrée sur le champ caché
    entreeCachee.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !estEnTrainDEcrire) {
        e.preventDefault();
        const cmdAEnvoyer = entreeCachee.value;
        traiterCommande(cmdAEnvoyer);
      }
    });
  }

  // Raccourcis cliquables sous le terminal
  if (barreRaccourcis) {
    barreRaccourcis.addEventListener("click", (e) => {
      const pastille = e.target.closest(".shortcut-chip");
      if (pastille && pastille.dataset.cmd && !estEnTrainDEcrire) {
        traiterCommande(pastille.dataset.cmd);
      }
    });
  }
});
