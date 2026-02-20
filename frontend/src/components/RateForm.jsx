import React, { useState } from 'react'
import { DollarSign, X, AlertCircle, CheckCircle } from 'lucide-react'

export default function RateForm({ apiBase, users = [], projects = [], onClose, onSuccess }) {
  const [formData, setFormData] = useState({ user_id: '', project_id: '', rate: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    // Validaciones
    if (!formData.user_id || !formData.project_id || !formData.rate) {
      setError('❌ Todos los campos son requeridos')
      return
    }

    const rate = parseFloat(formData.rate)
    if (isNaN(rate) || rate <= 0) {
      setError('❌ La tarifa debe ser un número positivo')
      return
    }

    setLoading(true)

    try {
      const url = `${apiBase}/index.php?url=rate/create`
      console.log('🚀 Enviando solicitud POST a:', url)

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          user_id: parseInt(formData.user_id),
          project_id: parseInt(formData.project_id),
          rate: parseFloat(formData.rate)
        })
      })

      console.log('📡 Status:', response.status)

      const data = await response.json()
      console.log('📊 Respuesta:', data)

      if (!response.ok) {
        throw new Error(data.error || `Error HTTP ${response.status}`)
      }

      if (data.success || data.id) {
        setSuccess('✅ Tarifa creada exitosamente')
        console.log('✅ Tarifa ID:', data.id)
        
        setTimeout(() => {
          onSuccess?.()
          onClose?.()
        }, 500)
      } else if (data.error) {
        throw new Error(data.error)
      } else {
        throw new Error('Respuesta inesperada del servidor')
      }
    } catch (err) {
      console.error('❌ Error:', err)
      const errorMessage = err.message || 'Error al conectar con el servidor'
      
      if (errorMessage.includes('fetch')) {
        setError('❌ No se puede conectar a la API. ¿Está corriendo en puerto 8080?')
      } else {
        setError(`❌ ${errorMessage}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3><DollarSign size={20} /> Nueva Tarifa</h3>
          <button onClick={onClose} className="btn-close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-error">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              <CheckCircle size={18} />
              {success}
            </div>
          )}

          <div className="form-group">
            <label>Usuario *</label>
            <select
              value={formData.user_id}
              onChange={e => setFormData({ ...formData, user_id: e.target.value })}
              disabled={loading}
            >
              <option value="">Selecciona un usuario</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Proyecto *</label>
            <select
              value={formData.project_id}
              onChange={e => setFormData({ ...formData, project_id: e.target.value })}
              disabled={loading}
            >
              <option value="">Selecciona un proyecto</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Tarifa ($ por hora) *</label>
            <input
              type="number"
              step="0.01"
              min="1"
              value={formData.rate}
              onChange={e => setFormData({ ...formData, rate: e.target.value })}
              placeholder="Ej: 50.00"
              disabled={loading}
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel" disabled={loading}>
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? '⏳ Guardando...' : '✅ Crear Tarifa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
