export interface videoProp {
  id: number;
  title: string;
  description: string | null;
  link: string;
  timestamp: Date;
  playlistId: number | null;
  accountId: number;
}