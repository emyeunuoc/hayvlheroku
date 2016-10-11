module.exports = function (req, res, next) {
    db.user.destroy({
        where:{
            id:req.body.id
        }
    }).then(function (data) {
        res.json({
            success:true,
            status:221,
            data:data
        });
    }).catch(function(err) {
        res.json({
            success:false,
            status:222,
            data:err.message  
        });
    });
}