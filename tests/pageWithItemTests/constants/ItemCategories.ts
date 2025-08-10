export enum ItemCategories {
  FlareBootcutJeans = "FlareBootcutJeans",
  Bra = "Bra",
  Tops = "Tops"
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
    urlAnchor: "american-eagle/sale/women/jeans/flare-bootcut-jeans",
    expectedTitleContains: "Flare & Bootcut Jeans",
    expectedProductKeywords: ["flare", "bootcut"],
  },
   [ItemCategories.Bra]: {
    urlAnchor: "aerie/bras/bras/push-up-bras",
    expectedTitleContains: "Push Up Bras",
    expectedProductKeywords: ["Push Up Bra"],
  },
  [ItemCategories.Tops]: {
    urlAnchor: "american-eagle/men/tops",
    expectedTitleContains: "Tops",
    expectedProductKeywords: ["AE"],
  },
};
