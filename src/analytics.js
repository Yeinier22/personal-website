export const createAnalytics = ({
  measurementId,
  isProduction,
  windowObject,
  documentObject,
}) => {
  let isInitialized = false;
  let hasTrackedInitialPageView = false;

  const isEnabled = () =>
    isProduction &&
    Boolean(measurementId?.trim()) &&
    Boolean(windowObject) &&
    Boolean(documentObject);

  const sendEvent = (eventName, parameters = {}) => {
    if (!isEnabled()) {
      return;
    }

    windowObject.gtag?.("event", eventName, parameters);
  };

  const initialize = () => {
    if (!isEnabled() || isInitialized) {
      return;
    }

    isInitialized = true;
    windowObject.dataLayer = windowObject.dataLayer || [];
    windowObject.gtag =
      windowObject.gtag ||
      function gtag() {
        windowObject.dataLayer.push(arguments);
      };

    windowObject.gtag("js", new Date());
    windowObject.gtag("config", measurementId, { send_page_view: false });

    if (!documentObject.getElementById("google-analytics-script")) {
      const script = documentObject.createElement("script");
      script.id = "google-analytics-script";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
        measurementId
      )}`;
      documentObject.head.appendChild(script);
    }

    if (!hasTrackedInitialPageView) {
      hasTrackedInitialPageView = true;
      sendEvent("page_view", {
        page_location: windowObject.location.href,
        page_path: `${windowObject.location.pathname}${windowObject.location.search}`,
        page_title: documentObject.title,
      });
    }
  };

  const trackProfile = ({ eventName, linkUrl, linkLocation, linkText }) => {
    sendEvent(eventName, {
      link_url: linkUrl,
      link_location: linkLocation,
      link_text: linkText,
    });
  };

  const trackProject = ({
    projectName,
    linkUrl,
    linkLocation,
    linkText,
    eventName,
  }) => {
    const parameters = {
      project_name: projectName,
      link_url: linkUrl,
      link_location: linkLocation,
      link_text: linkText,
    };

    sendEvent("project_click", parameters);
    sendEvent(eventName, parameters);
  };

  return {
    initialize,
    trackProfile,
    trackProject,
  };
};

const analytics = createAnalytics({
  measurementId: process.env.REACT_APP_GA_MEASUREMENT_ID,
  isProduction: process.env.NODE_ENV === "production",
  windowObject: typeof window === "undefined" ? undefined : window,
  documentObject: typeof document === "undefined" ? undefined : document,
});

export const initializeAnalytics = analytics.initialize;
export const trackProfileLink = analytics.trackProfile;
export const trackProjectLink = analytics.trackProject;
