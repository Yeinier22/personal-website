import React from "react";
import bankingImage from "../images/Banking/Transactions.png";
import healthcareImage from "../images/Emergency Operations & Patient Flow Analytics/Overview.jpg";
import airportImage from "../images/Airport ETL/fabric-lineage.jpg";

const featuredProjects = [
  {
    title: "Emergency Operations & Patient Flow",
    description:
      "A three-page executive dashboard created for the FP20 Analytics Challenge. It connects emergency operations, workforce performance, patient flow, and financial outcomes through a consistent analytical story.",
    image: healthcareImage,
    alt: "Overview page of the Emergency Operations and Patient Flow dashboard",
    technologies: ["Power BI", "DAX", "Data Modeling", "ZoomCharts"],
    links: [
      {
        label: "View Power BI report",
        href: "https://app.powerbi.com/view?r=eyJrIjoiNDA4NTVlY2MtYmNmZC00MzZiLTkyOWUtMmIyODJkNGE4YzE3IiwidCI6IjA1MjEzYjk4LTdiNzAtNDNlOS05YjVmLWVkYmMzODhmNjRkMCJ9",
      },
    ],
  },
  {
    title: "Banking Analytics Dashboard",
    description:
      "An interactive Power BI experience for exploring customer demographics, financial health, transactions, and behavioral patterns. The report uses focused navigation and cross-filtering to make complex banking data easier to understand.",
    image: bankingImage,
    alt: "Transactions page from the Banking Analytics Dashboard",
    technologies: ["Power BI", "DAX", "Power Query", "SQL"],
    links: [
      {
        label: "View live dashboard",
        href: "https://app.powerbi.com/view?r=eyJrIjoiNDViZTEwYWYtZDRjZS00YjQyLTk4NWUtMmUzYjExNzhlNDIwIiwidCI6IjA1MjEzYjk4LTdiNzAtNDNlOS05YjVmLWVkYmMzODhmNjRkMCJ9",
      },
      {
        label: "GitHub",
        href: "https://github.com/Yeinier22/banking-analytics-dashboard",
      },
    ],
  },
  {
    title: "Airport Analytics Platform",
    description:
      "An end-to-end analytics platform built with Microsoft Fabric, transforming 85,000+ airport records through a Bronze–Silver–Gold Lakehouse architecture using Data Factory, PySpark, Delta Lake, and Power BI.",
    image: airportImage,
    alt: "Microsoft Fabric lineage for the Airport Analytics Platform",
    technologies: [
      "Microsoft Fabric",
      "Data Factory",
      "PySpark",
      "Delta Lake",
      "Power BI",
    ],
    links: [
      {
        label: "View Power BI report",
        href: "https://app.fabric.microsoft.com/view?r=eyJrIjoiMjZiZjMyNTEtZTE2ZC00NTcyLThlNjYtYmZkYjBkNDhjM2FhIiwidCI6IjA1MjEzYjk4LTdiNzAtNDNlOS05YjVmLWVkYmMzODhmNjRkMCJ9",
      },
      {
        label: "GitHub",
        href: "https://github.com/Yeinier22/airport-etl-pipeline",
      },
    ],
  },
];

const webProjects = [
  {
    title: "Flight Finder",
    description:
      "Responsive flight search and comparison experience powered by the Amadeus API.",
    href: "https://flightfinder2025.netlify.app/",
  },
  {
    title: "Movie Explorer",
    description:
      "React application with live search, suggestions, and infinite scrolling.",
    href: "https://movies-yeinier.netlify.app/",
  },
  {
    title: "Little Lemon",
    description:
      "Restaurant website with a responsive reservation and availability flow.",
    href: "https://little-lemmon-yeinier.netlify.app/",
  },
];

const ProjectsSection = () => {
  return (
    <section className="section section--soft" id="projects-section">
      <div className="container">
        <header className="section-heading">
          <p className="eyebrow">Selected work</p>
          <h2>Data products built for clarity and action.</h2>
        </header>

        <div className="project-list">
          {featuredProjects.map((project, index) => (
            <article className="project-feature" key={project.title}>
              <div className="project-media">
                <img src={project.image} alt={project.alt} />
              </div>
              <div className="project-content">
                <p className="project-index">
                  {String(index + 1).padStart(2, "0")} / Featured project
                </p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <ul className="technology-list" aria-label="Technologies used">
                  {project.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
                {project.links.length > 0 && (
                  <div className="project-links">
                    {project.links.map((link) => (
                      <a
                        className="text-link"
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        key={link.href}
                      >
                        {link.label} <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="more-work">
          <div className="more-work-header">
            <h3>More digital work</h3>
            <p>Selected React applications</p>
          </div>
          {webProjects.map((project) => (
            <a
              className="compact-project"
              href={project.href}
              target="_blank"
              rel="noreferrer"
              key={project.href}
            >
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <span className="compact-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
