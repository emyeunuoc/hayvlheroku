module.exports = function (req, res, next) {
    db.category.findAndCountAll({}).then(function (data) {
        res.json({
            success:true,
            status: 301,
            data:data
        });
    },function (err) {
        res.json({
            success:false,
            status: 302,
            data:{}
        });
    });
}