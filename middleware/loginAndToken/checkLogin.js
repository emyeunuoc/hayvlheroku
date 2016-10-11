module.exports = function (req, res, next) {
    db.user.find({
        where: {
            username:req.body.username
        }
    }).then(function (user) {
        if(!user){
            req.checkLogin = {
                notify:'user not found',
                data:{},
                success: false
            }
        } else if (user.password != req.body.password) {
            req.checkLogin = {
                notify:'wrong password',
                data:{},
                success: false
            }
        } else {
            req.checkLogin = {
                notify:'login success',
                data:{
                    id: user.id,
                    username: user.username,
                    type: user.type,
                    status: user.status
                },
                success: true
            }
        }
        next();
    });
}