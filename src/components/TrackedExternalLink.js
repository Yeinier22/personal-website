import React from "react";
import { trackProfileLink, trackProjectLink } from "../analytics";

const TrackedExternalLink = ({
  eventName,
  href,
  linkLocation,
  linkText,
  projectName,
  projectSlug,
  destinationType,
  children,
  onClick,
  ...anchorProps
}) => {
  const trackActivation = () => {
    const trackingParameters = {
      eventName,
      linkUrl: href,
      linkLocation,
      linkText,
      destinationType,
    };

    if (projectName) {
      trackProjectLink({
        ...trackingParameters,
        projectName,
        projectSlug,
      });
      return;
    }

    trackProfileLink(trackingParameters);
  };

  const trackMiddleClick = (event) => {
    if (event.button === 1) {
      trackActivation();
    }
  };

  const trackPrimaryOrKeyboardClick = (event) => {
    trackActivation();
    onClick?.(event);
  };

  return (
    <a
      {...anchorProps}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackPrimaryOrKeyboardClick}
      onAuxClick={trackMiddleClick}
    >
      {children}
    </a>
  );
};

export default TrackedExternalLink;
