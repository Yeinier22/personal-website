import React from "react";

const skillGroups = [
  {
    title: "Business Intelligence",
    items: [
      "Power BI",
      "DAX",
      "Power Query",
      "Data modeling",
      "Dashboard design",
    ],
  },
  {
    title: "Data Engineering",
    items: [
      "Python",
      "Pandas",
      "SQL",
      "ETL pipelines",
      "Docker & automation",
    ],
  },
  {
    title: "Digital Experiences",
    items: [
      "React",
      "JavaScript",
      "Semantic HTML",
      "Responsive CSS",
      "Accessible UI",
    ],
  },
];

const SkillsSection = () => {
  return (
    <section className="section section--soft" id="skills-section">
      <div className="container">
        <header className="section-heading">
          <p className="eyebrow">Expertise</p>
          <h2>One toolkit, from raw data to final experience.</h2>
        </header>

        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <article className="skill-group" key={group.title}>
              <span className="skill-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
