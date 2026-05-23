import { restaurantSampleData } from './restaurant.sample-data';

export const createRestaurantMinimalFixture = () => structuredClone(restaurantSampleData.minimal);
export const createRestaurantStandardFixture = () => structuredClone(restaurantSampleData.rich);
