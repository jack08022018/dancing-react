const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://51.79.145.101:9092/dancing',
      // target: 'http://localhost:9193/jpa',
      changeOrigin: true,
      pathRewrite: {
        [`^/api`]: ''
      },
    })
  );
};