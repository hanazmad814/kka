import { generateBestVariants, type ProductInput } from '../../../../../packages/product-engine/src/generate';
import { validateBusinessInput } from '../../../../../packages/packs/business/src';
import { validateWeddingInput } from '../../../../../packages/packs/wedding/src';
import { validateRestaurantInput } from '../../../../../packages/packs/restaurant/src';

const bad = (message: string, status = 400): Response => new Response(JSON.stringify({ ok: false, error: { code: 'bad_request', message } }), { status, headers: { 'content-type': 'application/json' } });

const allowedScopesByProductType: Record<string, string[]> = {
  restaurant: ['landing', 'full-site'],
  business: ['landing', 'full-site'],
  wedding: ['landing', 'full-site']
};

const allowedPackScopesByType: Record<string, string[]> = {
  restaurant_site: ['one_page', 'mini_site_3_pages', 'standard_site_5_pages'],
  restaurant_menu: ['one_page', 'qr_menu'],
  business_landing: ['one_page'],
  business_website: ['mini_site_3_pages', 'standard_site_5_pages'],
  wedding_invitation: ['one_page', 'mini_site_3_pages', 'standard_site_5_pages']
};

export async function POST(req: Request): Promise<Response> {
  try {
    const json = await req.json() as Partial<ProductInput>;
    if (!json || typeof json !== 'object') return bad('Invalid request body.');
    if (!json.productType || !json.scope || !json.stylePresetId || !json.data) return bad('Missing required fields.');
    if (!['restaurant', 'business', 'wedding'].includes(json.productType)) return bad('Unsupported productType.');
    if (!allowedScopesByProductType[json.productType]?.includes(String(json.scope))) return bad('Invalid scope for productType.');

    if (json.productType === 'restaurant') {
      const productType = String((json.data as Record<string, unknown>).restaurantProductType ?? 'restaurant_site');
      const packScope = String((json.data as Record<string, unknown>).restaurantScope ?? 'one_page');
      if (!allowedPackScopesByType[productType]?.includes(packScope)) return bad('Invalid restaurant scope/product type combination.');
      const v = validateRestaurantInput({ productType: productType as 'restaurant_site' | 'restaurant_menu', scope: packScope as never, stylePresetId: String(json.stylePresetId), data: { name: String((json.data as Record<string, unknown>).brandName ?? ''), menuItems: ((json.data as Record<string, unknown>).menuItems as never[] ?? []).map((x) => ({ name: String((x as Record<string, unknown>).name ?? ''), price: '', category: '' })) } });
      if (!v.valid) return bad(v.issues[0] ?? 'Invalid restaurant input.');
    }

    if (json.productType === 'business') {
      const businessScope = String((json.data as Record<string, unknown>).businessScope ?? 'one_page');
      const productType = businessScope === 'one_page' ? 'business_landing' : 'business_website';
      if (!allowedPackScopesByType[productType]?.includes(businessScope)) return bad('Invalid business scope/product type combination.');
      const v = validateBusinessInput({ productType, scope: businessScope as never, stylePresetId: String(json.stylePresetId), data: json.data as never });
      if (!v.valid) return bad(v.issues[0] ?? 'Invalid business input.');
    }

    if (json.productType === 'wedding') {
      const weddingScope = String((json.data as Record<string, unknown>).weddingScope ?? 'one_page');
      if (!allowedPackScopesByType.wedding_invitation.includes(weddingScope)) return bad('Invalid wedding scope/product type combination.');
      const v = validateWeddingInput({ productType: 'wedding_invitation', scope: weddingScope as never, stylePresetId: String(json.stylePresetId), data: json.data as never });
      if (!v.valid) return bad(v.issues[0] ?? 'Invalid wedding input.');
    }

    const result = generateBestVariants(json as ProductInput, { minVariants: 3, maxVariants: 6, includeMetrics: true });
    return new Response(JSON.stringify({ ok: true, variants: result.variants, issues: result.issues, metrics: result.metrics }), { status: 200, headers: { 'content-type': 'application/json' } });
  } catch {
    return new Response(JSON.stringify({ ok: false, error: { code: 'internal_error', message: 'Failed to generate variants.' } }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
}
