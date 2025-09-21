export default function Home() {
  return (
    <main className="main-content">
      <div className="hero-section">
        <h1>Welcome to QuantTicker</h1>
        <p className="hero-subtitle">Your premier quantitative trading platform powered by AI</p>
        <div className="hero-features">
          <div className="feature-card">
            <h3>AI-Powered Analysis</h3>
            <p>Advanced machine learning algorithms for market prediction and analysis</p>
          </div>
          <div className="feature-card">
            <h3>Real-Time Trading</h3>
            <p>Execute trades with lightning-fast speed and precision</p>
          </div>
          <div className="feature-card">
            <h3>Risk Management</h3>
            <p>Sophisticated risk assessment and portfolio optimization tools</p>
          </div>
        </div>
        <div className="cta-buttons">
          <button className="btn-primary">Get Started</button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </div>
    </main>
  );
}
