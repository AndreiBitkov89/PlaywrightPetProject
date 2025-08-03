export enum ItemCategories {
  FlareBootcutJeans = "FlareBootcutJeans",
}

export const CATEGORY_DATA: Record<
  ItemCategories,
  {
    urlAnchor: string;
    expectedTitleContains: string;
    expectedProductKeywords: string[];
  }
> = {
  [ItemCategories.FlareBootcutJeans]: {
    urlAnchor: "sale/women/jeans/flare-bootcut-jeans",
    expectedTitleContains: "Flare & Bootcut Jeans",
    expectedProductKeywords: ["flare", "bootcut"],
  },
};
