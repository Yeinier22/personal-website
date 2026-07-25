import React from "react";

const AboutSection = () => {
  return (
    <section className="section" id="about-section">
      <div className="container about-grid">
        <header className="about-heading">
          <p className="eyebrow">About</p>
          <h2>Useful insight, thoughtfully delivered.</h2>
        </header>

        <div className="about-content">
          <p className="about-lead">
            I&apos;m a BI Developer based in Miami, focused on transforming raw
            data into clear, useful experiences for real business decisions.
          </p>
          <p>
            My work connects analytics and implementation: from data modeling
            and ETL pipelines to the final dashboard or web interface. I care
            about accuracy, maintainability, and making the result intuitive
            for the people who use it.
          </p>

          <div className="principles" aria-label="Working principles">
            <div>
              <strong>Clear</strong>
              <span>Information should be understood quickly.</span>
            </div>
            <div>
              <strong>Practical</strong>
              <span>Every visual should support a real decision.</span>
            </div>
            <div>
              <strong>Reliable</strong>
              <span>Good experiences begin with trustworthy data.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
