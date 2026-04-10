import { useState, useMemo } from 'react'
import { initialProjects } from '../data/projects'

// Generates a simple unique ID for new projects
const generateId = () => Date.now()

export function useProjects() {
  const [projects, setProjects] = useState(initialProjects)
  const [searchQuery, setSearchQuery] = useState('')

  // Derived state: filter projects based on search query
  // Searches across title, category, description, and tags
  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()
    if (!query) return projects
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some((tag) => tag.toLowerCase().includes(query))
    )
  }, [projects, searchQuery])

  // Adds a new project to the top of the list
  const addProject = (projectData) => {
    const newProject = {
      ...projectData,
      id: generateId(),
      year: new Date().getFullYear().toString(),
    }
    setProjects((prev) => [newProject, ...prev])
  }

  // Removes a project by ID
  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  return {
    projects: filteredProjects,
    totalCount: projects.length,
    searchQuery,
    setSearchQuery,
    addProject,
    deleteProject,
  }
}
