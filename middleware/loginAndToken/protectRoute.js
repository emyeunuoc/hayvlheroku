var jwt = require('jsonwebtoken');
var keyToken = require('../../config/key').keyToken;
module.exports = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token) {
        jwt.verify(token, keyToken, function (err, decoded) {
            // invalid token 
            if(err) {
                res.json({
                    success: false,
                    status : 102,
                    data:{}
                });
            } else {
            // valid token
                req.verifyToken = {
                    success: true,
                    status: 101,
                    data: decoded
                }
                next();
                return;
            }
        });
    } else{
        // no token provided
        res.json({
            success: false,
            status : 103,
            data:{}
        });
    }
}