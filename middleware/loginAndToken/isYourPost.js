module.exports = function (req, res, next) {
    if(req.verifyToken.data.type == 'admin') {
        next();
        return;
    }
    db.post.findOne({
        where:{
            userId: req.verifyToken.data.id,
            id: req.body.postId
        }
    }).then(function (data) {
        if(data) {
            next();
        } else {
            res.json({
                success:false,
                status:106,
                data:{}
            });
        }
    }).catch(function () {
       res.json({
           success:false,
           status:107,
           data:{}
       });
    });
}