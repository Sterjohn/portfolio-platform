import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useProjects } from '../hooks/useProjects'

describe('useProjects', () => {
  it('returns the initial set of projects', () => {
    const { result } = renderHook(() => useProjects())
    expect(result.current.projects.length).toBeGreaterThan(0)
  })

  it('adds a new project to the top of the list', () => {
    const { result } = renderHook(() => useProjects())
    const initialCount = result.current.totalCount

    act(() => {
      result.current.addProject({
        title: 'New Work',
        category: 'Branding',
        description: 'Something new.',
        tags: ['Fresh'],
        color: '#e63946',
      })
    })

    expect(result.current.totalCount).toBe(initialCount + 1)
    expect(result.current.projects[0].title).toBe('New Work')
  })

  it('deletes a project by ID', () => {
    const { result } = renderHook(() => useProjects())
    const firstId = result.current.projects[0].id
    const initialCount = result.current.totalCount

    act(() => {
      result.current.deleteProject(firstId)
    })

    expect(result.current.totalCount).toBe(initialCount - 1)
    expect(result.current.projects.find((p) => p.id === firstId)).toBeUndefined()
  })

  it('filters projects by search query (title)', () => {
    const { result } = renderHook(() => useProjects())

    act(() => {
      result.current.setSearchQuery('noir')
    })

    expect(result.current.projects.every((p) =>
      p.title.toLowerCase().includes('noir') ||
      p.category.toLowerCase().includes('noir') ||
      p.description.toLowerCase().includes('noir') ||
      p.tags.some((t) => t.toLowerCase().includes('noir'))
    )).toBe(true)
  })

  it('returns all projects when search query is cleared', () => {
    const { result } = renderHook(() => useProjects())
    const totalCount = result.current.totalCount

    act(() => { result.current.setSearchQuery('noir') })
    act(() => { result.current.setSearchQuery('') })

    expect(result.current.projects.length).toBe(totalCount)
  })
})
