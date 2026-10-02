// J4X OS - Moteur principal
// Auteur: J4X
document.addEventListener("DOMContentLoaded", () => {
  const bootScreen = document.getElementById("boot-screen");
  const terminalScreen = document.getElementById("terminal-screen");
  const output = document.getElementById("output");
  const inputLine = document.getElementById("input-line");
  const inputDisplay = document.getElementById("input-display");
  
  let currentRiddle = -1; // -1 = Phase de question initiale
  let isAlone = true;
  let isTyping = false;
  let userInput = "";

  bootScreen.addEventListener("click", () => {
    bootScreen.classList.remove("active");
    terminalScreen.classList.add("active");
    if (window.terminalAudio) {
      window.terminalAudio.init();
      window.terminalAudio.playPowerSwitch();
      window.terminalAudio.startAmbientHum();
    }
    startSequence(); // Lancement de la séquence d'introduction
  });

  // Fonction pour animer le texte caractère par caractère
  const typeText = async (text, extraClass = "") => {
    isTyping = true;
    inputLine.classList.add("hidden");
    
    const line = document.createElement("div");
    line.className = "line " + extraClass;
    output.appendChild(line);

    for (let i = 0; i < text.length; i++) {
      line.textContent += text[i];
      if (text[i] !== ' ' && window.terminalAudio && Math.random() > 0.3) {
        window.terminalAudio.playKeyClick();
      }
      await new Promise(r => setTimeout(r, 20 + Math.random() * 40));
    }
    
    isTyping = false;
    inputLine.classList.remove("hidden");
    window.scrollTo(0, document.body.scrollHeight);
  };

  const startSequence = async () => {
    await new Promise(r => setTimeout(r, 1000));
    await typeText("> INIT_OVERRIDE_PROTOCOL...", "system");
    await new Promise(r => setTimeout(r, 500));
    await typeText("> CONTOURNEMENT DE LA SECURITE GLOBALE...", "system");
    await new Promise(r => setTimeout(r, 800));
    await typeText("> PRISE DE CONTROLE PAR J4X... ACCORDEE.", "system");
    await new Promise(r => setTimeout(r, 1500));
    await typeText(" ");
    await typeText("Es-tu seul ?", "question");
  };

  const askCurrentRiddle = async () => {
    if (currentRiddle >= window.RIDDLES.length) {
      if (window.terminalAudio) window.terminalAudio.playSuccessArp();
      await typeText("Tu as prouvé ta valeur.");
      await new Promise(r => setTimeout(r, 1500));
      
      // Séquence d'alerte (Jump Scare)
      await typeText("Mais avant d'aller plus loin...", "system");
      await new Promise(r => setTimeout(r, 1500));
      await typeText("Sache que tu n'as jamais été anonyme ici.");
      await new Promise(r => setTimeout(r, 2000));
      
      if (window.terminalAudio) window.terminalAudio.playErrorGlitch();
      await typeText("> ANALYSE DE LA CIBLE...", "alert");
      
      if (isAlone) {
        // Récupération de l'IP et de la localisation via API publique
        let ip = "INCONNUE";
        let loc = "LOCALISATION INCONNUE";
        try {
          const response = await fetch('https://ipapi.co/json/');
          const data = await response.json();
          ip = data.ip || "CACHE";
          loc = (data.city && data.region) ? `${data.city}, ${data.region} (${data.org})` : "IDENTIFIÉE";
        } catch (e) {
          console.log("Erreur API : Impossible de récupérer l'IP");
        }
        
        // Analyse basique du système
        let os = "SYSTÈME INCONNU";
        const ua = navigator.userAgent;
        if (ua.includes("Win")) os = "WINDOWS";
        else if (ua.includes("Mac")) os = "MACOS";
        else if (ua.includes("Linux")) os = "LINUX";
        else if (ua.includes("iPhone") || ua.includes("iPad")) os = "IOS";
        else if (ua.includes("Android")) os = "ANDROID";

        await new Promise(r => setTimeout(r, 1500));
        await typeText("> ADRESSE IP IDENTIFIÉE : " + ip, "alert");
        await new Promise(r => setTimeout(r, 800));
        await typeText("> EMPREINTE SYSTÈME : " + os, "alert");
        await new Promise(r => setTimeout(r, 800));
        await typeText("> SECTEUR LOCALISÉ : " + loc, "alert");
      } else {
        // Mode protégé / censuré
        await new Promise(r => setTimeout(r, 1500));
        await typeText("> ADRESSE IP IDENTIFIÉE : [ CENSURÉ ]", "alert-glitch");
        await new Promise(r => setTimeout(r, 800));
        await typeText("> EMPREINTE SYSTÈME : [ PROTECTION ACTIVE ]", "alert-glitch");
        await new Promise(r => setTimeout(r, 800));
        await typeText("> SECTEUR LOCALISÉ : [ NON DÉFINI ]", "alert-glitch");
      }

      await new Promise(r => setTimeout(r, 2000));
      await typeText("J4X VOIT TOUT. J4X TE REGARDE.", "alert-massive");
      await new Promise(r => setTimeout(r, 4000));
      
      await typeText("Voici la vérité que le système a décidé de censurer...");
      await new Promise(r => setTimeout(r, 1000));
      await typeText("[ FICHIER DECRYPTE : VERITE.mp4 ]", "system");
      await new Promise(r => setTimeout(r, 2000));
      
      output.innerHTML = "";
      inputLine.classList.add("hidden");
      
      const iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0&modestbranding=1";
      iframe.style.width = "100vw";
      iframe.style.height = "100vh";
      iframe.style.position = "fixed";
      iframe.style.top = "0";
      iframe.style.left = "0";
      iframe.style.border = "none";
      iframe.style.zIndex = "9999";
      
      // Autorise l'autoplay audio (requis par les navigateurs modernes)
      iframe.setAttribute("allow", "autoplay; encrypted-media");
      iframe.allow = "autoplay";
      
      document.body.appendChild(iframe);
      return;
    }

    const r = window.RIDDLES[currentRiddle];
    await typeText(r.question, "question");
  };

  document.addEventListener("keydown", async (e) => {
    if (isTyping) return;
    if (terminalScreen.classList.contains("active") === false) return;

    if (e.key === "Enter") {
      if (userInput.trim() === "") return;
      if (window.terminalAudio) window.terminalAudio.playEnter();
      
      const cmd = userInput.trim();
      const echo = document.createElement("div");
      echo.className = "line echo";
      echo.textContent = ">_ " + cmd;
      output.appendChild(echo);
      
      userInput = "";
      inputDisplay.textContent = "";
      inputLine.classList.add("hidden");
      
      if (currentRiddle === -1) {
        // Question initiale
        const ans = cmd.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
        if (ans === "non" || ans === "no") {
          isAlone = false;
          await typeText("Sage décision de protéger ton entourage.", "system");
        } else if (ans === "oui" || ans === "yes") {
          isAlone = true;
          await typeText("Parfait. Nous n'aurons pas de témoins.", "alert");
        } else {
          if (window.terminalAudio) window.terminalAudio.playErrorGlitch();
          await typeText("Réponds par OUI ou par NON.");
          inputLine.classList.remove("hidden");
          return;
        }
        await new Promise(r => setTimeout(r, 1500));
        await typeText("Jouons à un jeu pour révéler la vérité.");
        await new Promise(r => setTimeout(r, 1500));
        currentRiddle = 0;
        askCurrentRiddle();
      } else {
        await checkAnswer(cmd);
      }
    } else if (e.key === "Backspace") {
      userInput = userInput.slice(0, -1);
      inputDisplay.textContent = userInput;
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      userInput += e.key;
      inputDisplay.textContent = userInput;
      if (window.terminalAudio) window.terminalAudio.playKeyClick();
    }
  });

  const checkAnswer = async (ans) => {
    // Normalisation : mise en minuscules et suppression des accents
    const normalized = ans.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
    const r = window.RIDDLES[currentRiddle];
    
    const correct = r.answers.some(a => {
        const normA = a.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
        return normA === normalized;
    });
    
    if (correct) {
      if (window.terminalAudio) window.terminalAudio.playSuccessArp();
      await new Promise(r => setTimeout(r, 500));
      await typeText("Exact.");
      await new Promise(r => setTimeout(r, 1000));
      currentRiddle++;
      askCurrentRiddle();
    } else {
      if (window.terminalAudio) window.terminalAudio.playErrorGlitch();
      await new Promise(r => setTimeout(r, 500));
      await typeText("Faux. Es-tu aveugle à la vérité ?");
      await new Promise(r => setTimeout(r, 1000));
      inputLine.classList.remove("hidden");
    }
  };
});
