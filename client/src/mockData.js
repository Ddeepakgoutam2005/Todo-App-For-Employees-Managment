export const mockEmployees = [
  { id: 1, name: 'Alice Johnson', email: 'alice@company.com', role: 'Manager', created_at: '2025-11-28' },
  { id: 2, name: 'Bob Smith', email: 'bob@company.com', role: 'Developer', created_at: '2025-11-28' },
  { id: 3, name: 'Carol Lee', email: 'carol@company.com', role: 'Designer', created_at: '2025-11-28' },
]

export const mockTasks = [
  { id: 1, title: 'Project kickoff', description: 'Initial meeting with stakeholders', status: 'todo', due_date: null, employee_id: 1 },
  { id: 2, title: 'Set up repo', description: 'Initialize monorepo and CI', status: 'in_progress', due_date: null, employee_id: 2 },
  { id: 3, title: 'Create styleguide', description: 'Define typography and colors', status: 'todo', due_date: null, employee_id: 3 },
]