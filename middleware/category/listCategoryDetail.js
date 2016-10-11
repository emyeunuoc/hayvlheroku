module.exports = function (req, res, next) {
    var categoryId = req.params.categoryId;
    function convertArr (arr) {
        for(var i = 0; i<arr.length; i++){
            var newRow = {
                id:arr[i].id,
                title: arr[i].title,
                description: arr[i].description,
                username: arr[i].User.username,
                categoryTitle: arr[i].Category.title
            }
            arr[i] = newRow
        }
        return arr;
    }
    db.post.findAndCountAll({
        include:[db.user,db.category],
        where:{
            categoryId:categoryId
        }
    }).then(function (data) {
        res.json({
            success:true,
            status: 401,
            data:{
                count:data.count,
                rows:convertArr(data.rows)
            }
        });
    },function (err) {
        res.json({
            success:false,
            status: 402,
            data:err.message
        });
    });
}