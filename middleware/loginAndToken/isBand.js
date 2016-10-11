module.exports = function (req, res, next) {
    db.user.findOne({
        where:{
            id: req.verifyToken.data.id
        }
    }).then(function (data) {
        if(data) {
            if(data.status) {
                next();
            }else{
                res.json({
                    success:false,
                    status:108,
                    data:{}
                })
            }
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