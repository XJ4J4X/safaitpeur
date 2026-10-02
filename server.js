const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Sert les fichiers statiques du dossier courant
app.use(express.static(__dirname));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`[J4X-OS] Serveur démarré sur le port ${PORT}`);
});
