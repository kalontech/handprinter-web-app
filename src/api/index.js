const baseUrl =
  window.location.hostname === 'localhost'
    ? process.env.REACT_APP_API_BASE_URL
    : `${window.location.protocol}//${window.location.host}/api`

const fetchHelper = async (...args) => {
  const { data, error, success } = await (await fetch(...args)).json()
  if (success) {
    return data
  } else {
    throw error
  }
}

const getCountries = () => fetchHelper(`${baseUrl}/countries`)

const logIn = (email, password) =>
  fetchHelper(`${baseUrl}/auth/login`, {
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

const register = (email, password, fullName, country, invitationCode) =>
  fetchHelper(`${baseUrl}/auth/register`, {
    body: JSON.stringify({
      email,
      password,
      fullName,
      country,
      invitationCode,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

export default {
  getCountries,
  logIn,
  register,
}
