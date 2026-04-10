import '../styles/Header.css'

/**
 * Header — sticky top nav with logo and "Add Project" CTA
 * Props:
 *   onAddClick: () => void  — opens the add-project modal
 */
export default function Header({ onAddClick }) {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__logo">
          <span className="header__logo-mark">FOLIO</span>
          <span className="header__logo-dot" aria-hidden="true" />
          <span className="header__tagline">Creative Agency</span>
        </div>

        <div className="header__actions">
          <button
            className="header__add-btn"
            onClick={onAddClick}
            aria-label="Add a new project"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Project
          </button>
        </div>
      </div>
    </header>
  )
}
