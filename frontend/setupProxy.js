const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://backend-uxyx.onrender.com',
      changeOrigin: true,
    })
  );
};
