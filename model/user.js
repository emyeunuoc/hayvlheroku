module.exports =  function (sequelize, Datatypes) {
    var User = sequelize.define('User',{
        id:{
            type:Datatypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        username:{
            type:Datatypes.STRING,
            allowNull:false,
            unique:true
        },
        password:{
            type:Datatypes.STRING,
            allowNull:false
        },
        gender:{
            type:Datatypes.STRING,
            allowNull:false
        },
        age:{
            type:Datatypes.INTEGER,
            allowNull:false
        },
        telephone:{
            type:Datatypes.STRING,
            allowNull:true
        },
        email:{
            type:Datatypes.STRING,
            allowNull:true
        },
        type:{
            type:Datatypes.STRING,
            allowNull:false,
            defaultValue:'mod'
        },
        status:{
            type:Datatypes.BOOLEAN,
            allowNull:false,
            defaultValue:true
        }
    },{
        freezeTableName: true
    });

    User.sync();
    return User
}