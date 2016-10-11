module.exports = function (req, res, next) {
    db.post.update({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        categoryId: req.body.categoryId,
        videoLink: req.body.videoLink,
        coverImg: req.body.coverImg
    },{
        where:{
            id:req.body.id
        }
    }).then(function (data) {
        res.json({
            success:true,
            status:431,
            data:data
        });
    }).catch(function (err) {
        res.json({
            success:false,
            status:432,
            data:err.message
        });
    });
}