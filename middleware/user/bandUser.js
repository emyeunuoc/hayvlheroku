module.exports = function (req, res, next) {
    db.user.update({
        status: req.body.status
    },{
        where:{
            id:req.body.id
        }
    }).then(function (data) {
        res.json({
            success:true,
            status:231,
            data:data
        });
    }).catch(function (err) {
        res.json({
            success:false,
            status:232,
            data:err.message
        });
    });
}