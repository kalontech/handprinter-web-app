export const ORGANIZATION_TYPES = [
  { _id: 'profit', name: 'app.createOrganization.forProfitType' },
  { _id: 'nonProfit', name: 'app.createOrganization.forNonProfitType' },
]

export const ANNUAL_REVENUE_PROFIT = [
  '100K',
  '200K',
  '500K',
  '1M',
  '2M',
  '5M',
  '10M-1B',
  '1B+',
]
export const ANNUAL_REVENUE_NON_PROFIT = [
  '100K',
  '200K',
  '500K',
  '1M-1B',
  '1B+',
]

export const MOUNTHLY_SUBSCRIPTION_AMOUNT = {
  profit: {
    '100K': 10,
    '200K': 20,
    '500K': 50,
    '1M': 100,
    '2M': 200,
    '5M': 500,
    '10M-1B': 1000,
    '1B+': 2000,
  },
  nonProfit: {
    '100K': 10,
    '200K': 20,
    '500K': 50,
    '1M-1B': 100,
    '1B+': 1000,
  },
}
