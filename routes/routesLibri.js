const express = require('express');
const router = express.Router();
const Libro = require('../models/modelLibro');

// Crea un nuovo libro
router.post('/', async (req, res) => {
  try {
    const libro = req.body;
    const result = await Libro.create({
      titolo: libro.name,
      autore: libro.author.name,
      anno_pubblicazione: libro.dateModified,
      isbn: libro.isbn,
      url: libro.url,
      lingua: libro.inLanguage,
      formato: libro.bookFormat,
      data_modifica: libro.dateModified
    });
    console.log('Libro inserito correttamente nel database.');
    res.status(201).json({ message: 'Libro inserito correttamente nel database' });
  } catch (error) {
    console.error('Errore durante l\'inserimento del libro:', error);
    res.status(500).json({ error: 'Errore durante l\'inserimento del libro' });
  }
});

// Get tutti i libri
router.get('/', async (req, res) => {
  try {
    const libri = await Libro.findAll();
    res.json(libri);
  } catch (error) {
    console.error('Errore durante il recupero dei libri:', error);
    res.status(500).json({ error: 'Errore durante il recupero dei libri' });
  }
});

// Get un singolo libro
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const libro = await Libro.findByPk(id);
    if (!libro) {
      res.status(404).json({ message: 'Libro non trovato' });
    } else {
      res.json(libro);
    }
  } catch (error) {
    console.error('Errore durante il recupero del libro:', error);
    res.status(500).json({ error: 'Errore durante il recupero del libro' });
  }
});

// Aggiorna un libro
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const libro = await Libro.findByPk(id);
    if (!libro) {
      res.status(404).json({ message: 'Libro non trovato' });
    } else {
      const updatedLibro = req.body;
      await libro.update(updatedLibro);
      res.json({ message: 'Libro aggiornato correttamente' });
    }
  } catch (error) {
    console.error('Errore durante l\'aggiornamento del libro:', error);
    res.status(500).json({ error: 'Errore durante l\'aggiornamento del libro' });
  }
});

// Elimina un libro
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const libro = await Libro.findByPk(id);
    if (!libro) {
      res.status(404).json({ message: 'Libro non trovato' });
    } else {
      await libro.destroy();
      res.json({ message: 'Libro eliminato correttamente' });
    }
  } catch (error) {
    console.error('Errore durante l\'eliminazione del libro:', error);
    res.status(500).json({ error: 'Errore durante l\'eliminazione del libro' });
  }
});

module.exports = router;
