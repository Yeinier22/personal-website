import { createAnalytics } from "./analytics";

const createMemoryStorage = () => {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    clear: () => values.clear(),
  };
};

const clearAnalyticsGlobals = () => {
  document.getElementById("google-analytics-script")?.remove();
  delete window.dataLayer;
  delete window.gtag;
  window.history.replaceState({}, "", "/");
};

afterEach(clearAnalyticsGlobals);

const createTestAnalytics = ({
  isProduction = true,
  enableLocalAnalytics = false,
  measurementId = "G-TEST123",
  storage = createMemoryStorage(),
  search = "",
  debugEnabled = false,
} = {}) => {
  window.history.replaceState({}, "", `/${search}`);
  return createAnalytics({
    measurementId,
    isProduction,
    enableLocalAnalytics,
    debugEnabled,
    windowObject: window,
    documentObject: document,
    locationObject: {
      hostname: "portfolio.example.com",
      pathname: "/",
      search,
    },
    storage,
    cryptoObject: { randomUUID: () => "anonymous-test-session" },
  });
};

const getCommands = () =>
  (window.dataLayer || []).map((entry) => Array.from(entry));

const getEvents = (eventName) =>
  getCommands().filter(
    ([command, name]) => command === "event" && name === eventName
  );

test("initializes GA once and sends a single manual page view", () => {
  const analytics = createTestAnalytics();
  analytics.initialize();
  analytics.initialize();

  expect(document.querySelectorAll("#google-analytics-script")).toHaveLength(1);
  expect(getCommands()).toContainEqual([
    "config",
    "G-TEST123",
    { send_page_view: false },
  ]);
  expect(getEvents("page_view")).toHaveLength(1);
});

test("keeps local development disabled unless explicitly enabled", () => {
  const disabledAnalytics = createTestAnalytics({ isProduction: false });
  expect(disabledAnalytics.initialize()).toBe(false);
  expect(window.dataLayer).toBeUndefined();

  const enabledAnalytics = createTestAnalytics({
    isProduction: false,
    enableLocalAnalytics: true,
  });
  expect(enabledAnalytics.initialize()).toBe(true);
  expect(getEvents("page_view")).toHaveLength(1);
});

test("does not fail when the measurement ID is missing", () => {
  const analytics = createTestAnalytics({ measurementId: null });
  expect(() => analytics.initialize()).not.toThrow();
  expect(window.dataLayer).toBeUndefined();
});

test("attaches original attribution and anonymous session context to events", () => {
  const analytics = createTestAnalytics({
    search:
      "?utm_source=resume&utm_medium=pdf&utm_campaign=acme_bi&utm_content=portfolio_link",
  });
  analytics.initialize();
  analytics.trackProfile({
    eventName: "linkedin_click",
    linkUrl: "https://linkedin.com/in/example",
    linkLocation: "header",
    linkText: "LinkedIn",
    destinationType: "linkedin",
  });

  const parameters = getEvents("linkedin_click")[0][2];
  expect(parameters).toEqual(
    expect.objectContaining({
      traffic_source: "resume",
      traffic_medium: "pdf",
      traffic_campaign: "acme_bi",
      traffic_content: "portfolio_link",
      traffic_type: "resume",
      portfolio_session_id: "anonymous-test-session",
      destination_type: "linkedin",
      send_to: "G-TEST123",
    })
  );
});

test("tracks project context and prevents duplicate project views", () => {
  const analytics = createTestAnalytics();
  analytics.initialize();

  expect(
    analytics.trackProjectView({
      projectName: "Airport Analytics Platform",
      projectSlug: "airport_etl_pipeline",
    })
  ).toBe(true);
  expect(
    analytics.trackProjectView({
      projectName: "Airport Analytics Platform",
      projectSlug: "airport_etl_pipeline",
    })
  ).toBe(false);

  analytics.trackProject({
    projectName: "Airport Analytics Platform",
    projectSlug: "airport_etl_pipeline",
    linkUrl: "https://example.com/report",
    linkLocation: "featured_projects",
    linkText: "View report",
    destinationType: "live_dashboard",
    eventName: "live_dashboard_click",
  });

  expect(getEvents("project_view")).toHaveLength(1);
  expect(getEvents("live_dashboard_click")[0][2]).toEqual(
    expect.objectContaining({
      project_name: "Airport Analytics Platform",
      project_slug: "airport_etl_pipeline",
      link_location: "featured_projects",
      destination_type: "live_dashboard",
    })
  );
});

