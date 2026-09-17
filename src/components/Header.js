import React, { useEffect, useState } from "react";
import TrackedExternalLink from "./TrackedExternalLink";

const navigation = [
  { label: "Work", href: "#projects-section" },
  { label: "About", href: "#about-section" },
  { label: "Expertise", href: "#skills-section" },
  { label: "Contact", href: "#contactme-section" },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Yeinier22",
    eventName: "github_click",
    destinationType: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yeinier-valdes-8a5390267",
    eventName: "linkedin_click",
    destinationType: "linkedin",
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const NavigationLinks = () => (
    <>
      <ul className="nav-list">
        {navigation.map((item) => (
          <li key={item.href}>
            <a className="nav-link" href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <ul className="social-list" aria-label="Social links">
        {socials.map((social) => (
          <li key={social.href}>
            <TrackedExternalLink
              className="social-link"
              href={social.href}
              eventName={social.eventName}
              linkLocation="header"
              linkText={social.label}
              destinationType={social.destinationType}
              onClick={closeMenu}
            >
              {social.label}
            </TrackedExternalLink>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#home" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">
            YV
          </span>
          <span className="brand-name">Yeinier Valdes</span>
        </a>

        <nav className="desktop-navigation" aria-label="Primary navigation">
          <NavigationLinks />
        </nav>

        <button
          className={`menu-button ${isOpen ? "is-open" : ""}`}
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`mobile-navigation ${isOpen ? "is-open" : ""}`}
        aria-label="Mobile navigation"
      >
        <NavigationLinks />
      </nav>
    </header>
  );
};

export default Header;
