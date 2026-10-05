import { useCallback, useEffect, useRef, useState } from "react";
import { useAuthenticatedApi } from "@/hooks/use-authenticated-api";
import { useFocusedQuery } from "@/hooks/use-focused-query";
import { useLanguage } from "@/features/localization/hooks/use-language";
import {
  getInbox,
  markRead,
  type InboxResponse,
} from "../api/notifications-api";
import { useNotifications } from "../context/notifications-context";

export function useNotificationInbox() {
  const { authenticatedRequest } = useAuthenticatedApi();
  const { language } = useLanguage();
  const { revision } = useNotifications();
  const query = useCallback(
    ({ signal }: { signal: AbortSignal }) => {
      void revision;
      return getInbox(authenticatedRequest, language, signal);
    },
    [authenticatedRequest, language, revision],
  );
  const inbox = useFocusedQuery(query);
  const [history, setHistory] = useState<{
    query: typeof query;
    pages: InboxResponse[];
  }>({ query, pages: [] });
  const older = history.query === query ? history.pages : [];
  const [moreRequest, setMoreRequest] = useState<{
    query: typeof query;
  } | null>(null);
  const loadingMore = moreRequest?.query === query;
  const [actionError, setActionError] = useState(false);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const pending = useRef<AbortController | null>(null);
  useEffect(() => () => pending.current?.abort(), [query]);
  const nextCursor =
    older.at(-1)?.nextCursor ?? (older.length ? null : inbox.data?.nextCursor);
  const items = [
    ...(inbox.data?.notifications ?? []),
    ...older.flatMap((page) => page.notifications),
  ];
  const seen = new Set<string>();
  const unique = items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });

  async function loadMore() {
    if (!nextCursor || (pending.current && !pending.current.signal.aborted))
      return;
    const controller = new AbortController();
    pending.current = controller;
    setMoreRequest({ query });
    setActionError(false);
    try {
      const page = await getInbox(
        authenticatedRequest,
        language,
        controller.signal,
        nextCursor,
      );
      if (!controller.signal.aborted)
        setHistory((current) => ({
          query,
          pages: [...(current.query === query ? current.pages : []), page],
        }));
    } catch {
      if (!controller.signal.aborted) setActionError(true);
    } finally {
      if (pending.current === controller) pending.current = null;
      if (!controller.signal.aborted) setMoreRequest(null);
    }
  }
  async function read(id: string) {
    try {
      await markRead(authenticatedRequest, id);
      setReadIds((current) => new Set([...current, id]));
      inbox.refresh();
      return true;
    } catch {
      setActionError(true);
      return false;
    }
  }
  return {
    ...inbox,
    actionError,
    loadingMore,
    loadMore,
    read,
    hasMore: Boolean(nextCursor),
    notifications: unique.map((item) => ({
      ...item,
      readAt: readIds.has(item.id)
        ? (item.readAt ?? new Date().toISOString())
        : item.readAt,
    })),
    refresh: () => {
      pending.current?.abort();
      setMoreRequest(null);
      setHistory({ query, pages: [] });
      inbox.refresh();
    },
  };
}
