module.exports = function (req, res, next) {
    var newUser = {
        username: req.body.username,
        password: req.body.password,
        gender: req.body.gender,
        age: req.body.age,
        telephone: req.body.telephone,
        email: req.body.email
    }
    console.log(newUser)
    db.user.create(newUser).then(function () {
        res.json({
            success: true,
            status: 211,
            data: {}
        })
    }, function (err) {
        res.json({
            success: false,
            status: 212,
            data: err.message
        })
    })
}