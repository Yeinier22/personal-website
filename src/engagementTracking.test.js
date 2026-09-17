import {
  calculateScrollPercent,
  createEngagementTracker,
} from "./engagementTracking";

const createAnalyticsMock = () => ({
  recordActiveEngagement: jest.fn(),
  trackScrollDepth: jest.fn(),
  trackVisibleProject: jest.fn(),
});

test("calculates bounded page scroll percentage", () => {
  expect(
    calculateScrollPercent(
      { scrollY: 500, innerHeight: 500 },
      {
        documentElement: { scrollHeight: 2000 },
        body: { scrollHeight: 1800 },
      }
    )
  ).toBe(50);
});

test("counts active time only while the document is visible and focused", () => {
  const analytics = createAnalyticsMock();
  let visibilityState = "visible";
  let focused = true;
  const documentObject = {
    get visibilityState() {
      return visibilityState;
    },
    hasFocus: () => focused,
    documentElement: { scrollHeight: 2000 },
    body: { scrollHeight: 2000 },
    querySelectorAll: () => [],
  };
  const tracker = createEngagementTracker({
    windowObject: {
      scrollY: 0,
      innerHeight: 500,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
    documentObject,
    analytics,
    setIntervalFn: jest.fn(),
    clearIntervalFn: jest.fn(),
  });

  tracker.tickActiveTime();
  visibilityState = "hidden";
  tracker.tickActiveTime();
  visibilityState = "visible";
  focused = false;
  tracker.tickActiveTime();
  focused = true;
  tracker.tickActiveTime();

  expect(analytics.recordActiveEngagement).toHaveBeenCalledTimes(2);
  expect(analytics.recordActiveEngagement).toHaveBeenNthCalledWith(1, 1);
  expect(analytics.recordActiveEngagement).toHaveBeenNthCalledWith(2, 1);
});

test("records a project only after meaningful intersection visibility", () => {
  const analytics = createAnalyticsMock();
  const visibleProject = {
    dataset: {
      projectName: "Airport Analytics Platform",
      projectSlug: "airport_etl_pipeline",
      projectLocation: "featured_projects",
    },
  };
  const tracker = createEngagementTracker({
    windowObject: {},
    documentObject: {},
    analytics,
    setTimeoutFn: (callback) => {
      callback();
      return 1;
    },
    clearTimeoutFn: jest.fn(),
  });

  tracker.handleProjectIntersections([
    { target: visibleProject, isIntersecting: true, intersectionRatio: 0.2 },
  ]);
  expect(analytics.trackVisibleProject).not.toHaveBeenCalled();

  tracker.handleProjectIntersections([
    { target: visibleProject, isIntersecting: true, intersectionRatio: 0.6 },
  ]);
  expect(analytics.trackVisibleProject).toHaveBeenCalledWith({
    projectName: "Airport Analytics Platform",
    projectSlug: "airport_etl_pipeline",
    linkLocation: "featured_projects",
  });
});
