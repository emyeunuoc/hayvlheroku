module.exports =  function (sequelize, Datatypes) {
    var Category = sequelize.define('Category',{
        id:{
            type:Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title:{
            type:Datatypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: Datatypes.TEXT
        }
    },{
        freezeTableName: true
    });
    Category.sync();
    return Category;
}