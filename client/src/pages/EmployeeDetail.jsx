import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../api'
import { mockEmployees, mockTasks } from '../mockData'

const useMock = false

export default function EmployeeDetail() {
  const { id } = useParams()
  const [employee, setEmployee] = useState(null)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const emp = useMock ? mockEmployees.find(e => String(e.id) === id) : await api.getEmployee(id)
        const tks = useMock ? mockTasks.filter(t => String(t.employee_id) === id) : await api.getTasks({ employee_id: id })
        if (mounted) {
          setEmployee(emp)
          setTasks(tks)
        }
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [id])

  if (loading) return (
    <div className="container fade-up">
      <div className="skeleton line" style={{ width: '30%' }}></div>
      <div className="skeleton line" style={{ width: '45%' }}></div>
      <div className="skeleton block"></div>
    </div>
  )
  if (!employee) return <p>Not found</p>
  return (
    <div className="container fade-up">
      <Link to="/employees">← Back</Link>
      <h2>{employee.name}</h2>
      <div className="muted">{employee.email} • {employee.role}</div>

      <h3 style={{ marginTop: 24 }}>Tasks</h3>
      <ul className="list fade-in">
        {tasks.map(t => (
          <li key={t.id} className="list-item">
            <div>
              <strong>{t.title}</strong> <span className="badge">{t.status}</span>
              {t.description && <div className="muted">{t.description}</div>}
            </div>
          </li>
        ))}
      </ul>
      {error && <div className="error">{error}</div>}
    </div>
  )
}