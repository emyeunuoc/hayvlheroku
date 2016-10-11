module.exports = function (req, res, next) {
    db.category.update({
        title:req.body.title,
        description:req.body.description
    },{
        where:{
            id:req.body.id
        }
    }).then(function (data) {
        res.json({
            success:true,
            status:331,
            data:data
        });
    }).catch(function (err) {
        res.json({
            success:false,
            status:332,
            data:err.message
        });
    });
}