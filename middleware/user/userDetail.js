module.exports = function (req, res, next) {
    var id = req.params.id;
    db.user.findAndCountAll({
        attributes :['id','username', 'gender', 'age', 'telephone', 'email', 'type', 'status', 'createdAt', 'updatedAt'],
        where:{
            id:id
        }
    }).then(function (data) {
        res.json({
            success:true,
            status: 201,
            data:data
        });
    },function (err) {
        res.json({
            success:false,
            status: 202,
            data:{}
        });
    });
}