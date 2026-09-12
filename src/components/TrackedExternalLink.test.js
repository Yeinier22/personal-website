import { fireEvent, render, screen } from "@testing-library/react";
import TrackedExternalLink from "./TrackedExternalLink";
import { trackProfileLink, trackProjectLink } from "../analytics";

jest.mock("../analytics", () => ({
  trackProfileLink: jest.fn(),
  trackProjectLink: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test("tracks a profile link once while preserving new-tab behavior", () => {
  render(
    <TrackedExternalLink
      href="https://github.com/example"
      eventName="github_click"
      linkLocation="header"
      linkText="GitHub"
    >
      GitHub
    </TrackedExternalLink>
  );

  const link = screen.getByRole("link", { name: "GitHub" });
  fireEvent.click(link);

  expect(link).toHaveAttribute("target", "_blank");
  expect(link).toHaveAttribute("rel", "noopener noreferrer");
  expect(trackProfileLink).toHaveBeenCalledTimes(1);
  expect(trackProfileLink).toHaveBeenCalledWith({
    eventName: "github_click",
    linkUrl: "https://github.com/example",
    linkLocation: "header",
    linkText: "GitHub",
  });
  expect(trackProjectLink).not.toHaveBeenCalled();
});

test("tracks project links once, including middle-click activation", () => {
  render(
    <TrackedExternalLink
      href="https://example.com/dashboard"
      eventName="live_dashboard_click"
      projectName="airport_etl_pipeline"
      linkLocation="featured_projects"
      linkText="View report"
    >
      View report
    </TrackedExternalLink>
  );

  fireEvent(
    screen.getByRole("link", { name: "View report" }),
    new MouseEvent("auxclick", { bubbles: true, button: 1 })
  );

  expect(trackProjectLink).toHaveBeenCalledTimes(1);
  expect(trackProjectLink).toHaveBeenCalledWith({
    eventName: "live_dashboard_click",
    projectName: "airport_etl_pipeline",
    linkUrl: "https://example.com/dashboard",
    linkLocation: "featured_projects",
    linkText: "View report",
  });
  expect(trackProfileLink).not.toHaveBeenCalled();
});
