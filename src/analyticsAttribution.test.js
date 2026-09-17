import {
  classifyTraffic,
  getOriginalAttribution,
  getPortfolioSessionId,
  parseLandingAttribution,
} from "./analyticsAttribution";

const createMemoryStorage = () => {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
};

test("parses all supported UTM parameters", () => {
  const attribution = parseLandingAttribution({
    hostname: "portfolio.example.com",
    pathname: "/",
    search:
      "?utm_source=resume&utm_medium=pdf&utm_campaign=acme_bi&utm_content=portfolio_link&utm_term=power_bi",
  });

  expect(attribution).toEqual({
    traffic_source: "resume",
    traffic_medium: "pdf",
    traffic_campaign: "acme_bi",
    traffic_content: "portfolio_link",
    traffic_term: "power_bi",
    landing_page:
      "/?utm_source=resume&utm_medium=pdf&utm_campaign=acme_bi&utm_content=portfolio_link&utm_term=power_bi",
    traffic_type: "resume",
  });
});

test("preserves the original landing attribution for the session", () => {
  const storage = createMemoryStorage();
  const original = getOriginalAttribution({
    storage,
    locationObject: {
      hostname: "portfolio.example.com",
      pathname: "/",
      search: "?utm_source=resume&utm_medium=pdf&utm_campaign=first_company",
    },
  });
  const later = getOriginalAttribution({
    storage,
    locationObject: {
      hostname: "portfolio.example.com",
      pathname: "/",
      search: "?utm_source=linkedin&utm_medium=social",
    },
  });

  expect(later).toEqual(original);
  expect(later.traffic_campaign).toBe("first_company");
});

test.each([
  [{ source: "testing", medium: "internal" }, "internal_test"],
  [{ source: "resume", medium: "pdf" }, "resume"],
  [{ source: "linkedin", medium: "social" }, "linkedin"],
  [{}, "direct"],
  [{ source: "newsletter", medium: "email" }, "other"],
  [{ source: "resume", medium: "pdf", isLocal: true }, "internal_test"],
])("classifies traffic without fingerprinting: %p", (input, expected) => {
  expect(classifyTraffic(input)).toBe(expected);
});

test("reuses one random anonymous ID within session storage", () => {
  const storage = createMemoryStorage();
  const cryptoObject = { randomUUID: jest.fn(() => "random-session-id") };

  const first = getPortfolioSessionId({ storage, cryptoObject });
  const second = getPortfolioSessionId({ storage, cryptoObject });

  expect(first).toBe("random-session-id");
  expect(second).toBe(first);
  expect(cryptoObject.randomUUID).toHaveBeenCalledTimes(1);
});