test("fires active-time milestones once", () => {
  const analytics = createTestAnalytics();
  analytics.initialize();
  analytics.recordActiveSeconds(14);
  analytics.recordActiveSeconds(1);
  analytics.recordActiveSeconds(15);
  analytics.recordActiveSeconds(90);
  analytics.recordActiveSeconds(10);

  [15, 30, 60, 120].forEach((threshold) => {
    expect(getEvents(`engagement_${threshold}s`)).toHaveLength(1);
  });
});

test("fires each scroll threshold once per page view", () => {
  const analytics = createTestAnalytics();
  analytics.initialize();
  analytics.trackScrollDepth(76);
  analytics.trackScrollDepth(100);
  analytics.trackScrollDepth(100);

  expect(
    getEvents("scroll_depth").map(([, , parameters]) => parameters.scroll_percent)
  ).toEqual([25, 50, 75, 100]);
});

test("fires resume_engaged_visit once after 30 active seconds and project engagement", () => {
  const analytics = createTestAnalytics({
    search: "?utm_source=resume&utm_medium=pdf&utm_campaign=acme_bi",
  });
  analytics.initialize();
  analytics.recordActiveSeconds(30);
  expect(getEvents("resume_engaged_visit")).toHaveLength(0);

  analytics.trackProjectView({
    projectName: "Banking Analytics Dashboard",
    projectSlug: "banking_analytics_dashboard",
  });
  analytics.evaluateBehaviorSignals();

  expect(getEvents("resume_engaged_visit")).toHaveLength(1);
  expect(getEvents("resume_engaged_visit")[0][2]).toEqual(
    expect.objectContaining({
      active_time_seconds: 30,
      projects_engaged_count: 1,
      traffic_campaign: "acme_bi",
    })
  );
});

test("fires high_intent_visit once after 60 active seconds and two projects", () => {
  const analytics = createTestAnalytics();
  analytics.initialize();
  analytics.trackProjectView({
    projectName: "Emergency Operations & Patient Flow",
    projectSlug: "emergency_operations_patient_flow",
  });
  analytics.trackProjectView({
    projectName: "Banking Analytics Dashboard",
    projectSlug: "banking_analytics_dashboard",
  });
  analytics.recordActiveSeconds(60);
  analytics.evaluateBehaviorSignals();

  expect(getEvents("high_intent_visit")).toHaveLength(1);
  expect(getEvents("high_intent_visit")[0][2]).toEqual(
    expect.objectContaining({
      active_time_seconds: 60,
      projects_engaged_count: 2,
    })
  );
});

test("debug logging is limited to explicitly enabled local analytics", () => {
  const consoleInfo = jest.spyOn(window.console, "info").mockImplementation();
  const analytics = createTestAnalytics({
    isProduction: false,
    enableLocalAnalytics: true,
    debugEnabled: true,
  });
  analytics.initialize();
  analytics.trackProfile({
    eventName: "github_click",
    linkUrl: "https://github.com/example",
    linkLocation: "header",
    linkText: "GitHub",
    destinationType: "github",
  });

  expect(getEvents("github_click")[0][2].debug_mode).toBe(true);
  expect(consoleInfo).toHaveBeenCalledWith(
    "[Analytics] github_click",
    expect.objectContaining({ portfolio_session_id: "anonymous-test-session" })
  );
  consoleInfo.mockRestore();
});

test("production remains quiet even if the debug flag is present", () => {
  const consoleInfo = jest.spyOn(window.console, "info").mockImplementation();
  const analytics = createTestAnalytics({ debugEnabled: true });
  analytics.initialize();
  analytics.trackProfile({
    eventName: "github_click",
    linkUrl: "https://github.com/example",
    linkLocation: "header",
    linkText: "GitHub",
    destinationType: "github",
  });

  expect(getEvents("github_click")[0][2].debug_mode).toBeUndefined();
  expect(consoleInfo).not.toHaveBeenCalled();
  consoleInfo.mockRestore();
});
