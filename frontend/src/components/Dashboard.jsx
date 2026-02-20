import React, { useMemo } from 'react'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'

export default function Dashboard({ tasks = [] }) {
  const stats = useMemo(() => {
    if (!tasks.length) return { total: 0, byProject: [], byUser: [], totalHours: 0, totalValue: 0 }

    const byProject = {}
    const byUser = {}
    let totalHours = 0
    let totalValue = 0

    tasks.forEach(t => {
      totalHours += parseFloat(t.hours) || 0
      totalValue += parseFloat(t.total_value) || 0

      if (!byProject[t.project]) {
        byProject[t.project] = { name: t.project, tasks: 0, hours: 0, value: 0 }
      }
      byProject[t.project].tasks += 1
      byProject[t.project].hours += parseFloat(t.hours) || 0
      byProject[t.project].value += parseFloat(t.total_value) || 0
    })

    const projectData = Object.values(byProject)
    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

    return {
      total: tasks.length,
      byProject: projectData,
      totalHours: totalHours.toFixed(2),
      totalValue: totalValue.toFixed(2),
      projectColors: COLORS
    }
  }, [tasks])

  return (
    <section className="dashboard">
      <h2>📊 Reportería y Análisis</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Tareas</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.totalHours}</div>
          <div className="stat-label">Horas Totales</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">${parseFloat(stats.totalValue).toLocaleString()}</div>
          <div className="stat-label">Valor Total</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Tareas por Proyecto</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.byProject}
                dataKey="tasks"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {stats.byProject.map((entry, idx) => (
                  <Cell key={idx} fill={stats.projectColors[idx % stats.projectColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Horas y Valor por Proyecto</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.byProject}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hours" fill="#3b82f6" name="Horas" />
              <Bar dataKey="value" fill="#10b981" name="Valor ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}
