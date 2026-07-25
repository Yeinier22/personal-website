import React from "react";

const FullScreenSection = ({ children, className = "", ...sectionProps }) => {
  return (
    <section className={`section ${className}`.trim()} {...sectionProps}>
      <div className="container">{children}</div>
    </section>
  );
};

export default FullScreenSection;
