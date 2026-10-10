// =============================================================================
// DHARMA INITIATIVE // STATION 13 : LE SPECTRE (MANOIR BLACKWOOD)
// Moteur de Terminal Cathodique Vert - J4X OS
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
  const bootScreen = document.getElementById("boot-screen");
  const bootBtn = document.getElementById("boot-btn");
  const terminalScreen = document.getElementById("terminal-screen");
  const output = document.getElementById("output");
  const inputLine = document.getElementById("input-line");
  const inputDisplay = document.getElementById("input-display");
  const hiddenInput = document.getElementById("hidden-input");
  const hudTimer = document.getElementById("hud-timer");
  const hudProgress = document.getElementById("hud-progress");
  const soundBtn = document.getElementById("sound-btn");
  const shortcutsBar = document.getElementById("shortcuts-bar");

  let currentRiddle = -1; // -1 = Phase de démarrage / question initiale
  let isAlone = true;
  let isTyping = false;
  let userInput = "";
  let hintCounter = 0;

  // Compteur 108:00 DHARMA
  let totalSeconds = 108 * 60; // 108 minutes
  let timerInterval = null;

  const updateHudTimer = () => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    hudTimer.textContent = formatted;

    if (totalSeconds <= 240) { // Moins de 4 minutes = Urgence
      hudTimer.classList.add("urgent");
      if (totalSeconds % 30 === 0 && window.terminalAudio) {
        window.terminalAudio.playDharmaAlarm();
      }
    } else {
      hudTimer.classList.remove("urgent");
    }

    if (totalSeconds > 0) {
      totalSeconds--;
    } else {
      // Le compteur est tombé à 0:00 -> Reboot automatique d'urgence
      totalSeconds = 108 * 60;
      if (window.terminalAudio) window.terminalAudio.playDharmaAlarm();
    }
  };

  const updateProgress = () => {
    if (currentRiddle < 0) {
      hudProgress.textContent = "0%";
    } else {
      const pct = Math.min(100, Math.round((currentRiddle / window.RIDDLES.length) * 100));
      hudProgress.textContent = `${pct}%`;
    }
  };

  const startCountdown = () => {
    if (!timerInterval) {
      timerInterval = setInterval(updateHudTimer, 1000);
    }
  };

  // Gestion du son
  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      if (window.terminalAudio) {
        const active = window.terminalAudio.toggle();
        soundBtn.textContent = active ? "SON : ON" : "SON : OFF";
        soundBtn.style.color = active ? "var(--green)" : "#ff4444";
      }
    });
  }

  // Démarrage du terminal au clic
  const initBoot = () => {
    bootScreen.classList.remove("active");
    terminalScreen.classList.add("active");
    
    if (window.terminalAudio) {
      window.terminalAudio.init();
      window.terminalAudio.playPowerSwitch();
      window.terminalAudio.playCrtPowerUp();
      window.terminalAudio.startAmbientHum();
      setTimeout(() => {
        window.terminalAudio.playGhostWhisper();
      }, 1200);
    }

    startCountdown();
    startSequence();
  };

  bootBtn.addEventListener("click", initBoot);
  bootScreen.addEventListener("click", (e) => {
    if (e.target === bootScreen) initBoot();
  });

  // Focus permanent pour saisie fluide
  const focusInput = () => {
    if (hiddenInput && !isTyping) {
      hiddenInput.focus();
    }
  };

  terminalScreen.addEventListener("click", focusInput);

  // Animation d'écriture progressive (style CRT teletype)
  const typeText = async (text, extraClass = "", speed = 18) => {
    isTyping = true;
    inputLine.classList.add("hidden");

    const line = document.createElement("div");
    line.className = "line " + extraClass;
    output.appendChild(line);

    for (let i = 0; i < text.length; i++) {
      line.textContent += text[i];
      if (text[i] !== ' ' && text[i] !== '\n' && window.terminalAudio && Math.random() > 0.45) {
        window.terminalAudio.playKeyClick(text[i] === ' ');
      }
      // Vitesse ajustable, avec pause sur la ponctuation
      let delay = speed + Math.random() * 15;
      if (text[i] === '.' || text[i] === '!' || text[i] === '?') delay += 120;
      if (text[i] === '\n') delay += 150;
      await new Promise(r => setTimeout(r, delay));
    }

    isTyping = false;
    inputLine.classList.remove("hidden");
    focusInput();
    window.scrollTo(0, document.body.scrollHeight);
    return line;
  };

  // Affichage direct (sans effet d'écriture lente pour tables, ascii, etc.)
  const printDirect = (text, extraClass = "") => {
    const line = document.createElement("div");
    line.className = "line " + extraClass;
    line.textContent = text;
    output.appendChild(line);
    window.scrollTo(0, document.body.scrollHeight);
    return line;
  };

  const printHtml = (htmlContent, extraClass = "") => {
    const line = document.createElement("div");
    line.className = "line " + extraClass;
    line.innerHTML = htmlContent;
    output.appendChild(line);
    window.scrollTo(0, document.body.scrollHeight);
    return line;
  };

  // Séquence d'introduction
  const startSequence = async () => {
    await new Promise(r => setTimeout(r, 800));
    await typeText("> INITIALISATION DU TERMINAL MAINFRAME CATHODIQUE...", "system");
    await new Promise(r => setTimeout(r, 400));
    await typeText("> RECHERCHE DU SIGNAL DE LA FONDATION HANSO... CONNECTÉ.", "system");
    await new Promise(r => setTimeout(r, 600));
    await typeText("> LOCALISATION : SOUS-SOL DU MANOIR BLACKWOOD [ STATION 13 ].", "system");
    await new Promise(r => setTimeout(r, 800));
    await typeText("> ALERTE ÉLECTROMAGNÉTIQUE : NUIT DE SAMHAIN / 31 OCTOBRE ACTIVE.", "alert");
    await new Promise(r => setTimeout(r, 1200));

    printDirect(`
       .---.            .---.
      /     \\          /     \\
     | () () |  BOO ! | () () |  [ STATION 13 ]
      \\  ^  /          \\  ^  /   [ LE SPECTRE ]
       |||||            |||||
    `, "ascii");

    await typeText(" ");
    await typeText("Es-tu seul dans le manoir ce soir ?", "question");
  };

  // Affichage de l'énigme en cours
  const askCurrentRiddle = async () => {
    updateProgress();
    hintCounter = 0;

    if (currentRiddle >= window.RIDDLES.length) {
      // Victoire / Climax
      await triggerVictoryClimax();
      return;
    }

    const r = window.RIDDLES[currentRiddle];

    // Badge d'étape
    printDirect(`[ ${r.stage} ]`, "stage");
    printDirect(`SECTEUR : ${r.sector}`, "sector");
    
    // Histoire
    await typeText(r.story, "story", 14);
    await new Promise(r => setTimeout(r, 400));

    // Question
    await typeText(r.question, "question", 16);

    // Si un code Morse audio est associé, proposer un bouton pour l'écouter
    if (r.morseAudio) {
      const cueDiv = document.createElement("div");
      cueDiv.className = "line morse-cue";
      cueDiv.innerHTML = `
        <span>🔊 Signal Morse détecté : <strong>${r.morseAudio}</strong></span>
        <button class="morse-play-btn" id="play-morse-btn">[ JOUER LE SIGNAL AUDIO ]</button>
      `;
      output.appendChild(cueDiv);

      const playBtn = document.getElementById("play-morse-btn");
      if (playBtn) {
        playBtn.addEventListener("click", () => {
          if (window.terminalAudio) {
            playBtn.textContent = "SIGNAL EN COURS...";
            window.terminalAudio.playMorse(r.morseAudio, () => {
              playBtn.textContent = "[ RÉÉCOUTER LE SIGNAL ]";
            });
          }
        });
      }

      // Joue automatiquement le premier bip après 600ms
      setTimeout(() => {
        if (window.terminalAudio) {
          window.terminalAudio.playMorse(r.morseAudio);
        }
      }, 600);
    }
  };

  // Climax et fin avec J4X & Dr Marvin Candle
  const triggerVictoryClimax = async () => {
    if (window.terminalAudio) {
      window.terminalAudio.playSuccessArp();
      window.terminalAudio.playThunder();
    }

    await typeText("================================================================", "system");
    await typeText("PROTOCOLE SAMHAIN COMPLÉTÉ AVEC SUCCÈS.", "success");
    await typeText("L'ANOMALIE ÉLECTROMAGNÉTIQUE DU MANOIR EST STABILISÉE.", "success");
    await typeText("LES SPECTRES SONT DE NOUVEAU ENFERMÉS DANS LE VOILE.", "success");
    await typeText("================================================================", "system");
    await new Promise(r => setTimeout(r, 1500));

    await typeText("Transmission entrante du Dr. Marvin Candle / Pierre Chang...", "system");
    await new Promise(r => setTimeout(r, 1200));
    await typeText("'Félicitations opérateur. La station 13 Le Spectre a accompli sa mission pour Halloween.'", "story");
    await typeText("'Comme nous le disons toujours au sein de l'Initiative DHARMA : Namaste, et bonne chance...'", "story");
    await new Promise(r => setTimeout(r, 2000));

    if (window.terminalAudio) window.terminalAudio.playErrorGlitch();
    await typeText("> INTERCEPTION PAR J4X OS : ANALYSE DE L'OPÉRATEUR...", "alert");
    await new Promise(r => setTimeout(r, 1000));

    if (isAlone) {
      let ip = "192.168.108.42";
      let loc = "MANOIR BLACKWOOD - SALLE DES MACHINES";
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        if (data.ip) ip = data.ip;
        if (data.city) loc = `${data.city}, ${data.region} (${data.country_name})`;
      } catch (e) {}

      let os = "TERMINAL CATHODIQUE VINTAGE";
      const ua = navigator.userAgent;
      if (ua.includes("Win")) os = "WINDOWS CRT STATION";
      else if (ua.includes("Mac")) os = "MACOS STATION";
      else if (ua.includes("Linux")) os = "LINUX MAINFRAME";
      else if (ua.includes("Android")) os = "ANDROID COMMUNICATOR";
      else if (ua.includes("iPhone")) os = "IOS COMMUNICATOR";

      await typeText(`> ADRESSE IP IDENTIFIÉE DANS LE MANOIR : ${ip}`, "alert");
      await new Promise(r => setTimeout(r, 600));
      await typeText(`> SIGNATURE DU SYSTÈME : ${os}`, "alert");
      await new Promise(r => setTimeout(r, 600));
      await typeText(`> SECTEUR GÉOGRAPHIQUE : ${loc}`, "alert");
      await new Promise(r => setTimeout(r, 600));
      await typeText("> TEMPÉRATURE ECTOPLASMIQUE : 3.8°C (PRÉSENCE IMMINENTE)", "alert");
    } else {
      await typeText("> ADRESSE IP : [ MASQUÉE PAR LE CHAMP ÉLECTROMAGNÉTIQUE ]", "alert-glitch");
      await new Promise(r => setTimeout(r, 600));
      await typeText("> SYSTÈME : [ CONFINÉ DANS LA CRYPTE ]", "alert-glitch");
      await new Promise(r => setTimeout(r, 600));
      await typeText("> LOCALISATION : [ BRÈCHE DIMENSIONNELLE SCORPION ]", "alert-glitch");
    }

    await new Promise(r => setTimeout(r, 1500));
    if (window.terminalAudio) window.terminalAudio.playLaugh();
    await typeText("J4X SAIT TOUT. LES ESPRITS TE REGARDENT À TRAVERS L'ÉCRAN.", "alert-massive");
    await new Promise(r => setTimeout(r, 3500));

    printDirect(`
       .-.
      (o.o)   JOYEUX HALLOWEEN DE LA PART DE LA DHARMA INITIATIVE !
       |=|    Toutes les énigmes ont été résolues avec bravoure.
      __|__   Tapez 'reset' pour recommencer l'enquête.
    `, "ascii");

    await typeText("[ ARCHIVE VIDÉO SECRÈTE DÉVERROUILLÉE : VERITE_SAMHAIN.mp4 ]", "system");
    await new Promise(r => setTimeout(r, 1500));

    const rickDiv = document.createElement("div");
    rickDiv.style.margin = "20px 0";
    rickDiv.innerHTML = `
      <p style="margin-bottom: 12px; color: var(--bright-green);">Cliquez ci-dessous pour visionner l'archive déclassifiée de la station :</p>
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" style="color: #000; background: var(--bright-green); padding: 10px 18px; text-decoration: none; font-weight: bold; display: inline-block;">
        [ VISIONNER L'ARCHIVE CLASSIFIÉE DU MANOIR ]
      </a>
    `;
    output.appendChild(rickDiv);
    inputLine.classList.remove("hidden");
    focusInput();
  };

  // Normalisation des réponses (minuscules, sans accents, sans ponctuation excessive)
  const normalize = (str) => {
    return str
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/['’]/g, " ")
      .replace(/[.,;:!?]/g, "")
      .replace(/\s+/g, " ");
  };

  // Exécution d'une commande ou vérification de réponse
  const handleCommand = async (rawCmd) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    if (window.terminalAudio) window.terminalAudio.playEnter();

    // Echo de la commande entrée
    const echo = document.createElement("div");
    echo.className = "line echo";
    echo.textContent = ">_ " + cmd;
    output.appendChild(echo);

    userInput = "";
    if (inputDisplay) inputDisplay.textContent = "";
    if (hiddenInput) hiddenInput.value = "";
    inputLine.classList.add("hidden");

    const norm = normalize(cmd);

    // ================= COMMANDES SYSTÈME =================
    if (norm === "aide" || norm === "help" || norm === "?") {
      printDirect(`
========================= GUIDE DES COMMANDES =========================
  * aide / help     : Affiche ce menu d'assistance.
  * indice / hint   : Dévoile un indice pour l'énigme en cours.
  * otan / nato     : Affiche l'alphabet phonétique radio de l'OTAN.
  * morse           : Affiche l'abécédaire du code Morse (. et -).
  * bip / play      : Fait retentir le signal sonore Morse de l'énigme.
  * dharma / lost   : Affiche l'histoire secrète de la Station 13.
  * manoir / carte  : Affiche le plan des ailes hantées du Manoir.
  * compteur / timer: Affiche l'état du chronomètre 108:00.
  * statut / status : Affiche votre progression de confinement.
  * son / audio     : Coupe ou réactive les effets sonores.
  * clear / cls     : Efface l'écran du terminal.
  * reset           : Réinitialise l'aventure au premier stage.
========================================================================
      `, "table");
      inputLine.classList.remove("hidden");
      focusInput();
      return;
    }

    if (norm === "otan" || norm === "nato") {
      if (window.terminalAudio) window.terminalAudio.playDataChirp();
      printDirect(`
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
      inputLine.classList.remove("hidden");
      focusInput();
      return;
    }

    if (norm === "morse") {
      if (window.terminalAudio) window.terminalAudio.playDataChirp();
      printDirect(`
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
      inputLine.classList.remove("hidden");
      focusInput();
      return;
    }

    if (norm === "bip" || norm === "play" || norm === "son-morse") {
      if (currentRiddle >= 0 && currentRiddle < window.RIDDLES.length) {
        const r = window.RIDDLES[currentRiddle];
        if (r.morseAudio && window.terminalAudio) {
          await typeText(`> ÉMISSION DU SIGNAL MORSE : ${r.morseAudio}`, "system");
          window.terminalAudio.playMorse(r.morseAudio);
        } else {
          await typeText("> Aucune transmission Morse active sur cette fréquence.", "system");
        }
      }
      inputLine.classList.remove("hidden");
      focusInput();
      return;
    }

    if (norm === "indice" || norm === "hint") {
      if (currentRiddle >= 0 && currentRiddle < window.RIDDLES.length) {
        const r = window.RIDDLES[currentRiddle];
        if (r.hints && r.hints.length > 0) {
          const hint = r.hints[hintCounter % r.hints.length];
          hintCounter++;
          await typeText(`💡 INDICE DHARMA : ${hint}`, "hint");
        } else {
          await typeText("Aucun indice supplémentaire pour cette section.", "system");
        }
      } else {
        await typeText("Commencez par répondre à la question initiale.", "system");
      }
      inputLine.classList.remove("hidden");
      focusInput();
      return;
    }

    if (norm === "dharma" || norm === "lost") {
      if (window.terminalAudio) window.terminalAudio.playSuccessArp();
      printDirect(`
                     /\\
                    /  \\
                   / /\\ \\
             /\\   / /  \\ \\   /\\
            /  \\ / / /\\ \\ \\ /  \\
           / /\\ \\ / /  \\ \\ / /\\ \\
          | |  | | | 13 | | |  | |
           \\ \\/ / \\ \\  / / \\ \\/ /
            \\  /   \\ \\/ /   \\  /
             \\/     \\  /     \\/
                     \\/
          [ INITIATIVE DHARMA - FONDATION HANSO ]
          STATION 13 : 'LE SPECTRE' // MANOIR BLACKWOOD
  
  Fondée en 1974 par Gerald et Karen DeGroot.
  Objectif : Étudier les fluctuations électromagnétiques de haute
  fréquence et leur perméabilité avec le monde des esprits lors
  des solstices et de la fête de Samhain.
  Mots d'ordre : Savoir, Confinement, Harmonie. 'Namaste'.
      `, "ascii");
      inputLine.classList.remove("hidden");
      focusInput();
      return;
    }

    if (norm === "manoir" || norm === "carte" || norm === "map") {
      printDirect(`
=================== RELEVÉ DU MANOIR BLACKWOOD ===================
  [ÉTAGE 2] : Combles obscurs, Capteurs PKE, Poupées possédées
  [ÉTAGE 1] : Chambre des miroirs, Bibliothèque, Salle de bal
  [REZ-DE-CH] : Grand Vestibule, Salon à la cheminée Jack O'Lantern
  [SOUS-SOL] : Cave voûtée, Puits des âmes, Télégraphe d'urgence
  [CATACAMBES] : STATION 13 DHARMA, Ordinateur et volets 108:00
==================================================================
      `, "table");
      inputLine.classList.remove("hidden");
      focusInput();
      return;
    }

    if (norm === "compteur" || norm === "timer") {
      const mins = Math.floor(totalSeconds / 60);
      const secs = totalSeconds % 60;
      await typeText(`> COMPTEUR CYCLE DHARMA : ${mins}m ${secs}s restantes avant décharge nécessaire.`, "system");
      inputLine.classList.remove("hidden");
      focusInput();
      return;
    }

    if (norm === "statut" || norm === "status") {
      const pct = Math.min(100, Math.round((Math.max(0, currentRiddle) / window.RIDDLES.length) * 100));
      await typeText(`> RAPPORT DE MISSION : Énigme ${Math.max(0, currentRiddle) + 1} / ${window.RIDDLES.length}`, "system");
      await typeText(`> NIVEAU DE CONFINEMENT DU MANOIR : ${pct}%`, "system");
      inputLine.classList.remove("hidden");
      focusInput();
      return;
    }

    if (norm === "clear" || norm === "cls") {
      output.innerHTML = "";
      if (currentRiddle >= 0 && currentRiddle < window.RIDDLES.length) {
        askCurrentRiddle();
      } else {
        inputLine.classList.remove("hidden");
        focusInput();
      }
      return;
    }

    if (norm === "son" || norm === "audio") {
      if (window.terminalAudio) {
        const active = window.terminalAudio.toggle();
        if (soundBtn) {
          soundBtn.textContent = active ? "SON : ON" : "SON : OFF";
          soundBtn.style.color = active ? "var(--green)" : "#ff4444";
        }
        await typeText(`> Audio système : ${active ? "ACTIVÉ" : "DÉSACTIVÉ"}`, "system");
      }
      inputLine.classList.remove("hidden");
      focusInput();
      return;
    }

    if (norm === "reset") {
      output.innerHTML = "";
      currentRiddle = 0;
      totalSeconds = 108 * 60;
      await typeText("> RÉINITIALISATION DU TERMINAL ET DU PROTOCOLE SAMHAIN...", "alert");
      await new Promise(r => setTimeout(r, 1000));
      askCurrentRiddle();
      return;
    }

    // Easter eggs
    if (norm === "4 8 15 16 23 42" && currentRiddle !== 0) {
      if (window.terminalAudio) window.terminalAudio.playSuccessArp();
      await typeText("> LES NOMBRES SACRÉS RÉSONNENT DANS LES MURS DU MANOIR...", "success");
      inputLine.classList.remove("hidden");
      focusInput();
      return;
    }

    if (norm === "matrix") {
      await typeText("> FLUX SPECTRAL NUMÉRIQUE...", "system");
      printDirect("01100100 01101000 01100001 01110010 01101101 01100001 00100000 01100011 01101111 01100100 01100101", "echo");
      inputLine.classList.remove("hidden");
      focusInput();
      return;
    }

    // ================= QUESTION INITIALE (ÉCRAN D'ACCUEIL) =================
    if (currentRiddle === -1) {
      if (norm === "non" || norm === "no") {
        isAlone = false;
        await typeText("Sage décision de protéger ton entourage.", "system");
      } else if (norm === "oui" || norm === "yes") {
        isAlone = true;
        if (window.terminalAudio) window.terminalAudio.playGhostWhisper();
        await typeText("Parfait. Nous n'aurons aucun témoin dans ce manoir.", "alert");
      } else {
        if (window.terminalAudio) window.terminalAudio.playErrorGlitch();
        await typeText("Réponds clairement par OUI ou par NON.");
        inputLine.classList.remove("hidden");
        focusInput();
        return;
      }

      await new Promise(r => setTimeout(r, 1000));
      await typeText("Connexion à la Station 13 : Le Spectre...", "system");
      await new Promise(r => setTimeout(r, 1000));
      currentRiddle = 0;
      askCurrentRiddle();
      return;
    }

    // ================= VALIDATION DES ÉNIGMES =================
    await checkRiddleAnswer(cmd);
  };

  const checkRiddleAnswer = async (rawInput) => {
    const r = window.RIDDLES[currentRiddle];
    const normInput = normalize(rawInput);

    // Comparaison avec toutes les réponses acceptées
    const isCorrect = r.answers.some(ans => {
      const normAns = normalize(ans);
      // Correspondance exacte ou inclusion propre
      if (normInput === normAns) return true;
      // Pour les nombres ou codes stricts
      if (normInput.replace(/\s+/g, "") === normAns.replace(/\s+/g, "")) return true;
      return false;
    });

    if (isCorrect) {
      if (window.terminalAudio) window.terminalAudio.playSuccessArp();
      await new Promise(r => setTimeout(r, 400));
      await typeText(r.successMessage || "> Exact. Protocole validé.", "success");
      await new Promise(r => setTimeout(r, 1200));
      currentRiddle++;
      askCurrentRiddle();
    } else {
      if (window.terminalAudio) window.terminalAudio.playErrorGlitch();
      await new Promise(r => setTimeout(r, 300));
      await typeText("Faux. Le signal est rejeté par la station.", "alert");
      await new Promise(r => setTimeout(r, 600));
      await typeText("(Astuce : tapez 'indice' pour de l'aide, 'otan' pour l'alphabet radio, ou 'morse' pour le télégraphe)", "system");
      inputLine.classList.remove("hidden");
      focusInput();
    }
  };

  // Clavier physique (Desktop)
  document.addEventListener("keydown", async (e) => {
    if (isTyping) return;
    if (!terminalScreen.classList.contains("active")) return;

    if (e.key === "Enter") {
      e.preventDefault();
      const cmdToSend = userInput;
      await handleCommand(cmdToSend);
    } else if (e.key === "Backspace") {
      e.preventDefault();
      userInput = userInput.slice(0, -1);
      inputDisplay.textContent = userInput;
      if (hiddenInput) hiddenInput.value = userInput;
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      userInput += e.key;
      inputDisplay.textContent = userInput;
      if (hiddenInput) hiddenInput.value = userInput;
      if (window.terminalAudio) window.terminalAudio.playKeyClick(e.key === ' ');
    }
  });

  // Clavier tactile / Mobile via hiddenInput
  if (hiddenInput) {
    hiddenInput.addEventListener("input", (e) => {
      if (isTyping) return;
      userInput = hiddenInput.value;
      inputDisplay.textContent = userInput;
      if (window.terminalAudio) window.terminalAudio.playKeyClick();
    });

    hiddenInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const cmdToSend = userInput;
        handleCommand(cmdToSend);
      }
    });
  }

  // Raccourcis cliquables sous le terminal
  if (shortcutsBar) {
    shortcutsBar.addEventListener("click", (e) => {
      const chip = e.target.closest(".shortcut-chip");
      if (chip && chip.dataset.cmd) {
        handleCommand(chip.dataset.cmd);
      }
    });
  }

});
