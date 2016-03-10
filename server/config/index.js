var config = require('./environments/production');

if (process.env.NODE_ENV !== 'production') {
  config = require('./environments/local');
}

module.exports = config;
