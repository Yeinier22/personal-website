import { useEffect } from "react";
import { createEngagementTracker } from "../engagementTracking";

const AnalyticsTracker = () => {
  useEffect(() => {
    const tracker = createEngagementTracker({
      windowObject: window,
      documentObject: document,
    });
    tracker.start();

    return () => tracker.stop();
  }, []);

  return null;
};

export default AnalyticsTracker;
