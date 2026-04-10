import ProjectCard from './ProjectCard'
import '../styles/ProjectCard.css'

/**
 * ProjectGrid — renders the grid of project cards or an empty state
 * Props:
 *   projects:     array  — filtered list of projects to display
 *   totalCount:   number — total unfiltered count (for the meta label)
 *   onDelete:     (id) => void
 */
export default function ProjectGrid({ projects, totalCount, onDelete }) {
  return (
    <section
      className="project-grid-section"
      aria-label="Projects list"
      aria-live="polite"
    >
      <div className="project-grid__meta">
        <span className="project-grid__count">
          Showing <span>{projects.length}</span> of <span>{totalCount}</span> projects
        </span>
      </div>

      <div className="project-grid">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={onDelete}
              animationDelay={index * 60}
            />
          ))
        ) : (
          <div className="empty-state" role="status">
            <div className="empty-state__icon" aria-hidden="true">◌</div>
            <p className="empty-state__title">No projects found</p>
            <p className="empty-state__sub">Try a different search term or add a new project.</p>
          </div>
        )}
      </div>
    </section>
  )
}
