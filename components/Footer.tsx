import VisitorCounter from "./VisitorCounter";

export default function Footer() {
  return (
    <footer className="site-footer">
      <span>© 2026 Ayush Sanj</span>
      <VisitorCounter />
      <div className="site-footer-links">
        <a href="https://github.com/ayushsanjdev" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        <a href="https://linkedin.com/in/ayushsanj" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
      </div>
    </footer>
  );
}
