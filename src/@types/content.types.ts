import type { IImage, IResponse } from "./global.types";

export type IHighlight = {
  icon: string;
  value: string;
  label: string;
};

export type ITrustPoint = {
  icon: string;
  title: string;
  description: string;
};

export type ISectionCopy = {
  title?: string;
  subtitle?: string;
};

export type ISocial = {
  label: string;
  url: string;
};

export type IContent = IResponse & {
  key: string;
  brand: string;
  logo?: {
    path?: string;
    light_path?: string;
    mark_path?: string;
  };
  hero: {
    badge?: string;
    title: string;
    subtitle: string;
    cta_label: string;
    cta_link: string;
    secondary_cta_label?: string;
    secondary_cta_link?: string;
    cover_image?: IImage;
  };
  trust_points: ITrustPoint[];
  sections: {
    popular_packages?: ISectionCopy;
    categories?: ISectionCopy;
    about_categories?: ISectionCopy;
  };
  auth: {
    heading?: string;
    body?: string;
    footnote?: string;
  };
  about: {
    title: string;
    subtitle?: string;
    paragraphs: string[];
    highlights: IHighlight[];
  };
  contact: {
    title?: string;
    subtitle?: string;
    address?: string;
    phone?: string;
    email?: string;
    office_hours?: string;
    map_url?: string;
    form_title?: string;
    form_subtitle?: string;
  };
  footer: {
    tagline?: string;
    socials: ISocial[];
    copyright?: string;
  };
};
