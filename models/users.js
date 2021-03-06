const User = require('../lib/mongo').User;

module.exports = {
  // 注册一个用户
  create: function create (user) {
    return User.create(user).exec()
  },


  // 通过用户名获取用户信息
  getUserByName: function getUserByName (name) {
    return User
      .findOne({ name: name })
      .addCreatedAt()
      .exec()
  },
  getUsers: function getUsers(author) {
    const query = {};
    if (author) {
      query.author = author
    }
    return User
      .find(query)
      .sort({ _id: -1 })
      .addCreatedAt()
      .exec()
  },
  delUserByName: function v (name) {
    return User.deleteOne({ name: name }).exec()
  },
};
