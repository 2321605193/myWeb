module.exports = {
  port: 3000,
  session: {
    secret: 'myWeb',
    key: 'myWeb',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://junjun:junjun@127.0.0.1:27017/myWeb'
};

