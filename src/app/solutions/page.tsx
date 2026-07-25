import Link from 'next/link';

export default function Solutions() {
  return (
    <main>
        <section className="hero reveal active" style={{ paddingBottom: '4rem' }}>
            <div className="hero-top-badges">
                <div className="badge green-badge" style={{ borderRadius: '20px', fontWeight: 600 }}>// SOLUTIONS</div>
            </div>

            <div className="hero-content">
                <h1 className="hero-title" style={{ letterSpacing: '-0.04em' }}>
                    Built for the <br />teams that <span className="italic text-white" style={{ color: '#888' }}>pick up</span><br /><span className="italic text-white" style={{ color: '#888' }}>the phone at </span><span className="text-accent">3AM.</span>
                </h1>
            </div>
        </section>

        <section className="solutions-grid-section reveal active" style={{ paddingTop: 0, paddingBottom: '6rem' }}>
            <div className="solution-grid">
                <div className="solution-card">
                    <div className="solution-subtitle">CUSTOMER SUPPORT</div>
                    <h3 className="solution-title">Intelligent Chat Automation</h3>
                    <p className="solution-desc">Tired of pre-trained bot replies? We provide real-time replies.</p>
                </div>
                <div className="solution-card">
                    <div className="solution-subtitle">SALES & GROWTH</div>
                    <h3 className="solution-title">Invoice Automation</h3>
                    <p className="solution-desc">Invoice processing shouldn't slow you down. Automatically extract, validate, and process invoices from your inbox to your ERP with zero manual data entry.</p>
                </div>
            </div>
        </section>
        
        <section className="cta-section reveal active" style={{ paddingTop: 0, paddingBottom: '8rem' }}>
            <div className="cta-container" style={{ background: '#111', borderRadius: '24px', padding: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h2 style={{ margin: 0, fontSize: '2.5rem', textAlign: 'left', maxWidth: '600px', letterSpacing: '-0.03em' }}>Not sure which solution fits? <span className="text-accent">We'll map it out.</span></h2>
                <Link href="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', borderRadius: '30px' }}>Contact us ↗</Link>
            </div>
        </section>
    </main>
  );
}
