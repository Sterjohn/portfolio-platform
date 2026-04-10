import '../styles/Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__copy">
          © {year} <span>FOLIO</span> — Creative Agency Portfolio
        </p>
        <nav className="footer__links" aria-label="Footer navigation">
          <a className="footer__link" href="#top">Back to Top</a>
          <a className="footer__link" href="https://github.com" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  )
}
