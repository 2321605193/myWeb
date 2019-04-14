const express = require('express');

const router = express.Router();
const PostModel = require('../models/posts');
const UserModel = require('../models/users');


router.use(function (req,res,next) {
  if(!req.session.user.isAdmin){
    //如果是非管理员
    res.send('对不起，只有管理员才可以进入后台管理');
    return ;
  }
  next();
});
router.get('/',function(req,res,next){  //后台管理首页
  res.render("admin/index",{
    userInfo:req.session.user
  });
});

router.get('/user',function(req,res,next){  //用户首页
  const author = req.query.author;
  UserModel.getUsers(author)
    .then(function (users) {
      var count = users.length;
      res.render('admin/user_index',{
        userInfo:req.session.user,
        users:users
      });
    })
    .catch(next);

});



module.exports = router;
