const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  db.all('SELECT * FROM employees ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM employees WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Employee not found' });
    res.json(row);
  });
});

router.post('/', (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email || !role) return res.status(400).json({ error: 'name, email, role required' });
  const stmt = db.prepare('INSERT INTO employees (name, email, role) VALUES (?,?,?)');
  stmt.run([name, email, role], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT * FROM employees WHERE id = ?', [this.lastID], (err2, row) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.status(201).json(row);
    });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  db.run('UPDATE employees SET name = ?, email = ?, role = ? WHERE id = ?', [name, email, role, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Employee not found' });
    db.get('SELECT * FROM employees WHERE id = ?', [id], (err2, row) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json(row);
    });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM employees WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Employee not found' });
    res.status(204).send();
  });
});

router.get('/:id/tasks', (req, res) => {
  const { id } = req.params;
  db.all('SELECT * FROM tasks WHERE employee_id = ? ORDER BY due_date', [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;