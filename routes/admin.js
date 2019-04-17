const express = require('express');
const fs = require('fs');

const router = express.Router();
const PostModel = require('../models/posts');
const CommentModel = require('../models/comments');
const UserModel = require('../models/users');
const checkLogin = require('../middlewares/check').checkLogin


router.use(checkLogin,function (req,res,next) {
  if(!req.session.user.isAdmin){
    //如果是非管理员
    res.send('<h1>对不起，只有管理员才可以进入后台管理</h1>');
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
      res.render('admin/user_index',{
        userInfo:req.session.user,
        users:users
      });
    })
    .catch(next);

});

router.get('/user/:name/remove', function (req, res, next) {
  const name = req.params.name;


  UserModel.getUserByName(name)
    .then(function (user) {
      try {
        if (!user) {
          throw new Error('用户不存在')
        }
        if (user.isAdmin) {
          throw new Error('没有权限删除')
        }
      }catch(e)
      {
        req.flash('error', e.message);
        return res.redirect('/admin/user');
      }
      PostModel.getPosts(user)

        .then(function () {
          PostModel.delPostByUserId(user._id)
            .then(function () {
              fs.unlink(process.cwd()+'/public/img/'+user.avatar,(err)=>{
                if(err) {
                  req.flash('error', err.message);
                  return res.redirect('/admin/user');
                }
              });
              UserModel.delUserByName(name)
                .then(function () {
                  // 删除成功后跳转到上一页

                  req.flash('success', '删除成功');

                  res.redirect('back');
                })
            })
            .catch(next)
        })

    })
})



module.exports = router;
