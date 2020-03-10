const proxy = require('http-proxy-middleware')

const env = require('config/env')

const { REACT_APP_API_BASE_URL, USE_NGINX_PROXY } = env

module.exports = app => {
  if (!USE_NGINX_PROXY) {
    app.use(
      proxy('/api', {
        changeOrigin: true,
        secure: false,
        target: REACT_APP_API_BASE_URL,
      }),
    )
  }
}
