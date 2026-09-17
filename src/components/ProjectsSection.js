import React from "react";
import bankingImage from "../images/Banking/Transactions.png";
import healthcareImage from "../images/Emergency Operations & Patient Flow Analytics/Overview.jpg";
import airportImage from "../images/Airport ETL/fabric-lineage.jpg";
import TrackedExternalLink from "./TrackedExternalLink";

const featuredProjects = [
  {
    analyticsName: "emergency_operations_patient_flow",
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
        eventName: "live_dashboard_click",
        destinationType: "live_dashboard",
      },
    ],
  },
  {
    analyticsName: "banking_analytics_dashboard",
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
        eventName: "live_dashboard_click",
        destinationType: "live_dashboard",
      },
      {
        label: "GitHub",
        href: "https://github.com/Yeinier22/banking-analytics-dashboard",
        eventName: "project_click",
        destinationType: "github",
      },
    ],
  },
  {
    analyticsName: "airport_etl_pipeline",
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
        eventName: "live_dashboard_click",
        destinationType: "live_dashboard",
      },
      {
        label: "GitHub",
        href: "https://github.com/Yeinier22/airport-etl-pipeline",
        eventName: "project_click",
        destinationType: "github",
      },
    ],
  },
];

const webProjects = [
  {
    analyticsName: "flight_finder",
    title: "Flight Finder",
    description:
      "Responsive flight search and comparison experience powered by the Amadeus API.",
    href: "https://flightfinder2025.netlify.app/",
  },
  {
    analyticsName: "movie_explorer",
    title: "Movie Explorer",
    description:
      "React application with live search, suggestions, and infinite scrolling.",
    href: "https://movies-yeinier.netlify.app/",
  },
  {
    analyticsName: "little_lemon",
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
            <article
              className="project-feature"
              key={project.title}
              data-analytics-project=""
              data-project-name={project.title}
              data-project-slug={project.analyticsName}
              data-project-location="featured_projects"
            >
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
                      <TrackedExternalLink
                        className="text-link"
                        href={link.href}
                        key={link.href}
                        eventName={link.eventName}
                        projectName={project.title}
                        projectSlug={project.analyticsName}
                        linkLocation="featured_projects"
                        linkText={link.label}
                        destinationType={link.destinationType}
                      >
                        {link.label} <span aria-hidden="true">↗</span>
                      </TrackedExternalLink>
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
            <TrackedExternalLink
              className="compact-project"
              href={project.href}
              key={project.href}
              eventName="external_link_click"
              projectName={project.title}
              projectSlug={project.analyticsName}
              linkLocation="more_digital_work"
              linkText={project.title}
              destinationType="external"
              data-analytics-project=""
              data-project-name={project.title}
              data-project-slug={project.analyticsName}
              data-project-location="more_digital_work"
            >
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <span className="compact-arrow" aria-hidden="true">
                ↗
              </span>
            </TrackedExternalLink>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
