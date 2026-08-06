export type CurrentAnnouncement = {
  id: string;
  messageSq: string;
  messageEn: string | null;
  startsAt: string | null;
  endsAt: string | null;
};

export type CurrentAnnouncementResponse = {
  announcement: CurrentAnnouncement | null;
};