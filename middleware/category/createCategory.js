module.exports = function (req, res, next) {
    var newCategory = {
        title:req.body.title,
        description:req.body.description

    }
    db.category.create(newCategory).then(function () {
        res.json({
            success: true,
            status: 311,
            data: {}
        })
    }, function (err) {
        res.json({
            success: false,
            status: 312,
            data: err.fields
        })
    })
}