module.exports = function (req, res, next) {
    db.post.destroy({
        where:{
            id:req.body.id
        }
    }).then(function (data) {
        res.json({
            success:true,
            status:421,
            data:data
        });
    }).catch(function(err) {
        res.json({
            success:false,
            status:422,
            data:err.message
        });
    });
}