import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { mockEmployees } from '../mockData'

const useMock = false

export default function Employees() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', role: '' })

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = useMock ? mockEmployees : await api.getEmployees()
        if (mounted) setEmployees(data)
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
    if (useMock) {
      const next = { id: Date.now(), ...form, created_at: new Date().toISOString() }
      setEmployees([next, ...employees])
      setForm({ name: '', email: '', role: '' })
      return
    }
    try {
      const created = await api.createEmployee(form)
      setEmployees([created, ...employees])
      setForm({ name: '', email: '', role: '' })
    } catch (e) {
      setError(e.message)
    }
  }

  if (loading) return (
    <div className="container fade-up">
      <div className="card">
        <div className="skeleton line" style={{ width: '40%' }}></div>
        <div className="skeleton line" style={{ width: '70%' }}></div>
        <div className="skeleton block"></div>
        <div className="skeleton line" style={{ width: '30%' }}></div>
      </div>
      <div className="skeleton block"></div>
      <div className="skeleton block"></div>
      <div className="skeleton block"></div>
    </div>
  )
  return (
    <div className="container fade-up">
      <h2>Employees</h2>
      {error && <div className="error">{error}</div>}

      <form onSubmit={create} className="card">
        <div className="row">
          <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <input placeholder="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
          <button type="submit">Add</button>
        </div>
      </form>

      <ul className="list fade-in">
        {employees.map(e => (
          <li key={e.id} className="list-item">
            <div>
              <strong>{e.name}</strong> <span className="muted">({e.role})</span>
              <div className="muted">{e.email}</div>
            </div>
            <div className="actions">
              <Link to={`/employees/${e.id}`}>View</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}