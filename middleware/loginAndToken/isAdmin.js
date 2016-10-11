module.exports = function (req, res, next) {
    if(req.verifyToken.data.type == 'admin') {
        next();
    } else {
        res.json({
            success:false,
            status:104,
            data:{}
        });
    }
}