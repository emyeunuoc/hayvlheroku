module.exports = function (sequelize, Datatypes) {
    function changeLink(str) {
        str.toLowerCase()
        str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
        str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
        str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
        str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ  |ợ|ở|ỡ/g,"o");
        str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
        str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
        str= str.replace(/đ/g,"d");
        str = str.split(/[^a-z0-9]+/).join('-');
        return str;
    }
    var Post = sequelize.define('Post',{
        id: {
            type:Datatypes.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        title:{
            type: Datatypes.STRING,
            allowNull: false
        },
        description: {
            type: Datatypes.TEXT
        },
        content: {
            type: Datatypes.TEXT
        },
        link: {
            type: Datatypes.TEXT,
            unique: true
        },
        videoLink:{
            type: Datatypes.TEXT
        },
        coverImg:{
            type: Datatypes.TEXT
        },
        categoryId: {
            type:Datatypes.INTEGER
        },
        userId: {
            type:Datatypes.INTEGER
        }
    },{
        freezeTableName: true,
        hooks: {
            afterCreate:function (post, op, fn) {
                var str = post.title + ' ' + post.id;
                post.link = changeLink(str.toLowerCase());
                this.update({
                    link:post.link
                },{
                    where:{
                        id:post.id
                    }
                });
                fn(null, post);
            },
            afterUpdate:function (post, op, fn) {
                var str = post.title + ' ' + post.id;
                post.link = changeLink(str);
                this.update({
                    link:post.link
                },{
                    where:{
                        id:post.id
                    }
                });
                fn(null, post);
            }
        }
    });
    Post.sync();
    return Post;
}