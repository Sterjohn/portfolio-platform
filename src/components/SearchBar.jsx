import '../styles/SearchBar.css'

/**
 * SearchBar — hero section with large heading + live search input
 * Props:
 *   value:    string   — current search query (controlled)
 *   onChange: (string) => void — callback on input change
 */
export default function SearchBar({ value, onChange }) {
  return (
    <section className="hero" aria-label="Portfolio hero and search">
      <p className="hero__eyebrow">Selected Works</p>
      <h1 className="hero__heading">
        Our <em>work</em> speaks<br />for itself.
      </h1>
      <p className="hero__sub">
        Browse our portfolio of branding, digital, and experiential projects
        built for ambitious clients worldwide.
      </p>

      <div className="search-bar">
        {/* Search icon */}
        <svg
          className="search-bar__icon"
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>

        <input
          className="search-bar__input"
          type="search"
          placeholder="Search by title, category, or tag…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search projects"
        />

        {/* Clear button — only shown when there's a query */}
        {value && (
          <button
            className="search-bar__clear"
            onClick={() => onChange('')}
            aria-label="Clear search"
          >
            <svg width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </section>
  )
}
