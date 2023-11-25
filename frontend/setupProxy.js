const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://edu-back-j3mz.onrender.com',
      changeOrigin: true,
    })
  );
};
