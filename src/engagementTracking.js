import {
  PROJECT_VIEW_MIN_VISIBLE_MS,
  PROJECT_VIEW_THRESHOLD,
} from "./analyticsConfig";
import {
  recordActiveEngagement,
  trackScrollDepth,
  trackVisibleProject,
} from "./analytics";

export const calculateScrollPercent = (windowObject, documentObject) => {
  const documentElement = documentObject.documentElement;
  const body = documentObject.body;
  const scrollHeight = Math.max(
    documentElement?.scrollHeight || 0,
    body?.scrollHeight || 0
  );

  if (!scrollHeight) {
    return 0;
  }

  return Math.min(
    100,
    Math.round(
      ((windowObject.scrollY + windowObject.innerHeight) / scrollHeight) * 100
    )
  );
};

export const createEngagementTracker = ({
  windowObject,
  documentObject,
  analytics = {
    recordActiveEngagement,
    trackScrollDepth,
    trackVisibleProject,
  },
  IntersectionObserverClass = windowObject?.IntersectionObserver,
  setIntervalFn = windowObject?.setInterval?.bind(windowObject),
  clearIntervalFn = windowObject?.clearInterval?.bind(windowObject),
  setTimeoutFn = windowObject?.setTimeout?.bind(windowObject),
  clearTimeoutFn = windowObject?.clearTimeout?.bind(windowObject),
}) => {
  let activeTimer;
  let projectObserver;
  let started = false;
  const projectViewTimers = new Map();

  const handleScroll = () => {
    analytics.trackScrollDepth(
      calculateScrollPercent(windowObject, documentObject)
    );
  };

  const tickActiveTime = () => {
    if (
      documentObject.visibilityState === "visible" &&
      documentObject.hasFocus()
    ) {
      analytics.recordActiveEngagement(1);
    }
  };

  const clearProjectTimer = (element) => {
    const timer = projectViewTimers.get(element);
    if (timer !== undefined) {
      clearTimeoutFn(timer);
      projectViewTimers.delete(element);
    }
  };

  const handleProjectIntersections = (entries) => {
    entries.forEach((entry) => {
      const qualifies =
        entry.isIntersecting &&
        entry.intersectionRatio >= PROJECT_VIEW_THRESHOLD;

      if (!qualifies) {
        clearProjectTimer(entry.target);
        return;
      }

      if (projectViewTimers.has(entry.target)) {
        return;
      }

      const timer = setTimeoutFn(() => {
        projectViewTimers.delete(entry.target);
        analytics.trackVisibleProject({
          projectName: entry.target.dataset.projectName,
          projectSlug: entry.target.dataset.projectSlug,
          linkLocation: entry.target.dataset.projectLocation || "project_list",
        });
      }, PROJECT_VIEW_MIN_VISIBLE_MS);
      projectViewTimers.set(entry.target, timer);
    });
  };

  const start = () => {
    if (started || !windowObject || !documentObject) {
      return;
    }

    started = true;
    windowObject.addEventListener("scroll", handleScroll, { passive: true });
    activeTimer = setIntervalFn(tickActiveTime, 1000);
    handleScroll();

    if (typeof IntersectionObserverClass === "function") {
      projectObserver = new IntersectionObserverClass(
        handleProjectIntersections,
        { threshold: [PROJECT_VIEW_THRESHOLD] }
      );
      documentObject
        .querySelectorAll("[data-analytics-project]")
        .forEach((element) => projectObserver.observe(element));
    }
  };

  const stop = () => {
    if (!started) {
      return;
    }

    started = false;
    windowObject.removeEventListener("scroll", handleScroll);
    clearIntervalFn(activeTimer);
    projectObserver?.disconnect();
    projectViewTimers.forEach((timer) => clearTimeoutFn(timer));
    projectViewTimers.clear();
  };

  return {
    start,
    stop,
    handleScroll,
    tickActiveTime,
    handleProjectIntersections,
  };
};
