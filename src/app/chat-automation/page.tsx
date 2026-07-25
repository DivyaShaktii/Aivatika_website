'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import './chat-automation.css';

export default function ChatAutomation() {
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
        <section className="wb-hero reveal">
            <div className="wb-hero-left">
                <div className="wb-overline">PRODUCT · WHATSAPP AUTOMATION</div>
                <h1 className="wb-title">Intelligent WhatsApp Automation</h1>
                <p className="wb-subtitle">Deliver natural, user-friendly replies instantly with our AI-powered WhatsApp bot. Move beyond rigid, pre-fed responses and engage your customers in smart, dynamic conversations that feel truly human and solve problems in real-time.</p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link href="/contact" className="btn btn-primary" style={{ padding: '1rem 2.2rem', borderRadius: '30px', fontWeight: 600 }}>Get Started ↗</Link>
                </div>
            </div>
            <div className="wb-hero-right">
                <div className="wb-preview-card">
                    <img src="/whatsapp_image2.png" alt="WhatsApp Bot Preview" />
                </div>
            </div>
        </section>

        <section className="wb-video-section reveal">
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>See Intelligent Automation in Action</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Watch how our WhatsApp bot interacts with customers in real-time.</p>
            <div className="wb-video-box">
                <div className="wb-play-btn">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="#000" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '4px' }}>
                        <path d="M5 3l14 9-14 9V3z"/>
                    </svg>
                </div>
            </div>
        </section>

        <section className="wb-industries-section reveal">
            <div className="section-badge">// BROWSE BY INDUSTRY</div>
            <h2 className="section-title">More ways to use WhatsApp Automation in your line of work</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '700px' }}>Tap the card that sounds like your business. Each block is a starting point — your final flows depend on WhatsApp rules, your templates, and how your team works.</p>

            <div className="wb-ind-grid">
                <div className="wb-ind-card">
                    <div className="wb-ind-icon">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                    </div>
                    <h3>Healthcare</h3>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: 1.6 }}>Confirm appointments, send prep tips, and follow up after visits — only in line with WhatsApp and health rules. Focus on care and clarity your patients expect.</p>
                    <Link href="/contact" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Explore for my business ↗</Link>
                </div>

                <div className="wb-ind-card">
                    <div className="wb-ind-icon" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff' }}>
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                    </div>
                    <h3>Education</h3>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: 1.6 }}>Answer student and parent questions fast. Send fee reminders, class updates, and admission info on WhatsApp with a unified team inbox.</p>
                    <Link href="/contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Explore for my business ↗</Link>
                </div>

                <div className="wb-ind-card">
                    <div className="wb-ind-icon" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff' }}>
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3>Finance & Insurance</h3>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: 1.6 }}>Share payment reminders, KYC nudges, and simple account updates on the channel people check every day.</p>
                    <Link href="/contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Explore for my business ↗</Link>
                </div>
            </div>
        </section>

        <section className="cta-section reveal" style={{ padding: '4rem 4rem 8rem', maxWidth: '1400px', margin: '0 auto' }}>
            <div className="cta-container">
                <h2>Give your business AI automation<br />that <span className="text-accent">never clocks out.</span></h2>
                <Link href="/contact" className="btn btn-primary btn-large">Contact us ↗</Link>
            </div>
        </section>
    </main>
  );
}
