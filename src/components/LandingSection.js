import React from "react";
import emergencyDashboard from "../images/Emergency Operations & Patient Flow Analytics/Overview.jpg";

const LandingSection = () => {
  return (
    <section className="hero" id="home">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Business Intelligence · Data Engineering</p>
          <h1>
            Complex data.
            <br />
            <span>Clear decisions.</span>
          </h1>
          <p className="hero-description">
            I build Power BI dashboards, automated data pipelines, and modern
            digital experiences that turn information into practical business
            insight.
          </p>

          <div className="hero-actions">
            <a className="button button--primary" href="#projects-section">
              View selected work
            </a>
            <a className="button button--secondary" href="#contactme-section">
              Let&apos;s talk
            </a>
          </div>

          <p className="availability">
            <span className="availability-dot" aria-hidden="true" />
            Open to BI and data analytics opportunities
          </p>
        </div>

        <figure className="hero-visual">
          <div className="hero-frame">
            <img
              src={emergencyDashboard}
              alt="Overview page of the Emergency Operations and Patient Flow dashboard"
            />
          </div>
          <figcaption>
            <strong>Emergency Operations &amp; Patient Flow</strong>
            <span>Power BI · DAX · Data Modeling</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default LandingSection;
