import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-logo v-gradient">AIVatika</div>
      </div>

      <div className="footer-middle">
        <div className="footer-col">
          <h4>EXPLORE</h4>
          <Link href="/">Home</Link>
          <Link href="/solutions">Solutions</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="footer-col">
          <h4>PRODUCTS</h4>
          <a href="https://examscalendar.com/" target="_blank" rel="noopener noreferrer">ExamsCalendar</a>
          <Link href="/contact">Pixtall</Link>
          <Link href="/chat-automation">WhatsApp Automation</Link>
        </div>
        <div className="footer-col">
          <h4>COMPANY</h4>
          <Link href="/">About</Link>
        </div>
        <div className="footer-col">
          <h4>CONTACT</h4>
          <a href="mailto:contact@aivatika.com">contact@aivatika.com</a>
          <br />
          <a href="tel:8050473346">8050473346</a>
          <br />
          <span>Bengaluru</span>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="copyright">© 2026 AIVatika · ALL RIGHTS RESERVED</div>
        <div className="socials">
          {/* LinkedIn */}
          <a href="https://www.linkedin.com/company/aivatikaa/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          {/* Instagram */}
          <a href="https://www.instagram.com/ai_vatika?igsh=MWx0ZTZkOWV6eGcweg==" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
