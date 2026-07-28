'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const HeroRobot = dynamic(() => import('../components/HeroRobot'), { ssr: false });

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
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
        <section className="hero reveal">
            <div className="hero-main-layout">
                <div className="hero-left">
                    <h1 className="hero-title">
                      <span className="word" style={{ animationDelay: '0.0s' }}>We</span>{' '}
                      <span className="word" style={{ animationDelay: '0.1s' }}>build</span>{' '}
                      <span className="word" style={{ animationDelay: '0.2s' }}>the</span>{' '}
                      <span className="word" style={{ animationDelay: '0.3s' }}>agents</span>{' '}
                      <span className="word" style={{ animationDelay: '0.4s' }}>that</span><br />
                      <span className="word" style={{ animationDelay: '0.5s', background: 'linear-gradient(90deg, #CCFF00 0%, #33ff99 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>run</span>{' '}
                      <span className="word" style={{ animationDelay: '0.6s', background: 'linear-gradient(90deg, #CCFF00 0%, #33ff99 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>your</span>{' '}
                      <span className="word" style={{ animationDelay: '0.7s', background: 'linear-gradient(90deg, #CCFF00 0%, #33ff99 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>business.</span>
                    </h1>

                    <p className="hero-description">
                        Intelligent chat and invoice automation agents that process documents, handle customer conversations, and coordinate workflows 24/7.
                    </p>

                    <div className="hero-cta">
                        <Link href="/contact" className="btn btn-primary btn-large" style={{ color: '#000', fontWeight: 700 }}>Contact us ↗</Link>
                    </div>
                </div>

                <div className="hero-right">
                    <div className="hero-graphic" style={{ width: '800px', height: '800px', margin: '0 auto' }}>

                    <div className="orb-container" style={{ width: '100%', height: '100%', position: 'relative' }}>
                        <div className="orb-wrapper" style={{ width: '100%', height: '100%', position: 'relative', borderRadius: '50%', zIndex: 2 }}>
                            <HeroRobot />
                        </div>
                        <div className="floating-badge" style={{ top: '20%', left: '0%', bottom: 'auto' }}>
                            <span style={{ color: '#33ff99' }}>●</span> WhatsApp Automation
                        </div>
                        <div className="floating-badge" style={{ bottom: '20%', right: '0%', left: 'auto' }}>
                            <span style={{ color: '#33ff99' }}>▼</span> Invoice Processing
                        </div>
                    <div className="floating-badge" style={{ top: '35%', right: '10%', bottom: 'auto', left: 'auto', width: 'max-content' }}>
                        <span style={{ color: '#00ffff' }}>◆</span> Pixtall Engine
                    </div>
                    </div>

                    </div>
                </div>
            </div>

            <div className="client-ticker-container">
                <div className="ticker-wrapper">
                    <div className="ticker-content">
                        <div className="client-logo">INTELLIGENT CHAT AUTOMATION</div>
                        <div className="client-logo">PIXTALL</div>
                        <div className="client-logo">EXAMSCALENDAR</div>
                        <div className="client-logo">INVOICE AUTOMATION</div>
                        <div className="client-logo">WHATSAPP HEALTH CARE AUTOMATION</div>
                    </div>
                    <div className="ticker-content">
                        <div className="client-logo">INTELLIGENT CHAT AUTOMATION</div>
                        <div className="client-logo">PIXTALL</div>
                        <div className="client-logo">EXAMSCALENDAR</div>
                        <div className="client-logo">INVOICE AUTOMATION</div>
                        <div className="client-logo">WHATSAPP HEALTH CARE AUTOMATION</div>
                    </div>
                </div>
            </div>
        </section>

        <section className="capabilities reveal">
            <div className="section-badge">// PRODUCTS</div>
            <h2 className="section-title">AI products built for <span className="italic">modern execution.</span></h2>

            <div className="bento-grid">
                <div className="bento-card bento-large reveal">
                    <div className="card-glow"></div>
                    <div className="card-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </div>
                    <h3>ExamsCalendar</h3>
                    <p>It helps you in exam preparation. Stay ahead with intelligent scheduling, real-time alerts, and comprehensive exam tracking automated for students and institutions.</p>
                    <div className="card-tags">
                        <span>EXAM PREP</span><span>SCHEDULING</span><span>ALERTS</span><span>AUTOMATION</span>
                    </div>
                </div>

                <div className="bento-card reveal">
                    <div className="card-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    </div>
                    <h3>WhatsApp Bot</h3>
                    <p>Automate customer interactions 24/7. Handle customer conversations, resolve queries instantly, and coordinate workflows directly over WhatsApp.</p>
                </div>

                <div className="bento-card reveal">
                    <div className="card-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    </div>
                    <h3>Pixtall</h3>
                    <p>Generate advertisement images with AI. Create studio-quality marketing visual assets and banners in seconds without design bottlenecks.</p>
                </div>
            </div>
        </section>

        <section className="workflow reveal">
            <div className="section-badge">// WORKFLOW</div>
            <h2 className="section-title">From brief to live agent in <span className="text-accent">three days.</span></h2>

            <div className="workflow-grid">
                <div className="workflow-card reveal">
                    <div className="workflow-header">
                        <span className="step-num">01</span>
                        <div className="card-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                        </div>
                    </div>
                    <h3>Model your workflow</h3>
                    <p>Upload chats, invoices, and SOPs. Our studio transforms them into autonomous agents with zero engineering required.</p>
                </div>

                <div className="workflow-card reveal">
                    <div className="workflow-header">
                        <span className="step-num">02</span>
                        <div className="card-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                        </div>
                    </div>
                    <h3>Test before it goes live</h3>
                    <p>Simulate real customer interactions and document extraction in a sandbox before launching to production.</p>
                </div>

                <div className="workflow-card reveal">
                    <div className="workflow-header">
                        <span className="step-num">03</span>
                        <div className="card-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                        </div>
                    </div>
                    <h3>Deploy everywhere</h3>
                    <p>Connect your agent seamlessly across WhatsApp, Web, Slack, Email, and ERP systems with real-time telemetry.</p>
                </div>
            </div>
        </section>

        <section className="cta-section reveal">
            <div className="cta-container">
                <h2>Give your business AI automation<br />that <span className="text-accent">never clocks out.</span></h2>
                <Link href="/contact" className="btn btn-primary btn-large">Contact us ↗</Link>
            </div>
        </section>
    </main>
  );
}
