export type Person = {
  role: string;
  name: string;
  phone: string | null;
};

export type Account = {
  role: string;
  name: string;
  bank: string | null;
  number: string | null;
};

export type Side = {
  label: string;
  /** e.g. "장남". Shown between the parents' names and the given name. */
  relation: string;
  givenName: string;
  /** Bride or groom first, then father, then mother. */
  people: Person[];
  accountsLabel: string;
  accounts: Account[];
};

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type SectionId =
  | "greeting"
  | "calendar"
  | "location"
  | "gallery"
  | "info"
  | "accounts"
  | "guestbook"
  | "share";

export type SectionHeading = {
  id: SectionId;
  eyebrow: string;
  title: string;
};

export type TransportItem = {
  label: string;
  lines: string[];
};

export type InfoItem = {
  icon: "photobooth";
  title: string;
  lines: string[];
};

export type Wedding = {
  meta: { title: string; description: string };
  cover: { eyebrow: string; headingLines: string[]; photo: Photo };
  /** ISO 8601 with the +09:00 offset. Every date on the page derives from this. */
  datetime: string;
  venue: {
    name: string;
    hall: string;
    address: string;
    coords: { lat: number; lng: number } | null;
    mapLinks: {
      naver: string | null;
      kakao: string | null;
      tmap: string | null;
    };
  };
  /** Scroll order of the sections that follow the cover. */
  sections: SectionHeading[];
  greeting: { paragraphs: string[][] };
  groom: Side;
  bride: Side;
  transport: TransportItem[];
  gallery: Photo[];
  info: InfoItem[];
  accountsIntro: string[];
};
