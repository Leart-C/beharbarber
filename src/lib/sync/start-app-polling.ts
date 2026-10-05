import { AppState } from "react-native";

// One request at a time. Backgrounding invalidates even transports that ignore abort.
export function startAppPolling(
  request: (controller: AbortController) => Promise<void>,
  initialDelayMs = 0,
) {
  let active =
    AppState.currentState !== "background" &&
    AppState.currentState !== "inactive";
  let stopped = false;
  let running = false;
  let current: AbortController | null = null;

  async function refresh() {
    if (stopped || !active || (running && !current?.signal.aborted)) return;
    const controller = new AbortController();
    current = controller;
    running = true;
    try {
      await request(controller);
    } finally {
      if (current === controller) running = false;
    }
  }

  function abort() {
    current?.abort();
    current = null;
    running = false;
  }

  const subscription = AppState.addEventListener("change", (state) => {
    const wasActive = active;
    active = state === "active";
    if (!active) abort();
    else if (!wasActive) void refresh();
  });
  const initial = initialDelayMs
    ? setTimeout(() => void refresh(), initialDelayMs)
    : null;
  if (!initialDelayMs) void refresh();
  const interval = setInterval(() => void refresh(), 15_000);

  return () => {
    stopped = true;
    if (initial) clearTimeout(initial);
    clearInterval(interval);
    subscription.remove();
    abort();
  };
}
