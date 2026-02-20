import React, { useState, useEffect, useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import TaskList from './components/TaskList'
import Dashboard from './components/Dashboard'
import UserForm from './components/UserForm'
import TaskForm from './components/TaskForm'
import RateForm from './components/RateForm'
import { Sun, Moon, Plus, Users, Briefcase } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080'

export default function App() {
  const { isDark, toggleTheme } = useContext(ThemeContext)
  const [activeTab, setActiveTab] = useState('tasks')
  const [userId, setUserId] = useState('1')
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [showUserForm, setShowUserForm] = useState(false)
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [showRateForm, setShowRateForm] = useState(false)

  // Cargar datos
  useEffect(() => {
    fetchTasks()
    fetchUsers()
    fetchProjects()
  }, [userId])

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/index.php?url=task/byUser/${userId}`)
      const data = await res.json()
      setTasks(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/index.php?url=user/list`)
      const data = await res.json()
      setUsers(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error:', err)
    }
  }

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE}/index.php?url=project/list`)
      const data = await res.json()
      setProjects(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error:', err)
    }
  }

  const handleRefresh = () => {
    fetchTasks()
    fetchUsers()
    fetchProjects()
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>💼 Task Management Pro</h1>
        </div>

        <div className="navbar-actions">
          <button onClick={toggleTheme} className="btn-theme" title="Cambiar tema">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      <div className="container">
        <div className="sidebar">
          <div className="user-selector">
            <label>👤 Usuario Activo:</label>
            <select value={userId} onChange={e => setUserId(e.target.value)}>
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>

          <div className="tabs-menu">
            <button
              className={`tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              📋 Tareas
            </button>
            <button
              className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              📊 Reportería
            </button>
          </div>

          <div className="actions-menu">
            <h3>Gestión</h3>
            <button onClick={() => setShowUserForm(true)} className="action-btn">
              <Users size={18} /> Nuevo Usuario
            </button>
            <button onClick={() => setShowTaskForm(true)} className="action-btn">
              <Plus size={18} /> Nueva Tarea
            </button>
            <button onClick={() => setShowRateForm(true)} className="action-btn">
              <Briefcase size={18} /> Nueva Tarifa
            </button>
            <button onClick={handleRefresh} className="action-btn secondary">
              🔄 Actualizar
            </button>
          </div>
        </div>

        <main className="main-content">
          {loading && <div className="loading">Cargando...</div>}

          {!loading && activeTab === 'tasks' && (
            <TaskList tasks={tasks} />
          )}

          {!loading && activeTab === 'dashboard' && (
            <Dashboard tasks={tasks} />
          )}
        </main>
      </div>

      {showUserForm && (
        <UserForm
          apiBase={API_BASE}
          onClose={() => setShowUserForm(false)}
          onSuccess={handleRefresh}
        />
      )}

      {showTaskForm && (
        <TaskForm
          apiBase={API_BASE}
          users={users}
          projects={projects}
          onClose={() => setShowTaskForm(false)}
          onSuccess={handleRefresh}
        />
      )}

      {showRateForm && (
        <RateForm
          apiBase={API_BASE}
          users={users}
          projects={projects}
          onClose={() => setShowRateForm(false)}
          onSuccess={handleRefresh}
        />
      )}
    </div>
  )
}
