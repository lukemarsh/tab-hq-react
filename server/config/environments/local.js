var secrets = require('../../secrets');

var config = {};

config.db = {
  mongodb: 'mongodb://localhost/tabhqreact'
};

config.elastic = {
  host: 'localhost:9200',
  log: 'warning'
};

config.secrets = secrets;

module.exports = config;
