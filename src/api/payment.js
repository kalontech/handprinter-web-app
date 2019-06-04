import { fetchAPI } from './index' // eslint-disable-line unicorn/import-index

export const donate = data =>
  fetchAPI('/payment/donate', {
    body: { ...data },
    method: 'POST',
  })

export const getSponsors = data =>
  fetchAPI('/payment/sponsors', {
    method: 'GET',
  })
