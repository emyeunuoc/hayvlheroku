module.exports = function (req, res, next) {
    var newPost = {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        categoryId: req.body.categoryId,
        videoLink: req.body.videoLink,
        coverImg: req.body.coverImg,
        userId: req.verifyToken.data.id,
        link:'sa'
    }
    console.log(newPost)
    db.post.create(newPost).then(function () {
        res.json({
            success: true,
            status: 411,
            data: {}
        })
    }, function (err) {
        res.json({
            success: false,
            status: 412,
            data: err.message
        })
    })
}