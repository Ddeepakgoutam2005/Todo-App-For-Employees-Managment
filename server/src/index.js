const express = require('express');
const cors = require('cors');
const db = require('./db');

const employeesRouter = require('./routes/employees');
const tasksRouter = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(express.json());

// seed minimal data if tables are empty
db.get('SELECT COUNT(*) as count FROM employees', [], (err, row) => {
  if (!err && row && row.count === 0) {
    const employees = [
      ['Alice Johnson', 'alice@company.com', 'Manager'],
      ['Bob Smith', 'bob@company.com', 'Developer'],
      ['Carol Lee', 'carol@company.com', 'Designer']
    ];
    const stmt = db.prepare('INSERT INTO employees (name, email, role) VALUES (?,?,?)');
    employees.forEach(e => stmt.run(e));
    stmt.finalize();
  }
});

db.get('SELECT COUNT(*) as count FROM tasks', [], (err, row) => {
  if (!err && row && row.count === 0) {
    const tasks = [
      ['Project kickoff', 'Initial meeting with stakeholders', 'todo', null, 1],
      ['Set up repo', 'Initialize monorepo and CI', 'in_progress', null, 2],
      ['Create styleguide', 'Define typography and colors', 'todo', null, 3]
    ];
    const stmt = db.prepare('INSERT INTO tasks (title, description, status, due_date, employee_id) VALUES (?,?,?,?,?)');
    tasks.forEach(t => stmt.run(t));
    stmt.finalize();
  }
});

app.use('/api/employees', employeesRouter);
app.use('/api/tasks', tasksRouter);

app.get('/api/health', (req, res) => {
  db.get('SELECT 1 as ok', [], (err, row) => {
    if (err) return res.status(500).json({ status: 'error', error: err.message });
    res.json({ status: 'ok' });
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});