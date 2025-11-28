import { useEffect, useState } from 'react'
import { api } from '../api'
import { mockTasks } from '../mockData'

const useMock = false

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ title: '', description: '', status: 'todo', employee_id: '' })

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = useMock ? mockTasks : await api.getTasks()
        if (mounted) setTasks(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  const create = async (e) => {
    e.preventDefault()
    const payload = { ...form, employee_id: form.employee_id ? Number(form.employee_id) : null }
    if (useMock) {
      const next = { id: Date.now(), ...payload }
      setTasks([next, ...tasks])
      setForm({ title: '', description: '', status: 'todo', employee_id: '' })
      return
    }
    try {
      const created = await api.createTask(payload)
      setTasks([created, ...tasks])
      setForm({ title: '', description: '', status: 'todo', employee_id: '' })
    } catch (e) {
      setError(e.message)
    }
  }

  if (loading) return (
    <div className="container fade-up">
      <div className="card">
        <div className="skeleton line" style={{ width: '35%' }}></div>
        <div className="skeleton line" style={{ width: '60%' }}></div>
      </div>
      <div className="skeleton block"></div>
      <div className="skeleton block"></div>
      <div className="skeleton block"></div>
    </div>
  )
  return (
    <div className="container fade-up">
      <h2>Tasks</h2>
      {error && <div className="error">{error}</div>}

      <form onSubmit={create} className="card">
        <div className="row">
          <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
            <option value="todo">todo</option>
            <option value="in_progress">in_progress</option>
            <option value="done">done</option>
          </select>
          <input type="number" placeholder="Employee ID (optional)" value={form.employee_id} onChange={e => setForm({ ...form, employee_id: e.target.value })} />
          <button type="submit">Add</button>
        </div>
      </form>

      <ul className="list fade-in">
        {tasks.map(t => (
          <li key={t.id} className="list-item">
            <div>
              <strong>{t.title}</strong> <span className="badge">{t.status}</span>
              {t.description && <div className="muted">{t.description}</div>}
              {t.employee_id && <div className="muted">Employee #{t.employee_id}</div>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}