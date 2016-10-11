module.exports = function (req, res, next) {
    var skip = parseInt(req.query.skip);
    var take = parseInt(req.query.take);
    console.log(req.query)
    db.user.findAndCountAll({
        limit:take,
        offset: skip,
        attributes :['id','username', 'gender', 'age', 'telephone', 'email', 'type', 'status', 'createdAt'],
        order:'id desc'
    }).then(function (data) {
        res.json({
            success:true,
            status: 201,
            data:data
        });
    }).catch(function (err) {
        res.json({
            success:false,
            status: 202,
            data:err.message
        });
    });
}