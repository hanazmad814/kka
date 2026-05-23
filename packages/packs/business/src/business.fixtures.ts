import { businessSampleData } from './business.sample-data';
export const createBusinessMinimalFixture = () => structuredClone(businessSampleData.minimalBusinessLanding);
export const createBusinessStandardFixture = () => structuredClone(businessSampleData.standardBusinessWebsite);
