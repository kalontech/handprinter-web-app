const proxy = require('http-proxy-middleware')

const { REACT_APP_API_BASE_URL } = process.env

module.exports = app => {
  app.use(
    proxy('/api', {
      changeOrigin: true,
      secure: false,
      target: REACT_APP_API_BASE_URL,
    }),
  )
}
