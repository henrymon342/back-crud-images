
module.exports = (sequelize, DataTypes) =>{
    const Administrador = sequelize.define("Administrador", {
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname:{
            type: DataTypes.STRING,
            allowNull: false
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        cargo:{
            type: DataTypes.STRING,
            allowNull: false
        },
        type:{
            type: DataTypes.STRING,
            allowNull: false
        },
        ministerio:{
            type: DataTypes.STRING,
            allowNull: false
        },
        miembroen:{
            type: DataTypes.STRING,
            allowNull: false
        }
        
    });

    return Administrador;
}