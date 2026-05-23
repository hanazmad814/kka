export interface PublishedRoute {
  path: string;
  pageId: string;
  title?: string;
  description?: string;
  canonicalUrl?: string;
}

export interface PublishedAsset {
  id: string;
  src: string;
  type: 'image' | 'video' | 'audio' | 'font' | 'other';
  alt?: string;
}
