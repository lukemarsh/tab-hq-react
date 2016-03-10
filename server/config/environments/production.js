var config = {};

config.db = {
  mongodb: process.env.MONGOLAB_URI
};

config.elastic = {
  host: 'localhost:9200',
  log: 'warning'
};

config.secrets = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    sessionSecret: process.env.SESSION_SECRET
  },
  session: process.env.SESSION_SECRET
};

module.exports = config;
