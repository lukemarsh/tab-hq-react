var config = require('./environments/local');

if (process.env.NODE_ENV === 'production') {
  config = require('./environments/production');
}

module.exports = config;
