const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://edu-backend-py90.onrender.com',
      changeOrigin: true,
    })
  );
};
