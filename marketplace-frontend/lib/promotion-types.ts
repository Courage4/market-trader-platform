export interface PromotionPlan {
  id: string
  name: string
  price: number
  duration: number // in days
  features: string[]
  popular?: boolean
  discount?: number
}

export interface ProductPromotion {
  id: string
  productId: string
  planId: string
  startDate: Date
  endDate: Date
  status: "active" | "expired" | "paused"
  totalCost: number
}

export const PROMOTION_PLANS: PromotionPlan[] = [
  {
    id: "weekly",
    name: "Weekly Boost",
    price: 23.96, // ₵23.96 (converted from $5.99)
    duration: 7,
    features: [
      "Top search placement for 7 days",
      "Promoted badge on product",
      "Priority in category listings",
      "Basic analytics dashboard",
    ],
  },
  {
    id: "monthly",
    name: "Monthly Pro",
    price: 79.96, // ₵79.96 (converted from $19.99)
    duration: 30,
    popular: true,
    discount: 15,
    features: [
      "Top search placement for 30 days",
      "Promoted badge on product",
      "Priority in all listings",
      "Advanced analytics dashboard",
      "Featured in category highlights",
      "Email marketing inclusion",
    ],
  },
  {
    id: "quarterly",
    name: "Quarterly Growth",
    price: 199.96, // ₵199.96 (converted from $49.99)
    duration: 90,
    discount: 25,
    features: [
      "Top search placement for 90 days",
      "Premium promoted badge",
      "Priority in all listings",
      "Advanced analytics dashboard",
      "Featured in category highlights",
      "Email marketing inclusion",
      "Social media promotion",
      "Dedicated account support",
    ],
  },
  {
    id: "biannual",
    name: "6-Month Premium",
    price: 359.96, // ₵359.96 (converted from $89.99)
    duration: 180,
    discount: 35,
    features: [
      "Top search placement for 6 months",
      "Premium promoted badge",
      "Priority in all listings",
      "Advanced analytics dashboard",
      "Featured in category highlights",
      "Email marketing inclusion",
      "Social media promotion",
      "Dedicated account support",
      "Custom promotional campaigns",
      "Bulk discount eligibility",
    ],
  },
  {
    id: "annual",
    name: "Annual Elite",
    price: 599.96, // ₵599.96 (converted from $149.99)
    duration: 365,
    discount: 45,
    features: [
      "Top search placement for 1 year",
      "Elite promoted badge",
      "Priority in all listings",
      "Advanced analytics dashboard",
      "Featured in category highlights",
      "Email marketing inclusion",
      "Social media promotion",
      "Dedicated account support",
      "Custom promotional campaigns",
      "Bulk discount eligibility",
      "Exclusive vendor events access",
      "Priority customer support",
    ],
  },
]
