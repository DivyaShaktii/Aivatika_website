"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();

  // Check if any product page is active
  const isProductsActive = pathname === '/chat-automation';

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link className="logo" href="/">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="var(--accent)" strokeWidth="2" fill="transparent"/>
            <path d="M12 6L6 12L12 18L18 12L12 6Z" fill="var(--accent)"/>
          </svg>
          <span className="v-gradient">AIVatika</span>
        </Link>

        <nav className="nav-links">
          <Link href="/" className={pathname === '/' ? 'active' : ''} style={{ position: 'relative' }}>
            Home
            {pathname === '/' && (
              <motion.div layoutId="navbar-underline" className="nav-underline" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
            )}
          </Link>

          <div className="products">
            <button className={`products-btn ${isProductsActive ? 'active' : ''}`} style={{ position: 'relative' }}>
              Products
              <svg width="14" height="14" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              {isProductsActive && (
                <motion.div layoutId="navbar-underline" className="nav-underline" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
            </button>

            <div className="products-menu">
              <a href="https://examscalendar.com/" target="_blank" rel="noopener noreferrer" className="product-item">
                <div className="title">ExamsCalendar</div>
                <div className="desc">It helps you in exam preparation</div>
              </a>

              <Link href="/chat-automation" className="product-item">
                <div className="title">WhatsApp Bot</div>
                <div className="desc">Automate customer interactions</div>
              </Link>

              <Link href="/contact" className="product-item">
                <div className="title">Pixtall</div>
                <div className="desc">Generate advertisement images with AI</div>
              </Link>
            </div>
          </div>

          <Link href="/solutions" className={pathname === '/solutions' ? 'active' : ''} style={{ position: 'relative' }}>
            Solutions
            {pathname === '/solutions' && (
              <motion.div layoutId="navbar-underline" className="nav-underline" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
            )}
          </Link>
          <Link href="/contact" className={pathname === '/contact' ? 'active' : ''} style={{ position: 'relative' }}>
            Contact
            {pathname === '/contact' && (
              <motion.div layoutId="navbar-underline" className="nav-underline" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
            )}
          </Link>
        </nav>

        <Link className="demo-btn" href="/contact">
          Contact us ↗
        </Link>
      </div>
    </header>
  );
}
