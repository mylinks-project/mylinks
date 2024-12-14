export interface User {
  id: string;
  name: string | undefined;
  username: string | undefined;
  email: string | undefined;
  image?: string | undefined;
  bio: string | undefined;
  emailVerified?: string | undefined;
  createdAt?: string | undefined;
  isOAuth: boolean;
}

export interface ProfileLinkProps {
  userId: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  url: string;
  platform: string | null;
  linkImage: string | null;
  gifImage: string | null;
  order: number;
  isVisible: boolean;
}

export interface UserProfileLinkProps {
  name: string | null;
  username: string | null;
  bio: string | null;
  userImage: string | null;
  links: {
    id: string;
    title: string;
    url: string;
    platform?: string | null;
    linkImage?: string | null;
    gifImage?: string | null;
    order: number;
    isVisible: boolean | null;
  }[]
};

export interface PricingCardProps {
  name: string;
  price: number;
  featured: boolean;
  features: string[];
  description?: string;
}

export interface GraphData {
  id: string;
  userId: string;
  visitorId: string | null;
  ipAddress: string | null;
  country: string | null;
  city: string | null;
  postalCode: string | null;
  device: string | null;
  browser: string | null;
  referer: string | null;
  visitAt: Date;
}

export type ProfileVisitColumn = {
  id: string;
  userId: string | null;
  visitorId: string | null;
  ipAddress: string | null;
  clicks: number;
  country: string | null;
  city: string | null;
  postalCode: string | null;
  device: string | null;
  browser: string | null;
  referer: string | null;
  visitAt: string;
}

export type LinkColumn = {
  id: string;
  name?: string | null,
  username?: string | null,
  userImage?: string | null,
  title: string;
  url: string;
  platform?: string | null;
  linkImage?: string | null;
  gifImage?: string | null;
  order: number | null;
  isVisible: boolean | null;
  userId: string | null;
  clicks: number | null;
  createdAt: string;
}

export type ClickColumn = {
  id: string;
  userId: string | null;
  visitId: string | null;
  ipAddress: string | null;
  country: string | null;
  city: string | null;
  postalCode: string | null;
  device: string | null;
  browser: string | null;
  referer: string | null;
  clickedAt: string;
}

export type LinkProps = {
  id: string;
  title: string;
  url: string;
  platform?: string | null;
  linkImage?: string | null;
  gifImage?: string | null;
  order: number | null;
  isVisible: boolean | null;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
}