var jwt = require('jsonwebtoken');
var keyToken = require('../../config/key').keyToken;
module.exports = function (req, res, next) {
    if(req.checkLogin.success){
        var token = jwt.sign(req.checkLogin.data, keyToken, {
            expiresIn: "2 days"
        });
        req.createToken = {
            success:true,
            token:token
        }
    } else{
        req.createToken = {
            success: false,
            token:null
        }
    }
    res.json({
        success: req.createToken.success,
        notify: req.checkLogin.notify,
        token: req.createToken.token
    })
}