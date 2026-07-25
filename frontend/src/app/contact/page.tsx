'use client';

import { useState } from 'react';
import ParticleBackground from './ParticleBackground';

export default function Contact() {
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });
      const data = await response.json();
      if (response.status === 200 && data.success) {
        setStatus('✓ Message sent! We will get back to you shortly.');
        form.reset();
      } else {
        setStatus('❌ Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('❌ Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <ParticleBackground />
      <section className="reveal active" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
          <div className="contact-container">
              {/* Left Column */}
              <div className="contact-info">
                  <h1 className="hero-title" style={{ letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
                      Contact <span className="text-accent">us</span>
                  </h1>
              </div>

              {/* Right Column */}
              <div className="contact-form">
                  <form id="contactForm" onSubmit={handleSubmit}>
                      <input type="hidden" name="subject" value="New Contact Form Submission - AIVatika" />

                      <div className="form-group">
                          <label htmlFor="name">YOUR NAME</label>
                          <input type="text" id="name" name="name" required placeholder="Ada Lovelace" />
                      </div>
                      
                      <div className="form-row">
                          <div className="form-group">
                              <label htmlFor="email">WORK EMAIL</label>
                              <input type="email" id="email" name="email" required placeholder="ada@company.com" />
                          </div>
                          <div className="form-group">
                              <label htmlFor="company">COMPANY</label>
                              <input type="text" id="company" name="company" placeholder="Acme Inc." />
                          </div>
                      </div>

                      <div className="form-group">
                          <label htmlFor="message">TELL US ABOUT THE WORKFLOW</label>
                          <textarea id="message" name="message" required placeholder="We want to automate our tier-1 phone support in 3 languages..."></textarea>
                      </div>
                      
                      <button type="submit" id="submitBtn" className="btn btn-primary form-submit" disabled={isSubmitting}>
                          {isSubmitting ? 'Sending...' : 'Send'}
                          {!isSubmitting && (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '0.5rem' }}>
                              <line x1="22" y1="2" x2="11" y2="13"></line>
                              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                          )}
                      </button>
                      
                      {status && (
                        <div id="formStatus" style={{ display: 'block', marginTop: '1.5rem', padding: '1rem 1.5rem', borderRadius: '12px', background: 'rgba(163, 230, 53, 0.1)', border: '1px solid var(--accent)', color: 'var(--accent)', fontWeight: 500, fontSize: '0.95rem', textAlign: 'center' }}>
                            {status}
                        </div>
                      )}
                  </form>
              </div>
          </div>
      </section>
    </main>
  );
}
