# 🎃 DHARMA INITIATIVE // STATION 13 : LE SPECTRE (MANOIR BLACKWOOD)

> **Terminal Cathodique Vert CRT & Jeu d'Énigmes Immersif**
> Mixant l'univers mystérieux de **LOST (Initiative DHARMA)** et le thème d'**Halloween, des fantômes et du manoir hanté**.

Développé sur le moteur **J4X OS** (style écran vert cathodique rétro des années 70-80, inspiré du terminal de la station *Le Cygne* de Lost et de *Rata Alada*).

---

## 🧭 Le Lore (L'Histoire)

Fondée en 1974 par la Fondation Hanso et Gerald & Karen DeGroot, la **Station 13 : Le Spectre** a été dissimulée dans les catacombes sous le vieux Manoir victorien de Blackwood.

L'objectif de cette station secrète : surveiller et contenir une gigantesque poche d'énergie électromagnétique qui entre en résonance avec l'au-delà lors de la fête celtique de **Samhain** (Halloween, la nuit du 31 octobre).

Pour empêcher l'invasion des spectres et la surcharge électromagnétique, l'opérateur doit déverrouiller la console cathodique, décoder les transmissions des esprits en **Code OTAN** et en **Code Morse**, et saisir les protocoles sacrés de l'Initiative DHARMA avant la fin du cycle de **108 minutes** !

---

## 🌟 Fonctionnalités

- 🟢 **Design Rétro Vert CRT Phosphore** : Balayage cathodique (*scanlines*), léger scintillement (*flicker*), lueur verte phosphorescente, police Courier rétro et logo ASCII art de la station.
- ⏱️ **Compteur DHARMA Actif (108:00)** : Le fameux chronomètre de la station Le Cygne de LOST décompte en temps réel avec alarme sonore à l'approche de zéro.
- 📻 **Générateur Sonore Procédural (Web Audio API)** :
  - Vrais bips télégraphiques en **Code Morse** à 750 Hz (aucune ressource MP3 externe nécessaire).
  - Alarme à deux tons de la station du Cygne de LOST.
  - Chuchotements spectraux et grondements de tonnerre au-dessus du manoir.
  - Frappes mécaniques de touches de clavier CRT et bruits de relais électrique.
- 🧩 **10 Énigmes Progresses & Variées** :
  - **Code OTAN** (Alphabet phonétique aéronautique : *Sierra, Hotel, Alpha...*)
  - **Code Morse** (Signaux visuels et auditifs à décoder : *... --- ...*)
  - **Lore de LOST & DHARMA** (Suite des nombres `4 8 15 16 23 42`, cycle de `108` minutes, Station 3 `Le Cygne`, formule sacrée `Namaste`).
  - **Thème Halloween & Manoir Hanté** (Samhain, Poltergeists, citrouilles de Stingy Jack, ectoplasme).
- 🛠️ **Boîte à outils dans le Terminal** : Commandes intégrées pour afficher les tables de décodage OTAN et Morse à tout moment !
- 📱 **Compatible Mobile & Desktop** : Fonctionne au clavier physique ainsi que sur smartphones et tablettes.

---

## 🚀 Comment Lancer le Projet

### Option 1 : Directement dans votre navigateur
Double-cliquez simplement sur le fichier **[`index.html`](file:///c:/Users/henno/Documents/antigravity/optimistic-lovelace/index.html)** dans votre explorateur de fichiers.

### Option 2 : Via Python
Ouvrez votre console dans le dossier du projet :
```bash
python -m http.server 3000
```
Puis accédez à [http://localhost:3000](http://localhost:3000).

### Option 3 : Via Node.js (Express)
```bash
npm install
npm start
```
Puis rendez-vous sur [http://localhost:3000](http://localhost:3000).

---

## 🕹️ Commandes Disponibles dans le Terminal

Vous pouvez taper ces commandes à n'importe quel moment dans l'invite `>_ ` :

| Commande | Action |
|---|---|
| `aide` ou `help` | Affiche la liste des commandes utiles. |
| `indice` ou `hint` | Fournit un indice pour l'énigme en cours. |
| `otan` ou `nato` | Affiche la table complète de l'alphabet radio OTAN. |
| `morse` | Affiche l'abécédaire du code Morse (. et -). |
| `bip` ou `play` | Joue ou réécoute le signal audio Morse de l'énigme active. |
| `dharma` ou `lost` | Affiche le logo ASCII et le manifeste de la Station 13. |
| `manoir` ou `carte` | Affiche le plan des ailes hantées du Manoir Blackwood. |
| `compteur` | Affiche le temps restant sur le cycle 108:00. |
| `statut` | Affiche votre pourcentage de confinement du manoir. |
| `son` | Active ou coupe les effets sonores. |
| `clear` | Nettoie l'écran du terminal. |
| `reset` | Recommence l'aventure à la première énigme. |

---

## 📜 Solutions des 10 Énigmes (Guide du Maître du Jeu)

<details>
<summary><strong>Cliquez ici pour dérouler les solutions complètes</strong></summary>

1. **Stage 01 (Suite DHARMA de Lost)** : `4 8 15 16 23 42`
2. **Stage 02 (Code OTAN - Hall)** : `SHADOW` (ou `ombre`)
3. **Stage 03 (Code Morse - Archives)** : `SAMHAIN`
4. **Stage 04 (Compte à rebours)** : `108` (ou `108 minutes`)
5. **Stage 05 (Code OTAN - Salle de bal)** : `POLTERGEIST` (ou `esprit frappeur`)
6. **Stage 06 (Code Morse - Cave)** : `GHOST` (ou `fantome`, `spectre`)
7. **Stage 07 (Halloween - Cheminée)** : `CITROUILLE` ou `JACK O LANTERN`
8. **Stage 08 (Station Jumelle de Lost)** : `LE CYGNE` ou `THE SWAN`
9. **Stage 09 (Hybride OTAN + Morse)** : `BOO RIP`
10. **Stage 10 (Confinement Final)** : `NAMASTE` ou `EXECUTE`

</details>

---

## 📁 Structure des Fichiers

- [`index.html`](file:///c:/Users/henno/Documents/antigravity/optimistic-lovelace/index.html) : Structure du terminal CRT, HUD DHARMA, écran d'accueil et raccourcis.
- [`style.css`](file:///c:/Users/henno/Documents/antigravity/optimistic-lovelace/style.css) : Styles cathodiques vert phosphoreux, scanlines, animations d'alerte et glitches.
- [`audio.js`](file:///c:/Users/henno/Documents/antigravity/optimistic-lovelace/audio.js) : Moteur Web Audio procédural (Morse CW beeps, alarme DHARMA, chuchotements, tonnerre, relais).
- [`riddles.js`](file:///c:/Users/henno/Documents/antigravity/optimistic-lovelace/riddles.js) : Les 10 énigmes scénarisées, indices, signaux audio et tables OTAN/Morse.
- [`terminal.js`](file:///c:/Users/henno/Documents/antigravity/optimistic-lovelace/terminal.js) : Interpréteur de commandes, gestion du temps 108:00, vérification des réponses et climax.
- [`server.js`](file:///c:/Users/henno/Documents/antigravity/optimistic-lovelace/server.js) : Serveur Express optionnel.

---

*Namaste, et bonne chance dans le Manoir...* 🎃
