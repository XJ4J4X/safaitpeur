// =============================================================================
// DHARMA INITIATIVE // STATION MANOIR ANIMATO
// Moteur de Console Cathodique - Gestion du Tchat et du Stream
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

  let enigmeActuelle = -1;
  let estSeul = true;
  let estEnTrainDEcrire = false;
  let compteurIndices = 0;

  // Compteur 108:00 de Live
  let totalSecondes = 108 * 60;
  let intervalleCompteur = null;

  const mettreAJourCompteurHud = () => {
    const mins = Math.floor(totalSecondes / 60);
    const secs = totalSecondes % 60;
    const texteFormate = String(mins).padStart(2, '0') + ":" + String(secs).padStart(2, '0');
    compteurHud.textContent = texteFormate;

    if (totalSecondes <= 240) {
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
      totalSecondes = 108 * 60;
      if (window.audioTerminal) window.audioTerminal.jouerAlarmeDharma();
    }
  };

  const mettreAJourProgression = () => {
    if (enigmeActuelle < 0) {
      progressionHud.textContent = "0%";
    } else {
      const pct = Math.min(100, Math.round((enigmeActuelle / window.ENIGMES.length) * 100));
      progressionHud.textContent = pct + "%";
    }
  };

  const demarrerCompteARebours = () => {
    if (!intervalleCompteur) {
      intervalleCompteur = setInterval(mettreAJourCompteurHud, 1000);
    }
  };

  if (boutonSon) {
    boutonSon.addEventListener("click", () => {
      if (window.audioTerminal) {
        const actif = window.audioTerminal.basculerSon();
        boutonSon.textContent = actif ? "SON : ON" : "SON : MUTE";
        boutonSon.style.color = actif ? "var(--green)" : "#ff4444";
      }
    });
  }

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

  const focaliserEntree = () => {
    if (entreeCachee && !estEnTrainDEcrire) {
      // PREVENT SCROLL : corrige le bug de la page qui saute vers le haut ou le bas !
      entreeCachee.focus({ preventScroll: true });
    }
  };

  document.addEventListener("click", focaliserEntree);

  const defilerVersLeBas = () => {
    // Fait défiler le conteneur principal au lieu du body pour éviter les sauts
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  const ecrireTexte = async (texte, classeSupplementaire = "", vitesse = 18) => {
    estEnTrainDEcrire = true;
    ligneSaisie.classList.add("hidden");
    if (entreeCachee) entreeCachee.blur();

    const ligne = document.createElement("div");
    ligne.className = "line " + classeSupplementaire;
    sortie.appendChild(ligne);

    for (let i = 0; i < texte.length; i++) {
      ligne.textContent += texte[i];
      if (texte[i] !== ' ' && texte[i] !== '\n' && window.audioTerminal && Math.random() > 0.45) {
        window.audioTerminal.jouerClicTouche(texte[i] === ' ');
      }
      let delai = vitesse + Math.random() * 15;
      if (texte[i] === '.' || texte[i] === '!' || texte[i] === '?') delai += 120;
      if (texte[i] === '\n') delai += 150;
      
      // Auto-scroll léger pendant l'écriture
      if (i % 20 === 0) window.scrollTo(0, document.body.scrollHeight);
      
      await new Promise(r => setTimeout(r, delai));
    }

    estEnTrainDEcrire = false;
    ligneSaisie.classList.remove("hidden");
    focaliserEntree();
    defilerVersLeBas();
    return ligne;
  };

  const afficherDirectement = (texte, classeSupplementaire = "") => {
    const ligne = document.createElement("div");
    ligne.className = "line " + classeSupplementaire;
    ligne.textContent = texte;
    sortie.appendChild(ligne);
    defilerVersLeBas();
    return ligne;
  };

  const demarrerSequence = async () => {
    await new Promise(r => setTimeout(r, 800));
    await ecrireTexte("> ALLUMAGE DU PC...", "system");
    await new Promise(r => setTimeout(r, 400));
    await ecrireTexte("> CONNEXION AU LIVE D'ANIMATO... C'EST BON.", "system");
    await new Promise(r => setTimeout(r, 600));
    await ecrireTexte("> LOCALISATION : LE MANOIR.", "system");
    await new Promise(r => setTimeout(r, 800));
    await ecrireTexte("> ALERTE TCHAT : INVASION DE BACKSEATERS ET DE FANTÔMES.", "alert");
    await new Promise(r => setTimeout(r, 1200));

    afficherDirectement(`
       .---.            .---.
      /     \\          /     \\
     | () () |  BOO ! | () () |  [ MANOIR ANIMATO ]
      \\  ^  /          \\  ^  /   [ STREAM HANTÉ ]
       |||||            |||||
    `, "ascii");

    await ecrireTexte(" ");
    await ecrireTexte("T'es un Modo chaud pour purifier le tchat ce soir ?", "question");
  };

  const poserEnigmeActuelle = async () => {
    mettreAJourProgression();
    compteurIndices = 0;

    if (enigmeActuelle >= window.ENIGMES.length) {
      await declencherClimaxVictoire();
      return;
    }

    const enigme = window.ENIGMES[enigmeActuelle];

    afficherDirectement("[ " + enigme.etape + " ]", "stage");
    afficherDirectement("LIEU DU STREAM : " + enigme.secteur, "sector");
    
    await ecrireTexte(enigme.histoire, "story", 14);
    await new Promise(r => setTimeout(r, 400));
    await ecrireTexte(enigme.question, "question", 16);

    if (enigme.audioMorse) {
      const conteneurSon = document.createElement("div");
      conteneurSon.className = "line morse-cue";
      conteneurSon.innerHTML = "<span>🔊 Sub alert détectée : <strong>" + enigme.audioMorse + "</strong></span><button class='morse-play-btn' id='play-morse-btn'>[ JOUER LE SON ]</button>";
      sortie.appendChild(conteneurSon);

      const boutonPlay = document.getElementById("play-morse-btn");
      if (boutonPlay) {
        boutonPlay.addEventListener("click", () => {
          if (window.audioTerminal) {
            boutonPlay.textContent = "EN COURS...";
            window.audioTerminal.jouerMorse(enigme.audioMorse, () => {
              boutonPlay.textContent = "[ RÉÉCOUTER LE SON ]";
            });
          }
        });
      }

      setTimeout(() => {
        if (window.audioTerminal) {
          window.audioTerminal.jouerMorse(enigme.audioMorse);
        }
      }, 600);
    }
  };

  const declencherClimaxVictoire = async () => {
    if (window.audioTerminal) {
      window.audioTerminal.jouerSonVictoire();
      window.audioTerminal.jouerTonnerre();
    }

    await ecrireTexte("================================================================", "system");
    await ecrireTexte("C'EST BON, LE LIVE EST SAFE !", "success");
    await ecrireTexte("LES FANTÔMES ONT DISPARU DU TCHAT.", "success");
    await ecrireTexte("ANIMATO PEUT REPRENDRE SON JEU TRANQUILLE.", "success");
    await ecrireTexte("================================================================", "system");
    await new Promise(r => setTimeout(r, 1500));

    await ecrireTexte("Message privé d'Animato...", "system");
    await new Promise(r => setTimeout(r, 1200));
    await ecrireTexte("'Toucher ! Ah lala, bien vu le sang, t'as géré de fou ce soir.'", "story");
    await ecrireTexte("'On se capte au prochain live. Namaste le tchat !'", "story");
    await new Promise(r => setTimeout(r, 2000));

    if (window.audioTerminal) window.audioTerminal.jouerErreurGlitch();
    await ecrireTexte("> INTERCEPTION DU BOT MODO : DERNIER VIEWER SUSPECT...", "alert");
    await new Promise(r => setTimeout(r, 1000));

    if (estSeul) {
      let ip = "192.168.66.6";
      let loc = "LA CAVE D'ANIMATO";
      try {
        const reponse = await fetch('https://ipapi.co/json/');
        const donnees = await reponse.json();
        if (donnees.ip) ip = donnees.ip;
        if (donnees.city) loc = donnees.city + ", " + donnees.region + " (" + donnees.country_name + ")";
      } catch (e) {}

      let os = "PC GAMER";
      const ua = navigator.userAgent;
      if (ua.includes("Win")) os = "WINDOWS 11 (SETUP STREAMER)";
      else if (ua.includes("Mac")) os = "MACBOOK DE MODO";
      else if (ua.includes("Linux")) os = "LINUX (HACKER DU TCHAT)";
      else if (ua.includes("Android") || ua.includes("iPhone")) os = "TÉLÉPHONE SOUS LA COUETTE";

      await ecrireTexte("> IP DU MODO IDENTIFIÉE : " + ip, "alert");
      await new Promise(r => setTimeout(r, 600));
      await ecrireTexte("> SETUP : " + os, "alert");
      await new Promise(r => setTimeout(r, 600));
      await ecrireTexte("> LOCALISATION : " + loc, "alert");
      await new Promise(r => setTimeout(r, 600));
      await ecrireTexte("> TEMPÉRATURE CPU : 99°C (ÇA CHAUFFE LÀ)", "alert");
    } else {
      await ecrireTexte("> IP : [ CACHÉE PAR LE VPN ]", "alert-glitch");
      await new Promise(r => setTimeout(r, 600));
      await ecrireTexte("> SYSTÈME : [ MODE SUB-ONLY ]", "alert-glitch");
    }

    await new Promise(r => setTimeout(r, 1500));
    if (window.audioTerminal) window.audioTerminal.jouerRireDiabolique();
    await ecrireTexte("LE STREAM EST FINI, MAIS LES SCREAMERS RESTENT SOUS TON LIT.", "alert-massive");
    await new Promise(r => setTimeout(r, 3500));

    afficherDirectement(`
       .-.
      (o.o)   GG ! T'AS SAUVÉ LE LIVE D'ANIMATO !
       |=|    Les jumpscares sont passés crème.
      __|__   Tape 'reset' pour relancer le stream.
    `, "ascii");

    await ecrireTexte("[ VOD SECRÈTE DÉBLOQUÉE : BEST_OF_SCREAMERS.mp4 ]", "system");
    await new Promise(r => setTimeout(r, 1500));

    const divVideo = document.createElement("div");
    divVideo.style.margin = "20px 0";
    divVideo.innerHTML = "<p style='margin-bottom: 12px; color: var(--bright-green);'>Clique juste en dessous pour voir le replay :</p><a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='_blank' style='color: #000; background: var(--bright-green); padding: 10px 18px; text-decoration: none; font-weight: bold; display: inline-block;'>[ MATER LA VOD ]</a>";
    sortie.appendChild(divVideo);
    ligneSaisie.classList.remove("hidden");
    focaliserEntree();
    defilerVersLeBas();
  };

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

  const traiterCommande = async (commandeBrute) => {
    const commande = commandeBrute.trim();
    if (!commande) return;

    if (window.audioTerminal) window.audioTerminal.jouerBipValidation();

    const echo = document.createElement("div");
    echo.className = "line echo";
    echo.textContent = ">_ " + commande;
    sortie.appendChild(echo);

    if (affichageSaisie) affichageSaisie.textContent = "";
    if (entreeCachee) entreeCachee.value = "";
    ligneSaisie.classList.add("hidden");

    const norm = normaliser(commande);

    if (norm === "aide" || norm === "help" || norm === "?") {
      afficherDirectement(`
====================== COMMANDES DE MODÉRATION ======================
  * aide / help     : Affiche les commandes du live.
  * indice / hint   : L'avis du tchat pour t'aider.
  * otan / nato     : Affiche l'alphabet radio OTAN.
  * morse           : Affiche l'abécédaire du code Morse (. et -).
  * bip / play      : Fait retentir la sub-alert Morse du Manoir.
  * lore / animato  : Affiche l'histoire du Manoir d'Animato.
  * manoir / carte  : Affiche le plan du Manoir d'Horreur.
  * compteur / timer: Affiche le temps restant sur le live (108:00).
  * statut / status : Affiche ta progression de modération.
  * son / audio     : Coupe ou réactive le son du terminal.
  * clear / cls     : Efface le tchat de ton écran.
  * reset           : Relance le stream à zéro.
=====================================================================
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
Astuce : La première lettre de chaque mot te donne la solution !
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
      `, "table");
      ligneSaisie.classList.remove("hidden");
      focaliserEntree();
      return;
    }

    if (norm === "bip" || norm === "play" || norm === "son-morse") {
      if (enigmeActuelle >= 0 && enigmeActuelle < window.ENIGMES.length) {
        const enigme = window.ENIGMES[enigmeActuelle];
        if (enigme.audioMorse && window.audioTerminal) {
          await ecrireTexte("> ON ENVOIE LA SUB-ALERT : " + enigme.audioMorse, "system");
          window.audioTerminal.jouerMorse(enigme.audioMorse);
        } else {
          await ecrireTexte("> Pas de son prévu pour cette étape.", "system");
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
          await ecrireTexte("💡 LE TCHAT DIT : " + indice, "hint");
        } else {
          await ecrireTexte("Le tchat spamme des émotes, ils savent pas non plus.", "system");
        }
      } else {
        await ecrireTexte("Réponds d'abord à la question frérot !", "system");
      }
      ligneSaisie.classList.remove("hidden");
      focaliserEntree();
      return;
    }

    if (norm === "dharma" || norm === "lost" || norm === "lore" || norm === "animato") {
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
          STATION DU STREAM // GESTION DES RATS
  
  Mise en place par Animato pour ses streams d'horreur.
  But : Gérer les viewers intenables et ban les fantômes
  qui popent sur l'écran. 
  Règle n°1 : Pas de backseat. 'Namaste'.
      `, "ascii");
      ligneSaisie.classList.remove("hidden");
      focaliserEntree();
      return;
    }

    if (norm === "manoir" || norm === "carte" || norm === "map") {
      afficherDirectement(`
=================== CARTE DU MANOIR ANIMATO ===================
  [ÉTAGE 2] : La salle des modos, Les combles flippants
  [ÉTAGE 1] : Bibliothèque du Tchat, Balcon des Viewers
  [REZ-DE-CH] : Le Setup PC du Stream
  [SOUS-SOL] : Cave des Sub-goals, Serveurs Twitch DHARMA
===============================================================
      `, "table");
      ligneSaisie.classList.remove("hidden");
      focaliserEntree();
      return;
    }

    if (norm === "compteur" || norm === "timer") {
      const mins = Math.floor(totalSecondes / 60);
      const secs = totalSecondes % 60;
      await ecrireTexte("> CHRONO : Encore " + mins + "m " + secs + "s de live.", "system");
      ligneSaisie.classList.remove("hidden");
      focaliserEntree();
      return;
    }

    if (norm === "statut" || norm === "status") {
      const pct = Math.min(100, Math.round((Math.max(0, enigmeActuelle) / window.ENIGMES.length) * 100));
      await ecrireTexte("> LIVE EN COURS : Niveau " + (Math.max(0, enigmeActuelle) + 1) + " / " + window.ENIGMES.length, "system");
      await ecrireTexte("> PURGE DU TCHAT : " + pct + "%", "system");
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

    if (norm === "son" || norm === "audio" || norm === "mute") {
      if (window.audioTerminal) {
        const actif = window.audioTerminal.basculerSon();
        if (boutonSon) {
          boutonSon.textContent = actif ? "SON : ON" : "SON : MUTE";
          boutonSon.style.color = actif ? "var(--green)" : "#ff4444";
        }
        await ecrireTexte("> Son du terminal : " + (actif ? "ALLUMÉ" : "COUPÉ"), "system");
      }
      ligneSaisie.classList.remove("hidden");
      focaliserEntree();
      return;
    }

    if (norm === "reset") {
      sortie.innerHTML = "";
      enigmeActuelle = 0;
      totalSecondes = 108 * 60;
      await ecrireTexte("> REBOOT DU LIVE, ON RECOMMENCE TOUT...", "alert");
      await new Promise(r => setTimeout(r, 1000));
      poserEnigmeActuelle();
      return;
    }

    if (norm === "4 8 15 16 23 42" && enigmeActuelle !== 0) {
      if (window.audioTerminal) window.audioTerminal.jouerSonVictoire();
      await ecrireTexte("> LE CODE DE LOST EST VALIDÉ, BIEN VU...", "success");
      ligneSaisie.classList.remove("hidden");
      focaliserEntree();
      return;
    }

    if (enigmeActuelle === -1) {
      if (norm === "non" || norm === "no") {
        estSeul = false;
        await ecrireTexte("C'est mieux d'être plusieurs modos de toute façon.", "system");
      } else if (norm === "oui" || norm === "yes") {
        estSeul = true;
        if (window.audioTerminal) window.audioTerminal.jouerMurmureFantome();
        await ecrireTexte("Courage alors, t'es tout seul pour gérer le tchat.", "alert");
      } else {
        if (window.audioTerminal) window.audioTerminal.jouerErreurGlitch();
        await ecrireTexte("Réponds par OUI ou par NON le sang.");
        ligneSaisie.classList.remove("hidden");
        focaliserEntree();
        return;
      }

      await new Promise(r => setTimeout(r, 1000));
      await ecrireTexte("Lancement de la station Animato...", "system");
      await new Promise(r => setTimeout(r, 1000));
      enigmeActuelle = 0;
      poserEnigmeActuelle();
      return;
    }

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
      await ecrireTexte(enigme.messageVictoire || "> Carré. T'as géré ça facile.", "success");
      await new Promise(r => setTimeout(r, 1200));
      enigmeActuelle++;
      poserEnigmeActuelle();
    } else {
      if (window.audioTerminal) window.audioTerminal.jouerErreurGlitch();
      await new Promise(r => setTimeout(r, 300));
      await ecrireTexte("Aïe, c'est pas ça. Le tchat se fout de toi.", "alert");
      await new Promise(r => setTimeout(r, 600));
      await ecrireTexte("(Astuce : tape 'indice' si t'es bloqué, ou utilise 'otan' / 'morse')", "system");
      ligneSaisie.classList.remove("hidden");
      focaliserEntree();
    }
  };

  if (entreeCachee) {
    entreeCachee.addEventListener("input", (e) => {
      if (estEnTrainDEcrire) {
        entreeCachee.value = "";
        return;
      }
      const val = entreeCachee.value;
      if (affichageSaisie) affichageSaisie.textContent = val;
      if (window.audioTerminal && val.length > (affichageSaisie.textContent.length || 0)) {
        window.audioTerminal.jouerClicTouche();
      }
    });

    entreeCachee.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !estEnTrainDEcrire) {
        e.preventDefault();
        const cmdAEnvoyer = entreeCachee.value;
        traiterCommande(cmdAEnvoyer);
      }
    });
  }

  if (barreRaccourcis) {
    barreRaccourcis.addEventListener("click", (e) => {
      const pastille = e.target.closest(".shortcut-chip");
      if (pastille && pastille.dataset.cmd && !estEnTrainDEcrire) {
        traiterCommande(pastille.dataset.cmd);
      }
    });
  }
});
