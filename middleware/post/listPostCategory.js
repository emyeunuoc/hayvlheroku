module.exports = function (req, res, next) {
    var skip = parseInt(req.query.skip);
    var take = parseInt(req.query.take);
    function convertArr (arr) {
        for(var i = 0; i<arr.length; i++){
            var newRow = {
                createdAt: arr[i].createdAt,
                id:arr[i].id,
                title: arr[i].title,
                description: arr[i].description,
                coverImg:arr[i].coverImg,
                link:arr[i].link,
                username: arr[i].User.username,
                categoryTitle: arr[i].Category.title
            }
            arr[i] = newRow
        }
        return arr;
    }
    db.post.findAndCountAll({
        include:[db.user,db.category],
        limit:take,
        offset: skip,
        order:'id desc',
        where:{
            categoryId:req.params.categoryId
        }
    }).then(function (data) {
        res.json({
            success:true,
            status: 441,
            data:{
                count:data.count,
                rows:convertArr(data.rows)
            }
        });
    },function (err) {
        res.json({
            success:false,
            status: 442,
            data:err.message
        });
    });
}