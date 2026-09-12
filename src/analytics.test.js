import { createAnalytics } from "./analytics";

const clearAnalyticsGlobals = () => {
  document.getElementById("google-analytics-script")?.remove();
  delete window.dataLayer;
  delete window.gtag;
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

test("sends project context with project and destination events", () => {
  const analytics = createTestAnalytics();
  analytics.initialize();
  analytics.trackProject({
    projectName: "airport_etl_pipeline",
    linkUrl: "https://example.com/report",
    linkLocation: "featured_projects",
    linkText: "View report",
    eventName: "live_dashboard_click",
  });

  const commands = window.dataLayer.map((entry) => Array.from(entry));
  const projectClick = commands.find(
    ([command, eventName]) =>
      command === "event" && eventName === "project_click"
  );
  const destinationClick = commands.find(
    ([command, eventName]) =>
      command === "event" && eventName === "live_dashboard_click"
  );

  expect(projectClick[2]).toEqual({
    project_name: "airport_etl_pipeline",
    link_url: "https://example.com/report",
    link_location: "featured_projects",
    link_text: "View report",
  });
  expect(destinationClick[2]).toEqual(projectClick[2]);
});
