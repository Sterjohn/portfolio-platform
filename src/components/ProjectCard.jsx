import '../styles/ProjectCard.css'

/**
 * ProjectCard — displays a single project's info
 * Props:
 *   project:      object  — the project data
 *   onDelete:     (id) => void — callback to delete this project
 *   animationDelay: number  — stagger delay in ms for the entrance animation
 */
export default function ProjectCard({ project, onDelete, animationDelay = 0 }) {
  const { id, title, category, description, tags, year, color } = project

  return (
    <article
      className="project-card"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Colored left-edge stripe that animates on hover */}
      <div
        className="project-card__stripe"
        style={{ background: color }}
        aria-hidden="true"
      />

      <div className="project-card__header">
        <span className="project-card__category">{category}</span>
        <span className="project-card__year">{year}</span>
      </div>

      <h2 className="project-card__title">{title}</h2>
      <p className="project-card__description">{description}</p>

      <div className="project-card__tags" aria-label="Project tags">
        {tags.map((tag) => (
          <span key={tag} className="project-card__tag">{tag}</span>
        ))}
      </div>

      <div className="project-card__footer">
        <button
          className="project-card__delete"
          onClick={() => onDelete(id)}
          aria-label={`Delete project: ${title}`}
        >
          <svg width="13" height="13" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
            aria-hidden="true">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4h6v2" />
          </svg>
          Remove
        </button>
      </div>
    </article>
  )
}
