import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Employees from './pages/Employees'
import EmployeeDetail from './pages/EmployeeDetail'
import Tasks from './pages/Tasks'
import Landing from './pages/Landing'
import CursorDot from './components/CursorDot'

export default function App() {
  return (
    <div>
      <CursorDot />
      <nav className="nav">
        <Link to="/" className="brand">ProU</Link>
        <div className="links">
          <Link to="/employees">Employees</Link>
          <Link to="/tasks">Tasks</Link>
        </div>
      </nav>
      <main className="main">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/:id" element={<EmployeeDetail />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </main>
    </div>
  )
}
