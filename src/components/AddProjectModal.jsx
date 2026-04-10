import { useState, useEffect, useRef } from 'react'
import '../styles/AddProjectModal.css'

const CATEGORIES = [
  'Branding',
  'UX/UI Design',
  'Web Design',
  'Motion Design',
  'E-Commerce',
  'Digital Marketing',
  'Photography',
  'Illustration',
  'Other',
]

const ACCENT_COLORS = [
  '#e63946', '#f4a261', '#ffd166', '#06d6a0',
  '#2a9d8f', '#4cc9f0', '#c77dff', '#ff6b9d',
]

const INITIAL_FORM = {
  title: '',
  category: '',
  description: '',
  tags: '',
  color: ACCENT_COLORS[0],
}

/**
 * AddProjectModal — controlled modal with a form to add a new project
 * Props:
 *   isOpen:     boolean
 *   onClose:    () => void
 *   onSubmit:   (projectData) => void
 */
export default function AddProjectModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const firstInputRef = useRef(null)

  // Focus the first input when modal opens; reset form on close
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 50)
    } else {
      setForm(INITIAL_FORM)
      setErrors({})
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.title.trim()) newErrors.title = 'Title is required'
    if (!form.category) newErrors.category = 'Please select a category'
    if (!form.description.trim()) newErrors.description = 'Description is required'
    return newErrors
  }

  const handleSubmit = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Convert comma-separated tags string into an array
    const tagsArray = form.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    onSubmit({ ...form, tags: tagsArray.length > 0 ? tagsArray : ['General'] })
    onClose()
  }

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__title" id="modal-title">Add New Project</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close modal">
            <svg width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="project-form">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="proj-title" className="form-label">Project Title *</label>
            <input
              id="proj-title"
              ref={firstInputRef}
              className={`form-input ${errors.title ? 'error' : ''}`}
              type="text"
              placeholder="e.g. Midnight Rebrand"
              value={form.title}
              onChange={handleChange('title')}
            />
            {errors.title && <span className="form-error">{errors.title}</span>}
          </div>

          {/* Category + Color row */}
          <div className="form-group--row">
            <div className="form-group">
              <label htmlFor="proj-category" className="form-label">Category *</label>
              <select
                id="proj-category"
                className={`form-select ${errors.category ? 'error' : ''}`}
                value={form.category}
                onChange={handleChange('category')}
              >
                <option value="">Select…</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.category && <span className="form-error">{errors.category}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Accent Color</label>
              <div className="color-options" role="radiogroup" aria-label="Project accent color">
                {ACCENT_COLORS.map((c) => (
                  <button
                    key={c}
                    className={`color-option ${form.color === c ? 'selected' : ''}`}
                    style={{ background: c }}
                    onClick={() => setForm((prev) => ({ ...prev, color: c }))}
                    aria-label={`Color ${c}`}
                    aria-pressed={form.color === c}
                    type="button"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="proj-desc" className="form-label">Description *</label>
            <textarea
              id="proj-desc"
              className={`form-textarea ${errors.description ? 'error' : ''}`}
              placeholder="What was the project about? What was your role?"
              value={form.description}
              onChange={handleChange('description')}
            />
            {errors.description && <span className="form-error">{errors.description}</span>}
          </div>

          {/* Tags */}
          <div className="form-group">
            <label htmlFor="proj-tags" className="form-label">Tags</label>
            <input
              id="proj-tags"
              className="form-input"
              type="text"
              placeholder="Branding, Print, Motion"
              value={form.tags}
              onChange={handleChange('tags')}
            />
            <span className="form-hint">Separate tags with commas</span>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button className="btn-cancel" onClick={onClose} type="button">Cancel</button>
            <button className="btn-submit" onClick={handleSubmit} type="button">
              Add Project
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
