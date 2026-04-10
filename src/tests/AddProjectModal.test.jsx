import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AddProjectModal from '../components/AddProjectModal'

describe('AddProjectModal', () => {
  it('does not render when isOpen is false', () => {
    render(<AddProjectModal isOpen={false} onClose={() => {}} onSubmit={() => {}} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders the form when isOpen is true', () => {
    render(<AddProjectModal isOpen={true} onClose={() => {}} onSubmit={() => {}} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByLabelText(/project title/i)).toBeInTheDocument()
  })

  it('calls onClose when the Cancel button is clicked', () => {
    const handleClose = vi.fn()
    render(<AddProjectModal isOpen={true} onClose={handleClose} onSubmit={() => {}} />)
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('shows validation errors when submitting an empty form', () => {
    render(<AddProjectModal isOpen={true} onClose={() => {}} onSubmit={() => {}} />)
    fireEvent.click(screen.getByRole('button', { name: /add project/i }))
    expect(screen.getByText(/title is required/i)).toBeInTheDocument()
    expect(screen.getByText(/please select a category/i)).toBeInTheDocument()
  })

  it('calls onSubmit with correct data when form is valid', () => {
    const handleSubmit = vi.fn()
    const handleClose = vi.fn()
    render(
      <AddProjectModal isOpen={true} onClose={handleClose} onSubmit={handleSubmit} />
    )

    fireEvent.change(screen.getByLabelText(/project title/i), {
      target: { value: 'My New Project' },
    })
    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: 'Branding' },
    })
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'A great project.' },
    })
    fireEvent.change(screen.getByLabelText(/tags/i), {
      target: { value: 'Logo, Print' },
    })

    fireEvent.click(screen.getByRole('button', { name: /add project/i }))

    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'My New Project',
        category: 'Branding',
        description: 'A great project.',
        tags: ['Logo', 'Print'],
      })
    )
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when Escape key is pressed', () => {
    const handleClose = vi.fn()
    render(<AddProjectModal isOpen={true} onClose={handleClose} onSubmit={() => {}} />)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
