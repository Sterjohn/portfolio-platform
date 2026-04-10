import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SearchBar from '../components/SearchBar'

describe('SearchBar', () => {
  it('renders the heading and placeholder text', () => {
    render(<SearchBar value="" onChange={() => {}} />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/search by title/i)).toBeInTheDocument()
  })

  it('calls onChange with the typed value', () => {
    const handleChange = vi.fn()
    render(<SearchBar value="" onChange={handleChange} />)
    const input = screen.getByRole('searchbox')
    fireEvent.change(input, { target: { value: 'branding' } })
    expect(handleChange).toHaveBeenCalledWith('branding')
  })

  it('shows a clear button when value is not empty', () => {
    render(<SearchBar value="hello" onChange={() => {}} />)
    expect(screen.getByLabelText(/clear search/i)).toBeInTheDocument()
  })

  it('hides the clear button when value is empty', () => {
    render(<SearchBar value="" onChange={() => {}} />)
    expect(screen.queryByLabelText(/clear search/i)).not.toBeInTheDocument()
  })

  it('calls onChange with empty string when clear button is clicked', () => {
    const handleChange = vi.fn()
    render(<SearchBar value="hello" onChange={handleChange} />)
    fireEvent.click(screen.getByLabelText(/clear search/i))
    expect(handleChange).toHaveBeenCalledWith('')
  })
})
