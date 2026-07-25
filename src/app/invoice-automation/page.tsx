'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function InvoiceAutomation() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    return () => {
      revealElements.forEach(el => {
        revealObserver.unobserve(el);
      });
    };
  }, []);

  return (
    <main ref={containerRef}>
        <section className="product-hero reveal" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
            <div className="product-hero-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
                <div className="product-hero-content">
                    <div className="badge-line" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ width: '20px', height: '2px', backgroundColor: 'var(--accent)' }}></div>
                        <span style={{ color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>INVOICE AUTOMATION</span>
                    </div>
                    
                    <h1 style={{ fontSize: '4rem', lineHeight: 1.1, letterSpacing: '-0.04em', marginBottom: '1.5rem', color: '#fff' }}>
                        Invoice<br />processing<br />shouldn&apos;t slow<br />you down.
                    </h1>
                    
                    <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '450px' }}>
                        Automatically extract, validate, and process invoices from your inbox to your ERP with zero manual data entry.
                    </p>
                    
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <Link href="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem', borderRadius: '30px', fontWeight: 600 }}>Automate Now</Link>
                        <a href="#features" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1rem', borderRadius: '30px', fontWeight: 600 }}>See Features</a>
                    </div>
                </div>
                
                <div className="product-hero-graphic" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                    <img src="/invoice_dashboard.png" alt="Automated Invoice Processing Dashboard" style={{ width: '100%', height: 'auto', display: 'block', position: 'relative', zIndex: 1 }} />
                </div>
            </div>
        </section>

        <section id="features" className="product-features reveal" style={{ padding: '6rem 2rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', letterSpacing: '-0.02em' }}>End-to-End Invoice Automation</h2>
                <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '4rem' }}>Everything your AP team needs to eliminate manual data entry and accelerate payments.</p>
                
                <div className="product-features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'left' }}>
                    
                    <div className="simple-card">
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 500, letterSpacing: '-0.02em' }}>1. Intelligent Capture</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '1rem' }}>
                            Automatically captures invoices from emails, attachments, and shared drives in real time without human intervention.
                        </p>
                    </div>

                    <div className="simple-card">
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 500, letterSpacing: '-0.02em' }}>2. Accurate Extraction</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '1rem' }}>
                            Our AI pulls key data like vendor, amounts, taxes, and PO numbers with high accuracy, eliminating manual typing.
                        </p>
                    </div>

                    <div className="simple-card">
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 500, letterSpacing: '-0.02em' }}>3. Validation & Matching</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '1rem' }}>
                            Automatically cross-checks POs, detects duplicates, and validates GST/tax rules before pushing data to your ERP.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    </main>
  );
}
