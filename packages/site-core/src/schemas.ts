import type { ProductSite, PublishedSiteSnapshot, SiteDesignSystem, SiteMap, SiteNavigation } from './types';

export interface Schema<T> { name: string; parse(value: unknown): T; }
const passthrough = <T>(name: string): Schema<T> => ({ name, parse: (value: unknown) => value as T });

export const siteDesignSystemSchema = passthrough<SiteDesignSystem>('SiteDesignSystem');
export const siteMapSchema = passthrough<SiteMap>('SiteMap');
export const siteNavigationSchema = passthrough<SiteNavigation>('SiteNavigation');
export const productSiteSchema = passthrough<ProductSite>('ProductSite');
export const publishedSiteSnapshotSchema = passthrough<PublishedSiteSnapshot>('PublishedSiteSnapshot');
