var express = require('express');
//token
var checkLogin = require('../middleware/loginAndToken/checkLogin');
var createToken = require('../middleware/loginAndToken/createToken');
var protectRoute = require('../middleware/loginAndToken/protectRoute');
var isAdmin = require('../middleware/loginAndToken/isAdmin');
var isYourPost = require('../middleware/loginAndToken/isYourPost');
var isBand = require('../middleware/loginAndToken/isBand');
//user
var listUser = require('../middleware/user/listUser');
var createUser = require('../middleware/user/createUser');
var deleteUser = require('../middleware/user/deleteUser');
var bandUser = require('../middleware/user/bandUser');
var userDetail = require('../middleware/user/userDetail');
//category
var listCategory = require('../middleware/category/listCategory');
var createCategory = require('../middleware/category/createCategory');
var deleteCategory = require('../middleware/category/deleteCategory');
var updateCategory = require('../middleware/category/updateCategory');
var listCategoryDetail = require('../middleware/category/listCategoryDetail');
//post
var postDetail = require('../middleware/post/postDetail');
var listPost = require('../middleware/post/listPost');
var createPost = require('../middleware/post/createPost');
var deletePost = require('../middleware/post/deletePost');
var updatePost = require('../middleware/post/updatePost');
var listPostCategory = require('../middleware/post/listPostCategory');
var postDetailLink = require('../middleware/post/postDetailLink');
var router = express.Router();

//countView
var view = require('../middleware/view/view');

router.post('/login', checkLogin, createToken);
router.get('/authenticate',protectRoute, function (req, res) {
    res.json({
        success: req.verifyToken.success,
        status : req.verifyToken.status,
        data : req.verifyToken.data
    });
});
router.post('/authenticate',protectRoute,isYourPost, function (req, res) {
    res.json({
        success: true,
        status:105,
        data:{}
    });
});
// cac route ve user
router.get('/user/:id',protectRoute, userDetail);
router.get('/user',protectRoute, listUser);
router.post('/user', protectRoute,isAdmin, createUser);
router.delete('/user', protectRoute,isAdmin, deleteUser);
router.put('/user', protectRoute,isAdmin, bandUser);

// cac route category
router.get('/category/:categoryId',protectRoute, listCategoryDetail);
router.get('/category', listCategory);
router.post('/category', protectRoute, isAdmin, createCategory);
router.delete('/category', protectRoute,isAdmin, deleteCategory);
router.put('/category', protectRoute,isAdmin, updateCategory);

//cac route ve post
router.get('/post/:id', postDetail);
router.get('/post/link/:link',view, postDetailLink);
router.get('/post',view, listPost);
router.get('/post/category/:categoryId',view, listPostCategory);
router.post('/post', protectRoute,isBand, createPost);
router.delete('/post', protectRoute,isBand,isYourPost, deletePost);
router.put('/post', protectRoute,isBand,isYourPost, updatePost);

// cac route cho luot view
router.get('/view',function (req, res) {
    res.json({
        status:551,
        views: countView
    })
})
module.exports = router;