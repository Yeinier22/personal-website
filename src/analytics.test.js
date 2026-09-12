import { createAnalytics } from "./analytics";

const clearAnalyticsGlobals = () => {
  document.getElementById("google-analytics-script")?.remove();
  delete window.dataLayer;
  delete window.gtag;
  window.history.replaceState({}, "", "/");
};

afterEach(clearAnalyticsGlobals);

const createTestAnalytics = (
  isProduction = true,
  measurementId = "G-TEST123"
) =>
  createAnalytics({
    measurementId,
    isProduction,
    windowObject: window,
    documentObject: document,
  });

test("does not initialize analytics outside production", () => {
  const analytics = createTestAnalytics(false);
  analytics.initialize();

  expect(document.getElementById("google-analytics-script")).toBeNull();
  expect(window.dataLayer).toBeUndefined();
});

test("does not initialize analytics without a measurement ID", () => {
  const analytics = createTestAnalytics(true, null);
  expect(() => analytics.initialize()).not.toThrow();

  expect(document.getElementById("google-analytics-script")).toBeNull();
  expect(window.dataLayer).toBeUndefined();
});

test("initializes once and sends a single manual page view", () => {
  const analytics = createTestAnalytics();
  analytics.initialize();
  analytics.initialize();

  expect(document.querySelectorAll("#google-analytics-script")).toHaveLength(1);

  const commands = window.dataLayer.map((entry) => Array.from(entry));
  expect(commands).toContainEqual([
    "config",
    "G-TEST123",
    { send_page_view: false },
  ]);
  expect(
    commands.filter(
      ([command, eventName]) => command === "event" && eventName === "page_view"
    )
  ).toHaveLength(1);
});

test("sends one explicitly routed event for each link strategy", () => {
  const analytics = createTestAnalytics();
  analytics.initialize();

  analytics.trackProfile({
    linkUrl: "https://github.com/example",
    linkLocation: "header",
    linkText: "GitHub",
    eventName: "github_click",
  });
  analytics.trackProfile({
    linkUrl: "https://linkedin.com/in/example",
    linkLocation: "header",
    linkText: "LinkedIn",
    eventName: "linkedin_click",
  });
  analytics.trackProject({
    projectName: "airport_etl_pipeline",
    linkUrl: "https://github.com/example/project",
    linkLocation: "featured_projects",
    linkText: "GitHub",
    eventName: "project_click",
  });
  analytics.trackProject({
    projectName: "airport_etl_pipeline",
    linkUrl: "https://example.com/dashboard",
    linkLocation: "featured_projects",
    linkText: "View report",
    eventName: "live_dashboard_click",
  });
  analytics.trackProject({
    projectName: "flight_finder",
    linkUrl: "https://example.com/app",
    linkLocation: "more_digital_work",
    linkText: "Flight Finder",
    eventName: "external_link_click",
  });

  const commands = window.dataLayer.map((entry) => Array.from(entry));
  const customEvents = commands.filter(
    ([command, eventName]) =>
      command === "event" && eventName !== "page_view"
  );

  expect(customEvents.map(([, eventName]) => eventName)).toEqual([
    "github_click",
    "linkedin_click",
    "project_click",
    "live_dashboard_click",
    "external_link_click",
  ]);
  expect(customEvents).toHaveLength(5);
  customEvents.forEach(([, , parameters]) => {
    expect(parameters.send_to).toBe("G-TEST123");
  });
});

test("adds debug mode only when requested in the production URL", () => {
  const consoleInfo = jest.spyOn(window.console, "info").mockImplementation();
  window.history.pushState({}, "", "/?debug_mode=true");
  const analytics = createTestAnalytics();
  analytics.initialize();
  analytics.trackProfile({
    eventName: "github_click",
    linkUrl: "https://github.com/example",
    linkLocation: "header",
    linkText: "GitHub",
  });

  const commands = window.dataLayer.map((entry) => Array.from(entry));
  const githubClick = commands.find(
    ([command, eventName]) =>
      command === "event" && eventName === "github_click"
  );

  expect(githubClick[2].debug_mode).toBe(true);
  expect(consoleInfo).toHaveBeenCalledWith(
    "[GA4] sent github_click",
    expect.objectContaining({ debug_mode: true, send_to: "G-TEST123" })
  );
  consoleInfo.mockRestore();
});
