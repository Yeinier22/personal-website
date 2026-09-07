import React from "react";

const LandingSection = () => {
  return (
    <section className="hero" id="home">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Business Intelligence · Data Engineering</p>
          <h1>Business Intelligence Developer</h1>
          <p className="hero-stack">
            Power BI · Microsoft Fabric · SQL · Python
          </p>
          <p className="hero-description">
            I build end-to-end BI solutions, from data pipelines and modeling
            to interactive dashboards and business insights.
          </p>

          <p className="availability">
            <span className="availability-dot" aria-hidden="true" />
            Open to BI and data analytics opportunities
          </p>
        </div>
      </div>
    </section>
  );
};

export default LandingSection;
