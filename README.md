# FOLIO — Creative Agency Portfolio Platform

A modern, responsive single-page application built with React + Vite for showcasing a creative agency's work. Features a dark editorial aesthetic with live search, dynamic project management, and a polished modal form.

---

## Features

- **Landing page** — grid of project cards with category, year, tags, and accent color
- **Live search** — filters projects by title, category, description, or tag in real time
- **Add project** — modal form with validation, category picker, and accent color selector
- **Delete project** — remove any project directly from its card
- **Responsive design** — fluid grid that adapts from mobile to wide desktop
- **Accessible** — ARIA roles, labels, keyboard navigation (Escape closes modal)
- **Animated** — staggered card entrance animations, hover micro-interactions

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Dev server + bundler |
| Plain CSS | Styling (CSS custom properties, no framework) |
| Vitest | Test runner |
| React Testing Library | Component + hook tests |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Run

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/portfolio-platform.git
cd portfolio-platform

# Install dependencies
npm install

# Start development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

### Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## Running Tests

```bash
npm test
```

Tests cover:
- `SearchBar` — rendering, onChange, clear button
- `ProjectCard` — rendering props, onDelete callback
- `AddProjectModal` — open/close, validation errors, successful submit, Escape key
- `useProjects` hook — add, delete, search filtering

---

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Sticky nav with logo + Add button
│   ├── SearchBar.jsx       # Hero section + search input
│   ├── ProjectGrid.jsx     # Grid container + empty state
│   ├── ProjectCard.jsx     # Individual project card
│   ├── AddProjectModal.jsx # Modal with controlled form
│   └── Footer.jsx          # Simple footer
├── hooks/
│   └── useProjects.js      # State: projects, search, add, delete
├── data/
│   └── projects.js         # Seed data (6 sample projects)
├── styles/
│   ├── index.css           # Global reset + CSS variables
│   ├── Header.css
│   ├── SearchBar.css
│   ├── ProjectCard.css
│   ├── AddProjectModal.css
│   └── Footer.css
├── tests/
│   ├── SearchBar.test.jsx
│   ├── ProjectCard.test.jsx
│   ├── AddProjectModal.test.jsx
│   └── useProjects.test.js
├── App.jsx                 # Root component
├── main.jsx                # Entry point
└── setupTests.js           # Vitest + jest-dom setup
```

---

## Component Hierarchy & State

```
App (state: isModalOpen)
 └── useProjects hook (state: projects[], searchQuery)
      ├── Header          ← onAddClick (prop)
      ├── SearchBar       ← value, onChange (props)
      ├── ProjectGrid     ← projects, totalCount, onDelete (props)
      │    └── ProjectCard ← project, onDelete (props)
      ├── AddProjectModal ← isOpen, onClose, onSubmit (props)
      └── Footer
```

State is lifted to the nearest common parent. `useProjects` encapsulates all project-related logic so `App` stays lean.

---

## Known Limitations

- Data is in-memory only — refreshing the page resets to seed data. Persisting to `localStorage` or a backend API would be a natural next step.
- No routing — all content lives on one page. Adding React Router would enable individual project detail pages.
- No image uploads — cards use colored accent stripes instead of project images.

---

## License

MIT
