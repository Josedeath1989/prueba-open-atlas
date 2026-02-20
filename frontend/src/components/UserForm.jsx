import React, { useState } from 'react'
import { User, X, AlertCircle, CheckCircle } from 'lucide-react'

export default function UserForm({ apiBase, onClose, onSuccess }) {
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Validar email
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    // Validaciones de cliente
    if (!formData.name || !formData.email) {
      setError('❌ Todos los campos son requeridos')
      return
    }

    if (formData.name.trim().length < 3) {
      setError('❌ El nombre debe tener al menos 3 caracteres')
      return
    }

    if (!isValidEmail(formData.email)) {
      setError('❌ Email inválido')
      return
    }

    setLoading(true)

    try {
      const url = `${apiBase}/index.php?url=user/create`
      console.log('🚀 Enviando solicitud POST a:', url)

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim()
        })
      })

      console.log('📡 Status:', response.status)
      console.log('📡 Headers:', response.headers)

      const data = await response.json()
      console.log('📊 Respuesta:', data)

      // Validar respuesta
      if (!response.ok) {
        throw new Error(data.error || `Error HTTP ${response.status}`)
      }

      if (data.success || data.id) {
        setSuccess('✅ Usuario creado exitosamente')
        console.log('✅ Usuario ID:', data.id)
        
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
      } else if (errorMessage.includes('JSON')) {
        setError('❌ Error en la respuesta del servidor')
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
          <h3><User size={20} /> Nuevo Usuario</h3>
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
            <label>Nombre *</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej: Juan Pérez"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="ej: juan@example.com"
              disabled={loading}
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel" disabled={loading}>
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? '⏳ Guardando...' : '✅ Crear Usuario'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
