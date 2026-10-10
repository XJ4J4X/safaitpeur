// =============================================================================
// Moteur audio procédural Web Audio API pour le terminal rétro
// Thème: DHARMA Initiative x Manoir d'Animato (Viewers Fantômes)
// =============================================================================

class AudioTerminal {
  constructor() {
    this.contexte = null;
    this.actif = true;
    this.ambianceActive = false;
    this.noeudAmbiance = null;
    this.gainAmbiance = null;
  }

  initialiser() {
    if (!this.contexte) {
      const ContexteAudio = window.AudioContext || window.webkitAudioContext;
      if (ContexteAudio) {
        this.contexte = new ContexteAudio();
      }
    }
    if (this.contexte && this.contexte.state === "suspended") {
      this.contexte.resume();
    }
  }

  basculerSon() {
    this.actif = !this.actif;
    if (!this.actif && this.noeudAmbiance) {
      this.arreterBruitDeFond();
    } else if (this.actif && this.ambianceActive) {
      this.demarrerBruitDeFond();
    }
    return this.actif;
  }

  // 1. Bruit mécanique d'allumage
  jouerBruitAllumage() {
    if (!this.actif) return;
    this.initialiser();
    if (!this.contexte) return;

    const t = this.contexte.currentTime;

    const osc = this.contexte.createOscillator();
    const gain = this.contexte.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.08);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(gain);
    gain.connect(this.contexte.destination);
    osc.start(t);
    osc.stop(t + 0.08);

    const claquement = this.contexte.createOscillator();
    const gainClaquement = this.contexte.createGain();
    claquement.type = "triangle";
    claquement.frequency.setValueAtTime(1600, t);
    claquement.frequency.exponentialRampToValueAtTime(200, t + 0.03);

    gainClaquement.gain.setValueAtTime(0.18, t);
    gainClaquement.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

