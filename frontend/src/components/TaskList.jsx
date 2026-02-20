import React, { useState, useMemo } from 'react'
import { Search, Filter, Download } from 'lucide-react'

export default function TaskList({ tasks = [] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterProject, setFilterProject] = useState('')
  const [sortBy, setSortBy] = useState('id')
  const [minHours, setMinHours] = useState('')
  const [maxHours, setMaxHours] = useState('')

  const projects = useMemo(() => [...new Set(tasks.map(t => t.project))], [tasks])

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const matchSearch = t.description?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchProject = !filterProject || t.project === filterProject
      const matchHours = (!minHours || parseFloat(t.hours) >= parseFloat(minHours)) &&
                         (!maxHours || parseFloat(t.hours) <= parseFloat(maxHours))
      return matchSearch && matchProject && matchHours
    }).sort((a, b) => {
      if (sortBy === 'hours') return parseFloat(b.hours) - parseFloat(a.hours)
      if (sortBy === 'value') return parseFloat(b.total_value) - parseFloat(a.total_value)
      if (sortBy === 'project') return a.project.localeCompare(b.project)
      return a.id - b.id
    })
  }, [tasks, searchTerm, filterProject, sortBy, minHours, maxHours])

  const exportCSV = () => {
    const headers = ['ID', 'Descripción', 'Horas', 'Proyecto', 'Tarifa', 'Valor Total']
    const csv = [
      headers.join(','),
      ...filteredTasks.map(t => `${t.id},"${t.description}",${t.hours},${t.project},${t.rate},${t.total_value}`)
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tareas_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  return (
    <section className="task-list">
      <div className="task-header">
        <h2>📋 Tareas</h2>
        <button onClick={exportCSV} className="btn-export">
          <Download size={18} /> Exportar CSV
        </button>
      </div>

      <div className="filters-container">
        <div className="filter-group">
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar descripción..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <Filter size={18} />
          <select value={filterProject} onChange={e => setFilterProject(e.target.value)}>
            <option value="">Todos los proyectos</option>
            {projects.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <input
            type="number"
            placeholder="Mín. horas"
            value={minHours}
            onChange={e => setMinHours(e.target.value)}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Máx. horas"
            value={maxHours}
            onChange={e => setMaxHours(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="id">Ordenar por ID</option>
            <option value="hours">Ordenar por Horas</option>
            <option value="value">Ordenar por Valor</option>
            <option value="project">Ordenar por Proyecto</option>
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Horas</th>
              <th>Proyecto</th>
              <th>Tarifa</th>
              <th>Valor Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length === 0 ? (
              <tr><td colSpan="6">No hay tareas</td></tr>
            ) : (
              filteredTasks.map(t => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.description}</td>
                  <td>{t.hours}h</td>
                  <td><span className="badge">{t.project}</span></td>
                  <td>${t.rate}</td>
                  <td className="value-cell">${parseFloat(t.total_value).toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="task-stats">
        <span>Total: {filteredTasks.length} tareas</span>
        <span>Horas: {filteredTasks.reduce((sum, t) => sum + parseFloat(t.hours), 0).toFixed(2)}</span>
        <span>Valor: ${filteredTasks.reduce((sum, t) => sum + parseFloat(t.total_value), 0).toFixed(2)}</span>
      </div>
    </section>
  )
}
