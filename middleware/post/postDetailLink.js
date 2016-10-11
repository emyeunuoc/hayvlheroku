module.exports = function (req, res, next) {
    var link = req.params.link;
    db.post.findAndCountAll({
        where:{
            link:link
        }
    }).then(function (data) {
        if(!data.rows.length) {
            res.json({
                success:false,
                status: 452,
                data:data
            });
            return;
        }
        res.json({
            success:true,
            status: 451,
            data:data
        });
    },function (err) {
        res.json({
            success:false,
            status: 453,
            data:{}
        });
    });
}