import React from "react";
import { trackProfileLink } from "../analytics";

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
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              key={link.href}
              onClick={() =>
                trackProfileLink({
                  eventName: link.eventName,
                  linkUrl: link.href,
                  linkLocation: "footer",
                  linkText: link.label,
                })
              }
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
