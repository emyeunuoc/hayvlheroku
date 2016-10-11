module.exports = function (req, res, next) {
    db.category.destroy({
        where:{
            id:req.body.id
        }
    }).then(function (data) {
        res.json({
            success:true,
            status:321,
            data:data
        });
    }).catch(function(err) {
        res.json({
            success:false,
            status:322,
            data:err.message
        });
    });
}