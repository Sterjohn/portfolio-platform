import { useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import ProjectGrid from './components/ProjectGrid'
import AddProjectModal from './components/AddProjectModal'
import Footer from './components/Footer'
import { useProjects } from './hooks/useProjects'

/**
 * App — root component
 * Owns modal open/close state; delegates project state to useProjects hook.
 *
 * Component tree:
 *   App
 *   ├── Header          (onAddClick → opens modal)
 *   ├── SearchBar       (value, onChange → searchQuery)
 *   ├── ProjectGrid
 *   │   └── ProjectCard (project, onDelete)  ×n
 *   ├── AddProjectModal (isOpen, onClose, onSubmit)
 *   └── Footer
 */
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    projects,
    totalCount,
    searchQuery,
    setSearchQuery,
    addProject,
    deleteProject,
  } = useProjects()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header onAddClick={() => setIsModalOpen(true)} />

      <main style={{ flex: 1 }}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <ProjectGrid
          projects={projects}
          totalCount={totalCount}
          onDelete={deleteProject}
        />
      </main>

      <Footer />

      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addProject}
      />
    </div>
  )
}