    claquement.connect(gainClaquement);
    gainClaquement.connect(this.contexte.destination);
    claquement.start(t);
    claquement.stop(t + 0.03);
  }

  // 2. Sifflement haute tension du tube cathodique
  jouerAlimentationCathodique() {
    if (!this.actif) return;
    this.initialiser();
    if (!this.contexte) return;

    const t = this.contexte.currentTime;

    const sifflement = this.contexte.createOscillator();
    const gainSifflement = this.contexte.createGain();
    sifflement.type = "sine";
    sifflement.frequency.setValueAtTime(15600, t);
    sifflement.frequency.exponentialRampToValueAtTime(12000, t + 0.7);

    gainSifflement.gain.setValueAtTime(0.001, t);
    gainSifflement.gain.exponentialRampToValueAtTime(0.06, t + 0.15);
    gainSifflement.gain.exponentialRampToValueAtTime(0.002, t + 0.8);

    sifflement.connect(gainSifflement);
    gainSifflement.connect(this.contexte.destination);
    sifflement.start(t);
    sifflement.stop(t + 0.85);

    const bourdonnement = this.contexte.createOscillator();
    const gainBourdonnement = this.contexte.createGain();
    bourdonnement.type = "sawtooth";
    bourdonnement.frequency.setValueAtTime(50, t);
    bourdonnement.frequency.linearRampToValueAtTime(80, t + 0.4);
    bourdonnement.frequency.exponentialRampToValueAtTime(50, t + 0.9);

    gainBourdonnement.gain.setValueAtTime(0.001, t);
    gainBourdonnement.gain.linearRampToValueAtTime(0.08, t + 0.3);
    gainBourdonnement.gain.exponentialRampToValueAtTime(0.001, t + 0.9);

    bourdonnement.connect(gainBourdonnement);
    gainBourdonnement.connect(this.contexte.destination);
    bourdonnement.start(t);
    bourdonnement.stop(t + 0.95);
  }

  // 3. Bourdonnement électrique ambiant 50Hz
  demarrerBruitDeFond() {
    if (!this.actif || this.noeudAmbiance) return;
    this.initialiser();
    if (!this.contexte) return;

    this.ambianceActive = true;
    const t = this.contexte.currentTime;

    const osc = this.contexte.createOscillator();
    const filtre = this.contexte.createBiquadFilter();
    const gain = this.contexte.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(55, t);

    filtre.type = "lowpass";
    filtre.frequency.setValueAtTime(160, t);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.015, t + 2);

    osc.connect(filtre);
    filtre.connect(gain);
    gain.connect(this.contexte.destination);

    osc.start(t);
    this.noeudAmbiance = osc;
    this.gainAmbiance = gain;
  }

  arreterBruitDeFond() {
    if (this.gainAmbiance && this.contexte) {
      try {
        const t = this.contexte.currentTime;
        this.gainAmbiance.gain.linearRampToValueAtTime(0.001, t + 0.5);
        setTimeout(() => {
          if (this.noeudAmbiance) {
            this.noeudAmbiance.stop();
            this.noeudAmbiance.disconnect();
            this.noeudAmbiance = null;
            this.gainAmbiance = null;
          }
        }, 500);
      } catch (e) {}
    }
  }

  // 4. Clic du clavier mécanique
  jouerClicTouche(estEspace = false) {
    if (!this.actif) return;
    this.initialiser();
    if (!this.contexte) return;

    const t = this.contexte.currentTime;

    const clic = this.contexte.createOscillator();
    const gainClic = this.contexte.createGain();
    clic.type = "triangle";
    
    const frequenceBase = estEspace ? 320 : 650 + (Math.random() * 300 - 150);
    clic.frequency.setValueAtTime(frequenceBase, t);
    clic.frequency.exponentialRampToValueAtTime(120, t + 0.025);

    gainClic.gain.setValueAtTime(estEspace ? 0.09 : 0.06, t);
    gainClic.gain.exponentialRampToValueAtTime(0.001, t + 0.025);

    clic.connect(gainClic);
    gainClic.connect(this.contexte.destination);
    clic.start(t);
    clic.stop(t + 0.025);

    const choc = this.contexte.createOscillator();
    const gainChoc = this.contexte.createGain();
    choc.type = "sine";
    choc.frequency.setValueAtTime(estEspace ? 110 : 210 + Math.random() * 40, t);
    choc.frequency.exponentialRampToValueAtTime(40, t + 0.04);

    gainChoc.gain.setValueAtTime(0.04, t);
    gainChoc.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    choc.connect(gainChoc);
    gainChoc.connect(this.contexte.destination);
    choc.start(t);
    choc.stop(t + 0.04);
  }

  // 5. Gazouillis de transfert de données
  jouerBruitDonnees() {
    if (!this.actif) return;
    this.initialiser();
    if (!this.contexte) return;

    const t = this.contexte.currentTime;
    const osc = this.contexte.createOscillator();
    const gain = this.contexte.createGain();

    osc.type = "sine";
    const frequences = [1800, 2100, 2400, 2700, 1500];
    const frequence = frequences[Math.floor(Math.random() * frequences.length)];
    osc.frequency.setValueAtTime(frequence, t);

    gain.gain.setValueAtTime(0.02, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);

    osc.connect(gain);
    gain.connect(this.contexte.destination);
    osc.start(t);
    osc.stop(t + 0.02);
  }

  // 6. Bip de validation (Entrée)
  jouerBipValidation() {
    if (!this.actif) return;
    this.initialiser();
    if (!this.contexte) return;

    const t = this.contexte.currentTime;
    const osc = this.contexte.createOscillator();
    const gain = this.contexte.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(880, t);
    osc.frequency.exponentialRampToValueAtTime(440, t + 0.08);

    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(gain);
    gain.connect(this.contexte.destination);
    osc.start(t);
    osc.stop(t + 0.08);
  }

  // 7. Erreur dramatique / Glitch
  jouerErreurGlitch() {
    if (!this.actif) return;
    this.initialiser();
    if (!this.contexte) return;

    const t = this.contexte.currentTime;

    const grave = this.contexte.createOscillator();
    const gainGrave = this.contexte.createGain();
    grave.type = "sawtooth";
    grave.frequency.setValueAtTime(120, t);
    grave.frequency.exponentialRampToValueAtTime(35, t + 0.35);

    gainGrave.gain.setValueAtTime(0.2, t);
    gainGrave.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    grave.connect(gainGrave);
    gainGrave.connect(this.contexte.destination);
    grave.start(t);
    grave.stop(t + 0.35);

    const bourdonnement = this.contexte.createOscillator();
    const gainBourdon = this.contexte.createGain();
    bourdonnement.type = "sawtooth";
    bourdonnement.frequency.setValueAtTime(95, t);
    bourdonnement.frequency.setValueAtTime(80, t + 0.12);

    gainBourdon.gain.setValueAtTime(0.15, t);
    gainBourdon.gain.exponentialRampToValueAtTime(0.01, t + 0.28);

    bourdonnement.connect(gainBourdon);
    gainBourdon.connect(this.contexte.destination);
    bourdonnement.start(t);
    bourdonnement.stop(t + 0.3);

    try {
      const tailleBuffer = this.contexte.sampleRate * 0.18;
      const buffer = this.contexte.createBuffer(1, tailleBuffer, this.contexte.sampleRate);
      const donnees = buffer.getChannelData(0);
      for (let i = 0; i < tailleBuffer; i++) {
        donnees[i] = Math.random() * 2 - 1;
      }

      const bruitBlanc = this.contexte.createBufferSource();
      bruitBlanc.buffer = buffer;

      const filtre = this.contexte.createBiquadFilter();
      filtre.type = "bandpass";
      filtre.frequency.setValueAtTime(1000, t);
      filtre.Q.setValueAtTime(2, t);

      const gainBruit = this.contexte.createGain();
      gainBruit.gain.setValueAtTime(0.09, t);
      gainBruit.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

      bruitBlanc.connect(filtre);
      filtre.connect(gainBruit);
      gainBruit.connect(this.contexte.destination);

      bruitBlanc.start(t);
      bruitBlanc.stop(t + 0.18);
    } catch (e) {}
  }

  // 8. Son de victoire mystérieux
  jouerSonVictoire() {
    if (!this.actif) return;
    this.initialiser();
    if (!this.contexte) return;

    const t = this.contexte.currentTime;
    const notes = [293.66, 369.99, 440.00, 587.33, 659.25, 880.00];

    notes.forEach((frequence, index) => {
      const tempsNote = t + index * 0.08;
      const osc = this.contexte.createOscillator();
      const gain = this.contexte.createGain();

      osc.type = index % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(frequence, tempsNote);

      gain.gain.setValueAtTime(0.001, tempsNote);
      gain.gain.linearRampToValueAtTime(0.12, tempsNote + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, tempsNote + 0.45);

      osc.connect(gain);
      gain.connect(this.contexte.destination);

      osc.start(tempsNote);
      osc.stop(tempsNote + 0.5);
    });

    const grave = this.contexte.createOscillator();
    const gainGrave = this.contexte.createGain();
    grave.type = "sine";
    grave.frequency.setValueAtTime(73.42, t);
    grave.frequency.linearRampToValueAtTime(146.83, t + 0.5);

    gainGrave.gain.setValueAtTime(0.001, t);
    gainGrave.gain.linearRampToValueAtTime(0.1, t + 0.15);
    gainGrave.gain.exponentialRampToValueAtTime(0.001, t + 0.7);

    grave.connect(gainGrave);
    gainGrave.connect(this.contexte.destination);
    grave.start(t);
    grave.stop(t + 0.7);
  }

  // 9. Rire démoniaque
  jouerRireDiabolique() {
    if (!this.actif) return;
    this.initialiser();
    if (!this.contexte) return;

    const t = this.contexte.currentTime;
    for (let i = 0; i < 7; i++) {
      const osc = this.contexte.createOscillator();
      const gain = this.contexte.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(180 - (i * 12), t + i * 0.15); 
      osc.frequency.exponentialRampToValueAtTime(60, t + i * 0.15 + 0.1);
      
      gain.gain.setValueAtTime(0.25, t + i * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.01, t + i * 0.15 + 0.1);
      
      osc.connect(gain); 
      gain.connect(this.contexte.destination);
      osc.start(t + i * 0.15); 
      osc.stop(t + i * 0.15 + 0.1);
    }
  }

  // 10. Générateur de Morse (Bips CW à 750 Hz)
  jouerMorse(morseStr, aLaFin = null) {
    if (!this.actif) {
      if (aLaFin) aLaFin();
      return;
    }
    this.initialiser();
    if (!this.contexte) {
      if (aLaFin) aLaFin();
      return;
    }

    const dureePoint = 0.08; 
    const dureeTrait = dureePoint * 3; 
    const pauseEntreSymboles = dureePoint;
    const pauseEntreLettres = dureePoint * 3;
    const pauseEntreMots = dureePoint * 7;
    const frequence = 750;

    let temps = this.contexte.currentTime + 0.05;

    const mots = morseStr.trim().split(/\s+/);
    mots.forEach((groupe) => {
      for (let i = 0; i < groupe.length; i++) {
        const symbole = groupe[i];
        if (symbole === '.' || symbole === '-') {
          const duree = symbole === '-' ? dureeTrait : dureePoint;

          const osc = this.contexte.createOscillator();
          const gain = this.contexte.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(frequence, temps);

          gain.gain.setValueAtTime(0.001, temps);
          gain.gain.linearRampToValueAtTime(0.12, temps + 0.006);
          gain.gain.setValueAtTime(0.12, temps + duree - 0.006);
          gain.gain.linearRampToValueAtTime(0.001, temps + duree);

          osc.connect(gain);
          gain.connect(this.contexte.destination);

          osc.start(temps);
          osc.stop(temps + duree + 0.01);

          temps += duree + pauseEntreSymboles;
        } else if (symbole === '/') {
          temps += pauseEntreMots;
        }
      }
      temps += pauseEntreLettres;
    });

    if (aLaFin) {
      const delaiMs = Math.max(100, (temps - this.contexte.currentTime) * 1000);
      setTimeout(aLaFin, delaiMs);
    }
  }

  // 11. Alarme DHARMA (Station Le Cygne)
  jouerAlarmeDharma() {
    if (!this.actif) return;
    this.initialiser();
    if (!this.contexte) return;

    const t = this.contexte.currentTime;
    const tonalites = [
      { f: 440, dur: 0.28 },
      { f: 587, dur: 0.35 }
    ];

    let tempsTon = t;
    tonalites.forEach((ton) => {
      const osc = this.contexte.createOscillator();
      const gain = this.contexte.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(ton.f, tempsTon);

      gain.gain.setValueAtTime(0.001, tempsTon);
      gain.gain.linearRampToValueAtTime(0.2, tempsTon + 0.02);
      gain.gain.setValueAtTime(0.2, tempsTon + ton.dur - 0.03);
      gain.gain.linearRampToValueAtTime(0.001, tempsTon + ton.dur);

      osc.connect(gain);
      gain.connect(this.contexte.destination);

      osc.start(tempsTon);
      osc.stop(tempsTon + ton.dur + 0.02);

      tempsTon += ton.dur + 0.05;
    });
  }

  // 12. Murmure fantomatique / Balayage d'ectoplasme
  jouerMurmureFantome() {
    if (!this.actif) return;
    this.initialiser();
    if (!this.contexte) return;

    const t = this.contexte.currentTime;
    const osc = this.contexte.createOscillator();
    const lfo = this.contexte.createOscillator();
    const gainLfo = this.contexte.createGain();
    const filtre = this.contexte.createBiquadFilter();
    const gain = this.contexte.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.linearRampToValueAtTime(540, t + 0.8);
    osc.frequency.exponentialRampToValueAtTime(260, t + 1.8);

    lfo.type = "sine";
    lfo.frequency.setValueAtTime(5.5, t);
    gainLfo.gain.setValueAtTime(40, t);
    lfo.connect(osc.frequency);

    filtre.type = "bandpass";
    filtre.frequency.setValueAtTime(450, t);
    filtre.Q.setValueAtTime(3, t);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.08, t + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.8);

    osc.connect(filtre);
    filtre.connect(gain);
    gain.connect(this.contexte.destination);

    lfo.start(t);
    osc.start(t);
    lfo.stop(t + 1.85);
    osc.stop(t + 1.85);
  }

  // 13. Tonnerre lointain
  jouerTonnerre() {
    if (!this.actif) return;
    this.initialiser();
    if (!this.contexte) return;

    const t = this.contexte.currentTime;
    try {
      const tailleBuffer = this.contexte.sampleRate * 1.5;
      const buffer = this.contexte.createBuffer(1, tailleBuffer, this.contexte.sampleRate);
      const donnees = buffer.getChannelData(0);
      for (let i = 0; i < tailleBuffer; i++) {
        donnees[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.contexte.sampleRate * 0.5));
      }

      const bruit = this.contexte.createBufferSource();
      bruit.buffer = buffer;

      const filtre = this.contexte.createBiquadFilter();
      filtre.type = "lowpass";
      filtre.frequency.setValueAtTime(140, t);
      filtre.frequency.exponentialRampToValueAtTime(50, t + 1.4);

      const gain = this.contexte.createGain();
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.5);

      bruit.connect(filtre);
      filtre.connect(gain);
      gain.connect(this.contexte.destination);

      bruit.start(t);
      bruit.stop(t + 1.5);
    } catch (e) {}
  }
}

window.audioTerminal = new AudioTerminal();
