import React from "react";
import TrackedExternalLink from "./TrackedExternalLink";

const profileLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Yeinier22",
    eventName: "github_click",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yeinier-valdes-8a5390267",
    eventName: "linkedin_click",
  },
];

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span>© 2026 Yeinier Valdes</span>
        <div className="footer-links">
          {profileLinks.map((link) => (
            <TrackedExternalLink
              href={link.href}
              key={link.href}
              eventName={link.eventName}
              linkLocation="footer"
              linkText={link.label}
            >
              {link.label}
            </TrackedExternalLink>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
