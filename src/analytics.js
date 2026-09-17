import {
  ACTIVE_ENGAGEMENT_THRESHOLDS,
  ANALYTICS_EVENTS,
  HIGH_INTENT_MIN_SECONDS,
  HIGH_INTENT_PROJECT_COUNT,
  RESUME_ENGAGEMENT_MIN_SECONDS,
  SCROLL_THRESHOLDS,
} from "./analyticsConfig";
import {
  getOriginalAttribution,
  getPortfolioSessionId,
  readAnalyticsSessionState,
  writeAnalyticsSessionState,
} from "./analyticsAttribution";

const getBrowserStorage = (windowObject) => {
  try {
    return windowObject?.sessionStorage;
  } catch {
    return undefined;
  }
};

const uniqueValues = (values = []) => new Set(values);

export const createAnalytics = ({
  measurementId,
  isProduction,
  enableLocalAnalytics = false,
  debugEnabled = false,
  windowObject,
  documentObject,
  locationObject = windowObject?.location,
  storage = getBrowserStorage(windowObject),
  cryptoObject = windowObject?.crypto,
}) => {
  let isInitialized = false;
  let hasTrackedInitialPageView = false;
  const firedScrollThresholds = new Set();
  const shouldDebug = Boolean(debugEnabled && !isProduction);

  const attribution = getOriginalAttribution({
    storage,
    locationObject,
  });
  const portfolioSessionId = getPortfolioSessionId({ storage, cryptoObject });
  const storedState = readAnalyticsSessionState(storage);
  const sessionState = {
    activeTimeSeconds: Number(storedState.activeTimeSeconds) || 0,
    projectViews: uniqueValues(storedState.projectViews),
    projectsEngaged: uniqueValues(storedState.projectsEngaged),
    firedSessionEvents: uniqueValues(storedState.firedSessionEvents),
    engagementMilestones: uniqueValues(storedState.engagementMilestones),
    liveDashboardOpened: Boolean(storedState.liveDashboardOpened),
    githubProjectOpened: Boolean(storedState.githubProjectOpened),
  };

  const persistSessionState = () => {
    writeAnalyticsSessionState(storage, {
      activeTimeSeconds: sessionState.activeTimeSeconds,
      projectViews: Array.from(sessionState.projectViews),
      projectsEngaged: Array.from(sessionState.projectsEngaged),
      firedSessionEvents: Array.from(sessionState.firedSessionEvents),
      engagementMilestones: Array.from(sessionState.engagementMilestones),
      liveDashboardOpened: sessionState.liveDashboardOpened,
      githubProjectOpened: sessionState.githubProjectOpened,
    });
  };

  const isEnabled = () =>
    (isProduction || enableLocalAnalytics) &&
    Boolean(measurementId?.trim()) &&
    Boolean(windowObject) &&
    Boolean(documentObject);

  const getBaseParameters = () => ({
    ...attribution,
    portfolio_session_id: portfolioSessionId,
  });

  const sendEvent = (eventName, parameters = {}) => {
    if (
      !isEnabled() ||
      !eventName ||
      typeof windowObject.gtag !== "function"
    ) {
      return false;
    }

    const eventParameters = {
      ...parameters,
      ...getBaseParameters(),
      send_to: measurementId,
    };

    if (shouldDebug) {
      eventParameters.debug_mode = true;
    }

    windowObject.gtag("event", eventName, eventParameters);

    if (shouldDebug) {
      windowObject.console.info(`[Analytics] ${eventName}`, eventParameters);
    }

    return true;
  };

  const fireSessionEventOnce = (eventName, parameters) => {
    if (sessionState.firedSessionEvents.has(eventName)) {
      return false;
    }

    sessionState.firedSessionEvents.add(eventName);
    persistSessionState();
    sendEvent(eventName, parameters);
    return true;
  };

  const evaluateBehaviorSignals = () => {
    const commonParameters = {
      active_time_seconds: sessionState.activeTimeSeconds,
      projects_engaged_count: sessionState.projectsEngaged.size,
    };

    if (
      attribution.traffic_type === "resume" &&
      sessionState.activeTimeSeconds >= RESUME_ENGAGEMENT_MIN_SECONDS &&
      sessionState.projectsEngaged.size >= 1
    ) {
      fireSessionEventOnce(
        ANALYTICS_EVENTS.RESUME_ENGAGED_VISIT,
        commonParameters
      );
    }

    if (
      sessionState.activeTimeSeconds >= HIGH_INTENT_MIN_SECONDS &&
      (sessionState.projectsEngaged.size >= HIGH_INTENT_PROJECT_COUNT ||
        sessionState.liveDashboardOpened ||
        sessionState.githubProjectOpened)
    ) {
      fireSessionEventOnce(ANALYTICS_EVENTS.HIGH_INTENT_VISIT, commonParameters);
    }
  };

  const initialize = () => {
    if (!isEnabled() || isInitialized) {
      return false;
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
      sendEvent(ANALYTICS_EVENTS.PAGE_VIEW, {
        page_location: windowObject.location.href,
        page_path: `${windowObject.location.pathname}${windowObject.location.search}`,
        page_title: documentObject.title,
      });
    }

    return true;
  };

  const trackProfile = ({
    eventName,
    linkUrl,
    linkLocation,
    linkText,
    destinationType,
  }) =>
    sendEvent(eventName, {
      link_url: linkUrl,
      link_location: linkLocation,
      link_text: linkText,
      destination_type: destinationType,
    });

  const trackProject = ({
    projectName,
    projectSlug,
    linkUrl,
    linkLocation,
    linkText,
    destinationType,
    eventName,
  }) => {
    sessionState.projectsEngaged.add(projectSlug);

    if (eventName === ANALYTICS_EVENTS.LIVE_DASHBOARD_CLICK) {
      sessionState.liveDashboardOpened = true;
    }

    if (destinationType === "github") {
      sessionState.githubProjectOpened = true;
    }

    persistSessionState();
    const sent = sendEvent(eventName, {
      project_name: projectName,
      project_slug: projectSlug,
      link_url: linkUrl,
      link_location: linkLocation,
      link_text: linkText,
      destination_type: destinationType,
    });
    evaluateBehaviorSignals();
    return sent;
  };

  const trackProjectView = ({
    projectName,
    projectSlug,
    linkLocation = "project_list",
  }) => {
    if (!projectSlug || sessionState.projectViews.has(projectSlug)) {
      return false;
    }

    sessionState.projectViews.add(projectSlug);
    sessionState.projectsEngaged.add(projectSlug);
    persistSessionState();
    sendEvent(ANALYTICS_EVENTS.PROJECT_VIEW, {
      project_name: projectName,
      project_slug: projectSlug,
      link_location: linkLocation,
    });
    evaluateBehaviorSignals();
    return true;
  };

  const trackScrollDepth = (scrollPercent) => {
    SCROLL_THRESHOLDS.forEach((threshold) => {
      if (scrollPercent < threshold || firedScrollThresholds.has(threshold)) {
        return;
      }

      firedScrollThresholds.add(threshold);
      sendEvent(ANALYTICS_EVENTS.SCROLL_DEPTH, {
        scroll_percent: threshold,
        page_path: `${windowObject.location.pathname}${windowObject.location.search}`,
      });
    });
  };

  const recordActiveSeconds = (seconds = 1) => {
    if (!Number.isFinite(seconds) || seconds <= 0) {
      return;
    }

    sessionState.activeTimeSeconds += seconds;

    ACTIVE_ENGAGEMENT_THRESHOLDS.forEach((threshold) => {
      if (
        sessionState.activeTimeSeconds < threshold ||
        sessionState.engagementMilestones.has(threshold)
      ) {
        return;
      }

      sessionState.engagementMilestones.add(threshold);
      sendEvent(`engagement_${threshold}s`, {
        active_time_seconds: threshold,
        page_path: `${windowObject.location.pathname}${windowObject.location.search}`,
      });
    });

    persistSessionState();
    evaluateBehaviorSignals();
  };

  const getAnalyticsContext = () => ({
    attribution: { ...attribution },
    portfolioSessionId,
    activeTimeSeconds: sessionState.activeTimeSeconds,
    projectsEngaged: Array.from(sessionState.projectsEngaged),
    projectViews: Array.from(sessionState.projectViews),
    firedSessionEvents: Array.from(sessionState.firedSessionEvents),
  });

  return {
    initialize,
    isEnabled,
    sendEvent,
    trackProfile,
    trackProject,
    trackProjectView,
    trackScrollDepth,
    recordActiveSeconds,
    evaluateBehaviorSignals,
    getAnalyticsContext,
  };
};

const analytics = createAnalytics({
  measurementId: process.env.REACT_APP_GA_MEASUREMENT_ID,
  isProduction: process.env.NODE_ENV === "production",
  enableLocalAnalytics:
    process.env.REACT_APP_GA_ENABLE_LOCAL_ANALYTICS === "true",
  debugEnabled: process.env.REACT_APP_GA_DEBUG === "true",
  windowObject: typeof window === "undefined" ? undefined : window,
  documentObject: typeof document === "undefined" ? undefined : document,
});

export const initializeAnalytics = analytics.initialize;
export const trackProfileLink = analytics.trackProfile;
export const trackProjectLink = analytics.trackProject;
export const trackVisibleProject = analytics.trackProjectView;
export const trackScrollDepth = analytics.trackScrollDepth;
export const recordActiveEngagement = analytics.recordActiveSeconds;
export const getAnalyticsContext = analytics.getAnalyticsContext;
