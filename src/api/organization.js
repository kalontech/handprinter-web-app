import { fetchAPI } from './index' // eslint-disable-line unicorn/import-index

export const addAdmins = data =>
  fetchAPI('/organizations/add-admins', {
    body: { ...data },
    method: 'POST',
  })
