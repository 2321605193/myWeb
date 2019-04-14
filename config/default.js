module.exports = {
  port: 3000,
  session: {
    secret: 'myWeb',
    key: 'myWeb',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/myWeb'
};

