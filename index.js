require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const libroRoutes = require('./routes/routesLibri');
const userRoutes = require('./routes/routesUsers');
const Utente = require('./models/modelUser');
const Libro =require('./models/modelLibro');


const app = express();

app.use(bodyParser.json());

app.use('/libri', libroRoutes);
app.use('/utenti', userRoutes);

Libro.sync({ force: false });
Utente.sync({ force: false });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
