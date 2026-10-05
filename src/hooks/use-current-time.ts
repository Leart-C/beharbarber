import { useEffect, useState } from "react";
import { AppState } from "react-native";

// Refresh time-sensitive screens after sleep as well as while the app is open.
export function useCurrentTime(intervalMs = 30_000) {
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    const update = () => setNow(Date.now());
    const timer = setInterval(update, intervalMs);
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") update();
    });
    return () => {
      clearInterval(timer);
      subscription.remove();
    };
  }, [intervalMs]);
  return now;
}
