const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes'); // Importe les routes depuis le dossier routes

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

// Serveur
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
