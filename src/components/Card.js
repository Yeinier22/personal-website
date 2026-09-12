import React from "react";

const Card = ({ title, description, imageSrc, web }) => {
  return (
    <a
      className="compact-project"
      href={web}
      target="_blank"
      rel="noopener noreferrer"
    >
      <h4>{title}</h4>
      <p>{description}</p>
      <span className="compact-arrow" aria-hidden="true">
        ↗
      </span>
      {imageSrc && <span className="visually-hidden">{imageSrc}</span>}
    </a>
  );
};

export default Card;
