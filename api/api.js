const express = require('express');
const db = require('../database/db');

const router = express.Router();

// GET všechny restaurace
router.get('/restaurants', (req, res) => {
  db.all('SELECT * FROM restaurants', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET jednu restauraci podle ID
router.get('/restaurants/:id', (req, res) => {
  db.get('SELECT * FROM restaurants WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Restaurace nenalezena' });
    res.json(row);
  });
});

// POST novou restauraci
router.post('/restaurants', (req, res) => {
  const { name, address } = req.body;
  db.run(
    'INSERT INTO restaurants (name, address) VALUES (?, ?)',
    [name, address],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, name, address });
    }
  );
});

// PUT aktualizace restaurace
router.put('/restaurants/:id', (req, res) => {
  const { name, address } = req.body;
  db.run(
    'UPDATE restaurants SET name = ?, address = ? WHERE id = ?',
    [name, address, req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Restaurace nenalezena' });
      res.json({ id: req.params.id, name, address });
    }
  );
});

// DELETE restaurace
router.delete('/restaurants/:id', (req, res) => {
  db.run('DELETE FROM restaurants WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Restaurace nenalezena' });
    res.json({ message: 'Restaurace smazána' });
  });
});

// GET všechny recenze
router.get('/reviews', (req, res) => {
  db.all('SELECT * FROM reviews', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET recenze pro konkrétní restauraci
router.get('/restaurants/:id/reviews', (req, res) => {
  db.all('SELECT * FROM reviews WHERE restaurant_id = ?', [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET jednu recenzi podle ID
router.get('/reviews/:id', (req, res) => {
  db.get('SELECT * FROM reviews WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Recenze nenalezena' });
    res.json(row);
  });
});

// POST novou recenzi
router.post('/reviews', (req, res) => {
  const { restaurant_id, user_name, rating, comment } = req.body;
  db.run(
    'INSERT INTO reviews (restaurant_id, user_name, rating, comment) VALUES (?, ?, ?, ?)',
    [restaurant_id, user_name, rating, comment],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, restaurant_id, user_name, rating, comment });
    }
  );
});

// PUT aktualizace recenze
router.put('/reviews/:id', (req, res) => {
  const { user_name, rating, comment } = req.body;
  db.run(
    'UPDATE reviews SET user_name = ?, rating = ?, comment = ? WHERE id = ?',
    [user_name, rating, comment, req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Recenze nenalezena' });
      res.json({ id: req.params.id, user_name, rating, comment });
    }
  );
});

// DELETE recenze
router.delete('/reviews/:id', (req, res) => {
  db.run('DELETE FROM reviews WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Recenze nenalezena' });
    res.json({ message: 'Recenze smazána' });
  });
});

module.exports = router;
