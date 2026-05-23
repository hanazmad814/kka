import { weddingSampleData } from './wedding.sample-data';
export const createWeddingMinimalFixture = () => structuredClone(weddingSampleData.minimalWedding);
export const createWeddingStandardFixture = () => structuredClone(weddingSampleData.standardWeddingSite);
