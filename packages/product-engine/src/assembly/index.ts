import { createSceneDocumentFixture, type SceneDocument } from '../../../core/src/index';
import { PreviewRenderer, type ProductSite, validateProductSite } from '../../../site-core/src/index';
import { defaultStylePresets, resolveStylePreset } from '../../../template-system/src/index';
import type { PageRecipe, SiteRecipe } from '../recipes';
import { RecipeRegistry } from '../recipes';

export interface ProductInput {
  productType: ProductSite['productType'];
  scope: 'landing' | 'full-site';
  stylePresetId: string;
  data: Record<string, unknown>;
}

export const normalizeProductData = (input: ProductInput): Record<string, unknown> => {
  const normalized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input.data)) {
    normalized[key.trim()] = typeof value === 'string' ? value.trim() : value;
  }
  return normalized;
};

export const selectSiteRecipe = (input: ProductInput, registry: RecipeRegistry): SiteRecipe => {
  const byType = registry.filterByProductType(input.productType);
  const selected = byType[0];
  if (!selected) throw new Error(`No recipe for product type: ${input.productType}`);
  return selected;
};

export const buildSiteMap = (recipe: SiteRecipe): ProductSite['siteMap'] => ({
  pages: recipe.pages.map((page, index) => ({ id: page.id, path: index === 0 ? '/' : `/${page.id}`, title: page.title }))
});

export const buildNavigation = (recipe: SiteRecipe): ProductSite['navigation'] => ({
  items: recipe.pages.map((page) => ({ id: `nav-${page.id}`, label: page.title, pageId: page.id }))
});

export const generateDesignSystem = (stylePresetId: string, productType: ProductSite['productType']): ProductSite['designSystem'] => {
  const preset = defaultStylePresets.find((item) => item.id === stylePresetId && item.productType === productType)
    ?? defaultStylePresets.find((item) => item.productType === productType)
    ?? defaultStylePresets[0];
  return resolveStylePreset(preset).designSystem;
};

export const assemblePage = (page: PageRecipe): SceneDocument => {
  const rootId = 'root';
  const nodesById: SceneDocument['pages'][number]['nodesById'] = {
    [rootId]: { id: rootId, type: 'frame', x: 0, y: 0, width: 1200, height: 2000, children: [] }
  };

  page.blocks.forEach((block, index) => {
    const nodeId = `${page.id}-${block.blockId}-${index}`;
    const text = typeof block.props.heading === 'string' ? block.props.heading : block.blockId;
    nodesById[nodeId] = {
      id: nodeId,
      type: 'text',
      x: 24,
      y: 24 + (index * 96),
      width: 900,
      height: 72,
      text
    };
    (nodesById[rootId] as { children: string[] }).children.push(nodeId);
  });

  return {
    id: `scene-${page.id}`,
    pageId: page.id,
    schemaVersion: '1.0.0',
    pages: [{ id: page.id, pageId: page.id, name: page.title, rootNodeId: rootId, nodesById }],
    assets: []
  };
};

export const assembleSite = (input: ProductInput, registry: RecipeRegistry): ProductSite => {
  const recipe = selectSiteRecipe(input, registry);
  const normalizedData = normalizeProductData(input);
  const pages = Object.fromEntries(recipe.pages.map((page) => [page.id, assemblePage(page)]));
  const site: ProductSite = {
    id: `site-${recipe.id}`,
    productType: input.productType,
    schemaVersion: '1.0.0',
    siteMap: buildSiteMap(recipe),
    navigation: buildNavigation(recipe),
    designSystem: generateDesignSystem(input.stylePresetId, input.productType),
    pages,
    dataModel: { id: 'assembled-data', schemaVersion: '1.0.0', fields: normalizedData },
    publishConfig: { allowDraftPublish: false, channel: 'production' }
  };

  const validation = validateProductSite(site);
  if (!validation.valid) throw new Error('Assembled site is invalid');
  return site;
};

export const assemblePreview = (input: ProductInput, registry: RecipeRegistry): string => {
  const site = assembleSite(input, registry);
  return PreviewRenderer.render(site);
};

export const autoFixSite = (site: ProductSite): ProductSite => {
  if (site.siteMap.pages.length > 0) return site;
  const firstPageId = Object.keys(site.pages)[0] ?? createSceneDocumentFixture().pageId;
  return {
    ...site,
    siteMap: { pages: [{ id: firstPageId, path: '/', title: 'Home' }] },
    navigation: { items: [{ id: `nav-${firstPageId}`, label: 'Home', pageId: firstPageId }] }
  };
};
