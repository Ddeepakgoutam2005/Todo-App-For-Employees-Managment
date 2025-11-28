import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="landing">
      <section className="hero fade-up">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="accent">Employee</span>
            <br />
            Management Suite
          </h1>
          <p className="hero-copy">Manage your team, assign tasks, track progress, and keep everything organized in one place.</p>
          <div className="hero-actions">
            <Link className="btn btn-gradient" to="/employees">Get Started</Link>
          </div>
        </div>
        <div className="hero-orb">
          <svg viewBox="0 0 300 300" className="orb" aria-hidden>
            <defs>
              <radialGradient id="rg" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff3af2"/>
                <stop offset="50%" stopColor="#7a63ff"/>
                <stop offset="100%" stopColor="#001029"/>
              </radialGradient>
              <linearGradient id="ring" x1="0" x2="1">
                <stop offset="0%" stopColor="#6a5cff"/>
                <stop offset="100%" stopColor="#00d4ff"/>
              </linearGradient>
            </defs>
            <circle cx="150" cy="150" r="90" fill="url(#rg)" opacity="0.9"/>
            <circle cx="150" cy="150" r="110" fill="none" stroke="url(#ring)" strokeWidth="6" opacity="0.8"/>
            <circle cx="150" cy="150" r="70" fill="none" stroke="url(#ring)" strokeWidth="3" opacity="0.6"/>
            <g fill="#00d4ff" opacity="0.9">
              <rect x="140" y="90" width="8" height="8" rx="2"/>
              <rect x="175" y="103" width="8" height="8" rx="2"/>
              <rect x="195" y="130" width="8" height="8" rx="2"/>
              <rect x="175" y="200" width="8" height="8" rx="2"/>
              <rect x="120" y="205" width="8" height="8" rx="2"/>
            </g>
          </svg>
        </div>
      </section>
      
    </div>
  )
}