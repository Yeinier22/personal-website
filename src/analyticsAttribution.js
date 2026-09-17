import { ANALYTICS_STORAGE_KEYS } from "./analyticsConfig";

const UTM_FIELDS = Object.freeze({
  utm_source: "traffic_source",
  utm_medium: "traffic_medium",
  utm_campaign: "traffic_campaign",
  utm_content: "traffic_content",
  utm_term: "traffic_term",
});

const readStoredJson = (storage, key) => {
  try {
    const value = storage?.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

const writeStoredJson = (storage, key, value) => {
  try {
    storage?.setItem(key, JSON.stringify(value));
  } catch {
    // Analytics must never interfere with the portfolio when storage is blocked.
  }
};

const writeStoredValue = (storage, key, value) => {
  try {
    storage?.setItem(key, value);
  } catch {
    // Analytics must never interfere with the portfolio when storage is blocked.
  }
};

const cleanUtmValue = (value) => {
  const normalized = value?.trim().slice(0, 100);
  return normalized || undefined;
};

export const isLocalHostname = (hostname = "") =>
  hostname === "localhost" ||
  hostname === "127.0.0.1" ||
  hostname === "[::1]";

export const classifyTraffic = ({ source, medium, isLocal = false }) => {
  const normalizedSource = source?.toLowerCase();
  const normalizedMedium = medium?.toLowerCase();

  if (
    isLocal ||
    normalizedSource === "testing" ||
    normalizedMedium === "internal"
  ) {
    return "internal_test";
  }

  if (normalizedSource === "resume") {
    return "resume";
  }

  if (normalizedSource === "linkedin") {
    return "linkedin";
  }

  if (!normalizedSource && !normalizedMedium) {
    return "direct";
  }

  return "other";
};

export const parseLandingAttribution = (locationObject) => {
  const searchParams = new URLSearchParams(locationObject?.search || "");
  const attribution = {};

  Object.entries(UTM_FIELDS).forEach(([queryParameter, eventParameter]) => {
    const value = cleanUtmValue(searchParams.get(queryParameter));
    if (value) {
      attribution[eventParameter] = value;
    }
  });

  attribution.landing_page = `${locationObject?.pathname || "/"}${
    locationObject?.search || ""
  }`;
  attribution.traffic_type = classifyTraffic({
    source: attribution.traffic_source,
    medium: attribution.traffic_medium,
    isLocal: isLocalHostname(locationObject?.hostname),
  });

  return attribution;
};

export const getOriginalAttribution = ({ storage, locationObject }) => {
  const storedAttribution = readStoredJson(
    storage,
    ANALYTICS_STORAGE_KEYS.ATTRIBUTION
  );

  if (storedAttribution) {
    return storedAttribution;
  }

  const attribution = parseLandingAttribution(locationObject);
  writeStoredJson(storage, ANALYTICS_STORAGE_KEYS.ATTRIBUTION, attribution);
  return attribution;
};

export const createAnonymousSessionId = (cryptoObject) => {
  if (typeof cryptoObject?.randomUUID === "function") {
    return cryptoObject.randomUUID();
  }

  if (typeof cryptoObject?.getRandomValues === "function") {
    const values = new Uint32Array(4);
    cryptoObject.getRandomValues(values);
    return Array.from(values, (value) => value.toString(16).padStart(8, "0")).join(
      ""
    );
  }

  return `session_${Math.random().toString(36).slice(2)}${Math.random()
    .toString(36)
    .slice(2)}`;
};

export const getPortfolioSessionId = ({ storage, cryptoObject }) => {
  try {
    const storedSessionId = storage?.getItem(
      ANALYTICS_STORAGE_KEYS.SESSION_ID
    );
    if (storedSessionId) {
      return storedSessionId;
    }
  } catch {
    // Fall through to an in-memory ID when storage is blocked.
  }

  const sessionId = createAnonymousSessionId(cryptoObject);
  writeStoredValue(storage, ANALYTICS_STORAGE_KEYS.SESSION_ID, sessionId);
  return sessionId;
};

export const readAnalyticsSessionState = (storage) =>
  readStoredJson(storage, ANALYTICS_STORAGE_KEYS.SESSION_STATE) || {};

export const writeAnalyticsSessionState = (storage, state) =>
  writeStoredJson(storage, ANALYTICS_STORAGE_KEYS.SESSION_STATE, state);
