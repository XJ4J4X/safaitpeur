// =============================================================================
// DHARMA INITIATIVE // STATION MANOIR AMINATO
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
      entreeCachee.focus({ preventScroll: true });
    }
  };

  document.addEventListener("click", focaliserEntree);

  const defilerVersLeBas = () => {
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
    await ecrireTexte("> DÉMARRAGE DU SYSTÈME...", "system");
    await new Promise(r => setTimeout(r, 400));
    await ecrireTexte("> CONNEXION AU LIVE D'AMINATO...", "system");
    await new Promise(r => setTimeout(r, 600));
    await ecrireTexte("> LOCALISATION : LE MANOIR.", "system");
    await new Promise(r => setTimeout(r, 800));
    await ecrireTexte("> ALERTE TCHAT : PRÉSENCE DE TROLLS ET DE FANTÔMES.", "alert");
    await new Promise(r => setTimeout(r, 1200));

    afficherDirectement(`
       .---.            .---.
      /     \\          /     \\
     | () () |        | () () |  [ MANOIR AMINATO ]
      \\  ^  /          \\  ^  /   
       |||||            |||||
    `, "ascii");

    await ecrireTexte(" ");
    await ecrireTexte("Voulez-vous lancer la modération du live ?", "question");
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
      conteneurSon.innerHTML = "<span>🔊 Son détecté : <strong>" + enigme.audioMorse + "</strong></span><button class='morse-play-btn' id='play-morse-btn'>[ ÉCOUTER LE SON ]</button>";
      sortie.appendChild(conteneurSon);

      const boutonPlay = document.getElementById("play-morse-btn");
      if (boutonPlay) {
        boutonPlay.addEventListener("click", () => {
          if (window.audioTerminal) {
            boutonPlay.textContent = "EN COURS...";
            window.audioTerminal.jouerMorse(enigme.audioMorse, () => {
              boutonPlay.textContent = "[ ÉCOUTER LE SON ]";
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
    await ecrireTexte("LE LIVE EST SÉCURISÉ.", "success");
    await ecrireTexte("LA MODÉRATION EST TERMINÉE.", "success");
    await ecrireTexte("================================================================", "system");
    await new Promise(r => setTimeout(r, 1500));

    await ecrireTexte("Message automatique d'Aminato...", "system");
    await new Promise(r => setTimeout(r, 1200));
    await ecrireTexte("'Merci d'avoir géré le tchat ce soir.'", "story");
    await ecrireTexte("'Fin du live. À la prochaine !'", "story");
    await new Promise(r => setTimeout(r, 2000));

    if (window.audioTerminal) window.audioTerminal.jouerErreurGlitch();
    await ecrireTexte("> ANALYSE DU MODÉRATEUR...", "alert");
    await new Promise(r => setTimeout(r, 1000));

    if (estSeul) {
      let ip = "192.168.0.1";
      let loc = "RÉGION INCONNUE";
      try {
        const reponse = await fetch('https://ipapi.co/json/');
        const donnees = await reponse.json();
        if (donnees.ip) ip = donnees.ip;
        if (donnees.city) loc = donnees.city + ", " + donnees.region + " (" + donnees.country_name + ")";
      } catch (e) {}

      let os = "SYSTÈME INCONNU";
      const ua = navigator.userAgent;
      if (ua.includes("Win")) os = "WINDOWS";
      else if (ua.includes("Mac")) os = "MACOS";
      else if (ua.includes("Linux")) os = "LINUX";
      else if (ua.includes("Android") || ua.includes("iPhone")) os = "MOBILE";

      await ecrireTexte("> IP IDENTIFIÉE : " + ip, "alert");
      await new Promise(r => setTimeout(r, 600));
      await ecrireTexte("> SYSTÈME : " + os, "alert");
      await new Promise(r => setTimeout(r, 600));
      await ecrireTexte("> LOCALISATION : " + loc, "alert");
    } else {
      await ecrireTexte("> INFORMATIONS SYSTÈME MASQUÉES.", "alert-glitch");
    }

    await new Promise(r => setTimeout(r, 1500));
    if (window.audioTerminal) window.audioTerminal.jouerRireDiabolique();
    await ecrireTexte("DÉCONNEXION EN COURS.", "alert-massive");
    await new Promise(r => setTimeout(r, 3500));

    afficherDirectement(`
       .-.
      (o.o)   MERCI D'AVOIR JOUÉ.
       |=|    Le Manoir d'Aminato est sécurisé.
      __|__   Tapez 'reset' pour recommencer.
    `, "ascii");

    await ecrireTexte("[ ARCHIVE VIDÉO DISPONIBLE ]", "system");
    await new Promise(r => setTimeout(r, 1500));

    const divVideo = document.createElement("div");
    divVideo.style.margin = "20px 0";
    divVideo.innerHTML = "<p style='margin-bottom: 12px; color: var(--bright-green);'>Vidéo du stream :</p><a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='_blank' style='color: #000; background: var(--bright-green); padding: 10px 18px; text-decoration: none; font-weight: bold; display: inline-block;'>[ REGARDER LA VIDÉO ]</a>";
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
====================== COMMANDES DISPONIBLES ======================
  * aide / help     : Affiche les commandes.
  * indice / hint   : Affiche un indice pour l'énigme.
  * otan / nato     : Affiche l'alphabet radio OTAN.
  * morse           : Affiche l'abécédaire du code Morse.
  * bip / play      : Joue le son Morse de l'énigme.
  * lore / aminato  : Affiche l'histoire du Manoir d'Aminato.
  * manoir / carte  : Affiche le plan du Manoir.
  * compteur / timer: Affiche le temps restant (108:00).
  * statut / status : Affiche la progression.
  * son / audio     : Coupe ou réactive le son du terminal.
  * clear / cls     : Efface l'écran.
  * reset           : Relance le jeu.
===================================================================
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
          await ecrireTexte("> ÉMISSION DU SON : " + enigme.audioMorse, "system");
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
          await ecrireTexte("💡 INDICE : " + indice, "hint");
        } else {
          await ecrireTexte("Pas d'indice disponible.", "system");
        }
      } else {
        await ecrireTexte("Veuillez d'abord répondre à la question.", "system");
      }
      ligneSaisie.classList.remove("hidden");
      focaliserEntree();
      return;
    }

    if (norm === "dharma" || norm === "lost" || norm === "lore" || norm === "aminato") {
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
          [ INITIATIVE DHARMA - SECTION AMINATO ]
          STATION DU STREAM 
  
  Mise en place par Aminato pour ses streams d'horreur.
  Objectif : Gérer le tchat et bloquer les trolls.
      `, "ascii");
      ligneSaisie.classList.remove("hidden");
      focaliserEntree();
      return;
    }

    if (norm === "manoir" || norm === "carte" || norm === "map") {
      afficherDirectement(`
=================== CARTE DU MANOIR ===================
  [ÉTAGE 2] : La salle de modération
  [ÉTAGE 1] : Bibliothèque du Tchat
  [REZ-DE-CH] : Le PC du Stream
  [SOUS-SOL] : Serveurs DHARMA
=======================================================
      `, "table");
      ligneSaisie.classList.remove("hidden");
      focaliserEntree();
      return;
    }

    if (norm === "compteur" || norm === "timer") {
      const mins = Math.floor(totalSecondes / 60);
      const secs = totalSecondes % 60;
      await ecrireTexte("> TEMPS RESTANT : " + mins + "m " + secs + "s.", "system");
      ligneSaisie.classList.remove("hidden");
      focaliserEntree();
      return;
    }

    if (norm === "statut" || norm === "status") {
      const pct = Math.min(100, Math.round((Math.max(0, enigmeActuelle) / window.ENIGMES.length) * 100));
      await ecrireTexte("> PROGRESSION : Niveau " + (Math.max(0, enigmeActuelle) + 1) + " / " + window.ENIGMES.length, "system");
      await ecrireTexte("> COMPLÉTION : " + pct + "%", "system");
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
        await ecrireTexte("> Son du système : " + (actif ? "ACTIVÉ" : "DÉSACTIVÉ"), "system");
      }
      ligneSaisie.classList.remove("hidden");
      focaliserEntree();
      return;
    }

    if (norm === "reset") {
      sortie.innerHTML = "";
      enigmeActuelle = 0;
      totalSecondes = 108 * 60;
      await ecrireTexte("> REDÉMARRAGE DU JEU EN COURS...", "alert");
      await new Promise(r => setTimeout(r, 1000));
      poserEnigmeActuelle();
      return;
    }

    if (norm === "4 8 15 16 23 42" && enigmeActuelle !== 0) {
      if (window.audioTerminal) window.audioTerminal.jouerSonVictoire();
      await ecrireTexte("> Code accepté.", "success");
      ligneSaisie.classList.remove("hidden");
      focaliserEntree();
      return;
    }

    if (enigmeActuelle === -1) {
      if (norm === "non" || norm === "no") {
        estSeul = false;
        await ecrireTexte("Modération en équipe sélectionnée.", "system");
      } else if (norm === "oui" || norm === "yes") {
        estSeul = true;
        if (window.audioTerminal) window.audioTerminal.jouerMurmureFantome();
        await ecrireTexte("Modération en solo sélectionnée.", "alert");
      } else {
        if (window.audioTerminal) window.audioTerminal.jouerErreurGlitch();
        await ecrireTexte("Veuillez répondre par OUI ou par NON.");
        ligneSaisie.classList.remove("hidden");
        focaliserEntree();
        return;
      }

      await new Promise(r => setTimeout(r, 1000));
      await ecrireTexte("Lancement de la station Aminato...", "system");
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
      await ecrireTexte(enigme.messageVictoire || "> Bonne réponse. Validé.", "success");
      await new Promise(r => setTimeout(r, 1200));
      enigmeActuelle++;
      poserEnigmeActuelle();
    } else {
      if (window.audioTerminal) window.audioTerminal.jouerErreurGlitch();
      await new Promise(r => setTimeout(r, 300));
      await ecrireTexte("Erreur. Mauvaise réponse.", "alert");
      await new Promise(r => setTimeout(r, 600));
      await ecrireTexte("(Astuce : tapez 'indice', 'otan' ou 'morse' pour de l'aide)", "system");
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

  // --- EASTER EGG : KONAMI CODE (HACK / CRASH) ---
  const sequenceKonami = 'ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight';
  const sequenceKonamiBA = sequenceKonami + ',b,a';
  let historiqueTouches = [];

  window.addEventListener('keydown', (e) => {
    historiqueTouches.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);
    if (historiqueTouches.length > 15) historiqueTouches.shift();

    const touchesStr = historiqueTouches.join(',');
    
    if (touchesStr.includes(sequenceKonamiBA) || touchesStr.includes(sequenceKonami)) {
      declencherHackSysteme();
      historiqueTouches = []; // Reset pour éviter les déclenchements multiples
    }
  }, { capture: true });

  const declencherHackSysteme = () => {
    // Tous les sons d'horreur en boucle
    if (window.audioTerminal) {
      window.audioTerminal.jouerRireDiabolique();
      window.audioTerminal.jouerTonnerre();
      setInterval(() => window.audioTerminal.jouerErreurGlitch(), 400);
      setInterval(() => window.audioTerminal.jouerMurmureFantome(), 1500);
      setInterval(() => window.audioTerminal.jouerAlarmeDharma(), 2500);
    }
    
    document.body.innerHTML = `
      <div id="nightmare-screen" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:black;color:#ff0000;font-family:'Courier New', Courier, monospace;z-index:999999;overflow:hidden;cursor:none;display:flex;flex-direction:column;align-items:center;justify-content:center;">
        
        <!-- Spam de texte en fond -->
        <div id="creepy-spam" style="position:absolute;top:0;left:0;width:100%;height:100%;font-size:28px;line-height:1.1;opacity:0.35;word-wrap:break-word;font-weight:bold;color:red;pointer-events:none;"></div>
        
        <!-- Effet stroboscopique rouge/noir -->
        <div id="strobe" style="position:absolute;top:0;left:0;width:100%;height:100%;background-color:red;mix-blend-mode:overlay;animation:strobe 0.1s infinite;pointer-events:none;"></div>
        
        <!-- Message central géant -->
        <div style="z-index:10;text-align:center;animation:shake 0.15s infinite;background:rgba(0,0,0,0.8);padding:40px;border: 5px solid red;box-shadow: 0 0 50px red;">
          <h1 style="font-size:clamp(40px, 8vw, 120px); margin:0; animation: glitch-text 0.1s infinite; text-shadow: 0 0 20px red;">NE TE RETOURNE PAS</h1>
          <h2 style="font-size:clamp(20px, 4vw, 60px); color:white; margin:20px 0; animation: glitch-text 0.15s infinite;">IL EST LÀ</h2>
        </div>
      </div>
    `;

    const styleGlitch = document.createElement("style");
    styleGlitch.innerHTML = `
      @keyframes strobe {
        0%, 40% { opacity: 0; filter: invert(0%); }
        50% { opacity: 1; filter: invert(100%); background-color: white; }
        60%, 100% { opacity: 0; filter: invert(0%); }
      }
      @keyframes shake {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        25% { transform: translate(-52%, -48%) rotate(-2deg); }
        50% { transform: translate(-48%, -52%) rotate(2deg); }
        75% { transform: translate(-51%, -49%) rotate(-1deg); }
        100% { transform: translate(-50%, -50%) rotate(0deg); }
      }
      @keyframes glitch-text {
        0% { transform: skewX(0deg); text-shadow: 5px 5px red; }
        25% { transform: skewX(-30deg); text-shadow: -10px -10px blue; }
        50% { transform: skewX(30deg); text-shadow: 10px 10px green; }
        75% { transform: skewX(-10deg); text-shadow: 5px 5px red; }
        100% { transform: skewX(0deg); text-shadow: -5px 5px white; }
      }
      body { animation: body-shake 0.1s infinite; background-color: black !important; }
      @keyframes body-shake {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(10px, 10px); }
      }
    `;
    document.head.appendChild(styleGlitch);

    const hackText = document.getElementById("creepy-spam");
    const mots = ["MORT ", "SANG ", "DERRIÈRE TOI ", "REGARDE ", "FUI ", "TROP TARD ", "666 ", "SOUFFRE ", "IL TE VOIT ", "CRÈVE ", "DHARMA "];
    
    // Remplissage initial de tout l'écran
    let initialSpam = "";
    for (let i = 0; i < 800; i++) {
      initialSpam += mots[Math.floor(Math.random() * mots.length)];
    }
    hackText.textContent = initialSpam;

    setInterval(() => {
      let batch = "";
      for (let i = 0; i < 20; i++) batch += mots[Math.floor(Math.random() * mots.length)];
      hackText.textContent = batch + hackText.textContent.substring(0, 4000);
    }, 50);
  };
});
