export const officialStores = {
  shopee: {
    label: "Shopee Official Store",
    href: process.env.NEXT_PUBLIC_SHOPEE_STORE_URL ?? "#official-store-placeholder",
  },
  tokopedia: {
    label: "Tokopedia Official Store",
    href: process.env.NEXT_PUBLIC_TOKOPEDIA_STORE_URL ?? "#official-store-placeholder",
  },
} as const;
