import type { CreateWizardProductType } from '../create-wizard.types';
export const getStyleOptionsForProductType = (productType: CreateWizardProductType): string[] => {
  if (productType.startsWith('restaurant')) return ['warm','modern','minimal','bold','luxury'];
  if (productType.startsWith('business')) return ['modern','minimal','tech','luxury','editorial','warm'];
  return ['luxury','classic','warm','natural','editorial','playful','minimal'];
};
