const express = require('express');
const nodeMonitor = require('express-status-monitor');
const compression = require('compression');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const Prometheus = require('prom-client');
const { morganMiddleware } = require('./lib/logger');
const swaggerOptions = require('./lib/swagger');


dotenv.config(); // carregando variaveis de ambiente
Prometheus.collectDefaultMetrics({ prefix: 'devopsforge' }); // iniciando metricas do prometheus
const app = express();

// rota do promethueus
app.get('/metrics', (req, res) => {
  res.set('Content-Type', Prometheus.register.contentType);
  res.end(Prometheus.register.metrics());
});

const monitorOptions = {
  title: 'DEVOPSFORGE API STATUS',
  healthChecks: [{
    protocol: 'http',
    host: 'localhost',
    path: '/metrics',
    port: '3003',
  }, {
    protocol: 'http',
    host: 'localhost',
    path: '/api-docs',
    port: '3003',
  }],
};

// middlewares
app.use(nodeMonitor(monitorOptions));
app.use(cors());
app.use(compression());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));
app.use(morganMiddleware);
app.use(express.json());

module.exports = app;
