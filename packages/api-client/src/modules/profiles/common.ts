export interface Avatar {
  publicId: string;
  url: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Location {
  country?: string;
  region?: string;
  city?: string;
  subCity?: string;
  woreda?: string;

  addressLine?: string;
  addressLine1?: string;
  addressLine2?: string;

  postalCode?: string;

  coordinates?: Coordinates;
}

export interface SocialLink {
  platform: string;
  url: string;
  addedAt?: string;
}

export type Gender = "MALE" | "FEMALE" | "OTHER";
