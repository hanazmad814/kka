import type { BlockVariant } from './types';
import { blockVariantRegistry } from './registries';

export interface BlockRegistry {
  load(entries: BlockVariant[]): void;
  getById(id: string): BlockVariant | undefined;
}

export const blockRegistry: BlockRegistry = {
  load: (entries) => blockVariantRegistry.load(entries),
  getById: (id) => blockVariantRegistry.getById(id)
};
