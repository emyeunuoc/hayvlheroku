module.exports = function (req, res, next) {
    var id = req.params.id;
    db.post.findAndCountAll({
        where:{
            id:id
        }
    }).then(function (data) {
        if(!data.rows.length) {
            res.json({
                success:false,
                status: 402,
                data:{}
            });
            return;
        }
        res.json({
            success:true,
            status: 401,
            data:data
        });
    },function (err) {
        res.json({
            success:false,
            status: 402,
            data:{}
        });
    });
}