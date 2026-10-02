# 🦇 Rata Alada - Terminal d'Énigmes (The Batman 2022)

Un site internet interactif reproduisant fidèlement le terminal CRT vert du film *The Batman* (2022) et du site culte **rataalada.com** du Sphinx (The Riddler).

Ce projet a été conçu pour héberger une **grande énigme interactive** (ARG, escape game en ligne, jeu de piste ou chasse au trésor).

---

## ✨ Fonctionnalités

- 🟢 **Design Rétro CRT Cathodique** : Balayage (scanlines), lueur au phosphore vert, scintillement, grain et distorsion visuelle subtile.
- ⌨️ **Invite de commande interactive** : Saisie fluide, curseur clignotant, navigation dans l'historique avec les flèches (Haut / Bas).
- 🔊 **Générateur de sons rétro (Web Audio API)** : Bruits mécaniques de touches de clavier, bips de validation, alarme d'erreur et arpèges de déverrouillage de fichiers (sans aucun fichier MP3 externe à charger !).
- 🧩 **Moteur d'énigmes modulaire** : Prise en charge des accents, de la ponctuation, de la casse et des synonymes.
- 💾 **Sauvegarde automatique (`localStorage`)** : Les joueurs peuvent actualiser la page ou revenir plus tard sans perdre leur progression.
- 🕵️‍♂️ **Easter Eggs & Commandes Secrètes** : Mots clés cachés (`batman`, `whoami`, `falcone`, `arkham`, etc.) et commande secrète `matrix` pour afficher la pluie de code numérique !

---

## 🚀 Comment le lancer

Aucune installation ni dépendance requise :

### Option 1 : Directement dans le navigateur
Double-cliquez simplement sur le fichier `index.html` pour l'ouvrir dans Chrome, Firefox, Safari ou Edge.

### Option 2 : Via un mini-serveur local Python
Dans votre terminal :
```bash
cd /Users/aurelien/Documents/Code/test
python3 -m http.server 8000
```
Puis ouvrez votre navigateur sur [http://localhost:8000](http://localhost:8000).

---

## 🛠️ Comment personnaliser vos propres énigmes

Toutes les énigmes se trouvent dans le fichier **[`riddles.js`](file:///Users/aurelien/Documents/Code/test/riddles.js)**.

Pour modifier ou ajouter une énigme, éditez simplement le tableau `riddles` :

```javascript
{
  id: 1,
  title: "STAGE 01 - LE TITRE DE VOTRE ÉNIGME",
  question: "Votre texte d'énigme ici...",
  answers: [
    "bonne réponse", "synonyme", "autre formulation"
  ],
  hints: [
    "Indice 1...",
    "Indice 2..."
  ],
  reward: "Texte ou fichier secret révélé quand le joueur trouve la réponse !"
}
```

> **Astuce :** Vous pouvez ajouter autant d'énigmes que vous le souhaitez dans l'ordre de votre choix !

---

## 🎮 Commandes disponibles dans le terminal

- `aide` / `help` : Affiche l'aide et les commandes.
- `enigme` : Réaffiche la question en cours.
- `indice` / `hint` : Donne un indice sur l'énigme active.
- `statut` : Affiche le pourcentage de complétion.
- `clear` : Nettoie l'écran du terminal.
- `matrix` : Active ou coupe la pluie de code Matrix.
- `son` / `audio` : Coupe ou réactive les effets sonores.
- `reset` : Réinitialise l'enquête et recommence au premier stage.

---

## 🌐 Hébergement en ligne gratuit

Vous pouvez mettre ce site en ligne en quelques clics :
- **GitHub Pages** : Déposez les fichiers sur un dépôt GitHub et activez Pages dans les paramètres.
- **Vercel** ou **Netlify** : Glissez-déposez le dossier du projet pour obtenir une URL instantanée (ex: `mon-enigme.vercel.app`).
