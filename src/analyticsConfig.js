export const ANALYTICS_EVENTS = Object.freeze({
  PAGE_VIEW: "page_view",
  PROJECT_VIEW: "project_view",
  PROJECT_CLICK: "project_click",
  GITHUB_CLICK: "github_click",
  LINKEDIN_CLICK: "linkedin_click",
  LIVE_DASHBOARD_CLICK: "live_dashboard_click",
  EXTERNAL_LINK_CLICK: "external_link_click",
  SCROLL_DEPTH: "scroll_depth",
  RESUME_ENGAGED_VISIT: "resume_engaged_visit",
  HIGH_INTENT_VISIT: "high_intent_visit",
});

export const SCROLL_THRESHOLDS = Object.freeze([25, 50, 75, 100]);
export const ACTIVE_ENGAGEMENT_THRESHOLDS = Object.freeze([15, 30, 60, 120]);
export const RESUME_ENGAGEMENT_MIN_SECONDS = 30;
export const HIGH_INTENT_MIN_SECONDS = 60;
export const HIGH_INTENT_PROJECT_COUNT = 2;
export const PROJECT_VIEW_THRESHOLD = 0.4;
export const PROJECT_VIEW_MIN_VISIBLE_MS = 1000;

export const ANALYTICS_STORAGE_KEYS = Object.freeze({
  ATTRIBUTION: "portfolio_original_attribution_v1",
  SESSION_ID: "portfolio_session_id_v1",
  SESSION_STATE: "portfolio_analytics_state_v1",
});
