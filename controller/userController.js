const Utente = require('../models/modelUser');

// FUNZIONI API
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

const postById = async (req, res) => {
  try {
    const nuovoUtente = await Utente.create(req.body);
    res.status(201).json(nuovoUtente);
  } catch (error) {
    res.status(500).json({ error: 'Errore durante l\'inserimento dell\'utente' });
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
  postById,
  updateById,
  deleteById,
};
