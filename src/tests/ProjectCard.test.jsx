import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ProjectCard from '../components/ProjectCard'

const mockProject = {
  id: 1,
  title: 'Test Project',
  category: 'Branding',
  description: 'A test project description.',
  tags: ['Print', 'Identity'],
  year: '2024',
  color: '#e63946',
}

describe('ProjectCard', () => {
  it('renders the project title, category, and year', () => {
    render(<ProjectCard project={mockProject} onDelete={() => {}} />)
    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('Branding')).toBeInTheDocument()
    expect(screen.getByText('2024')).toBeInTheDocument()
  })

  it('renders all tags', () => {
    render(<ProjectCard project={mockProject} onDelete={() => {}} />)
    expect(screen.getByText('Print')).toBeInTheDocument()
    expect(screen.getByText('Identity')).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<ProjectCard project={mockProject} onDelete={() => {}} />)
    expect(screen.getByText('A test project description.')).toBeInTheDocument()
  })

  it('calls onDelete with the correct project ID when Remove is clicked', () => {
    const handleDelete = vi.fn()
    render(<ProjectCard project={mockProject} onDelete={handleDelete} />)
    fireEvent.click(screen.getByRole('button', { name: /delete project/i }))
    expect(handleDelete).toHaveBeenCalledWith(1)
  })
})
