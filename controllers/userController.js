const Utente = require('../models/modelUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// FUNZIONI API

async function register(req, res) {
  try {
    const { nome, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Utente.create({ nome, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Errore durante la registrazione' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await Utente.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ message: 'Utente non trovato' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Password errata' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Errore durante il login' });
  }
}

async function verifyToken(req, res, next) {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ message: 'Accesso negato' });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({ message: 'Token non valido' });
  }
}


const findAll = async (req, res) => {
  try {
    const utenti = await Utente.findAll();
    res.status(200).json(utenti);
  } catch (error) {
    res.status(500).json({ error: 'Errore durante il recupero degli utenti' });
  }
};

const findById = async (req, res) => {
  try {
    const idUtente = req.params.id;
    const utente = await Utente.findByPk(idUtente);
    if (utente) {
      res.status(200).json(utente);
    } else {
      res.status(404).json({ error: 'Utente non trovato' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Errore durante il recupero dell\'utente' });
  }
};

const updateById = async (req, res) => {
  try {
    const idUtente = req.params.id;
    const [aggiornato] = await Utente.update(req.body, {
      where: { id: idUtente }
    });
    if (aggiornato) {
      const utenteAggiornato = await Utente.findByPk(idUtente);
      res.status(200).json(utenteAggiornato);
    } else {
      res.status(404).json({ error: 'Utente non trovato' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Errore durante l\'aggiornamento dell\'utente' });
  }
};

const deleteById = async (req, res) => {
  try {
    const idUtente = req.params.id;
    const cancellato = await Utente.destroy({
      where: { id: idUtente }
    });
    if (cancellato) {
      res.status(200).json({ message: 'Utente cancellato correttamente' });
    } else {
      res.status(404).json({ error: 'Utente non trovato' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Errore durante la cancellazione dell\'utente' });
  }
};

module.exports = {
  findAll,
  findById,
  updateById,
  deleteById,
  register,
  login,
  verifyToken
};
