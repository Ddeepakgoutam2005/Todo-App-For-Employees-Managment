const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  const { status, employee_id } = req.query;
  const clauses = [];
  const params = [];
  if (status) { clauses.push('status = ?'); params.push(status); }
  if (employee_id) { clauses.push('employee_id = ?'); params.push(employee_id); }
  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  db.all(`SELECT * FROM tasks ${where} ORDER BY due_date`, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Task not found' });
    res.json(row);
  });
});

router.post('/', (req, res) => {
  const { title, description, status, due_date, employee_id } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });
  const stmt = db.prepare('INSERT INTO tasks (title, description, status, due_date, employee_id) VALUES (?,?,?,?,?)');
  stmt.run([title, description || null, status || 'todo', due_date || null, employee_id || null], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT * FROM tasks WHERE id = ?', [this.lastID], (err2, row) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.status(201).json(row);
    });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, status, due_date, employee_id } = req.body;
  db.run('UPDATE tasks SET title = ?, description = ?, status = ?, due_date = ?, employee_id = ? WHERE id = ?',
    [title, description, status, due_date, employee_id, id], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Task not found' });
      db.get('SELECT * FROM tasks WHERE id = ?', [id], (err2, row) => {
        if (err2) return res.status(500).json({ error: err2.message });
        res.json(row);
      });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Task not found' });
    res.status(204).send();
  });
});

module.exports = router;