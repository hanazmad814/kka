'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveGeneratedVariants } from '../variant-picker/variant-picker.storage';
import type { CreateWizardFormState, CreateWizardStep } from './create-wizard.types';
import { validateWizardState } from './create-wizard.schema';
import { toProductInput } from './create-wizard.utils';
import { WizardProgress } from './WizardProgress';
import { ProductTypeStep } from './ProductTypeStep';
import { ProductScopeStep } from './ProductScopeStep';
import { ProductDataStep } from './ProductDataStep';
import { StyleStep } from './StyleStep';
import { GenerateStep } from './GenerateStep';
import { GeneratedVariantsDebug } from './GeneratedVariantsDebug';
import { getProductFormDefinition, getScopeOptionsForProductType } from './product-forms/product-form-registry';

const stepOrder: CreateWizardStep[] = ['product-type', 'scope', 'data', 'style', 'generate'];
const defaultProductType = 'restaurant_site' as const;
const defaultDef = getProductFormDefinition(defaultProductType)!;

export function CreateWizard() {
  const router = useRouter();
  const [step, setStep] = useState<CreateWizardStep>('product-type');
  const [state, setState] = useState<CreateWizardFormState>({ productType: defaultProductType, scope: 'one_page', stylePresetId: 'minimal', formState: defaultDef.getDefaultState() });
  const [loading, setLoading] = useState(false); const [error, setError] = useState<string | null>(null); const [variants, setVariants] = useState<Array<{ id: string }>>([]);
  const validation = validateWizardState(state); const idx = stepOrder.indexOf(step); const nextDisabled = (step === 'data' || step === 'generate') && !validation.valid;
  const onGenerate = async () => { setLoading(true); setError(null); try { const res = await fetch('/api/generate-variants', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(toProductInput(state)) }); const body = await res.json(); if (!res.ok || !body.ok) throw new Error(body?.error?.message ?? 'Generate failed'); setVariants(body.variants ?? []); saveGeneratedVariants({ createdAt: Date.now(), inputSummary: { productType: state.productType, scope: state.scope, stylePresetId: state.stylePresetId }, variants: body.variants ?? [] }); router.push('/create/variants'); } catch (e) { setError(e instanceof Error ? e.message : 'Unknown error'); } finally { setLoading(false); } };
  const onProductTypeChange = (productType: CreateWizardFormState['productType']) => { const def = getProductFormDefinition(productType); if (!def) return; const firstScope = getScopeOptionsForProductType(productType).find((s) => s.enabled)?.id ?? 'one_page'; setState({ ...state, productType, scope: firstScope, formState: def.getDefaultState() }); };
  return <section><h1>Create a product in 5 minutes</h1><WizardProgress step={step} />
    {step === 'product-type' && <ProductTypeStep state={state} onChange={onProductTypeChange} />}
    {step === 'scope' && <ProductScopeStep state={state} onChange={(scope) => setState({ ...state, scope })} />}
    {step === 'data' && <ProductDataStep state={state} onChange={setState} />}
    {step === 'style' && <StyleStep state={state} onChange={(stylePresetId) => setState({ ...state, stylePresetId })} />}
    {step === 'generate' && <GenerateStep state={state} onGenerate={onGenerate} loading={loading} />}
    {error && <p role='alert'>{error}</p>}{variants.length > 0 && <GeneratedVariantsDebug variants={variants} />}<div><button disabled={idx === 0} onClick={() => setStep(stepOrder[idx - 1])}>Back</button><button disabled={idx >= stepOrder.length - 1 || nextDisabled} onClick={() => setStep(stepOrder[idx + 1])}>Next</button></div></section>;
}
